#!/bin/sh
set -e
# Workbench / Knative: secrets mounted as files under /var/secrets (see deployment/values.yaml).
# AuditPilot has no required external secrets today; loop is left in place for future
# integrations (Veeva QMS, LabWare LIMS, OSIsoft PI, SAP S/4HANA — see README).
if [ -d /var/secrets ]; then
  for f in /var/secrets/*; do
    [ -f "$f" ] || continue
    name="$(basename "$f")"
    export "$name"="$(cat "$f")"
  done
fi

# Knative sets PORT; local default matches deployment values (8080)
export PORT="${PORT:-8080}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

# Next.js standalone server
exec node server.js
