#!/bin/zsh
# Renders the résumé in headless Chrome: a full-page desktop screenshot per language and
# an A4 print PDF with its page count. Defaults to the local editor preview.
#
#   layout-check.sh [base-url] [out-dir]
#   e.g. layout-check.sh http://127.0.0.1:4260/preview/
#        layout-check.sh http://127.0.0.1:4173/
set -u
base="${1:-http://127.0.0.1:4260/preview/}"
out="${2:-$(mktemp -d -t resume-layout)}"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p "$out"
[[ -x "$chrome" ]] || { echo "Chrome not found: $chrome (set CHROME=...)"; exit 1; }
curl -fsS -o /dev/null "$base" || { echo "Not reachable: $base"; exit 1; }

# Headless Chrome sometimes never exits after writing its output, and a shared profile
# blocks the next run, so every call gets its own profile and a 25-second limit.
shot() {
  local profile; profile="$(mktemp -d -t resume-chrome)"
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$profile" "$@" >/dev/null 2>&1 &
  local pid=$!
  for _ in {1..25}; do sleep 1; kill -0 $pid 2>/dev/null || break; done
  kill $pid 2>/dev/null; rm -rf "$profile"
}

pages() {
  if command -v pdfinfo >/dev/null; then pdfinfo "$1" | awk '/^Pages:/ {print $2}'
  else grep -ao '/Type */Page[^s]' "$1" | wc -l | tr -d ' '; fi
}

for lang in en ja zh; do
  shot --force-device-scale-factor=1 --window-size=1100,4800 --screenshot="$out/desktop-$lang.png" "$base?lang=$lang"
  shot --no-pdf-header-footer --print-to-pdf="$out/print-$lang.pdf" "$base?lang=$lang"
  echo "$lang: $(pages "$out/print-$lang.pdf") A4 pages"
done
echo "Output: $out"
