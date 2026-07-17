// pages-involved.jsx

const HELP_SEND = [
  'Provide humanitarian aid and essential supplies',
  'Make financial contributions',
  'Establish strategic partnerships',
  'Support fundraising initiatives',
  'Volunteer professional expertise and services',
  'Connect organizations, businesses, and community leaders',
  'Share our mission and outreach opportunities',
  'Help mobilize resources where they are needed most',
];
const BE_SENT = [
  'Participate in humanitarian outreach projects',
  'Support disaster relief and recovery efforts',
  'Serve on domestic and international mission teams',
  'Assist with community development initiatives',
  'Contribute your skills, experience, and leadership',
  'Help strengthen communities through practical service',
  'Bring hope, help, and opportunity to those in need',
];

function InvolvedPage({ lang }) {
  useReveal();
  const c = useContent();
  const [path, setPath] = React.useState('help');
  const [sent, setSent] = React.useState(false);

  return (
    <div className="page-enter">
      <PageHero eyebrow="Get Involved" title="Help send, or be sent" slotId="involved"
        sub="We believe lasting change happens when compassionate people, innovative organizations, and committed communities work together. There are two ways to be part of it." />

      {/* toggle */}
      <section className="section paper-bg">
        <div className="wrap">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', background: 'var(--ivory)', border: '1px solid var(--line)', borderRadius: 6, padding: 5 }}>
              {[['help', 'Help Send', 'box'], ['be', 'Be Sent', 'plane']].map(([id, label, icon]) => (
                <button key={id} onClick={() => setPath(id)} style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '12px 26px', borderRadius: 4,
                  border: 'none', cursor: 'pointer', font: 'inherit', fontSize: 15.5, fontWeight: 600,
                  background: path === id ? 'var(--navy)' : 'transparent',
                  color: path === id ? 'var(--on-navy)' : 'var(--ink-soft)', transition: 'all .2s',
                }}>
                  <Icon name={icon} size={18} stroke={1.8} /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="involved-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,5vw,64px)', alignItems: 'start' }}>
            <div className="reveal" key={path}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)',
                  display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <Icon name={path === 'help' ? 'box' : 'plane'} size={28} stroke={1.7} />
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>{path === 'help' ? 'Option One' : 'Option Two'}</div>
                  <h2 className="display-md" style={{ color: 'var(--navy)' }}>{path === 'help' ? 'Help Send' : 'Be Sent'}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 22 }}>
                {path === 'help'
                  ? 'Make a difference by providing the resources, support, and connections that make our mission possible.'
                  : 'Become part of the mission by serving where the need is greatest — at home or around the world.'}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                {(path === 'help' ? HELP_SEND : BE_SENT).map((x, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--gold-deep)', flex: 'none', marginTop: 3 }}><Icon name="check" size={18} /></span>{x}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 26, padding: '16px 20px', background: 'var(--navy)', color: 'var(--gold-soft)',
                borderRadius: 'var(--radius)', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: 19, textAlign: 'center' }}>
                {path === 'help' ? 'Every gift. Every connection. Every action counts.' : 'Say \u201cSend Me,\u201d and we\u2019ll go together.'}
              </div>
            </div>

            {/* interest form */}
            <div className="reveal card" style={{ padding: 'clamp(28px,4vw,40px)', position: 'sticky', top: 100 }}>
              {sent ? (
                <div className="center" style={{ padding: '40px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(31,138,91,0.12)',
                    color: '#1f7a52', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}><Icon name="check" size={32} /></div>
                  <h3 className="display-md" style={{ color: 'var(--navy)', marginBottom: 12 }}>Thank you!</h3>
                  <p style={{ color: 'var(--ink-soft)' }}>We&rsquo;ve received your interest and will be in touch soon. Welcome to the mission.</p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost" style={{ marginTop: 18 }}>Send another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>
                    {path === 'help' ? 'I want to help send' : 'I\u2019m ready to be sent'}
                  </h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 22 }}>Tell us a little about you and we&rsquo;ll reach out.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Field label="Full name"><input required className="inp" placeholder="Your name" /></Field>
                    <Field label="Email"><input required type="email" className="inp" placeholder="you@example.com" /></Field>
                    <Field label="Country / Region"><input className="inp" placeholder="Where are you reaching out from?" /></Field>
                    <Field label="How would you like to help?">
                      <select className="inp">
                        {(path === 'help'
                          ? ['Give financially', 'Donate supplies', 'Partner with us', 'Volunteer expertise', 'Other']
                          : ['Join an outreach team', 'Disaster relief', 'Community development', 'Offer my skills', 'Other']
                        ).map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Message (optional)"><textarea className="inp" rows="3" placeholder="Anything you&rsquo;d like us to know" /></Field>
                    <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center', marginTop: 4 }}>
                      <Icon name="arrow" size={17} /> Submit interest
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* outcomes band */}
      <section className="section-sm navy-bg">
        <div className="wrap-wide">
          <div className="outcomes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {(c.outcomes || []).map(([ic, lbl]) => (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
                <span style={{ color: 'var(--gold)' }}><Icon name={ic} size={26} stroke={1.7} /></span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--on-navy)' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6, letterSpacing: '0.02em' }}>{label}</span>
      {children}
    </label>
  );
}

Object.assign(window, { InvolvedPage });
