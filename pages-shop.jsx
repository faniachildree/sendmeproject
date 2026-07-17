// pages-shop.jsx

function ShopPage({ lang }) {
  useReveal();
  const c = useContent();
  const s = c.shop;
  return (
    <div className="page-enter">
      <PageHero eyebrow="Shop" title={s.heroTitle} slotId="shop" sub={s.heroSub} />

      <section className="section paper-bg">
        <div className="wrap-wide">
          {/* honest launching-soon note */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            background: 'rgba(198,162,76,0.1)', border: '1px solid var(--line-gold)', borderRadius: 'var(--radius)',
            marginBottom: 44, fontSize: 14.5, color: 'var(--ink-soft)' }}>
            <Icon name="cart" size={20} stroke={1.8} />
            <span>{s.note}</span>
          </div>

          <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {(s.products || []).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* proceeds band */}
      <section className="section-sm navy-bg" style={{ borderTop: '1px solid var(--on-navy-line)' }}>
        <div className="wrap center">
          <span className="font-head" style={{ fontStyle: 'italic', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--on-navy)' }}>
            Every purchase helps <span style={{ color: 'var(--gold-soft)' }}>send hope to the nations.</span>
          </span>
        </div>
      </section>

      <CTABand lang={lang} />
    </div>
  );
}

function ProductCard({ p }) {
  return (
    <article className="card reveal" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--ivory-2)' }}>
        {p.img
          ? <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div className="ph light" style={{ position: 'absolute', inset: 0, borderRadius: 0 }}><span className="ph-label">product photo</span></div>}
        {p.tag && <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--navy)', color: 'var(--gold-soft)',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '5px 11px', borderRadius: 3 }}>{p.tag}</span>}
      </div>
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{p.name}</h3>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 600, color: 'var(--gold-deep)', flex: 'none' }}>{p.price}</span>
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginTop: 10, marginBottom: 0, flex: 1 }}>{p.desc}</p>
        <button className="btn btn-navy" style={{ marginTop: 18, justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>
          <Icon name="cart" size={16} /> Notify me
        </button>
      </div>
    </article>
  );
}

Object.assign(window, { ShopPage });
