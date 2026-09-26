import { useEffect, useState, useRef } from 'react';
import { Activity, ArrowUpRight, FileText, LogOut, Plus, Search, Settings, Trash2, X, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { apiRequest } from '../../lib/api';
import './admin.css';

const emptyForm = { title: '', slug: '', type: 'page', status: 'draft', excerpt: '', body: '', seoTitle: '', seoDescription: '' };

export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginError, setLoginError] = useState('');
  const getTabFromUrl = () => {
    const path = window.location.pathname;
    if (path.startsWith('/admin/content')) return 'content';
    if (path.startsWith('/admin/footer')) return 'footer';
    return 'overview';
  };

  const [activeTab, setActiveTabState] = useState(getTabFromUrl);

  useEffect(() => {
    const handlePopState = () => setActiveTabState(getTabFromUrl());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.history.pushState({}, '', `/admin/${tab}`);
  };
  const [range, setRange] = useState(30);
  const [analytics, setAnalytics] = useState(null);
  const [content, setContent] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [footerSettings, setFooterSettings] = useState(null);
  const [footerBusy, setFooterBusy] = useState(false);

  useEffect(() => {
    apiRequest('/auth/me')
      .then(({ admin: currentAdmin }) => setAdmin(currentAdmin))
      .catch(() => {})
      .finally(() => setCheckingSession(false));
  }, []);

  useEffect(() => {
    if (!checkingSession && !admin && window.location.pathname !== '/admin') {
      window.history.replaceState({}, '', '/admin');
    }
  }, [admin, checkingSession]);

  useEffect(() => {
    if (!admin) return;
    apiRequest(`/analytics?days=${range}`).then(setAnalytics).catch((error) => setNotice(error.message));
  }, [admin, range]);

  useEffect(() => {
    if (!admin) return;
    apiRequest('/content').then(({ content: records }) => setContent(records)).catch((error) => setNotice(error.message));
  }, [admin]);

  useEffect(() => {
    if (!admin) return;
    apiRequest('/settings').then(({ settings }) => setFooterSettings(settings)).catch(() => {});
  }, [admin]);

  async function saveFooterSettings(updates) {
    setFooterBusy(true);
    try {
      const { settings } = await apiRequest('/settings', { method: 'PUT', body: JSON.stringify(updates) });
      setFooterSettings(settings);
      setNotice('Footer settings saved.');
    } catch (error) {
      setNotice(error.message);
    } finally {
      setFooterBusy(false);
    }
  }

  async function login(event) {
    event.preventDefault();
    setLoginError('');
    const values = new FormData(event.currentTarget);
    try {
      const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.get('email'), password: values.get('password') }),
      });
      setAdmin(result.admin);
      window.history.pushState({}, '', `/admin/${activeTab}`);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  async function logout() {
    await apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    window.location.href = '/admin';
  }

  function startNew() {
    setEditing(null);
    setForm(emptyForm);
  }

  function startEdit(record) {
    setEditing(record._id);
    setForm({ ...emptyForm, ...record });
  }

  async function saveContent(event) {
    event.preventDefault();
    setBusy(true);
    setNotice('');
    try {
      const result = await apiRequest(editing ? `/content/${editing}` : '/content', {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(form),
      });
      setContent((records) => editing
        ? records.map((record) => record._id === editing ? result.content : record)
        : [result.content, ...records]);
      setNotice(form.status === 'published' ? 'Content published.' : 'Draft saved.');
      startNew();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteContent(id) {
    if (!window.confirm('Delete this item permanently?')) return;
    try {
      await apiRequest(`/content/${id}`, { method: 'DELETE' });
      setContent((records) => records.filter((record) => record._id !== id));
      if (editing === id) startNew();
      setNotice('Content deleted.');
    } catch (error) {
      setNotice(error.message);
    }
  }

  if (checkingSession) return <div className="admin-loading">Loading admin...</div>;
  if (!admin) return <Login onSubmit={login} error={loginError} />;

  const filteredContent = content.filter((record) => `${record.title} ${record.slug} ${record.type}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-wordmark" href="/">COMET<span> / CONTROL</span></a>
        <div className="admin-workspace-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}><Activity size={17} /> Overview</button>
          <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}><FileText size={17} /> Pages & posts</button>
          <button className={activeTab === 'footer' ? 'active' : ''} onClick={() => setActiveTab('footer')}><Settings size={17} /> Footer</button>
        </nav>
        <div className="admin-sidebar-foot">
          <span className="admin-avatar">{admin.email.slice(0, 1).toUpperCase()}</span>
          <span className="admin-identity"><strong>Superadmin</strong><small>{admin.email}</small></span>
          <button className="icon-button" aria-label="Sign out" title="Sign out" onClick={logout}><LogOut size={17} /></button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar"><span>COMET / ADMIN</span><span className="admin-live"><i /> SYSTEM ONLINE</span></header>
        <div className="admin-content">
          {notice && <div className="admin-notice" role="status">{notice}<button aria-label="Dismiss message" onClick={() => setNotice('')}><X size={15} /></button></div>}
          {activeTab === 'overview' ? (
            <Overview analytics={analytics} range={range} onRange={setRange} onOpenContent={() => setActiveTab('content')} />
          ) : activeTab === 'footer' ? (
            <FooterSettings settings={footerSettings} onSave={saveFooterSettings} busy={footerBusy} />
          ) : (
            <ContentManager
              content={filteredContent} search={search} onSearch={setSearch} editing={editing} form={form}
              setForm={setForm} onNew={startNew} onEdit={startEdit} onSave={saveContent}
              onDelete={deleteContent} busy={busy}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Login({ onSubmit, error }) {
  return (
    <main className="login-shell">
      <div className="login-aside"><a className="admin-wordmark" href="/">COMET</a><div><span className="login-index">01 / CONTROL ROOM</span><h1>Good work<br />moves quietly.</h1><p>Your site, in capable hands.</p></div><span className="login-aside-foot">COMET DIGITAL SYSTEMS</span></div>
      <form className="login-form" onSubmit={onSubmit}>
        <span className="login-index">SUPERADMIN ACCESS</span><h2>Sign in</h2><p>Use your administrator credentials to continue.</p>
        {error && <div className="login-error" role="alert">{error}</div>}
        <label>Email address<input name="email" type="email" autoComplete="username" required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="primary-button" type="submit">Enter control room <ArrowUpRight size={16} /></button>
        <a className="back-home" href="/">Back to website</a>
      </form>
    </main>
  );
}

function Overview({ analytics, range, onRange, onOpenContent }) {
  const daily = analytics?.daily || [];
  const maxVisitors = Math.max(1, ...daily.map((item) => item.visitors));
  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">PERFORMANCE / OVERVIEW</span><h1>Good morning.</h1><p>A clear view of what is happening across your site.</p></div><select aria-label="Analytics period" value={range} onChange={(event) => onRange(Number(event.target.value))}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select></div>
      <section className="metric-grid" aria-label="Website analytics">
        <Metric label="UNIQUE VISITORS" value={analytics?.visitors ?? '—'} caption={`Across the last ${range} days`} />
        <Metric label="PAGE VIEWS" value={analytics?.pageViews ?? '—'} caption="Recorded public page visits" />
        <Metric label="PUBLISHED CONTENT" value={analytics?.publishedCount ?? '—'} caption="Live pages and posts" />
      </section>
      <div className="overview-grid">
        <section className="panel traffic-panel"><div className="panel-heading"><div><span className="eyebrow">AUDIENCE</span><h2>Visitors over time</h2></div><span className="panel-unit">DAILY UNIQUE</span></div>
          {daily.length ? <div className="traffic-chart" role="img" aria-label="Daily unique visitors bar chart">{daily.map((item) => <div className="chart-column" key={item.date} title={`${item.date}: ${item.visitors} visitors`}><span style={{ height: `${Math.max(4, item.visitors / maxVisitors * 100)}%` }} /><small>{new Date(`${item.date}T00:00:00Z`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', timeZone: 'UTC' })}</small></div>)}</div> : <div className="empty-chart">{analytics ? 'No visits recorded for this period yet.' : 'Loading visitor data...'}</div>}
        </section>
        <section className="panel search-panel">
          <div className="panel-heading">
            <div><span className="eyebrow">ORGANIC SEARCH</span><h2>Google page ranking</h2></div>
            {analytics?.googleSearchConsole?.configured ? <span className="live-status"><i />LIVE DATA</span> : <span className="coming-soon">SETUP REQUIRED</span>}
          </div>
          <p>{analytics?.googleSearchConsole?.message || 'Search Console connection is required to show page clicks, impressions, and average position.'}</p>
          <div className="search-metrics">
            <div><strong>{analytics?.googleSearchConsole?.clicks?.toLocaleString() || '—'}</strong><span>CLICKS</span></div>
            <div><strong>{analytics?.googleSearchConsole?.impressions?.toLocaleString() || '—'}</strong><span>IMPRESSIONS</span></div>
            <div><strong>{analytics?.googleSearchConsole?.avgPosition || '—'}</strong><span>AVG. POSITION</span></div>
          </div>
        </section>
      </div>
      <section className="panel popular-panel"><div className="panel-heading"><div><span className="eyebrow">CONTENT</span><h2>Most visited pages</h2></div><button className="text-button" onClick={onOpenContent}>Manage content <ArrowUpRight size={15} /></button></div>
        {analytics?.popularPages?.length ? <div className="table-wrap"><table><thead><tr><th>PAGE</th><th>VISITORS</th><th>PAGE VIEWS</th></tr></thead><tbody>{analytics.popularPages.map((page) => <tr key={page.path}><td>{page.path}</td><td>{page.visitors}</td><td>{page.pageViews}</td></tr>)}</tbody></table></div> : <p className="empty-row">Your most visited pages will appear here when traffic arrives.</p>}
      </section>
    </>
  );
}

function Metric({ label, value, caption }) {
  return <div className="metric-card"><span>{label}</span><strong>{typeof value === 'number' ? value.toLocaleString() : value}</strong><small>{caption}</small></div>;
}

function ContentManager({ content, search, onSearch, editing, form, setForm, onNew, onEdit, onSave, onDelete, busy }) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await apiRequest('/upload', {
        method: 'POST',
        body: formData,
      });
      
      const imageMarkdown = `\n![Image](${response.url})\n`;
      setForm((prev) => ({ ...prev, body: prev.body + imageMarkdown }));
    } catch (error) {
      alert(error.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(false);
      event.target.value = null; // Reset input
    }
  }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">PUBLISHING / LIBRARY</span><h1>Pages & posts</h1><p>Write, review, and publish website content.</p></div><button className="primary-button" onClick={onNew}><Plus size={17} /> New content</button></div>
      <div className="content-layout">
        <section className="panel content-list"><div className="list-toolbar"><div className="search-input"><Search size={16} /><input aria-label="Search content" placeholder="Search pages and posts" value={search} onChange={(event) => onSearch(event.target.value)} /></div><span>{content.length} ITEMS</span></div>
          {content.length ? content.map((record) => <article className={`content-row ${editing === record._id ? 'selected' : ''}`} key={record._id}><button className="content-select" onClick={() => onEdit(record)}><span className="content-type">{record.type === 'page' ? 'PAGE' : 'POST'}<i className={record.status} />{record.status}</span><strong>{record.title}</strong><small>/{record.slug}</small><small className="search-position" title={record.gscPosition ? "Average Google search position" : "Connect Google Search Console to show this page's average search position"}>GOOGLE POSITION <b style={{ color: record.gscPosition ? '#22c55e' : 'inherit' }}>{record.gscPosition || '—'}</b></small></button><button className="row-delete" title={`Delete ${record.title}`} aria-label={`Delete ${record.title}`} onClick={() => onDelete(record._id)}><Trash2 size={16} /></button></article>) : <p className="empty-row">No content yet. Create a page or post to get started.</p>}
        </section>
        <form className="panel editor-panel" onSubmit={onSave}>
          <div className="panel-heading"><div><span className="eyebrow">{editing ? 'EDIT CONTENT' : 'NEW ENTRY'}</span><h2>{editing ? 'Update content' : 'Create content'}</h2></div>{editing && <button type="button" className="icon-button" title="New content" aria-label="New content" onClick={onNew}><Plus size={17} /></button>}</div>
          <label>Title<input required maxLength="160" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
          <label>URL slug<div className="slug-field"><span>/content/</span><input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/\s+/g, '-') })} /></div></label>
          <div className="form-pair"><label>Type<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option value="page">Page</option><option value="post">Post</option></select></label><label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
          <label>Summary<textarea rows="2" maxLength="500" value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} /></label>
          <label>
            <div className="flex items-center justify-between mb-2">
              <span>Content</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowPreview((p) => !p)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', background: 'none', border: 'none', color: '#559277', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {showPreview ? <EyeOff size={14} /> : <Eye size={14} />} {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', background: 'none', border: 'none', color: '#ff4500', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  <ImageIcon size={14} /> {uploadingImage ? 'Uploading...' : 'Insert Image'}
                </button>
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageUpload} 
            />
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
            {showPreview ? (
              <div className="content-body" style={{ border: '1px solid #dce3de', borderRadius: '3px', padding: '12px', minHeight: '180px', background: '#fff', fontSize: '14px' }}>
                <ReactMarkdown
                  components={{
                    p: ({ node, children }) => {
                      const hasOnlyImage = node.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'img';
                      if (hasOnlyImage) return <>{children}</>;
                      return <p>{children}</p>;
                    },
                    img: ({ src, alt }) => (
                      <figure className="content-figure"><img src={src} alt={alt || 'Image'} loading="lazy" />{alt && alt !== 'Image' && <figcaption>{alt}</figcaption>}</figure>
                    ),
                  }}
                >{form.body || '*Nothing to preview yet…*'}</ReactMarkdown>
              </div>
            ) : (
              <textarea rows="8" maxLength="100000" value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} />
            )}
          </label>
          <details className="seo-fields"><summary>Search appearance</summary><label>SEO title<input maxLength="180" value={form.seoTitle} onChange={(event) => setForm({ ...form, seoTitle: event.target.value })} /></label><label>Meta description<textarea rows="2" maxLength="320" value={form.seoDescription} onChange={(event) => setForm({ ...form, seoDescription: event.target.value })} /></label></details>
          <div className="editor-actions">{form.status === 'published' && form.slug && <a className="preview-link" href={`/content/${encodeURIComponent(form.slug)}`} target="_blank" rel="noreferrer">Preview <ArrowUpRight size={14} /></a>}<button className="primary-button" type="submit" disabled={busy}>{busy ? 'Saving...' : form.status === 'published' ? 'Publish' : 'Save draft'} <ArrowUpRight size={16} /></button></div>
        </form>
      </div>
    </>
  );
}

function FooterSettings({ settings, onSave, busy }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (settings) setForm({ ...settings });
  }, [settings]);

  if (!form) return <div className="empty-row">Loading footer settings...</div>;

  function updateItem(idx, val) {
    const items = [...(form.footerItems || [])];
    items[idx] = val;
    setForm({ ...form, footerItems: items });
  }
  function addItem() { setForm({ ...form, footerItems: [...(form.footerItems || []), ''] }); }
  function removeItem(idx) { setForm({ ...form, footerItems: (form.footerItems || []).filter((_, i) => i !== idx) }); }
  function updateLink(idx, field, val) {
    const links = [...(form.footerLinks || [])];
    links[idx] = { ...links[idx], [field]: val };
    setForm({ ...form, footerLinks: links });
  }
  function addLink() { setForm({ ...form, footerLinks: [...(form.footerLinks || []), { label: '', href: '' }] }); }
  function removeLink(idx) { setForm({ ...form, footerLinks: (form.footerLinks || []).filter((_, i) => i !== idx) }); }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">SITE / FOOTER</span><h1>Footer settings</h1><p>Edit the footer content visible to all website visitors.</p></div></div>
      <div className="panel editor-panel" style={{ maxWidth: '680px' }}>
        <div className="panel-heading"><div><span className="eyebrow">DEMO BOX</span><h2>Free demo section</h2></div></div>
        <label>Section title<input value={form.footerTitle || ''} onChange={(e) => setForm({ ...form, footerTitle: e.target.value })} /></label>
        <label>CTA button label<input value={form.footerCtaLabel || ''} onChange={(e) => setForm({ ...form, footerCtaLabel: e.target.value })} /></label>
        <label>CTA button link<input value={form.footerCtaHref || ''} onChange={(e) => setForm({ ...form, footerCtaHref: e.target.value })} /></label>
        <label>Offer items
          {(form.footerItems || []).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <input value={item || ''} onChange={(e) => updateItem(idx, e.target.value)} style={{ flex: 1 }} />
              <button type="button" className="row-delete" onClick={() => removeItem(idx)}><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" className="text-button" onClick={addItem} style={{ marginTop: '4px' }}><Plus size={13} /> Add item</button>
        </label>
        <div className="panel-heading" style={{ marginTop: '16px' }}><div><span className="eyebrow">BOTTOM BAR</span><h2>Footer links &amp; info</h2></div></div>
        <label>Copyright text<input value={form.footerCopyright} onChange={(e) => setForm({ ...form, footerCopyright: e.target.value })} /></label>
        <label>Address<input value={form.footerAddress} onChange={(e) => setForm({ ...form, footerAddress: e.target.value })} /></label>
        <label>Footer links
          {(form.footerLinks || []).map((link, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <input placeholder="Label" value={link.label} onChange={(e) => updateLink(idx, 'label', e.target.value)} style={{ flex: 1 }} />
              <input placeholder="URL" value={link.href} onChange={(e) => updateLink(idx, 'href', e.target.value)} style={{ flex: 2 }} />
              <button type="button" className="row-delete" onClick={() => removeLink(idx)}><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" className="text-button" onClick={addLink} style={{ marginTop: '4px' }}><Plus size={13} /> Add link</button>
        </label>
        <div className="editor-actions">
          <button className="primary-button" type="button" disabled={busy} onClick={() => onSave(form)}>
            {busy ? 'Saving...' : 'Save footer'} <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}