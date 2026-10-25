# Cinematic scroll layer

Movie-style smooth scroll and section animations were added after commit:

**`491d62a` — checkpoint: invitation site before cinematic scroll layer**

## Revert to the version before cinematic effects

```bash
git checkout 491d62a -- .
# or reset the whole branch (destructive):
# git reset --hard 491d62a
```

## Disable without git (quick toggle)

In `src/components/WeddingPageContent.tsx`, set:

```ts
const CINEMATIC_SCROLL_ENABLED = false
```

Then rebuild. Lenis, grain, chapter styling, and film layouts turn off; set section `presentation="default"` props if you need the older simple section UI.
