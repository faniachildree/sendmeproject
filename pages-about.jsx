// pages-about.jsx

function AboutPage({ t, lang }) {
  useReveal();
  const c = useContent();
  return (
    <div className="page-enter">
      <PageHero eyebrow="Our Story" title="A cry for help. A response of hope." slotId="about"
        sub="Send Me Project began with a single, urgent message — and a decision to respond with compassion in real time." />

      {/* origin story */}
      <section className="section paper-bg">
        <div className="wrap story-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(40px,6vw,72px)', alignItems: 'start' }}>
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 16 }}>How it started</div>
            <hr className="divider-gold" />
            <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: 20 }}>{c.about.storyHeading}</h2>
            <p className="lede">{c.about.storyLede}</p>
            <p>{c.about.storyBody1}</p>
            <p>{c.about.storyBody2}</p>
          </div>
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
            {c.about.storyImage
              ? <img src={c.about.storyImage} alt="Send Me Project in the field" style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 'var(--radius)', display: 'block' }} />
              : <Placeholder label="Our story · field photo" h={300} />}
            <div style={{ background: 'var(--navy)', color: 'var(--on-navy)', padding: 'clamp(24px,3vw,32px)', borderRadius: 'var(--radius)', marginTop: -2 }}>
              <Scripture light verse={c.about.storyQuote} cite={c.about.storyQuoteCite} />
            </div>
          </div>
        </div>
      </section>

      {/* mission / vision / values */}
      <section className="section ivory-bg">
        <div className="wrap-wide">
          <div className="mv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div className="card reveal" style={{ padding: 'clamp(30px,4vw,48px)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Our Mission</div>
              <p className="font-head" style={{ fontSize: 'clamp(21px,2.4vw,28px)', color: 'var(--navy)', lineHeight: 1.28, margin: 0 }}>
                {c.about.mission}
              </p>
            </div>
            <div className="card reveal" style={{ padding: 'clamp(30px,4vw,48px)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Our Vision</div>
              <p className="font-head" style={{ fontSize: 'clamp(21px,2.4vw,28px)', color: 'var(--navy)', lineHeight: 1.28, margin: 0 }}>
                {c.about.vision}
              </p>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 56 }}>
            <SectionHead eyebrow="What guides us" title="Our values" center />
            <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(28px,4vw,44px)' }}>
              <ValueRow icon="serve" title="Compassion &amp; Dignity" body="We meet tangible needs while honoring the dignity of every person we serve." />
              <ValueRow icon="shield" title="Integrity &amp; Transparency" body="We act with excellence and report openly — every gift, every step." />
              <ValueRow icon="partner" title="Partnership" body={c.about.partnership} />
              <ValueRow icon="empower" title="Leadership Development" body="We invest in people, empowering local leaders to strengthen their own communities." />
              <ValueRow icon="reach" title="Global Reach" body="Anyone, anywhere, can reach out — and we respond responsibly." />
              <ValueRow icon="spark" title="Purpose-Driven Action" body="People choosing to respond with compassion, action, and purpose." />
            </div>
          </div>
        </div>
      </section>

      {/* faith — subtle */}
      <section className="section navy-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}><MapMotif opacity={0.08} /></div>
        <div className="wrap center" style={{ position: 'relative' }}>
          <div className="eyebrow on-navy" style={{ marginBottom: 18 }}>{c.about.faithHeading}</div>
          <Scripture light align="center" verse={c.about.faithQuote} cite={c.about.faithCite} />
        </div>
      </section>

      <CTABand lang={lang} />
    </div>
  );
}

Object.assign(window, { AboutPage });
