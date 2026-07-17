// components.jsx — shared chrome + building blocks

const ROUTES = [
  { path: 'about',      key: 'nav_about' },
  { path: 'projects',   key: 'nav_projects' },
  { path: 'involved',   key: 'nav_involved' },
  { path: 'board',      key: 'nav_board' },
  { path: 'pictures',   key: 'nav_pictures' },
  { path: 'shop',       key: 'nav_shop' },
  { path: 'financials', key: 'nav_financials' },
  { path: 'contact',    key: 'nav_contact' },
];

function go(path) { window.location.hash = '#/' + path; }

// ---------------- Scroll reveal ----------------
// Entrance is pure CSS (.reveal animates once on mount and always ends visible).
// Kept as a no-op so existing page calls stay valid and React can never re-hide content.
function useReveal() { /* CSS-driven; intentionally empty */ }

// ---------------- Language toggle ----------------
function LangToggle({ lang, setLang, dark = true }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const cur = LANGS.find((l) => l.code === lang) || LANGS[0];
  const c = dark ? 'var(--on-navy)' : 'var(--navy)';
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} aria-label="Choose language" style={{
        display: 'flex', alignItems: 'center', gap: 7, background: 'transparent',
        border: `1px solid ${dark ? 'var(--on-navy-line)' : 'var(--line)'}`,
        color: c, padding: '8px 11px', borderRadius: 3, cursor: 'pointer',
        font: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
      }}>
        <Icon name="globe" size={16} stroke={1.8} />
        <span>{cur.flag}</span>
        <Icon name="chevron" size={13} stroke={2} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 170,
          background: '#fff', border: '1px solid var(--line)', borderRadius: 4,
          boxShadow: 'var(--shadow-card)', overflow: 'hidden', zIndex: 60,
        }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '11px 14px', background: l.code === lang ? 'var(--ivory)' : '#fff',
              border: 'none', cursor: 'pointer', font: 'inherit', fontSize: 14,
              color: 'var(--ink)', textAlign: 'left',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                color: 'var(--gold-deep)', width: 26 }}>{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- Header / Nav ----------------
function Header({ route, lang, setLang }) {
  const t = useT(lang);
  const [mobile, setMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    h(); window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  React.useEffect(() => { setMobile(false); }, [route]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,24,56,0.96)' : 'var(--navy)',
      backdropFilter: scrolled ? 'saturate(140%) blur(8px)' : 'none',
      borderBottom: '1px solid var(--on-navy-line)',
      transition: 'background .3s ease',
    }}>
      <div className="wrap-wide" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 76, gap: 24,
      }}>
        {/* logo */}
        <a href="#/" style={{ display: 'flex', alignItems: 'center', gap: 13, flex: 'none' }}>
          <Emblem size={48} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19,
              letterSpacing: '0.05em', color: 'var(--on-navy)', whiteSpace: 'nowrap' }}>
              SEND <span style={{ color: 'var(--gold)' }}>ME</span>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 8.5,
              letterSpacing: '0.4em', color: 'var(--on-navy-soft)', marginTop: 3, whiteSpace: 'nowrap' }}>PROJECT</span>
          </span>
        </a>

        {/* desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {ROUTES.map((r) => {
            const active = route === r.path;
            return (
              <a key={r.path} href={'#/' + r.path} style={{
                fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap',
                color: active ? 'var(--gold-soft)' : 'var(--on-navy)',
                padding: '9px 11px', borderRadius: 3, position: 'relative',
                transition: 'color .2s',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--gold-soft)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--on-navy)'; }}>
                {t(r.key)}
                {active && <span style={{ position: 'absolute', left: 11, right: 11, bottom: 2,
                  height: 2, background: 'var(--gold)' }}></span>}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle lang={lang} setLang={setLang} />
          <a href="#/donate" className="btn btn-gold" style={{ padding: '11px 22px' }}>
            <Icon name="heart" size={16} /> {t('give')}
          </a>
        </div>

        {/* mobile toggle */}
        <button className="nav-burger" onClick={() => setMobile(!mobile)} aria-label="Menu" style={{
          display: 'none', background: 'transparent', border: 'none', color: 'var(--on-navy)', cursor: 'pointer',
        }}>
          <Icon name={mobile ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      {/* mobile drawer */}
      {mobile && (
        <div className="nav-mobile" style={{ background: 'var(--navy-2)', borderTop: '1px solid var(--on-navy-line)', padding: '14px 0 22px' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ROUTES.map((r) => (
              <a key={r.path} href={'#/' + r.path} style={{
                padding: '13px 6px', fontSize: 17, fontWeight: 600,
                color: route === r.path ? 'var(--gold-soft)' : 'var(--on-navy)',
                borderBottom: '1px solid var(--on-navy-line)',
              }}>{t(r.key)}</a>
            ))}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
              <LangToggle lang={lang} setLang={setLang} />
              <a href="#/donate" className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
                <Icon name="heart" size={16} /> {t('give')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------------- Footer ----------------
function Footer({ lang, setLang }) {
  const t = useT(lang);
  const c = useContent();
  return (
    <footer className="navy-bg" style={{ borderTop: '3px solid var(--gold)' }}>
      <div className="wrap-wide" style={{ padding: '64px 28px 0' }}>
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr', gap: 40,
        }}>
          <div>
            <LogoFull light height={104} />
            <p className="lede on-navy" style={{ fontSize: 16, marginTop: 22, maxWidth: '36ch' }}>
              {c.site.tagline}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              {['facebook', 'instagram', 'mail'].map((s) => {
                const SOCIAL = { facebook: c.site.facebook, instagram: c.site.instagram, mail: '#/contact' };
                const href = SOCIAL[s] || '#';
                const ext = (s === 'facebook' || s === 'instagram') && href !== '#';
                return (
                <a key={s} href={href} aria-label={s}
                   {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{
                  width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--on-navy-line)',
                  display: 'grid', placeItems: 'center', color: 'var(--gold-soft)', transition: 'all .2s',
                }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'var(--navy-3)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--on-navy-line)'; e.currentTarget.style.background = 'transparent'; }}>
                  <Icon name={s} size={18} />
                </a>
                );
              })}
            </div>
          </div>
          <FooterCol title="Explore" links={[['About', 'about'], ['Where We Work', 'projects'], ['Our Team', 'board'], ['Gallery', 'pictures'], ['Transparency', 'financials']]} />
          <FooterCol title="Take Part" links={[['Get Involved', 'involved'], ['Give', 'donate'], ['Shop', 'shop'], ['Contact', 'contact']]} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.22em',
              color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: 18 }}>Reach Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15, color: 'var(--on-navy-soft)' }}>
              <span style={{ display: 'flex', gap: 10 }}><Icon name="pin" size={17} stroke={1.8} /> {c.site.location}</span>
              <a href="#/contact" style={{ display: 'flex', gap: 10 }}><Icon name="mail" size={17} stroke={1.8} /> {c.site.email}</a>
              <span style={{ display: 'flex', gap: 10 }}><Icon name="globe" size={17} stroke={1.8} /> {c.site.web}</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--on-navy-soft)', marginTop: 20, lineHeight: 1.5 }}>
              {c.site.legal}
            </p>
          </div>
        </div>

        <div style={{
          marginTop: 56, padding: '22px 0 30px', borderTop: '1px solid var(--on-navy-line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
        }}>
          <span style={{ fontSize: 13, color: 'var(--on-navy-soft)' }}>© {new Date().getFullYear()} Send Me Project. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold-soft)' }}>
            {c.site.motto}
          </span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.22em',
        color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: 18 }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map(([label, path]) => (
          <a key={path} href={'#/' + path} style={{ fontSize: 15, color: 'var(--on-navy-soft)', transition: 'color .2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-soft)'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-navy-soft)'}>{label}</a>
        ))}
      </div>
    </div>
  );
}

