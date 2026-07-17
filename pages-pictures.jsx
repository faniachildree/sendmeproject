// pages-pictures.jsx

// Turn a YouTube/Vimeo/link into an embeddable URL; returns null if unusable.
function toEmbed(url) {
  if (!url) return null;
  try {
    const u = String(url).trim();
    let m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (m) return 'https://www.youtube.com/embed/' + m[1];
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return 'https://player.vimeo.com/video/' + m[1];
    if (/^https?:\/\//.test(u)) return u;
  } catch (e) {}
  return null;
}

function PicturesPage({ lang }) {
  useReveal();
  const c = useContent();
  const g = c.pictures;
  const embed = toEmbed(g.videoUrl);
  return (
    <div className="page-enter">
      <PageHero eyebrow="Gallery" title={g.heroTitle} slotId="pictures" sub={g.heroSub} />

      {/* video / story */}
      <section className="section paper-bg">
        <div className="wrap">
          <SectionHead eyebrow="Our Story in Motion" title="Watch the mission" center />
          <div className="reveal" style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)',
            background: 'var(--navy)', aspectRatio: '16/9', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
            {embed ? (
              <iframe src={embed} title="Send Me Project video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}></iframe>
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
                <div>
                  <div style={{ color: 'var(--gold-soft)', display: 'flex', justifyContent: 'center', marginBottom: 14 }}><Icon name="play" size={54} stroke={1.4} /></div>
                  <p style={{ color: 'var(--on-navy-soft)', maxWidth: '40ch', margin: '0 auto' }}>{g.videoCaption}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* photo gallery */}
      <section className="section ivory-bg">
        <div className="wrap-wide">
          <SectionHead eyebrow="From the Field" title="Photo gallery" center
            sub="Drag a photo onto any tile to fill it — captions can be edited in the content manager." />
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {(g.images || []).map((im) => (
              <figure key={im.id} className="reveal card" style={{ margin: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--navy-2)' }}>
                  {im.img
                    ? <img src={im.img} alt={im.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <image-slot id={'gallery-' + im.id} shape="rect" fit="cover" placeholder="Drop a photo"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}></image-slot>}
                </div>
                <figcaption style={{ padding: '14px 18px', fontSize: 14, color: 'var(--ink-soft)',
                  display: 'flex', gap: 9, alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold-deep)', flex: 'none' }}><Icon name="image" size={16} stroke={1.8} /></span>
                  {im.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand lang={lang} />
    </div>
  );
}

Object.assign(window, { PicturesPage });
