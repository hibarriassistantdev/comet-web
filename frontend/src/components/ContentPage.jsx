import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
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

  if (error) return <main className="content-state"><p>{error}</p><a href="/">Back to COMET</a></main>;
  if (!content) return <main className="content-state">Loading...</main>;

  return (
    <main className="published-content">

      <article>
        <p className="content-kicker">{content.type === 'post' ? 'JOURNAL' : 'COMET'}</p>
        <h1>{content.title}</h1>
        {content.excerpt && <p className="content-excerpt">{content.excerpt}</p>}
        <div className="content-body">
          <ReactMarkdown
            components={{
              // If a paragraph contains ONLY an image, render the image as a block figure directly
              p: ({ node, children }) => {
                const hasOnlyImage =
                  node.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'img';
                if (hasOnlyImage) return <>{children}</>;
                return <p>{children}</p>;
              },
              // Always render images as a styled block figure with a shadow
              img: ({ src, alt }) => (
                <figure className="content-figure">
                  <img src={src} alt={alt || 'Image'} loading="lazy" />
                  {alt && alt !== 'Image' && <figcaption>{alt}</figcaption>}
                </figure>
              ),
            }}
          >
            {content.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}