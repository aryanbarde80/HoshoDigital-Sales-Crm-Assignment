import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export function MarkdownBlock({ content, className = "" }) {
  return (
    <div
      className={`prose prose-invert max-w-none prose-p:my-0 prose-li:my-1 prose-strong:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)] ${className}`}
    >
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
    </div>
  );
}
