// pages-home.jsx

function HeroHeadline({ variant }) {
  const cls = 'display-xl';
  const gold = { color: 'var(--gold)' };
  if (variant === 'sendhope') return (
    <h1 className={cls}>Send Hope.<br /><span style={gold}>Fund Impact.</span><br />Change Lives.</h1>);
  if (variant === 'sendme') return (
    <h1 className={cls}>Send Me,<br /><span style={gold}>I&rsquo;ll Go.</span></h1>);
  if (variant === 'local') return (
    <h1 className={cls}>Local Heart.<br /><span style={gold}>Global Impact.</span></h1>);
  if (variant === 'arkansas') return (
    <h1 className={cls}>
      From<br />
      <span style={{ ...gold, fontSize: '1.12em', display: 'inline-block', lineHeight: 0.92 }}>Arkansas</span><br />
      <span style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '0.62em' }}>to the</span><br />
      Nations
    </h1>);
  // rooted (default)
  return (
    <h1 className={cls}>Nationally Rooted.<br /><span style={gold}>Globally Engaged.</span></h1>);
}

// faint world-map dotted motif
function MapMotif({ opacity = 0.5 }) {
  const dots = [];
  const rows = 11,cols = 24;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = c / (cols - 1),y = r / (rows - 1);
    const land = Math.sin(x * 7 + y * 2) + Math.cos(y * 5 - x * 3) > -0.2 && Math.random() > 0.32;
    if (land) dots.push(<circle key={r + '-' + c} cx={20 + c * 19} cy={20 + r * 17} r={1.7} />);
  }
  return (
    <svg viewBox="0 0 480 210" style={{ width: '100%', height: '100%', opacity }} aria-hidden="true">
      <g fill="var(--gold)">{dots}</g>
    </svg>);
}

function Hero({ t, layout, variant }) {
  const c = useContent();
  const ctas =
  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36, pointerEvents: 'auto' }}>
      <a href="#/donate" className="btn btn-gold btn-lg"><Icon name="heart" size={18} /> {t('give')}</a>
      <a href="#/involved" className="btn btn-ghost-light btn-lg">{t('cta_involved')} <Icon name="arrow" size={17} /></a>
    </div>;
  const sub = <p className="lede on-navy" style={{ marginTop: 26, maxWidth: '42ch' }}>{c.home.heroSub}</p>;
  const eyebrow = <div className="eyebrow on-navy" style={{ marginBottom: 22 }}>{c.home.heroEyebrow}</div>;

  const bgSlot =
  <img src="assets/hero-children.png" alt="Send Me Project delivering aid to children abroad"
  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%', zIndex: 0 }} />;

  if (layout === 'centered') {
    return (
      <section className="navy-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        {bgSlot}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(10,24,56,0.86) 0%, rgba(10,24,56,0.8) 100%)' }}></div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}><MapMotif opacity={0.14} /></div>
        <div className="wrap center" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', padding: 'clamp(72px,11vw,150px) 28px' }}>
          <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}><Emblem size={92} /></div>
          {eyebrow}
          <div style={{ display: 'flex', justifyContent: 'center' }}><HeroHeadline variant={variant} /></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>{sub}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>{ctas}</div>
        </div>
      </section>);
  }

  if (layout === 'fullbleed') {
    return (
      <section className="navy-bg" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center' }}>
        {bgSlot}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(100deg, var(--navy) 30%, rgba(10,24,56,0.82) 58%, rgba(10,24,56,0.5) 100%)' }}></div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', padding: '90px 28px' }}>
          {eyebrow}
          <HeroHeadline variant={variant} />
          {sub}{ctas}
        </div>
      </section>);
  }

  // split (default)
  return (
    <section className="navy-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="hero-split wrap-wide" style={{
        display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', alignItems: 'center',
        gap: 48, padding: 'clamp(60px,8vw,110px) 28px'
      }}>
        <div>
          {eyebrow}
          <HeroHeadline variant={variant} />
          {sub}{ctas}
        </div>
        <div style={{ position: 'relative', minHeight: 420 }}>
          <div style={{ position: 'absolute', inset: '-8% -4%', zIndex: 0, opacity: 0.9, pointerEvents: 'none' }}><MapMotif opacity={0.22} /></div>
          <div style={{ position: 'relative', zIndex: 1, height: '100%', minHeight: 420, padding: 14,
            border: '1px solid var(--on-navy-line)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
            <img src="assets/hero-children.png" alt="Send Me Project delivering aid to children abroad"
            style={{ display: 'block', width: '100%', height: '100%', minHeight: 392, objectFit: 'cover', objectPosition: '50% 45%', borderRadius: 6 }} />
            <div style={{ position: 'absolute', bottom: -18, right: -18, width: 76, height: 76, borderRadius: '50%',
              background: 'var(--navy)', border: '1px solid var(--gold)', display: 'grid', placeItems: 'center',
              boxShadow: '0 10px 30px rgba(10,24,56,0.5)' }}>
              <Emblem size={50} />
            </div>
          </div>
        </div>
      </div>
    </section>);
}

