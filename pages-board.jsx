// pages-board.jsx — Send Me Project board (content-driven; order set in content.jsx)

function Headshot({ p }) {
  // Real photo → fixed image. Otherwise a drag-to-fill slot with initials hint.
  if (p.photo) {
    return (
      <div className="person-photo" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--navy-2)' }}>
        <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 28%', display: 'block' }} />
      </div>
    );
  }
  return (
    <div className="person-photo" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'var(--navy)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 0,
        fontFamily: 'var(--font-head)', fontSize: 64, fontWeight: 600, color: 'rgba(216,190,126,0.45)' }}>{p.initials}</div>
      <image-slot
        id={'board-' + p.id}
        shape="rect"
        fit="cover"
        placeholder={'Drop ' + p.name.split(' ')[0] + '\u2019s headshot'}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      ></image-slot>
    </div>
  );
}

function PersonCard({ p }) {
  return (
    <article className="card reveal" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Headshot p={p} />
      <div style={{ padding: 'clamp(24px,3vw,32px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: 23, fontWeight: 700, color: 'var(--navy)' }}>{p.name}</h3>
        <div className="eyebrow" style={{ marginTop: 7, fontSize: 11.5 }}>{p.role}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, color: 'var(--gold-deep)' }}>
          <span style={{ flex: 'none', marginTop: 2 }}><Icon name="quote" size={19} stroke={1.6} /></span>
          <p className="font-head" style={{ fontStyle: 'italic', fontSize: 18, color: 'var(--navy)', margin: 0, lineHeight: 1.32 }}>{p.quote}</p>
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginTop: 16, marginBottom: 0, lineHeight: 1.58, flex: 1 }}>{p.bio}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
          {p.tags.map((tg) => (
            <span key={tg} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ink-soft)',
              background: 'var(--ivory)', border: '1px solid var(--line)', borderRadius: 20, padding: '5px 12px' }}>{tg}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function BoardPage({ lang }) {
  useReveal();
  const c = useContent();
  const board = c.board || [];
  return (
    <div className="page-enter">
      <PageHero eyebrow="Our Team" title="Know who is leading — and why they joined" slotId="board"
        sub="Send Me Project is led by people who chose to respond with compassion, action, and purpose. Get to know the team behind the mission." />

      <section className="section paper-bg">
        <div className="wrap-wide">
          <SectionHead eyebrow="Board of Directors" title="Leadership with purpose" />
          <div className="board-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
            {board.map((p) => <PersonCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* join the board CTA */}
      <section className="section navy-bg">
        <div className="wrap center">
          <div className="eyebrow on-navy" style={{ marginBottom: 16 }}>Build with us</div>
          <h2 className="display-md" style={{ color: 'var(--on-navy)', maxWidth: '22ch', margin: '0 auto 18px' }}>
            Want to lend your expertise to the mission?
          </h2>
          <p className="lede on-navy" style={{ margin: '0 auto 30px', maxWidth: '44ch' }}>
            We&rsquo;re building a board and team of compassionate, skilled people. If that&rsquo;s you, we&rsquo;d love to connect.
          </p>
          <a href="#/contact" className="btn btn-gold btn-lg"><Icon name="mail" size={18} /> Reach out to us</a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { BoardPage });
