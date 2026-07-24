#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "📥 Downloading yt-dlp binaries…"

# macOS (universal, works on Intel + Apple Silicon)
curl -fSL "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos" -o bin/mac/yt-dlp
chmod +x bin/mac/yt-dlp
echo "  ✓ macOS"

# Windows
curl -fSL "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" -o bin/win/yt-dlp.exe
echo "  ✓ Windows"

echo "✅ Done. Run: pnpm build:mac  or  pnpm build:win"
