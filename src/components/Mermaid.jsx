import { useEffect, useRef } from "react";
import mermaid from "mermaid"; // ✅ Correct import

const Mermaid = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chart]);

  return <div ref={ref} className="mermaid">{chart}</div>;
};

export default Mermaid;
