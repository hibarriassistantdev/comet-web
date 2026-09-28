import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { SERVICES } from '../data/services';

const fixedPages = [
  { title: 'Home', href: '/' },
  { title: 'Pricing', href: '/#pricing' },
  { title: 'About', href: '/#about' },
];

export default function SitemapPage() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    apiRequest('/content/public')
      .then(({ content: records }) => setPages(records || []))
      .catch(() => setPages([]));
  }, []);

  return (
    <main className="published-content sitemap-page">
      <article>
        <p className="content-kicker">COMET / SITE INDEX</p>
        <h1>Sitemap</h1>
        <p className="content-excerpt">Browse the main pages and published content on COMET.</p>
        <section>
          <h2>Website</h2>
          <ul>{fixedPages.map((page) => <li key={page.href}><a href={page.href}>{page.title}</a></li>)}</ul>
        </section>
        <section>
          <h2>Services</h2>
          <ul>{SERVICES.map((service) => <li key={service.slug}><a href={`/services/${service.slug}`}>{service.title}</a></li>)}</ul>
        </section>
        <section>
          <h2>Published pages and posts</h2>
          {pages.some((page) => !SERVICES.some((service) => service.slug === page.slug)) ? (
            <ul>{pages.filter((page) => !SERVICES.some((service) => service.slug === page.slug)).map((page) => <li key={page.slug}><a href={`/content/${encodeURIComponent(page.slug)}`}>{page.title}</a></li>)}</ul>
          ) : <p>No published pages or posts yet.</p>}
        </section>
        <p className="sitemap-xml-link"><a href="/sitemap.xml">XML sitemap for search engines</a></p>
      </article>
    </main>
  );
}
