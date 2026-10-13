#!/usr/bin/env bash
# Rebuilds the web fonts in src/fonts/ from the original licensed font files (SIL Open Font License 1.1).
# Lossless for the characters kept: outlines, spacing, kerning and layout features are unchanged; only glyphs for
# scripts the site does not use (Cyrillic, Vietnamese, ...) are dropped and the file is repacked as WOFF2.
# Needs:  pip install fonttools brotli
# Latin set: Basic Latin, Latin-1, Latin Extended-A, common punctuation, currency (NGN, EUR, INR...), arrows, minus.
set -euo pipefail
U="U+0020-007E,U+00A0-00FF,U+0100-017F,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+2044,U+20A0-20BF,U+2122,U+2190-2193,U+2212,U+2215"
for w in Regular Medium; do
  pyftsubset "Unbounded font family/static/Unbounded-$w.ttf" --unicodes="$U" --layout-features='*' --name-IDs='*' --name-languages='*' --glyph-names --flavor=woff2 --output-file="src/fonts/Unbounded-$w-latin.woff2"
done
# Manrope and Caveat are already compact Latin variable WOFF2 files (25 KB and 75 KB) and are used as supplied.
cp "Unbounded font family/OFL.txt" src/fonts/OFL-Unbounded.txt
