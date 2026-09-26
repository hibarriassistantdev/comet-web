import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

export default function ContentPage({ slug }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest(`/content/public/${encodeURIComponent(slug)}`)
      .then((payload) => setContent(payload.content))
      .catch((requestError) => setError(requestError.message));
  }, [slug]);

  useEffect(() => {
    if (!content) return;
    document.title = content.seoTitle || `${content.title} | COMET`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = content.seoDescription || content.excerpt;
  }, [content]);

  if (error) return (
    <main className="content-state">
      <p>{error}</p>
      <a href="/">Back to COMET</a>
    </main>
  );
  if (!content) return <main className="content-state">Loading...</main>;

  // Detect if the body is HTML (from TipTap) or plain Markdown text
  const isHtml = content.body && content.body.trimStart().startsWith('<');

  return (
    <main className="published-content">
      <article>
        <p className="content-kicker">{content.type === 'post' ? 'JOURNAL' : 'COMET'}</p>
        <h1>{content.title}</h1>
        {content.excerpt && <p className="content-excerpt">{content.excerpt}</p>}
        <div className="content-body">
          {isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: content.body }} />
          ) : (
            // Legacy plaintext fallback
            <p style={{ whiteSpace: 'pre-wrap' }}>{content.body}</p>
          )}
        </div>
      </article>
    </main>
  );
}