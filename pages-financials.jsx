// pages-financials.jsx

const ALLOC = [
  ['Programs & direct aid', 80, 'var(--gold)'],
  ['Operations', 13, 'var(--navy-3)'],
  ['Fundraising', 7, 'var(--gold-deep)'],
];

function FinancialsPage({ lang }) {
  useReveal();
  const c = useContent();
  const tr = c.transparency;
  // build conic-gradient for donut
  let acc = 0;
  const stops = ALLOC.map(([, pct, color]) => {
    const seg = `${color} ${acc}% ${acc + pct}%`; acc += pct; return seg;
  }).join(', ');

  return (
    <div className="page-enter">
      <PageHero eyebrow="Transparency" title="Built in the open, accountable by design" slotId="financials"
        sub="We believe trust is earned. Here&rsquo;s exactly where we are today — and the framework that will guide our reporting as we grow." />

      {/* honest status */}
      <section className="section paper-bg">
        <div className="wrap-wide">
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            background: 'rgba(198,162,76,0.1)', border: '1px solid var(--line-gold)', borderRadius: 'var(--radius)',
            marginBottom: 48, fontSize: 14.5, color: 'var(--ink-soft)' }}>
            <Icon name="shield" size={20} stroke={1.8} />
            <span><strong style={{ color: 'var(--navy)' }}>Honest status:</strong> {tr.banner}</span>
          </div>

          <SectionHead eyebrow="Where we are today" title="Our honest starting point" />
          <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {(tr.stats || []).map((s, i) => <StatCard key={i} value={s[0]} label={s[1]} />)}
          </div>
        </div>
      </section>

      {/* allocation framework */}
      <section className="section ivory-bg">
        <div className="wrap-wide">
          <div className="alloc-layout" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(40px,6vw,72px)', alignItems: 'center' }}>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 260, height: 260 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `conic-gradient(${stops})` }} />
                <div style={{ position: 'absolute', inset: 46, borderRadius: '50%', background: 'var(--ivory)',
                  display: 'grid', placeItems: 'center', textAlign: 'center', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 44, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>80%</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.04em', marginTop: 4 }}>to programs<br/>&amp; direct aid</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal">
              <div className="eyebrow" style={{ marginBottom: 16 }}>Target Allocation Framework</div>
              <hr className="divider-gold" />
              <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: 18 }}>How we intend every dollar to work.</h2>
              <p className="lede" style={{ marginBottom: 24 }}>This is our committed framework for stewardship. As funds flow, we&rsquo;ll publish actuals against these targets each year.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {ALLOC.map(([label, pct, color]) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 15 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, color: 'var(--navy)' }}>
                        <span style={{ width: 13, height: 13, borderRadius: 3, background: color }} />{label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, color: 'var(--navy)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: 'rgba(20,32,60,0.08)', overflow: 'hidden' }}>
                      <div style={{ width: pct + '%', height: '100%', borderRadius: 4, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 20, marginBottom: 0 }}>
                Sample target framework shown for illustration. Audited actuals will be posted as the organization matures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* commitments */}
      <section className="section paper-bg">
        <div className="wrap">
          <SectionHead eyebrow="Our promise" title="Our transparency commitments" center />
          <div className="commit-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {[
              ['shield', 'Open books', 'We will publish annual financial summaries showing income, spending, and program impact.'],
              ['chart', 'Impact reporting', 'Every major initiative will be reported with clear, measurable outcomes — not just stories.'],
              ['doc', 'Public documents', 'Our IRS determination letter is approved — Form 990s and annual reports will be posted here for anyone to read.'],
              ['users', 'Accountable leadership', 'Our board oversees every aid decision and approves humanitarian assistance.'],
            ].map(([ic, title, body]) => (
              <div key={title} className="reveal card" style={{ padding: 'clamp(24px,3vw,32px)', display: 'flex', gap: 16 }}>
                <span style={{ width: 48, height: 48, flex: 'none', borderRadius: '50%', background: 'var(--navy)',
                  color: 'var(--gold)', display: 'grid', placeItems: 'center' }}><Icon name={ic} size={22} stroke={1.8} /></span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* documents */}
      <section className="section ivory-bg">
        <div className="wrap">
          <SectionHead eyebrow="Documents" title="Public records" center
            sub="Available the moment they&rsquo;re finalized. We&rsquo;d rather show you a clear &lsquo;coming soon&rsquo; than a polished number we can&rsquo;t stand behind." />
          <div className="docs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              ['IRS Determination Letter', '501(c)(3) · Eff. ' + tr.effective, tr.docStatus],
              ['Annual Report', 'First report after Year 1', 'Coming Soon'],
              ['IRS Form 990', 'Filed once required', 'Coming Soon'],
            ].map(([title, sub, status]) => {
              const approved = /approv/i.test(status);
              return (
              <div key={title} className="reveal card" style={{ padding: '28px 26px', textAlign: 'center' }}>
                <span style={{ color: 'var(--gold-deep)', display: 'inline-flex', marginBottom: 16 }}><Icon name="doc" size={34} stroke={1.5} /></span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 16 }}>{sub}</p>
                <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20,
                  background: approved ? 'rgba(31,138,91,0.14)' : 'rgba(198,162,76,0.16)',
                  color: approved ? '#1f7a52' : 'var(--gold-deep)' }}>{status}</span>
              </div>
              );
            })}
          </div>
          <div className="center" style={{ marginTop: 40 }}>
            <a href="#/contact" className="btn btn-navy"><Icon name="mail" size={17} /> Request financial details</a>
          </div>
        </div>
      </section>

      <CTABand lang={lang} />
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="reveal" style={{ background: '#fff', border: '1px solid var(--line)', borderTop: '3px solid var(--gold)',
      borderRadius: 'var(--radius)', padding: '26px 24px', boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(34px,4vw,46px)', fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginTop: 12 }} dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

Object.assign(window, { FinancialsPage });
