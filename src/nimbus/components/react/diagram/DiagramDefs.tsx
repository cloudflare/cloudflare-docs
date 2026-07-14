/**
 * Shared SVG defs for diagram cards — one drop-shadow filter + one arrow
 * marker, referenced by id from card SVG layers:
 *
 *   filter="url(#diagram-shadow)"   subtle card/pill lift
 *   markerEnd="url(#diagram-arrow)" filled glyph; refX=0 + userSpaceOnUse
 *     means the glyph extends ~6px forward from the path end — pair with
 *     routeEdge's arrowOffset (6) so the tip lands flush on the node edge.
 *
 * Rendered inside each card so cards stay self-contained: an element
 * referencing a missing filter id does not render at all (Firefox enforces
 * this per spec), so relying on a page-level <defs> block makes a card
 * silently disappear when copied to a page without one. ids are idempotent —
 * multiple instances on one page resolve to the first definition in document
 * order, and all instances are identical.
 */
export function DiagramDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter id="diagram-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1"
            floodColor="rgb(0,0,0)"
            floodOpacity="0.06"
          />
        </filter>
        <marker
          id="diagram-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="0"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0,1.5 Q 0,0 1.5,0 Q 3.5,1 5.8,3.2 Q 6.5,4 5.8,4.8 Q 3.5,7 1.5,8 Q 0,8 0,6.5 Z"
            fill="currentColor"
          />
        </marker>
      </defs>
    </svg>
  );
}
