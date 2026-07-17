// app.jsx — router, tweaks, mount

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "rooted",
  "heroLayout": "split",
  "headFont": "Cormorant Garamond",
  "gold": ["#c6a24c", "#d8be7e", "#a8842f"],
  "navy": ["#0a1838", "#0e2148", "#14305f"]
}/*EDITMODE-END*/;

const GOLD_OPTS = [
  ["#c6a24c", "#d8be7e", "#a8842f"], // classic gold
  ["#b08d3c", "#cdaf6a", "#8f6f23"], // antique brass
  ["#cbab6e", "#e6d1a0", "#a98a4a"], // champagne
  ["#caa64f", "#e2c878", "#9c7c2c"], // warm gold
];

const NAVY_OPTS = [
  ["#0a1838", "#0e2148", "#14305f"], // deep navy (default)
  ["#060f26", "#0a1838", "#102a55"], // midnight
  ["#0e2452", "#143066", "#1d3f7d"], // royal
  ["#0c1c2e", "#102739", "#1a3a52"], // teal-navy
];

function useRoute() {
  const parse = () => {
    const h = (window.location.hash || '').replace(/^#\/?/, '');
    return h.split('/')[0] || '';
  };
  const [route, setRoute] = React.useState(parse());
  React.useEffect(() => {
    const onHash = () => {
      const r = parse();
      setRoute(r);
      // scroll to anchor if present, else top
      const anchor = window.location.hash.split('#')[2];
      if (!anchor) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const route = useRoute();
  const [lang, setLang] = React.useState(() => localStorage.getItem('smp_lang') || 'en');
  const t = useT(lang);

  React.useEffect(() => { localStorage.setItem('smp_lang', lang); }, [lang]);

  // apply themeable vars
  React.useEffect(() => {
    const r = document.documentElement.style;
    const g = tw.gold || GOLD_OPTS[0];
    const n = tw.navy || NAVY_OPTS[0];
    r.setProperty('--gold', g[0]);
    r.setProperty('--gold-soft', g[1]);
    r.setProperty('--gold-deep', g[2]);
    r.setProperty('--navy', n[0]);
    r.setProperty('--navy-2', n[1]);
    r.setProperty('--navy-3', n[2]);
    r.setProperty('--font-head', `'${tw.headFont}', Georgia, serif`);
  }, [tw.gold, tw.navy, tw.headFont]);

  const page = (() => {
    switch (route) {
      case 'about': return <AboutPage t={t} lang={lang} />;
      case 'board': return <BoardPage lang={lang} />;
      case 'projects': return <ProjectsPage lang={lang} />;
      case 'involved': return <InvolvedPage lang={lang} />;
      case 'donate': return <DonatePage t={t} lang={lang} />;
      case 'financials': return <FinancialsPage lang={lang} />;
      case 'contact': return <ContactPage t={t} lang={lang} />;
      case 'shop': return <ShopPage lang={lang} />;
      case 'pictures': return <PicturesPage lang={lang} />;
      default: return <HomePage t={t} tweaks={tw} lang={lang} />;
    }
  })();

  // Full-screen CMS (no site chrome)
  if (route === 'admin') return <CMSApp />;

  return (
    <>
      <Header route={route} lang={lang} setLang={setLang} />
      <main key={route}>{page}</main>
      <Footer lang={lang} setLang={setLang} />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakSelect label="Headline" value={tw.heroVariant}
          options={[
            { value: 'rooted', label: 'Nationally Rooted. Globally Engaged.' },
            { value: 'arkansas', label: 'From Arkansas to the Nations' },
            { value: 'sendhope', label: 'Send Hope. Fund Impact. Change Lives.' },
            { value: 'sendme', label: "Send Me, I'll Go." },
            { value: 'local', label: 'Local Heart. Global Impact.' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)} />
        <TweakRadio label="Layout" value={tw.heroLayout}
          options={[{ value: 'split', label: 'Split' }, { value: 'centered', label: 'Centered' }, { value: 'fullbleed', label: 'Full-bleed' }]}
          onChange={(v) => setTweak('heroLayout', v)} />

        <TweakSection label="Typography" />
        <TweakRadio label="Headline font" value={tw.headFont}
          options={[{ value: 'Cormorant Garamond', label: 'Cormorant' }, { value: 'Playfair Display', label: 'Playfair' }, { value: 'Lora', label: 'Lora' }]}
          onChange={(v) => setTweak('headFont', v)} />

        <TweakSection label="Color" />
        <TweakColor label="Gold accent" value={tw.gold} options={GOLD_OPTS} onChange={(v) => setTweak('gold', v)} />
        <TweakColor label="Navy tone" value={tw.navy} options={NAVY_OPTS} onChange={(v) => setTweak('navy', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
