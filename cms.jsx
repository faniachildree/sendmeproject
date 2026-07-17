// cms.jsx — end-user content manager. Full-screen editor at #/admin.
// Reads/writes the content store (content.jsx). Changes save to this browser
// automatically; Export/Import move content as a JSON file between browsers.

// ---- small helpers ----
function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result); r.onerror = rej;
    r.readAsDataURL(file);
  });
}
function factsToText(facts) { return (facts || []).map((f) => `${f[0]} | ${f[1]}`).join('\n'); }
function textToFacts(text) {
  return String(text).split('\n').map((l) => l.trim()).filter(Boolean)
    .map((l) => { const i = l.indexOf('|'); return i === -1 ? [l.trim(), ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim()]; });
}

// ---- field controls ----
function CMSLabel({ children, hint }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.02em' }}>{children}</span>
      {hint && <span style={{ fontSize: 12, color: 'var(--ink-soft)', marginLeft: 8 }}>{hint}</span>}
    </div>
  );
}
function CMSText({ label, hint, value, onChange, mono }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      {label && <CMSLabel hint={hint}>{label}</CMSLabel>}
      <input className="inp" value={value || ''} onChange={(e) => onChange(e.target.value)}
        style={mono ? { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13 } : null} />
    </label>
  );
}
function CMSArea({ label, hint, value, onChange, rows = 3 }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      {label && <CMSLabel hint={hint}>{label}</CMSLabel>}
      <textarea className="inp" rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
function CMSSelect({ label, value, options, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      {label && <CMSLabel>{label}</CMSLabel>}
      <select className="inp" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function CMSImage({ label, hint, value, onChange }) {
  const inRef = React.useRef(null);
  const pick = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) onChange(await fileToDataURL(f));
  };
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <CMSLabel hint={hint}>{label}</CMSLabel>}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 66, height: 66, flex: 'none', borderRadius: 6, overflow: 'hidden',
          border: '1px solid var(--line)', background: 'var(--ivory-2)', display: 'grid', placeItems: 'center' }}>
          {value ? <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 : <Icon name="image" size={22} stroke={1.6} />}
        </div>
        <div style={{ flex: 1 }}>
          <input className="inp" value={value && value.startsWith('data:') ? '(uploaded image)' : (value || '')}
            onChange={(e) => onChange(e.target.value)} placeholder="Image path or URL"
            readOnly={!!(value && value.startsWith('data:'))}
            style={{ fontSize: 13, marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }} onClick={() => inRef.current.click()}>
              <Icon name="upload" size={15} /> Upload
            </button>
            {value && <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }} onClick={() => onChange('')}>Clear</button>}
          </div>
          <input ref={inRef} type="file" accept="image/*" onChange={pick} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
}

// ---- list item wrapper ----
function ItemCard({ title, idx, count, onUp, onDown, onDelete, children }) {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 20, marginBottom: 16, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-deep)' }}>{title}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <IconBtn icon="up" disabled={idx === 0} onClick={onUp} label="Move up" />
          <IconBtn icon="down" disabled={idx === count - 1} onClick={onDown} label="Move down" />
          <IconBtn icon="trash" onClick={onDelete} label="Delete" danger />
        </div>
      </div>
      {children}
    </div>
  );
}
function IconBtn({ icon, onClick, disabled, danger, label }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} title={label} style={{
      width: 32, height: 32, borderRadius: 6, display: 'grid', placeItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer',
      border: '1px solid var(--line)', background: '#fff', color: danger ? '#b3261e' : 'var(--ink-soft)', opacity: disabled ? 0.4 : 1,
    }}><Icon name={icon} size={16} stroke={1.9} /></button>
  );
}

// ---- section renderers ----
function set(path, v) { window.setContentPath(path, v); }
function listOps(path, list) {
  return {
    up: (i) => { if (i > 0) { const n = list.slice(); [n[i - 1], n[i]] = [n[i], n[i - 1]]; set(path, n); } },
    down: (i) => { if (i < list.length - 1) { const n = list.slice(); [n[i], n[i + 1]] = [n[i + 1], n[i]]; set(path, n); } },
    del: (i) => set(path, list.filter((_, j) => j !== i)),
    add: (tpl) => set(path, [...list, tpl]),
    setField: (i, key, val) => set(path, list.map((it, j) => j === i ? { ...it, [key]: val } : it)),
  };
}

