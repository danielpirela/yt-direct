#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

PLATFORM="${1:-mac}"

echo "Preparing binary for $PLATFORM..."
mkdir -p bin

if [ "$PLATFORM" = "win" ]; then
  if [ ! -f bin/win/yt-dlp.exe ]; then
    echo "  Downloading Windows binary..."
    curl -fSL "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" -o bin/win/yt-dlp.exe
  fi
  cp bin/win/yt-dlp.exe bin/yt-dlp.exe
else
  if [ ! -f bin/mac/yt-dlp ]; then
    echo "  Downloading macOS binary..."
    curl -fSL "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos" -o bin/mac/yt-dlp
    chmod +x bin/mac/yt-dlp
  fi
  cp bin/mac/yt-dlp bin/yt-dlp
  chmod +x bin/yt-dlp
fi

echo "Done. Run: pnpm build:$PLATFORM"
