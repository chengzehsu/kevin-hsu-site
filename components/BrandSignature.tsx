/* Brand mark: the hero film's five stations in miniature. Stations 3 and 4 start out of line (the bottleneck),
   then snap onto the flow line, so the logo tells "find the bottleneck, build the fix" in one beat.
   Motion lives in globals.css (.brand-flow); reduced motion shows the fixed line only. */
const STATIONS = [0, 1, 2, 3, 4];

export function BrandSignature({ label }: { label: string }) {
  return (
    <span className="brand-signature">
      <svg className="brand-flow" viewBox="0 0 38 14" aria-hidden="true">
        {STATIONS.map((i) => {
          const off = i === 2 || i === 3;
          return (
            // The <g> carries the hover replay, the <rect> the one-time load fix, so leaving hover never replays the load.
            <g key={i} className={off ? "brand-flow-off" : undefined}>
              <rect data-bottleneck={i === 2 ? "" : undefined} x={i * 8} y={4} width={6} height={6} rx={1.6} />
            </g>
          );
        })}
      </svg>
      <span className="brand-name">{label}</span>
    </span>
  );
}
