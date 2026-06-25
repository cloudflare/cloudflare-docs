/**
 * Scroll-spy + animated rail indicator. Dash slides via arc-length
 * so it weaves through curves cleanly instead of cutting across.
 */

import { mount } from "nimbus-docs/client";

const SCROLL_OFFSET = 100;

function initToc(root: HTMLElement): () => void {
  const nav = root.querySelector<HTMLElement>("nav");
  const activePath = root.querySelector<SVGPathElement>("[data-nb-toc-rail-active]");
  const links = root.querySelectorAll<HTMLElement>("[data-nb-toc-link]");
  if (!nav || !activePath || links.length === 0) return () => {};

  const slugs = Array.from(links).map((l) => l.dataset.nbSlug!);
  const headingEls = slugs
    .map((s) => document.getElementById(s))
    .filter(Boolean) as HTMLElement[];
  if (headingEls.length === 0) return () => {};

  // Per-link arc-length along the rail path. Computed from real DOM
  // measurements so the path is always pixel-perfect over the static
  // gray rail (border-lefts + curve SVGs).
  let segments: { start: number; length: number }[] = [];
  let totalLength = 0;
  let currentIndex = -1;
  let hasApplied = false;

  function buildRail() {
    const navRect = nav!.getBoundingClientRect();

    // Rail centerline x for each link: link.left + 1 (center of the 2px
    // border-left stroke). yTop / yBot bracket the link's vertical extent.
    const m = Array.from(links).map((link) => {
      const r = link.getBoundingClientRect();
      return {
        x: r.left - navRect.left + 1,
        yTop: r.top - navRect.top,
        yBot: r.top - navRect.top + r.height,
      };
    });

    // Build the path incrementally so we can measure per-link arc lengths
    // via getTotalLength() at each step.
    let d = "";
    const newSegments: { start: number; length: number }[] = [];

    for (let i = 0; i < m.length; i++) {
      const cur = m[i];

      // Connector from previous link's bottom to this link's top.
      if (i === 0) {
        d += `M ${cur.x} ${cur.yTop} `;
      } else {
        const prev = m[i - 1];
        if (Math.abs(cur.x - prev.x) < 0.5) {
          // Same indent → straight line through the gap.
          d += `L ${cur.x} ${cur.yTop} `;
        } else {
          // Different indent → smooth S-curve matching the static curve
          // SVGs already in the gap (M 0 0 C 0 0.5, 1 0.5, 1 1 stretched
          // to the gap rectangle).
          const midY = (prev.yBot + cur.yTop) / 2;
          d += `C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.yTop} `;
        }
      }

      // The link's own vertical segment.
      activePath!.setAttribute("d", d);
      const start = activePath!.getTotalLength();

      d += `L ${cur.x} ${cur.yBot} `;
      activePath!.setAttribute("d", d);
      const end = activePath!.getTotalLength();

      newSegments.push({ start, length: end - start });
    }

    segments = newSegments;
    totalLength = activePath!.getTotalLength();
  }

  function applyActive(index: number, instant: boolean) {
    const seg = segments[index];
    if (!seg) return;

    if (instant) {
      activePath!.setAttribute("data-initial", "true");
      // Force style recalc so transition-opacity-only takes effect before
      // we write the new dash values (otherwise the dash transitions on
      // first paint, producing a visible sweep).
      void activePath!.getBoundingClientRect();
    }

    // A single dash of length seg.length, followed by a gap longer than
    // the whole path so nothing else is drawn. Shift its starting point
    // along the path with stroke-dashoffset. Both transition smoothly,
    // so the highlight slides along arc length — through curves and all.
    activePath!.style.strokeDasharray = `${seg.length} ${totalLength + 1}`;
    activePath!.style.strokeDashoffset = `${-seg.start}`;

    if (instant) {
      requestAnimationFrame(() => {
        activePath!.setAttribute("data-ready", "true");
        requestAnimationFrame(() => {
          activePath!.removeAttribute("data-initial");
        });
      });
    }
  }

  function setActive(index: number) {
    if (index === currentIndex) return;
    currentIndex = index;

    links.forEach((l) => l.removeAttribute("aria-current"));
    root
      .querySelector(`[data-nb-toc-link][data-nb-slug="${slugs[index]}"]`)
      ?.setAttribute("aria-current", "true");

    applyActive(index, !hasApplied);
    hasApplied = true;
  }

  function updateActive() {
    // Walk headings in document order. The last one whose top is at or
    // above the offset is the "current" section the reader is in.
    let activeIndex = 0;
    for (let i = 0; i < headingEls.length; i++) {
      if (headingEls[i].getBoundingClientRect().top <= SCROLL_OFFSET) {
        activeIndex = i;
      }
    }
    setActive(activeIndex);
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }

  function onLayoutChange() {
    // Rebuild the path geometry and snap (no animation) to the current
    // active segment — the user isn't navigating, layout just shifted.
    buildRail();
    if (currentIndex >= 0) applyActive(currentIndex, true);
  }

  const controller = new AbortController();
  window.addEventListener("scroll", onScroll, {
    passive: true,
    signal: controller.signal,
  });
  window.addEventListener("resize", onLayoutChange, {
    passive: true,
    signal: controller.signal,
  });

  const ro = new ResizeObserver(onLayoutChange);
  ro.observe(nav);

  buildRail();
  updateActive();

  return () => {
    controller.abort();
    ro.disconnect();
  };
}

mount("[data-nb-toc]", initToc);