function SecSite({ c }) {
  const s = c.site;
  return (
    <>
      <SecHead title="Site & Footer" desc="Organization contact details and the text under the footer logo." />
      <CMSArea label="Footer tagline (under the logo)" value={s.tagline} onChange={(v) => set('site.tagline', v)} />
      <CMSText label="Motto" value={s.motto} onChange={(v) => set('site.motto', v)} />
      <div style={twoCol}><CMSText label="Contact email" value={s.email} onChange={(v) => set('site.email', v)} />
        <CMSText label="Website" value={s.web} onChange={(v) => set('site.web', v)} /></div>
      <CMSText label="Location line" value={s.location} onChange={(v) => set('site.location', v)} />
      <CMSArea label="Legal line" hint="e.g. 501(c)(3) + EIN" value={s.legal} onChange={(v) => set('site.legal', v)} rows={2} />
      <div style={twoCol}><CMSText label="Facebook URL" value={s.facebook} onChange={(v) => set('site.facebook', v)} mono />
        <CMSText label="Instagram URL" value={s.instagram} onChange={(v) => set('site.instagram', v)} mono /></div>
    </>
  );
}
function SecHome({ c }) {
  const h = c.home;
  return (
    <>
      <SecHead title="Home Page" desc="Hero, mission, and the ‘Where We Work’ intro." />
      <CMSText label="Hero eyebrow" value={h.heroEyebrow} onChange={(v) => set('home.heroEyebrow', v)} />
      <CMSArea label="Hero subheading" value={h.heroSub} onChange={(v) => set('home.heroSub', v)} />
      <CMSText label="Pillars banner" hint="the gold line above Serve/Empower…" value={h.pillarsBanner} onChange={(v) => set('home.pillarsBanner', v)} />
      <hr style={hrStyle} />
      <CMSText label="Mission heading" value={h.missionHeading} onChange={(v) => set('home.missionHeading', v)} />
      <CMSArea label="Mission paragraph 1" value={h.missionBody1} onChange={(v) => set('home.missionBody1', v)} />
      <CMSText label="Mission paragraph 2" value={h.missionBody2} onChange={(v) => set('home.missionBody2', v)} />
      <CMSArea label="Feature quote" value={h.quote} onChange={(v) => set('home.quote', v)} />
      <CMSText label="Quote attribution" value={h.quoteCite} onChange={(v) => set('home.quoteCite', v)} />
      <hr style={hrStyle} />
      <CMSText label="‘Where We Work’ title" value={h.wwTitle} onChange={(v) => set('home.wwTitle', v)} />
      <CMSArea label="‘Where We Work’ subtitle" value={h.wwSub} onChange={(v) => set('home.wwSub', v)} />
    </>
  );
}
function SecCTA({ c }) {
  return (
    <>
      <SecHead title="Call-to-Action Banner" desc="The gold-bordered banner near the bottom of most pages." />
      <CMSText label="Eyebrow" value={c.cta.eyebrow} onChange={(v) => set('cta.eyebrow', v)} />
      <CMSText label="Heading" value={c.cta.heading} onChange={(v) => set('cta.heading', v)} />
      <CMSArea label="Body" value={c.cta.body} onChange={(v) => set('cta.body', v)} />
    </>
  );
}
function SecAbout({ c }) {
  const a = c.about;
  return (
    <>
      <SecHead title="About / Our Story" desc="Story, mission, vision, values, and the faith statement." />
      <CMSText label="Story heading" value={a.storyHeading} onChange={(v) => set('about.storyHeading', v)} />
      <CMSArea label="Story lede" value={a.storyLede} onChange={(v) => set('about.storyLede', v)} />
      <CMSArea label="Story paragraph 1" value={a.storyBody1} onChange={(v) => set('about.storyBody1', v)} rows={4} />
      <CMSArea label="Story paragraph 2" value={a.storyBody2} onChange={(v) => set('about.storyBody2', v)} rows={4} />
      <CMSImage label="Story image" value={a.storyImage} onChange={(v) => set('about.storyImage', v)} />
      <div style={twoCol}><CMSText label="Story quote" value={a.storyQuote} onChange={(v) => set('about.storyQuote', v)} />
        <CMSText label="Quote source" value={a.storyQuoteCite} onChange={(v) => set('about.storyQuoteCite', v)} /></div>
      <hr style={hrStyle} />
      <CMSArea label="Our Mission" value={a.mission} onChange={(v) => set('about.mission', v)} rows={4} />
      <CMSArea label="Our Vision" value={a.vision} onChange={(v) => set('about.vision', v)} rows={4} />
      <CMSArea label="Partnership value text" value={a.partnership} onChange={(v) => set('about.partnership', v)} rows={3} />
      <hr style={hrStyle} />
      <CMSText label="Faith heading" value={a.faithHeading} onChange={(v) => set('about.faithHeading', v)} />
      <CMSArea label="Faith quote" value={a.faithQuote} onChange={(v) => set('about.faithQuote', v)} rows={3} />
      <CMSText label="Faith attribution" value={a.faithCite} onChange={(v) => set('about.faithCite', v)} />
    </>
  );
}
function SecOutcomes({ c }) {
  const list = c.outcomes || [];
  const op = listOps('outcomes', list);
  const ICONS = ['eye', 'hands', 'users', 'globe', 'heart', 'reach', 'serve', 'spark'];
  return (
    <>
      <SecHead title="Get Involved — Outcomes" desc="The four items in the navy band at the bottom of Get Involved." />
      {list.map((o, i) => (
        <ItemCard key={i} title={'Item ' + (i + 1)} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <div style={twoCol}>
            <CMSSelect label="Icon" value={o[0]} options={ICONS} onChange={(v) => op.setField(i, 0, v)} />
            <CMSText label="Label" value={o[1]} onChange={(v) => op.setField(i, 1, v)} />
          </div>
        </ItemCard>
      ))}
      <AddBtn label="Add outcome" onClick={() => op.add(['spark', 'New outcome'])} />
    </>
  );
}
function SecBoard({ c }) {
  const list = c.board || [];
  const op = listOps('board', list);
  return (
    <>
      <SecHead title="Our Team" desc="Board & team members. Drag order with the arrows." />
      {list.map((p, i) => (
        <ItemCard key={p.id || i} title={p.name || 'Member'} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <div style={twoCol}>
            <CMSText label="Name" value={p.name} onChange={(v) => op.setField(i, 'name', v)} />
            <CMSText label="Role" value={p.role} onChange={(v) => op.setField(i, 'role', v)} />
          </div>
          <CMSImage label="Headshot" value={p.photo} onChange={(v) => op.setField(i, 'photo', v)} />
          <CMSText label="Quote" value={p.quote} onChange={(v) => op.setField(i, 'quote', v)} />
          <CMSArea label="Bio" value={p.bio} onChange={(v) => op.setField(i, 'bio', v)} rows={4} />
          <CMSText label="Tags" hint="comma-separated" value={(p.tags || []).join(', ')}
            onChange={(v) => op.setField(i, 'tags', v.split(',').map((x) => x.trim()).filter(Boolean))} />
        </ItemCard>
      ))}
      <AddBtn label="Add member" onClick={() => op.add({ id: 'm' + Date.now(), name: 'New Member', role: 'Board Member', photo: '', initials: 'NM', quote: '', bio: '', tags: [] })} />
    </>
  );
}
function SecRegions({ c }) {
  const list = c.regions || [];
  const op = listOps('regions', list);
  return (
    <>
      <SecHead title="Where We Work" desc="Regions on the map. Longitude/latitude place the pin." />
      {list.map((r, i) => (
        <ItemCard key={r.id || i} title={r.name || 'Region'} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <div style={twoCol}>
            <CMSText label="Name" value={r.name} onChange={(v) => op.setField(i, 'name', v)} />
            <CMSText label="Code" hint="e.g. BR" value={r.flag} onChange={(v) => op.setField(i, 'flag', v)} />
          </div>
          <div style={twoCol}>
            <CMSText label="Kind" value={r.kind} onChange={(v) => op.setField(i, 'kind', v)} />
            <CMSSelect label="Status" value={r.status} options={['Active', 'Funding', 'Planning']} onChange={(v) => op.setField(i, 'status', v)} />
          </div>
          <div style={twoCol}>
            <CMSText label="Longitude" hint="-180…180" value={String(r.lon)} onChange={(v) => op.setField(i, 'lon', parseFloat(v) || 0)} />
            <CMSText label="Latitude" hint="-90…90" value={String(r.lat)} onChange={(v) => op.setField(i, 'lat', parseFloat(v) || 0)} />
          </div>
          <CMSText label="Headline" value={r.headline} onChange={(v) => op.setField(i, 'headline', v)} />
          <CMSArea label="Body" value={r.body} onChange={(v) => op.setField(i, 'body', v)} rows={4} />
          <CMSArea label="Facts" hint="one per line — Label | Value" value={factsToText(r.facts)}
            onChange={(v) => op.setField(i, 'facts', textToFacts(v))} rows={3} />
        </ItemCard>
      ))}
      <AddBtn label="Add region" onClick={() => op.add({ id: 'r' + Date.now(), name: 'New Region', flag: '??', kind: 'Emerging Outreach', status: 'Planning', lon: 0, lat: 0, headline: '', body: '', facts: [] })} />
    </>
  );
}
function SecTransparency({ c }) {
  const tr = c.transparency;
  const list = tr.stats || [];
  const op = listOps('transparency.stats', list);
  return (
    <>
      <SecHead title="Transparency" desc="Status banner, headline stats, and IRS details." />
      <CMSArea label="Status banner" value={tr.banner} onChange={(v) => set('transparency.banner', v)} rows={3} />
      <div style={twoCol}>
        <CMSText label="EIN" value={tr.ein} onChange={(v) => set('transparency.ein', v)} />
        <CMSText label="501(c)(3) effective date" value={tr.effective} onChange={(v) => set('transparency.effective', v)} />
      </div>
      <div style={twoCol}>
        <CMSText label="Public charity status" value={tr.charityStatus} onChange={(v) => set('transparency.charityStatus', v)} />
        <CMSText label="Determination status" hint="e.g. Approved" value={tr.docStatus} onChange={(v) => set('transparency.docStatus', v)} />
      </div>
      <hr style={hrStyle} />
      <CMSLabel>Headline stats</CMSLabel>
      <div style={{ height: 8 }} />
      {list.map((s, i) => (
        <ItemCard key={i} title={'Stat ' + (i + 1)} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <CMSText label="Value" value={s[0]} onChange={(v) => op.setField(i, 0, v)} />
          <CMSText label="Label" value={s[1]} onChange={(v) => op.setField(i, 1, v)} />
        </ItemCard>
      ))}
      <AddBtn label="Add stat" onClick={() => op.add(['0', 'New metric'])} />
    </>
  );
}
function SecContact({ c }) {
  const ct = c.contact;
  return (
    <>
      <SecHead title="Contact" desc="Headings and intro text on the Contact page." />
      <CMSText label="Page title" value={ct.title} onChange={(v) => set('contact.title', v)} />
      <CMSArea label="Page subtitle" value={ct.sub} onChange={(v) => set('contact.sub', v)} />
      <CMSText label="‘Reach us’ heading" value={ct.connectHeading} onChange={(v) => set('contact.connectHeading', v)} />
      <CMSText label="Global card heading" value={ct.globalHeading} onChange={(v) => set('contact.globalHeading', v)} />
      <CMSArea label="Global card body" value={ct.globalBody} onChange={(v) => set('contact.globalBody', v)} />
      <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Contact email is edited under <strong>Site &amp; Footer</strong>.</p>
    </>
  );
}
function SecShop({ c }) {
  const sh = c.shop; const list = sh.products || [];
  const op = listOps('shop.products', list);
  return (
    <>
      <SecHead title="Shop" desc="Store intro and product cards." />
      <CMSText label="Hero title" value={sh.heroTitle} onChange={(v) => set('shop.heroTitle', v)} />
      <CMSArea label="Hero subtitle" value={sh.heroSub} onChange={(v) => set('shop.heroSub', v)} />
      <CMSArea label="Launch note" value={sh.note} onChange={(v) => set('shop.note', v)} rows={2} />
      <hr style={hrStyle} />
      {list.map((p, i) => (
        <ItemCard key={p.id || i} title={p.name || 'Product'} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <div style={twoCol}>
            <CMSText label="Name" value={p.name} onChange={(v) => op.setField(i, 'name', v)} />
            <CMSText label="Price" value={p.price} onChange={(v) => op.setField(i, 'price', v)} />
          </div>
          <CMSText label="Tag" value={p.tag} onChange={(v) => op.setField(i, 'tag', v)} />
          <CMSArea label="Description" value={p.desc} onChange={(v) => op.setField(i, 'desc', v)} />
          <CMSImage label="Product photo" value={p.img} onChange={(v) => op.setField(i, 'img', v)} />
        </ItemCard>
      ))}
      <AddBtn label="Add product" onClick={() => op.add({ id: 'p' + Date.now(), name: 'New Product', price: '$0', desc: '', tag: '', img: '' })} />
    </>
  );
}
function SecGallery({ c }) {
  const g = c.pictures; const list = g.images || [];
  const op = listOps('pictures.images', list);
  return (
    <>
      <SecHead title="Gallery" desc="Story video and photo tiles." />
      <CMSText label="Hero title" value={g.heroTitle} onChange={(v) => set('pictures.heroTitle', v)} />
      <CMSArea label="Hero subtitle" value={g.heroSub} onChange={(v) => set('pictures.heroSub', v)} />
      <CMSText label="Video URL" hint="YouTube or Vimeo link" value={g.videoUrl} onChange={(v) => set('pictures.videoUrl', v)} mono />
      <CMSText label="Video placeholder caption" value={g.videoCaption} onChange={(v) => set('pictures.videoCaption', v)} />
      <hr style={hrStyle} />
      {list.map((im, i) => (
        <ItemCard key={im.id || i} title={'Photo ' + (i + 1)} idx={i} count={list.length}
          onUp={() => op.up(i)} onDown={() => op.down(i)} onDelete={() => op.del(i)}>
          <CMSImage label="Photo" value={im.img} onChange={(v) => op.setField(i, 'img', v)} />
          <CMSText label="Caption" value={im.caption} onChange={(v) => op.setField(i, 'caption', v)} />
        </ItemCard>
      ))}
      <AddBtn label="Add photo" onClick={() => op.add({ id: 'g' + Date.now(), caption: 'New photo', img: '' })} />
    </>
  );
}

