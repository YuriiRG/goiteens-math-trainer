import "katex/dist/katex.min.css";
import { useMemo } from "react";
import katex from "katex";
export default function Math({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const html = useMemo(() => katex.renderToString(text), [text]);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
