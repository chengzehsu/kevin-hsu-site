#!/usr/bin/env bash
# Copy and design-rule checks for the site (spec: portfolio-content / Copy rules).
# Usage: bash scripts/check-copy.sh   (exit 1 on any violation; check 4 is advisory only)
set -u
cd "$(dirname "$0")/.."
fail=0

echo "1) em/en dashes in content, components, app, lib"
if grep -rn --include='*.ts' --include='*.tsx' --include='*.css' -e '—' -e '–' content components app lib; then fail=1; else echo "   ok"; fi

echo "2) mainland vocabulary / banned metric wording in content"
if grep -rn -e '用戶' -e '2\.33' -e '3\.33' -e '×2' -e '数据' -e '信息' -e '軟件' -e '視頻' content; then fail=1; else echo "   ok"; fi

echo "3) eyebrow labels (uppercase + tracking) across components: max 2"
n=$(grep -rhoE 'class(Name)?="[^"]*uppercase[^"]*tracking[^"]*"' components app 2>/dev/null | wc -l | tr -d ' ')
m=$(grep -rhoE 'class(Name)?="[^"]*tracking[^"]*uppercase[^"]*"' components app 2>/dev/null | wc -l | tr -d ' ')
total=$((n + m)); echo "   found $total"; if [ "$total" -gt 2 ]; then fail=1; fi

echo "4) [advisory, never fails] visible string literals in section components (heuristic: JSX text nodes with CJK or 3+ letters)"
if grep -rnE '>[^<{]*([一-鿿]|[A-Za-z]{3,})[^<{]*<' components/Nav.tsx components/Hero.tsx components/Metrics.tsx components/Method.tsx components/CaseStudies.tsx components/Timeline.tsx components/Contact.tsx components/Footer.tsx 2>/dev/null; then echo "   review the lines above (some are fine, e.g. aria hidden glyphs)"; else echo "   ok"; fi

echo "5) scroll listeners / h-screen"
if grep -rn -e "addEventListener('scroll'" -e 'addEventListener("scroll"' -e 'h-screen' components app; then fail=1; else echo "   ok"; fi

echo "6) static output present"
if [ -f out/index.html ] && [ -f out/en/index.html ]; then
  grep -o '<html[^>]*lang="[^"]*"' out/index.html out/en/index.html
  [ -d out/lab ] && { echo "   out/lab exists: delete app/(zh)/lab before release"; fail=1; }
else echo "   (no out/ yet)"; fi

[ "$fail" -eq 0 ] && echo "ALL CHECKS PASSED" || { echo "CHECKS FAILED"; exit 1; }
