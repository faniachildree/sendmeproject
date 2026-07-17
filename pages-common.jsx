// pages-common.jsx — shared inner-page header

function PageHero({ eyebrow, title, sub, align = 'left', slotId }) {
  const center = align === 'center';
  return (
    <section className="navy-bg" style={{ position: 'relative', overflow: 'hidden', borderBottom: '3px solid var(--gold)' }}>
      {/* hero image slot — drag a photo to fill; navy overlay keeps text readable */}
      {slotId && (
        <image-slot
          id={'hero-' + slotId}
          shape="rect" fit="cover"
          placeholder="Drop a hero image"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        ></image-slot>
      )}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: center
          ? 'linear-gradient(180deg, rgba(10,24,56,0.82) 0%, rgba(10,24,56,0.74) 100%)'
          : 'linear-gradient(90deg, rgba(10,24,56,0.92) 0%, rgba(10,24,56,0.82) 55%, rgba(10,24,56,0.62) 100%)' }}></div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}><MapMotif opacity={0.07} /></div>
      <div className="wrap" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', padding: 'clamp(56px,8vw,104px) 28px', textAlign: center ? 'center' : 'left' }}>
        <div className="eyebrow on-navy" style={{ marginBottom: 18 }}>{eyebrow}</div>
        <hr className={'divider-gold' + (center ? ' center' : '')} />
        <h1 className="display-lg" style={{ color: 'var(--on-navy)', maxWidth: center ? '20ch' : '18ch', marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>{title}</h1>
        {sub && <p className="lede on-navy" style={{ marginTop: 22, maxWidth: '52ch', marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>{sub}</p>}
      </div>
    </section>
  );
}

// small labelled value-prop row
function ValueRow({ icon, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 18 }}>
      <div style={{ width: 50, height: 50, flex: 'none', borderRadius: '50%', background: 'var(--navy)',
        color: 'var(--gold)', display: 'grid', placeItems: 'center' }}><Icon name={icon} size={22} stroke={1.8} /></div>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{title}</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, margin: 0 }} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}

Object.assign(window, { PageHero, ValueRow });
