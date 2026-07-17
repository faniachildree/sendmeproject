// pages-contact.jsx

const COUNTRIES = ['United States', 'Brazil', 'Uganda', 'Kenya', 'Canada', 'Mexico', 'United Kingdom', 'Nigeria', 'Ghana', 'India', 'Philippines', 'Guatemala', 'Haiti', 'South Africa', 'Australia', 'Germany', 'France', 'Spain', 'Portugal', 'Other / Not listed'];
const TOPICS = ['I have a need to share', 'I want to give or partner', 'I want to volunteer / be sent', 'Press or general inquiry', 'Join the board or team'];

function ContactPage({ t, lang }) {
  useReveal();
  const c = useContent();
  const [sent, setSent] = React.useState(false);

  return (
    <div className="page-enter">
      <PageHero eyebrow="Contact" title={c.contact.title} slotId="contact"
        sub={c.contact.sub} />

      <section className="section paper-bg">
        <div className="wrap-wide">
          <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,72px)', alignItems: 'start' }}>
            {/* info side */}
            <div className="reveal">
              <div className="eyebrow" style={{ marginBottom: 16 }}>Reach us</div>
              <hr className="divider-gold" />
              <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: 24 }}>{c.contact.connectHeading}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <ContactLine icon="mail" label="Email" value={c.site.email} />
                <ContactLine icon="globe" label="Web" value={c.site.web} />
                <ContactLine icon="pin" label="Based in" value="Arkansas, USA · Serving globally" />
              </div>

              <div style={{ marginTop: 32, padding: 'clamp(24px,3vw,32px)', background: 'var(--navy)', color: 'var(--on-navy)', borderRadius: 'var(--radius)' }}>
                <div style={{ color: 'var(--gold-soft)', marginBottom: 12 }}><Icon name="globe" size={28} stroke={1.5} /></div>
                <h3 className="font-head" style={{ fontSize: 22, color: 'var(--on-navy)', marginBottom: 10 }}>{c.contact.globalHeading}</h3>
                <p style={{ color: 'var(--on-navy-soft)', fontSize: 15, margin: 0 }}>
                  {c.contact.globalBody}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
                  {LANGS.map((l) => (
                    <span key={l.code} style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em',
                      color: 'var(--gold-soft)', border: '1px solid var(--on-navy-line)', borderRadius: 20, padding: '5px 12px' }}>{l.label}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                {['facebook', 'instagram'].map((s) => (
                  <a key={s} href={s === 'facebook' ? c.site.facebook : c.site.instagram} aria-label={s}
                    target="_blank" rel="noopener noreferrer" style={{ width: 46, height: 46, borderRadius: '50%',
                    border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--navy)', transition: 'all .2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold-soft)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
                    <Icon name={s} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* form side */}
            <div className="reveal card" style={{ padding: 'clamp(28px,4vw,44px)' }}>
              {sent ? (
                <div className="center" style={{ padding: '50px 0' }}>
                  <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(31,138,91,0.12)',
                    color: '#1f7a52', display: 'grid', placeItems: 'center', margin: '0 auto 22px' }}><Icon name="check" size={34} /></div>
                  <h3 className="display-md" style={{ color: 'var(--navy)', marginBottom: 12 }}>Message received</h3>
                  <p style={{ color: 'var(--ink-soft)', maxWidth: '34ch', margin: '0 auto' }}>
                    Thank you for reaching out. Our team will review your message and respond as soon as we can.
                  </p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost" style={{ marginTop: 20 }}>Send another message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 23, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Send us a message</h3>
                  <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 24 }}>We read every message personally.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <CField label="Full name"><input required className="inp" placeholder="Your name" /></CField>
                      <CField label="Email"><input required type="email" className="inp" placeholder="you@example.com" /></CField>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <CField label="Country / Region">
                        <select required className="inp" defaultValue="">
                          <option value="" disabled>Select your country</option>
                          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </CField>
                      <CField label="Preferred language">
                        <select className="inp" defaultValue={lang}>
                          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                        </select>
                      </CField>
                    </div>
                    <CField label="What&rsquo;s this about?">
                      <select className="inp">{TOPICS.map((tp) => <option key={tp}>{tp}</option>)}</select>
                    </CField>
                    <CField label="Your message">
                      <textarea required className="inp" rows="5" placeholder="Tell us how we can help, or how you&rsquo;d like to help." />
                    </CField>
                    <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center' }}>
                      <Icon name="mail" size={17} /> Send message
                    </button>
                    <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', textAlign: 'center', margin: 0 }}>
                      This is a prototype form — submissions aren&rsquo;t stored or sent yet.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactLine({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span style={{ width: 48, height: 48, flex: 'none', borderRadius: '50%', background: 'rgba(198,162,76,0.12)',
        color: 'var(--gold-deep)', display: 'grid', placeItems: 'center' }}><Icon name={icon} size={22} stroke={1.8} /></span>
      <div>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--navy)' }}>{value}</div>
      </div>
    </div>
  );
}
function CField({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: label }} />
      {children}
    </label>
  );
}

Object.assign(window, { ContactPage });