const PILLARS = [
['serve', 'Serve', 'Meeting needs with compassion and dignity.'],
['empower', 'Empower', 'Strengthening people and communities.'],
['reach', 'Reach', 'Working together to reach the nations.'],
['partner', 'Partner', 'Building trusted partnerships for lasting change.'],
['transform', 'Transform', 'Creating pathways for a better future.']];

function HomePage({ t, tweaks, lang }) {
  useReveal();
  const c = useContent();
  const feature = c.regions.filter((r) => r.id === 'brazil' || r.id === 'uganda');
  return (
    <div className="page-enter">
      <Hero t={t} layout={tweaks.heroLayout} variant={tweaks.heroVariant} />

      {/* pillars band */}
      <section style={{ background: 'var(--navy-2)', borderTop: '1px solid var(--on-navy-line)' }}>
        <div className="wrap-wide" style={{ padding: 'clamp(48px,6vw,72px) 28px' }}>
          <div className="center" style={{ marginBottom: 44 }}>
            <span className="font-display" style={{ fontSize: 'clamp(20px,2.4vw,30px)', letterSpacing: '0.16em',
              color: 'var(--gold-soft)', textTransform: 'uppercase' }}>{c.home.pillarsBanner}</span>
          </div>
          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 28 }}>
            {PILLARS.map((p) => <div key={p[1]} className="reveal"><Pillar icon={p[0]} title={p[1]} body={p[2]} light /></div>)}
          </div>
        </div>
      </section>

      {/* mission intro */}
      <section className="section paper-bg">
        <div className="wrap mission-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
          <div className="reveal home-mission-copy">
            <div className="eyebrow" style={{ marginBottom: 16 }}>Our Mission</div>
            <hr className="divider-gold" />
            <h2 className="display-lg" style={{ color: 'var(--navy)' }}>{c.home.missionHeading}</h2>
            <p className="lede" style={{ marginTop: 22 }}>{c.home.missionBody1}</p>
            <p className="lede">{c.home.missionBody2}</p>
            <a href="#/about" className="btn btn-ghost" style={{ marginTop: 14 }}>{t('cta_story')} <Icon name="arrow" size={16} /></a>
          </div>
          <div className="reveal" style={{ background: '#fff', border: '1px solid var(--line)', borderLeft: '3px solid var(--gold)',
            borderRadius: 'var(--radius)', padding: 'clamp(28px,4vw,44px)', boxShadow: 'var(--shadow-soft)' }}>
            <Scripture light={false} verse={c.home.quote} cite={c.home.quoteCite} />
          </div>
        </div>
      </section>

      {/* where we work */}
      <section className="section ivory-bg">
        <div className="wrap-wide">
          <SectionHead eyebrow="Where We Work" title={c.home.wwTitle} center sub={c.home.wwSub} />
          <div className="ww-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <FieldCard region="Brazil · South America" flag="BR" title="Community Feeding & Child Outreach"
            img="assets/hero-children.png"
            body="Pursuing funding for a long-standing community feeding initiative providing 3,000+ meals every month, alongside clothing support for children and infants — in partnership with Rick Bonfim Ministries."
            tag="Active initiative" stat="3,000+" statLabel="meals / month (goal)" />
            <FieldCard region="Uganda · East Africa" flag="UG" title="Humanitarian Relief Initiative"
            img="assets/story-hands.png"
            body="One of our first humanitarian outreach seeds in Africa — emergency food support, housing assistance, and immediate stabilization for a family in crisis, verified through trusted contacts on the ground."
            tag="Relief delivered" stat="1st" statLabel="outreach into Africa" />
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <a href="#/projects" className="btn btn-navy">Explore where we work <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </section>

      {/* impact */}
      <section className="section navy-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}><MapMotif opacity={0.08} /></div>
        <div className="wrap" style={{ position: 'relative' }}>
          <SectionHead light eyebrow={c.home.impactEyebrow} center title={c.home.impactTitle} sub={c.home.impactSub} />
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {c.transparency.stats.map((s, i) => (
              <StatBox key={i} value={s[0]} label={s[1]} />
            ))}
          </div>
          <div className="center" style={{ marginTop: 44 }}>
            <a href="#/financials" className="btn btn-ghost-light"><Icon name="shield" size={17} /> See our transparency commitment</a>
          </div>
        </div>
      </section>

      {/* two ways to get involved */}
      <section className="section paper-bg">
        <div className="wrap-wide">
          <SectionHead eyebrow="Two Ways to Get Involved" center title="Help send, or be sent" />
          <div className="involve-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <InvolveCard num="1" icon="box" title="Help Send"
            tagline="Every gift. Every connection. Every action counts."
            points={['Provide humanitarian aid &amp; essential supplies', 'Make financial contributions', 'Establish strategic partnerships', 'Volunteer professional expertise']} />
            <InvolveCard num="2" icon="plane" title="Be Sent"
            tagline="Say &lsquo;Send Me,&rsquo; and we&rsquo;ll go together."
            points={['Join humanitarian outreach projects', 'Serve on domestic &amp; international teams', 'Support disaster relief efforts', 'Contribute your skills &amp; leadership']} />
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <a href="#/involved" className="btn btn-navy">{t('cta_involved')} <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </section>

      <CTABand lang={lang} />
    </div>);
}

