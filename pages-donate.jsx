// pages-donate.jsx

const AMOUNTS = [25, 50, 100, 250, 500, 1000];
const DESIGNATIONS = [
  ['Where most needed', 'Let us direct your gift to the greatest current need.'],
  ['Brazil feeding initiative', 'Help fund 3,000+ meals every month.'],
  ['Uganda relief', 'Food, housing, and stabilization for families in crisis.'],
  ['Global outreach fund', 'Support teams, shipments, and rapid response.'],
];

function DonatePage({ t, lang }) {
  useReveal();
  const [amount, setAmount] = React.useState(100);
  const [custom, setCustom] = React.useState('');
  const [freq, setFreq] = React.useState('once');
  const [desig, setDesig] = React.useState(0);
  const value = custom ? Number(custom) : amount;

  return (
    <div className="page-enter">
      <PageHero eyebrow="Give" title="Send hope. Fund impact. Change lives." slotId="donate"
        sub="Your gift mobilizes aid, leadership, and hope — from Arkansas to the nations. Every seed matters." />

      <section className="section paper-bg">
        <div className="wrap">
          <div className="donate-layout" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(36px,5vw,60px)', alignItems: 'start' }}>
            {/* giving card */}
            <div className="reveal card" style={{ padding: 'clamp(28px,4vw,44px)' }}>
              {/* frequency */}
              <div style={{ display: 'inline-flex', background: 'var(--ivory)', border: '1px solid var(--line)', borderRadius: 6, padding: 4, marginBottom: 26 }}>
                {[['once', 'One-time'], ['month', 'Monthly']].map(([id, label]) => (
                  <button key={id} onClick={() => setFreq(id)} style={{
                    padding: '10px 26px', borderRadius: 4, border: 'none', cursor: 'pointer', font: 'inherit',
                    fontSize: 15, fontWeight: 600, background: freq === id ? 'var(--navy)' : 'transparent',
                    color: freq === id ? 'var(--on-navy)' : 'var(--ink-soft)', transition: 'all .2s',
                  }}>{label}</button>
                ))}
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 12, letterSpacing: '0.02em' }}>Choose an amount</div>
              <div className="amt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {AMOUNTS.map((a) => {
                  const on = !custom && amount === a;
                  return (
                    <button key={a} onClick={() => { setAmount(a); setCustom(''); }} style={{
                      padding: '16px 0', borderRadius: 'var(--radius)', cursor: 'pointer', font: 'inherit',
                      fontSize: 19, fontWeight: 700, fontFamily: 'var(--font-head)',
                      background: on ? 'var(--navy)' : '#fff', color: on ? 'var(--gold-soft)' : 'var(--navy)',
                      border: `1.5px solid ${on ? 'var(--navy)' : 'var(--line)'}`, transition: 'all .18s',
                    }}>${a}</button>
                  );
                })}
              </div>
              <div style={{ position: 'relative', marginTop: 12 }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)', fontWeight: 700 }}>$</span>
                <input className="inp" inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Other amount" style={{ paddingLeft: 28 }} />
              </div>

              {/* designation */}
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', margin: '26px 0 12px', letterSpacing: '0.02em' }}>Direct my gift to</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DESIGNATIONS.map((d, i) => {
                  const on = desig === i;
                  return (
                    <button key={i} onClick={() => setDesig(i)} style={{
                      display: 'flex', gap: 13, alignItems: 'flex-start', textAlign: 'left', cursor: 'pointer',
                      padding: '14px 16px', borderRadius: 'var(--radius)', font: 'inherit',
                      background: on ? 'rgba(198,162,76,0.08)' : '#fff',
                      border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line)'}`, transition: 'all .18s',
                    }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', flex: 'none', marginTop: 1,
                        border: `2px solid ${on ? 'var(--gold-deep)' : 'var(--line)'}`,
                        display: 'grid', placeItems: 'center' }}>
                        {on && <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--gold-deep)' }} />}
                      </span>
                      <span>
                        <span style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', fontSize: 15.5 }}>{d[0]}</span>
                        <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{d[1]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <a href="#donate-note" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 26 }}>
                <Icon name="heart" size={18} /> {freq === 'month' ? `Give $${value || 0}/mo` : `Give $${value || 0}`} securely
              </a>
              <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
                Secure giving opens in a new window. <a href="#donate-note" style={{ color: 'var(--gold-deep)', textDecoration: 'underline' }}>How giving works →</a>
              </p>
            </div>

            {/* impact + trust */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'var(--navy)', color: 'var(--on-navy)', borderRadius: 'var(--radius)', padding: 'clamp(24px,3vw,32px)' }}>
                <div className="eyebrow on-navy" style={{ marginBottom: 14 }}>Your impact</div>
                <ImpactLine value={value} />
              </div>
              <TrustItem icon="shield" title="Stewarded with integrity" body="We are committed to handling every gift responsibly and reporting openly." />
              <TrustItem icon="chart" title="Transparent reporting" body="See where we are today and how funds are used on our transparency page." />
              <TrustItem icon="heart" title="Every seed matters" body="We&rsquo;re early-stage and grateful for every gift that helps build the mission." />
              <a href="#/financials" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                <Icon name="doc" size={17} /> View our transparency commitment
              </a>
            </div>
          </div>

          {/* honest note */}
          <div id="donate-note" className="reveal" style={{ marginTop: 56, padding: 'clamp(24px,3vw,36px)',
            background: 'var(--ivory)', border: '1px solid var(--line-gold)', borderRadius: 'var(--radius)',
            display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--gold-deep)', flex: 'none' }}><Icon name="spark" size={24} stroke={1.8} /></span>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>A note on where we are today</h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, margin: 0 }}>
                Send Me Project is a young organization building with transparency. We&rsquo;ve received our first donations and 501(c)(3) status is pending.
                This page is a prototype — the secure giving processor will be connected before launch. Until then, please <a href="#/contact" style={{ color: 'var(--gold-deep)', textDecoration: 'underline' }}>contact us</a> to give or partner directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ImpactLine({ value }) {
  const meals = Math.round((value || 0) * 4); // illustrative
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(38px,5vw,52px)', fontWeight: 600, color: 'var(--gold-soft)', lineHeight: 1 }}>
        ~{meals.toLocaleString()}
      </div>
      <div style={{ fontSize: 15, marginTop: 8 }}>meals could be provided through our Brazil feeding initiative*</div>
      <div style={{ fontSize: 12, color: 'var(--on-navy-soft)', marginTop: 14 }}>*Illustrative estimate to show potential impact, not a guarantee.</div>
    </div>
  );
}

function TrustItem({ icon, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <span style={{ width: 42, height: 42, flex: 'none', borderRadius: '50%', background: 'rgba(198,162,76,0.12)',
        color: 'var(--gold-deep)', display: 'grid', placeItems: 'center' }}><Icon name={icon} size={20} stroke={1.8} /></span>
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{title}</h4>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

Object.assign(window, { DonatePage });
