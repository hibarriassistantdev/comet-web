import { useEffect } from 'react';

let trackedPageview = false;

export function usePageviewTracking() {
  useEffect(() => {
    const path = window.location.pathname;
    if (trackedPageview || path === '/admin' || path.startsWith('/admin/')) return;
    trackedPageview = true;

    let visitorId = window.localStorage.getItem('comet_visitor_id');
    if (!visitorId) {
      visitorId = window.crypto.randomUUID();
      window.localStorage.setItem('comet_visitor_id', visitorId);
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, path }),
      keepalive: true,
    }).catch(() => {});
  }, []);
}