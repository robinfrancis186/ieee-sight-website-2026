#!/bin/bash
set -euo pipefail
site_root=/home2/sightieeekerala/public_html
backup_root=/home2/sightieeekerala/site-backups
[ -f dist/index.html ] && [ -f dist/.htaccess ]
[ -d "$site_root" ]
mkdir -p "$backup_root"
backup_dir=$(mktemp -d "$backup_root/release-$(date +%Y%m%d-%H%M%S)-XXXXXX")
cp -a "$site_root/." "$backup_dir/"
cp -a dist/. "$site_root/"
printf 'Published website; previous files saved in %s\n' "$backup_dir"
