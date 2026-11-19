export function SearchForm({ compact = false, initialValue = '' }: { compact?: boolean; initialValue?: string }) {
  return (
    <form action="/buscar" method="get" className={`search-form${compact ? ' search-form-compact' : ''}`} role="search">
      <label className="sr-only" htmlFor={compact ? 'site-search-small' : 'site-search'}>Buscar guías de GTA 6</label>
      <span className="search-symbol" aria-hidden="true">⌕</span>
      <input id={compact ? 'site-search-small' : 'site-search'} type="search" name="q" placeholder="Busca fecha, PC, mapa, precio…" defaultValue={initialValue} autoComplete="off" />
      <button type="submit">Buscar <span aria-hidden="true">↗</span></button>
    </form>
  );
}
