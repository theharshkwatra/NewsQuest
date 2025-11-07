// Simple state detection: pick the region whose center is closest to carPosition,
// within a max radius (in the same 600x600 coordinate space).
export function detectCurrentState(carPosition, stateRegions, maxDist = 40) {
  if (!carPosition || !stateRegions?.length) return "";
  let best = { name: "", d2: Infinity };

  for (const r of stateRegions) {
    const dx = carPosition.x - r.center.x;
    const dy = carPosition.y - r.center.y;
    const d2 = dx*dx + dy*dy;
    if (d2 < best.d2) best = { name: r.name, d2 };
  }

  return Math.sqrt(best.d2) <= maxDist ? best.name : "";
}