function SecHead({ title, desc }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 className="display-md" style={{ color: 'var(--navy)', fontSize: 28 }}>{title}</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, margin: '6px 0 0' }}>{desc}</p>
    </div>
  );
}
function AddBtn({ label, onClick }) {
  return <button className="btn btn-ghost" onClick={onClick} style={{ marginTop: 4 }}><Icon name="plus" size={16} /> {label}</button>;
}
const twoCol = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };
const hrStyle = { border: 'none', borderTop: '1px solid var(--line)', margin: '8px 0 22px' };

const CMS_SECTIONS = [
  ['site', 'Site & Footer', 'house', SecSite],
  ['home', 'Home', 'globe', SecHome],
  ['cta', 'Call-to-Action', 'spark', SecCTA],
  ['about', 'About', 'book', SecAbout],
  ['outcomes', 'Get Involved', 'hands', SecOutcomes],
  ['board', 'Our Team', 'users', SecBoard],
  ['regions', 'Where We Work', 'pin', SecRegions],
  ['transparency', 'Transparency', 'shield', SecTransparency],
  ['contact', 'Contact', 'mail', SecContact],
  ['shop', 'Shop', 'cart', SecShop],
  ['gallery', 'Gallery', 'image', SecGallery],
];

function CMSApp() {
  const c = useContent();
  const [active, setActive] = React.useState('site');
  const [flash, setFlash] = React.useState('');
  const importRef = React.useRef(null);
  const Cur = (CMS_SECTIONS.find((s) => s[0] === active) || CMS_SECTIONS[0])[3];

  const notify = (m) => { setFlash(m); setTimeout(() => setFlash(''), 2200); };

  const doExport = () => {
    const blob = new Blob([window.exportContent()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'send-me-project-content.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    notify('Content exported');
  };
  const doImport = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try { window.importContent(JSON.parse(await f.text())); notify('Content imported'); }
    catch (err) { notify('Import failed — invalid file'); }
    e.target.value = '';
  };
  const doReset = () => { if (confirm('Reset ALL content to the original defaults? This clears your edits in this browser.')) { window.resetContent(); notify('Reset to defaults'); } };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--navy)', color: 'var(--on-navy)',
        borderBottom: '3px solid var(--gold)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Emblem size={38} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>CONTENT MANAGER</div>
              <div style={{ fontSize: 12, color: 'var(--on-navy-soft)' }}>Edit your site — changes save automatically in this browser</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {flash && <span style={{ fontSize: 13, color: 'var(--gold-soft)', display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="check" size={15} /> {flash}</span>}
            <button className="btn btn-ghost-light" style={btnSm} onClick={doExport}><Icon name="download" size={15} /> Export</button>
            <button className="btn btn-ghost-light" style={btnSm} onClick={() => importRef.current.click()}><Icon name="upload" size={15} /> Import</button>
            <button className="btn btn-ghost-light" style={btnSm} onClick={doReset}><Icon name="reset" size={15} /> Reset</button>
            <a className="btn btn-gold" style={btnSm} href="#/"><Icon name="eye" size={15} /> View site</a>
            <input ref={importRef} type="file" accept="application/json" onChange={doImport} style={{ display: 'none' }} />
          </div>
        </div>
      </div>

      <div className="cms-body" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 0, maxWidth: 1200, margin: '0 auto' }}>
        {/* section nav */}
        <nav className="cms-nav" style={{ borderRight: '1px solid var(--line)', padding: '24px 14px', alignSelf: 'start', position: 'sticky', top: 78 }}>
          {CMS_SECTIONS.map(([id, label, icon]) => {
            const on = id === active;
            return (
              <button key={id} onClick={() => setActive(id)} style={{
                display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left', font: 'inherit',
                padding: '10px 12px', marginBottom: 3, borderRadius: 6, cursor: 'pointer', border: 'none',
                background: on ? 'var(--navy)' : 'transparent', color: on ? 'var(--on-navy)' : 'var(--ink)',
                fontSize: 14.5, fontWeight: on ? 700 : 500,
              }}>
                <Icon name={icon} size={17} stroke={1.8} /> {label}
              </button>
            );
          })}
        </nav>

        {/* form */}
        <div style={{ padding: 'clamp(24px,4vw,44px)', maxWidth: 760 }}>
          <Cur c={c} />
          <div style={{ marginTop: 32, padding: '16px 18px', background: 'rgba(198,162,76,0.1)', border: '1px solid var(--line-gold)',
            borderRadius: 8, fontSize: 13, color: 'var(--ink-soft)', display: 'flex', gap: 10 }}>
            <Icon name="shield" size={18} stroke={1.8} />
            <span>Edits are saved in <strong>this browser</strong>. Use <strong>Export</strong> to save a backup file or move content to another computer, and <strong>Import</strong> to load it there.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const btnSm = { padding: '9px 15px', fontSize: 13.5 };

Object.assign(window, { CMSApp });
