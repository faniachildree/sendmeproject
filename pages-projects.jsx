// pages-projects.jsx

// ---- shared equirectangular frame (lon/lat -> % of the 16:9 panel) ----
// Both the drawn coastlines and the location pins use this exact frame, so a
// marker placed by real lon/lat always sits on the right piece of coastline.
// viewBox space is x=(lon+180), y=(90-lat); the crop below is 16:9 so the
// map fills the panel with no distortion or letterboxing.
const MAP_VB = { x: 12, y: -23, w: 353, h: 198.5 }; // 353/198.5 ≈ 16:9
const lonToPct = (lon) => ((lon + 180) - MAP_VB.x) / MAP_VB.w * 100;
const latToPct = (lat) => ((90 - lat) - MAP_VB.y) / MAP_VB.h * 100;

const REGIONS = [
{
  id: 'arkansas', name: 'Arkansas, USA', flag: 'US', kind: 'Home Base', status: 'Active',
  lon: -92.3, lat: 34.7,
  headline: 'Nationally rooted',
  body: 'Our home base, where supplies are gathered, partnerships are built, and teams are mobilized. Outreach teams prepare humanitarian aid shipments and assemble clothing and essentials for vulnerable communities abroad.',
  facts: [['Local', 'Resource mobilization &amp; team prep'], ['Role', 'Sending hub for global outreach']]
},
{
  id: 'brazil', name: 'Brazil', flag: 'BR', kind: 'Active Initiative', status: 'Funding',
  lon: -49, lat: -13,
  headline: 'Community feeding & child outreach',
  body: 'We are pursuing funding for a long-standing community feeding initiative providing approximately 3,000+ meals every month, and preparing humanitarian aid shipments providing clothing support for underprivileged children and infants — in partnership with Rick Bonfim Ministries.',
  facts: [['Goal', '3,000+ meals every month'], ['Focus', 'Clothing for children &amp; infants'], ['Partner', 'Rick Bonfim Ministries']]
},
{
  id: 'uganda', name: 'Uganda', flag: 'UG', kind: 'Relief Delivered', status: 'Active',
  lon: 32.5, lat: 1.3,
  headline: 'Humanitarian relief initiative',
  body: 'One of our first humanitarian outreach seeds planted into Africa. After verifying a family\u2019s crisis through trusted contacts on the ground, the board approved emergency assistance — providing food support, housing assistance, and immediate stabilization for the children and family.',
  facts: [['Provided', 'Food, housing &amp; stabilization'], ['Verified', 'Trusted contacts on the ground'], ['Milestone', 'First outreach into Africa']]
}];


function WorldMap({ active }) {
  const proj = ([lon, lat]) => `${(lon + 180).toFixed(2)},${(90 - lat).toFixed(2)}`;
  const poly = (pts) => 'M' + pts.map(proj).join('L') + 'Z';
  const lands = (typeof window !== 'undefined' && window.LANDMASSES) || [];
  // graticule
  const grats = [];
  for (let lon = 0; lon <= 360; lon += 30) grats.push(<line key={'v' + lon} x1={lon} y1="-30" x2={lon} y2="190" />);
  for (let lat = 30; lat <= 150; lat += 30) grats.push(<line key={'h' + lat} x1="0" y1={lat} x2="360" y2={lat} />);
  return (
    <svg viewBox={`${MAP_VB.x} ${MAP_VB.y} ${MAP_VB.w} ${MAP_VB.h}`} preserveAspectRatio="none" aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <g stroke="var(--gold)" strokeWidth="0.22" opacity="0.12">{grats}</g>
      <g fill="rgba(216,190,126,0.22)" stroke="var(--gold-soft)" strokeWidth="0.4"
      strokeLinejoin="round" strokeLinecap="round" opacity="0.95">
        {lands.map((c, i) => <path key={i} d={poly(c)} />)}
      </g>
    </svg>);

}

