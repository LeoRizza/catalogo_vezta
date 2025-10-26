import { Filters } from "./filtering";
const KEYS: (keyof Filters)[] = ["q","brand","origin","category","subcategory"];

export function readFiltersFromURL(): Filters {
  const sp = new URLSearchParams(window.location.search);
  const f: Filters = {};
  KEYS.forEach(k => {
    const v = sp.get(k);
    if (v && v.trim() !== "") (f as any)[k] = v;
  });
  return f;
}
export function writeFiltersToURL(f: Filters) {
  const sp = new URLSearchParams();
  for (const k of KEYS) {
    const v = (f as any)[k];
    if (v && String(v).trim() !== "") sp.set(k, String(v));
  }
  const qs = sp.toString();
  const url = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState({}, "", url);
}
