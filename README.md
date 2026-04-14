# Dad's 70th — Canadian Rockies

A single-page static site for a long-weekend trip celebrating Dad's 70th birthday in Banff, Alberta (May 16–19, 2026).

Plain HTML/CSS/JS — no build step.

## View locally

Just open `index.html` in any browser. Or serve with any static server:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000/

## Deploy to GitHub Pages

```
gh repo create dads-70th-rockies --public --source=. --push
gh api repos/<user>/dads-70th-rockies/pages -X POST \
  --input - <<< '{"build_type":"legacy","source":{"branch":"main","path":"/"}}'
```

Live at `https://<user>.github.io/dads-70th-rockies/`.

## Updating content

All trip data lives in `data.js`. Edit there, commit, push — Pages redeploys in ~1 minute.
