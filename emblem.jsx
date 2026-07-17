// emblem.jsx — Send Me Project logo (real brand asset)
// White lockup on transparent; navy recolor for light backgrounds.

const LOGO = {
  globeWhite: 'assets/logo-globe-white.png',
  globeNavy:  'assets/logo-globe-navy.png',
  fullWhite:  'assets/logo-full-white.png',
  fullNavy:   'assets/logo-full-navy.png',
};

// Globe emblem only (near-square). dark = navy version for light backgrounds.
function Emblem({ size = 64, dark = false, ring }) {
  return (
    <img
      src={dark ? LOGO.globeNavy : LOGO.globeWhite}
      alt="Send Me Project emblem"
      width={size} height={size}
      style={{ display: 'block', width: size, height: size, objectFit: 'contain', flex: 'none' }}
    />
  );
}

// Full stacked lockup (globe + SEND ME + PROJECT).
function LogoFull({ height = 120, dark = false, style = {} }) {
  // intrinsic ratio ~1642 x 1335
  const w = Math.round(height * (1642 / 1335));
  return (
    <img
      src={dark ? LOGO.fullNavy : LOGO.fullWhite}
      alt="Send Me Project"
      width={w} height={height}
      style={{ display: 'block', height, width: 'auto', objectFit: 'contain', ...style }}
    />
  );
}

// Lockup: emblem + typeset wordmark beside/under it (kept for flexible header/footer use)
function Lockup({ size = 'md', stacked = true, light = true }) {
  const scale = { sm: 0.8, md: 1, lg: 1.5, xl: 2.1 }[size] || 1;
  const emblemSize = stacked ? 58 * scale : 46 * scale;
  return (
    <div style={{
      display: 'flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: 'center',
      gap: stacked ? 12 * scale : 14 * scale,
    }}>
      <Emblem size={emblemSize} dark={!light} />
      <Wordmark scale={scale} light={light} />
    </div>
  );
}

function Wordmark({ scale = 1, light = true }) {
  const main = light ? 'var(--on-navy)' : 'var(--navy)';
  return (
    <div style={{ textAlign: 'center', lineHeight: 1 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 30 * scale, letterSpacing: '0.06em',
        color: main, whiteSpace: 'nowrap',
      }}>
        SEND ME
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8 * scale, marginTop: 5 * scale,
      }}>
        <span style={{ height: 1, width: 18 * scale, background: light ? 'var(--on-navy)' : 'var(--navy)' }}></span>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 11.5 * scale, letterSpacing: '0.42em',
          color: main, paddingLeft: '0.42em',
        }}>PROJECT</span>
        <span style={{ height: 1, width: 18 * scale, background: light ? 'var(--on-navy)' : 'var(--navy)' }}></span>
      </div>
    </div>
  );
}

Object.assign(window, { Emblem, LogoFull, Lockup, Wordmark, LOGO });