function FieldCard({ region, flag, title, body, tag, stat, statLabel, img }) {
  return (
    <article className="card reveal" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        {img
          ? <img src={img} alt={title} style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block' }} />
          : <Placeholder label={`${flag} · field photo`} h={210} radius="0" />}
        <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', color: 'var(--navy)',
          fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '6px 12px', borderRadius: 3 }}>{tag}</span>
      </div>
      <div style={{ padding: 'clamp(24px,3vw,34px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 12 }}>{region}</div>
        <h3 className="display-md" style={{ color: 'var(--navy)', marginBottom: 14 }}>{title}</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, flex: 1 }} dangerouslySetInnerHTML={{ __html: body }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 38, fontWeight: 600, color: 'var(--gold-deep)', lineHeight: 1 }}>{stat}</span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{statLabel}</span>
        </div>
      </div>
    </article>);
}

function StatBox({ value, label, note }) {
  return (
    <div className="reveal" style={{ borderTop: '2px solid var(--gold)', paddingTop: 20 }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(40px,5vw,58px)', fontWeight: 600,
        color: 'var(--gold-soft)', lineHeight: 1 }}>{value}</div>
      <div style={{ color: 'var(--on-navy)', fontWeight: 600, fontSize: 15, marginTop: 12 }} dangerouslySetInnerHTML={{ __html: label }} />
      {note && <div style={{ color: 'var(--on-navy-soft)', fontSize: 13.5, marginTop: 5 }} dangerouslySetInnerHTML={{ __html: note }} />}
    </div>);
}

function InvolveCard({ num, icon, title, tagline, points }) {
  return (
    <article className="card reveal" style={{ padding: 'clamp(28px,4vw,40px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)',
          display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name={icon} size={26} stroke={1.8} /></div>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 30, fontWeight: 600, color: 'var(--gold-deep)', lineHeight: 0.9 }}>{num}.</div>
          <h3 className="font-display" style={{ fontSize: 20, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)' }}>{title}</h3>
        </div>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {points.map((p, i) =>
        <li key={i} style={{ display: 'flex', gap: 11, fontSize: 15.5, color: 'var(--ink-soft)' }}>
            <span style={{ color: 'var(--gold-deep)', flex: 'none', marginTop: 3 }}><Icon name="check" size={17} /></span>
            <span dangerouslySetInnerHTML={{ __html: p }} />
          </li>
        )}
      </ul>
      <div style={{ background: 'var(--navy)', color: 'var(--gold-soft)', borderRadius: 'var(--radius)',
        padding: '14px 18px', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: 17, textAlign: 'center' }}>
        {tagline}
      </div>
    </article>);
}

Object.assign(window, { HomePage });
