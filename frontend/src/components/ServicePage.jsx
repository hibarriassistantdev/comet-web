import { useEffect, useState } from 'react';
import { SERVICE_BY_SLUG } from '../data/services';
import { apiRequest } from '../lib/api';

export default function ServicePage({ slug }) {
  // Start immediately with the hardcoded content — zero loading delay
  const hardcoded = SERVICE_BY_SLUG[slug];
  const [content, setContent] = useState(hardcoded || null);
  const [notFound, setNotFound] = useState(!hardcoded);

  useEffect(() => {
    // Silently try to fetch an admin-saved override from the DB
    apiRequest(`/content/public/${encodeURIComponent(slug)}`)
      .then((payload) => {
        if (payload.content) {
          // Admin has saved custom content — use it instead of hardcoded
          setContent(payload.content);
        }
      })
      .catch(() => {
        // No DB override found — that's fine, we already show the hardcoded content
      });
  }, [slug]);

  useEffect(() => {
    if (!content) return;
    document.title = content.seoTitle || `${content.title} | COMET`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = content.seoDescription || content.excerpt || '';
  }, [content]);

  if (notFound) {
    return (
      <main className="content-state">
        <p>Service page not found.</p>
        <a href="/">Back to COMET</a>
      </main>
    );
  }

  if (!content) return <main className="content-state">Loading...</main>;

  return (
    <main className="published-content">
      <article>
        <p className="content-kicker">COMET / SERVICES</p>
        <h1>{content.title}</h1>
        {content.excerpt && <p className="content-excerpt">{content.excerpt}</p>}
        <div className="content-body">
          <div dangerouslySetInnerHTML={{ __html: content.body }} />
        </div>
      </article>
    </main>
  );
}