// ---------------- Building blocks ----------------
function Placeholder({ label, h = 280, light = false, radius = 'var(--radius)', style = {} }) {
  return (
    <div className={'ph' + (light ? ' light' : '')} style={{ height: h, borderRadius: radius, ...style }}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, center, light, max = '34ch' }) {
  return (
    <div className={center ? 'center' : ''} style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
      {eyebrow && <div className={'eyebrow' + (light ? ' on-navy' : '')} style={{ marginBottom: 16 }}>{eyebrow}</div>}
      <hr className={'divider-gold' + (center ? ' center' : '')} />
      <h2 className="display-lg" style={{ color: light ? 'var(--on-navy)' : 'var(--navy)', maxWidth: center ? 'none' : max }}>{title}</h2>
      {sub && <p className={'lede' + (light ? ' on-navy' : '')} style={{ marginTop: 18, maxWidth: max, marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>{sub}</p>}
    </div>
  );
}

function Scripture({ verse, cite, light = true, align = 'left' }) {
  return (
    <figure style={{ margin: 0, textAlign: align, maxWidth: '52ch', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
      <div style={{ color: 'var(--gold)', marginBottom: 12, display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <Icon name="quote" size={26} stroke={1.6} />
      </div>
      <blockquote style={{ margin: 0, fontFamily: 'var(--font-head)', fontStyle: 'italic',
        fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.4,
        color: light ? 'var(--on-navy)' : 'var(--navy)' }}>
        &ldquo;{verse}&rdquo;
      </blockquote>
      <figcaption style={{ marginTop: 16, fontFamily: 'var(--font-display)', fontSize: 12,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-deep)' }}>— {cite}</figcaption>
    </figure>
  );
}

function Pillar({ icon, title, body, light }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 58, height: 58, borderRadius: '50%', margin: '0 auto 18px',
        display: 'grid', placeItems: 'center', color: 'var(--gold)',
        border: '1.5px solid var(--line-gold)', background: light ? 'rgba(198,162,76,.08)' : 'rgba(198,162,76,.06)' }}>
        <Icon name={icon} size={26} stroke={1.8} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: light ? 'var(--on-navy)' : 'var(--navy)', marginBottom: 9 }}>{title}</h3>
      <p style={{ fontSize: 14.5, color: light ? 'var(--on-navy-soft)' : 'var(--ink-soft)', maxWidth: '20ch', margin: '0 auto' }}>{body}</p>
    </div>
  );
}

function CTABand({ lang }) {
  const t = useT(lang);
  const c = useContent();
  return (
    <section style={{ background: 'var(--navy-2)', borderTop: '1px solid var(--on-navy-line)', borderBottom: '3px solid var(--gold)' }}>
      <div className="wrap center" style={{ padding: 'clamp(56px,7vw,88px) 28px' }}>
        <div className="eyebrow on-navy" style={{ marginBottom: 18 }}>{c.cta.eyebrow}</div>
        <h2 className="display-lg" style={{ color: 'var(--on-navy)', maxWidth: '18ch', margin: '0 auto' }}>
          {c.cta.heading}
        </h2>
        <p className="lede on-navy" style={{ margin: '20px auto 32px', maxWidth: '46ch' }}>
          {c.cta.body}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#/donate" className="btn btn-gold btn-lg"><Icon name="heart" size={18} /> {t('give')}</a>
          <a href="#/involved" className="btn btn-ghost-light btn-lg">{t('cta_involved')}</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ROUTES, go, useReveal, LangToggle, Header, Footer, Placeholder, SectionHead, Scripture, Pillar, CTABand });
