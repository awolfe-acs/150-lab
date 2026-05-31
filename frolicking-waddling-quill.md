# Plan: Fix Timeline Scrubber Post-Resize Correctness

## Context

After any viewport resize (height, width, orientation, DevTools toggling), the timeline scrubber breaks in two distinct ways:

**Bug A — Wrong scroll target on click (affects breakpoint crossings and is latent otherwise)**
`calculateProgressForMarker()` and the `eventProgress` value captured in each minor-node's click-handler closure both use snapshot `const` values: `moveDuration`, `totalCycleDuration`, `phaseADuration`, `timelineTotalDuration`. These are computed once at init. If `isMobileBreakpoint` changes (user crosses 1024px), `moveDuration` flips between `0.6` and `0.88`, making all progress fractions wrong. The click handler uses the stale fraction against a freshly-recalculated `st.start`/`st.end`, producing a wrong `targetScroll`. Wrong scroll → wrong event visible → wrong dot/marker/year.

**Bug B — Wrong progress bar + stale states immediately after any resize**
`repositionMinorNodes()` defers its DOM writes to a `requestAnimationFrame`. The `updateScrubber` call in `onRefresh` (and the `ScrollTrigger refresh` listener) fires *before* that RAF executes. So `updateScrubberInternal` calls `getBoundingClientRect()` on minor nodes that haven't moved yet — the progress bar is computed from old pixel positions. No subsequent `updateScrubber` call re-runs after the RAF, so the stale progress bar value persists until the next scroll event.

**File:** `src/js/animations/timeline.js`

---

## Root Cause Summary

| Stale value | Line | Why it goes stale |
|---|---|---|
| `moveDuration` | 568 | `isMobile()` can change after init (breakpoint crossing) |
| `totalCycleDuration` | 570 | Derived from `moveDuration` |
| `phaseADuration` | 574 | Derived from `holdDuration` (constant — safe, but needs getter for consistency) |
| `phaseBDuration` | 575 | Derived from `totalCycleDuration` |
| `timelineTotalDuration` | 576 | Derived from all of the above |
| `eventProgress` (closure in `generateMinorNodes`) | 3096–3098 | Closed over all the above at generation time; never recalculated |
| `repositionMinorNodes` RAF order | 3311 | `updateScrubber` runs before the RAF that repositions nodes |

---

## Changes (all in `src/js/animations/timeline.js`)

### 1 — Add live-getter versions of the stale duration constants (~line 577)
Keep the existing `const` snapshots exactly as-is (the GSAP tween definitions captured them as numbers and rely on them). Add four new **getter functions** directly below, used only for progress calculations:

```js
const getMoveDuration = () => isMobile() ? 0.6 : 0.88;
const getTotalCycleDuration = () => getMoveDuration() + holdDuration;
const getPhaseADuration = () => 0.09 + holdDuration;
const getTimelineTotalDuration = () => getPhaseADuration() + (remainingEventsCount * getTotalCycleDuration());
```

### 2 — Update `calculateProgressForMarker()` to use live getters (~line 1517)
Replace every reference to the snapshot constants inside this function:
- `holdDuration` stays (it's a true constant)
- `timelineTotalDuration` → `getTimelineTotalDuration()`
- `phaseADuration` → `getPhaseADuration()`
- `totalCycleDuration` → `getTotalCycleDuration()`
- `moveDuration` → `getMoveDuration()`

Result: marker clicks always compute the correct GSAP progress fraction regardless of current breakpoint.

### 3 — Store `data-event-progress` on each minor node during `generateMinorNodes()` (~line 3128)
After the existing `setAttribute` block, add:
```js
minorNode.setAttribute('data-event-progress', eventProgress.toFixed(6));
```

This makes the closure-captured value readable from the DOM, so it can be recalculated on resize.

### 4 — Minor node click handler reads progress from the attribute, not the closure (~line 3254)
Replace:
```js
const targetScroll = start + (scrollDistance * eventProgress);
```
With:
```js
const liveEventProgress = parseFloat(minorNode.getAttribute('data-event-progress') || String(eventProgress));
const targetScroll = start + (scrollDistance * liveEventProgress);
```

### 5 — `repositionMinorNodes()` recalculates `data-event-progress` **and** calls `updateScrubberInternal` after RAF (~line 3311)

Inside the existing `requestAnimationFrame(() => { ... })` callback, after each node's `style.left` is set, also rewrite `data-event-progress` using live getters:

```js
const globalIdx = parseInt(node.getAttribute('data-event-index') || '0');
const md = getMoveDuration(), cd = getTotalCycleDuration();
const pa = getPhaseADuration(), ttd = getTimelineTotalDuration();
const newEP = globalIdx === 0
  ? (0.09 + holdDuration * 0.5) / ttd
  : (pa + ((globalIdx - 1) * cd) + md + holdDuration * 0.5) / ttd;
node.setAttribute('data-event-progress', newEP.toFixed(6));
```

Then, **after the `forEach` loop** (still inside the RAF), force a scrubber refresh with newly-laid-out positions:
```js
updateScrubberInternal(0);
```

`updateScrubberInternal` is already in scope (defined at ~line 1289, above `repositionMinorNodes` at ~line 3301). Calling it directly bypasses the `lastScrubberProgress` threshold check so the progress bar always repaints after resize.

---

## Files Modified
- `src/js/animations/timeline.js` only

## Critical Line References
| What | Line |
|---|---|
| Snapshot constants (keep, add getters below) | 568–576 |
| `calculateProgressForMarker()` | 1517–1553 |
| `generateMinorNodes()` setAttribute block | ~3128 |
| Minor node click handler `targetScroll` | ~3254 |
| `repositionMinorNodes()` RAF callback | ~3311 |

## Verification
1. Load page normally, scroll into the timeline — scrubber states update correctly (existing behaviour preserved).
2. Resize the viewport (drag browser edge, or toggle DevTools device mode) — scrubber progress bar immediately reflects the active event after resize without any scroll needed.
3. Post-resize, click any minor node dot — page scrolls to the correct `.timeline-event`, the clicked dot gets `.active`, all previous get `.complete`, progress bar fills correctly, `#current-timeline-year` shows the correct year.
4. Cross the 1024px breakpoint — all of the above still works with the switched `moveDuration` value (0.6 ↔ 0.88).
