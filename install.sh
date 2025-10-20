#!/usr/bin/env bash

# Download and unpack latest chriswainformatik/objects release into a chosen directory.
# When using this script you don't need to download anything else manually, just this file.
# 
# Usage:
#   ./install.sh [DEST]
#   If DEST is omitted the script will prompt and default to /var/www/objects/objects-latest
# 
# Requirements:
#   curl, unzip, (optional) jq, (optional) rsync
# 
# Behavior:
# - Downloads the repository's latest release ZIP (prefers attached .zip assets)
# - Backs up non-empty destination to DEST_backup_TIMESTAMP
# - Unpacks release contents into DEST
# - Sets ownership to www-data:www-data (unless run as www-data)

set -euo pipefail

REPO_OWNER="chriswainformatik"
REPO_NAME="objects"
DEFAULT_DEST="/var/www/objects/objects-latest"
TMPDIR="$(mktemp -d)"
API_URL="https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest"

cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT

echo "Fetching latest release info for ${REPO_OWNER}/${REPO_NAME}..."
json="$(curl -fsSL "$API_URL")"

asset_url=""
asset_name=""

if command -v jq >/dev/null 2>&1; then
  asset_url="$(printf '%s' "$json" | jq -r '.assets[]? | select(.name|test("\\.zip$"; "i")) | .browser_download_url' | head -n1)"
  asset_name="$(printf '%s' "$json" | jq -r '.assets[]? | select(.name|test("\\.zip$"; "i")) | .name' | head -n1)"
  if [ -z "$asset_url" ] || [ "$asset_url" = "null" ]; then
    asset_url="$(printf '%s' "$json" | jq -r '.zipball_url // empty')"
    tag_name="$(printf '%s' "$json" | jq -r '.tag_name // "latest"')"
    asset_name="${REPO_NAME}-${tag_name}.zip"
  fi
else
  asset_url="$(printf '%s' "$json" | tr '\n' ' ' \
    | grep -oE '"assets":[[:space:]]*$$.*$$' | grep -oE '\{[^}]*\}' | grep -i '\.zip"' | head -n1 \
    | grep -oE '"browser_download_url"[[:space:]]*:[[:space:]]*"[^"]+"' || true)"
  if [ -n "$asset_url" ]; then
    asset_url="$(printf '%s' "$asset_url" | sed -E 's/.*"browser_download_url"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')"
    asset_name="$(printf '%s' "$json" | tr '\n' ' ' \
      | grep -oE '"assets":[[:space:]]*$$.*$$' | grep -oE '\{[^}]*\}' | grep -i '\.zip"' | head -n1 \
      | sed -E 's/.*"name"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')"
  else
    asset_url="$(printf '%s' "$json" | tr '\n' ' ' | sed -nE 's/.*"zipball_url"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/p')"
    tag_name="$(printf '%s' "$json" | tr '\n' ' ' | sed -nE 's/.*"tag_name"[[:space:]]*:[[:space:]]*\"([^"]+)\".*/\1/p' || true)"
    asset_name="${REPO_NAME}-${tag_name:-latest}.zip"
  fi
fi

[ -n "$asset_url" ] || { echo "Could not determine zip URL." >&2; exit 1; }

echo "Found release asset: ${asset_name:-(zipball)}"
dl_path="${TMPDIR}/${asset_name##*/}"

echo "Downloading ${asset_url} ..."
curl -fL "$asset_url" -o "$dl_path"

[ -s "$dl_path" ] || { echo "Download failed or empty." >&2; exit 1; }

read -r -p "Unpack to [default: ${DEFAULT_DEST}]: " dest
dest="${dest:-$DEFAULT_DEST}"
dest="$(eval echo "$dest")"

parent="$(dirname "$dest")"
[ -d "$parent" ] || mkdir -p "$parent"

if [ -d "$dest" ]; then
  if [ "$(ls -A "$dest" 2>/dev/null | wc -l)" -gt 0 ]; then
    ts="$(date -u +"%Y%m%dT%H%M%SZ")"
    backup="${dest}_backup_${ts}"
    echo "Destination exists and is not empty. Renaming to ${backup} ..."
    mv "$dest" "$backup"
    mkdir -p "$dest"
  else
    rm -rf "$dest"
    mkdir -p "$dest"
  fi
fi

echo "Unpacking ${dl_path} -> ${dest} ..."
extract_dir="${TMPDIR}/extract"
mkdir -p "$extract_dir"
unzip -q "$dl_path" -d "$extract_dir"

# Identify top-level extracted path(s)
shopt -s dotglob
entries=( "$extract_dir"/* )
shopt -u dotglob

# Use rsync if available for a robust copy (preserves permissions, handles busy mounts)
if command -v rsync >/dev/null 2>&1; then
  echo "Using rsync to copy files..."
  if [ "${#entries[@]}" -eq 1 ] && [ -d "${entries[0]}" ]; then
    rsync -a "${entries[0]}/" "$dest/"
  else
    rsync -a "$extract_dir"/ "$dest"/
  fi
else
  echo "rsync not found — using cp -a fallback..."
  if [ "${#entries[@]}" -eq 1 ] && [ -d "${entries[0]}" ]; then
    cp -a "${entries[0]}/." "$dest"/
  else
    cp -a "$extract_dir"/. "$dest"/
  fi
fi

# Only set ownership to www-data:www-data if the script runner is not www-data
current_user="$(id -un)"
if [ "$current_user" != "www-data" ]; then
  echo "Setting ownership to www-data:www-data for ${dest} ..."
  chown -R www-data:www-data "$dest"
else
  echo "Running as www-data; skipping chown."
fi

echo "Done. Unpacked to: ${dest}"