function ProjectsPage({ lang }) {
  useReveal();
  const c = useContent();
  const regions = c.regions || [];
  const [active, setActive] = React.useState('brazil');
  const region = regions.find((r) => r.id === active) || regions[0];
  if (!region) return null;

  return (
    <div className="page-enter">
      <PageHero eyebrow="Where We Work" title="Nationally Rooted. Globally Engaged." slotId="projects"
      sub="Local heart, Arkansas roots, global impact. Explore where Send Me Project is serving today — and where we&rsquo;re headed next." />

      <section className="section paper-bg">
        <div className="wrap-wide">
          <div className="proj-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,5vw,64px)', alignItems: 'start' }}>
            {/* map + selector */}
            <div className="reveal">
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius)', padding: 'clamp(20px,3vw,32px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                  <WorldMap active={active} />
                  {regions.map((r) => {
                    const on = r.id === active;
                    const px = lonToPct(r.lon),py = latToPct(r.lat);
                    return (
                      <div key={r.id} style={{ position: 'absolute', left: px + '%', top: py + '%',
                        transform: 'translate(-50%,-50%)', zIndex: on ? 3 : 2 }}>
                        <button onClick={() => setActive(r.id)} aria-label={r.name} style={{
                          position: 'relative', display: 'block',
                          width: on ? 20 : 13, height: on ? 20 : 13, borderRadius: '50%',
                          background: on ? 'var(--gold)' : 'var(--gold-soft)',
                          border: '2px solid var(--navy)', cursor: 'pointer', padding: 0,
                          boxShadow: on ? '0 0 0 6px rgba(198,162,76,0.28)' : '0 1px 4px rgba(0,0,0,0.4)',
                          transition: 'all .25s'
                        }} />
                        <span style={{
                          position: 'absolute', left: '50%', top: 'calc(100% + 5px)', transform: 'translateX(-50%)',
                          whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontSize: 10.5, fontWeight: 600,
                          letterSpacing: '0.1em', textTransform: 'uppercase', pointerEvents: 'none',
                          color: on ? 'var(--gold-soft)' : 'rgba(244,241,233,0.62)',
                          textShadow: '0 1px 4px rgba(6,15,38,0.9)'
                        }}>{r.flag === 'US' ? 'Arkansas' : r.name}</span>
                      </div>);

                  })}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
                {regions.map((r) => {
                  const on = r.id === active;
                  return (
                    <button key={r.id} onClick={() => setActive(r.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left',
                      padding: '14px 18px', borderRadius: 'var(--radius)', cursor: 'pointer',
                      background: on ? '#fff' : 'transparent',
                      border: `1px solid ${on ? 'var(--gold)' : 'var(--line)'}`,
                      boxShadow: on ? 'var(--shadow-soft)' : 'none', transition: 'all .2s'
                    }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
                        color: 'var(--gold-deep)', width: 28 }}>{r.flag}</span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{r.name}</span>
                        <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{r.kind}</span>
                      </span>
                      <StatusPill status={r.status} />
                    </button>);

                })}
              </div>
            </div>

            {/* detail */}
            <div className="reveal" style={{ position: 'sticky', top: 100 }}>
              <Placeholder label={`${region.flag} · ${region.name} · field photo`} h={260} />
              <div style={{ paddingTop: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <div className="eyebrow" style={{ fontSize: 12 }}>{region.name} · {region.kind}</div>
                  <StatusPill status={region.status} />
                </div>
                <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: 16 }}>{region.headline}</h2>
                <p className="lede" style={{ fontSize: 17 }} dangerouslySetInnerHTML={{ __html: region.body }} />
                <div style={{ display: 'grid', gap: 1, background: 'var(--line)', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 22 }}>
                  {region.facts.map((f, i) =>
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, background: '#fff', padding: '14px 18px' }}>
                      <span className="font-display" style={{ fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-deep)', paddingTop: 2 }}>{f[0]}</span>
                      <span style={{ fontSize: 15, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: f[1] }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* dignity band */}
      <section className="section-sm navy-bg" style={{ borderTop: '1px solid var(--on-navy-line)' }}>
        <div className="wrap center">
          <span className="font-head" style={{ fontStyle: 'italic', fontSize: 'clamp(22px,3vw,32px)', color: 'var(--on-navy)' }}>
            Every item sent represents <span style={{ color: 'var(--gold-soft)' }}>dignity, compassion, and hope.</span>
          </span>
        </div>
      </section>

      {/* anyone anywhere */}
      <section className="section ivory-bg">
        <div className="wrap center">
          <div style={{ color: 'var(--gold-deep)', display: 'flex', justifyContent: 'center', marginBottom: 18 }}><Icon name="globe" size={40} stroke={1.4} /></div>
          <h2 className="display-md" style={{ color: 'var(--navy)', maxWidth: '24ch', margin: '0 auto 16px' }}>
            A need anywhere can reach us from anywhere.
          </h2>
          <p className="lede" style={{ margin: '0 auto 30px', maxWidth: '50ch' }}>
            Whether you&rsquo;re reaching out from across town or across the world, our team listens, verifies, and responds responsibly.
          </p>
          <a href="#/contact" className="btn btn-navy btn-lg"><Icon name="mail" size={18} /> Tell us about a need</a>
        </div>
      </section>

      <CTABand lang={lang} />
    </div>);

}

function StatusPill({ status }) {
  const map = {
    'Active': ['rgba(31,138,91,0.14)', '#1f7a52'],
    'Funding': ['rgba(198,162,76,0.18)', 'var(--gold-deep)'],
    'Planning': ['rgba(20,48,95,0.12)', 'var(--navy-3)']
  };
  const [bg, fg] = map[status] || ['var(--ivory-2)', 'var(--ink-soft)'];
  return (
    <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase', padding: '5px 10px', borderRadius: 20, flex: 'none' }}>{status}</span>);

}

Object.assign(window, { ProjectsPage });