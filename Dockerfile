# AuditPilot — PwC Workbench / Global CaaS (Knative) pattern
# Next.js (App Router) standalone build. Default: AAAS Artifactory mirror.
ARG BASE_IMAGE=w00043-pwc-us-aaas-docker.artifacts-west.pwc.com/node:20-slim

# ---------- builder ----------
FROM ${BASE_IMAGE} AS builder

WORKDIR /app

# BASE_PATH must match the Workbench URL prefix so Next.js basePath/assetPrefix
# emit links that route correctly through the Istio gateway. Set in
# deployment/values.yaml build_args. Empty by default for local dev.
ARG BASE_PATH=""

# Do NOT set NODE_ENV=production here — npm ci would skip devDependencies
# (tailwindcss, @tailwindcss/postcss, eslint-config-next) needed for `next build`.
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .
# Pass BASE_PATH inline so it's reliably set in process.env regardless of
# Kaniko's ARG/ENV expansion behavior. Echo lets us verify in build logs.
RUN echo "[build] BASE_PATH=[${BASE_PATH}]" \
    && BASE_PATH="${BASE_PATH}" npm run build

# ---------- runtime ----------
FROM ${BASE_IMAGE} AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0 \
    HOME=/tmp/app-home \
    XDG_CONFIG_HOME=/tmp/app-xdg

# node:20-slim ships a built-in `node` user with uid/gid 1000 — reuse it
# (matches deployment/values.yaml runAsUser=1000). No groupadd/useradd needed.

# Next.js standalone output bundles the minimal server + node_modules
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

USER 1000

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||8080)+'/',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))" || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
