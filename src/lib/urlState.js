const KEYS = ["q", "brand", "origin", "category", "subcategory"];

export function readFiltersFromURL() {
  const sp = new URLSearchParams(window.location.search);
  const f = {};
  for (const k of KEYS) {
    const v = sp.get(k);
    if (v && v.trim() !== "") f[k] = v;
  }
  return f;
}

export function writeFiltersToURL(f) {
  const sp = new URLSearchParams();
  for (const k of KEYS) {
    const v = f[k];
    if (v && String(v).trim() !== "") sp.set(k, String(v));
  }
  const qs = sp.toString();
  const url = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState({}, "", url);
}
