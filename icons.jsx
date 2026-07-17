// icons.jsx — line icon set (UI + brand pillars). Stroke = currentColor.
function Icon({ name, size = 24, stroke = 2 }) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const paths = {
    // brand pillars
    serve: <><path d="M3 13c2-2 5-2 7 0 1 1 3 1 4 0l4-3c1-1 3-1 3 1 0 1-1 2-2 3l-6 4c-2 1-4 1-6 0l-4-2"/><path d="M12 8.5c1.6-2.2 5-1 4.3 1.6C16 11.6 12 13 12 13s-4-1.4-4.3-2.9C7 7.5 10.4 6.3 12 8.5Z"/></>,
    empower: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17.5" cy="9" r="2.3"/><path d="M16 13.6a4.6 4.6 0 0 1 5.5 4.4"/></>,
    reach: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></>,
    partner: <><path d="M7 11 4 8l4-4 4 3"/><path d="m13 7 4-3 3 3-3 3"/><path d="m11 9 4 4M9 11l4 4 2-2M5 13l4 4 2-1"/></>,
    transform: <><path d="M3 20h18"/><path d="m6 20 5-13 3 6 2-3 4 10"/><path d="M11 7V3l3 1.5L11 6"/></>,
    // ui
    heart: <path d="M19 5.6c-1.8-1.9-4.8-1-5.6 1.4l-1.4 3.5-1.4-3.5C9.8 4.6 6.8 3.7 5 5.6c-2 2.1-1 5 .8 7L12 18l6.2-5.4c1.8-2 2.8-4.9.8-7Z"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></>,
    cross: <path d="M14 3h-4v6H4v4h6v8h4v-8h6V9h-6z"/>,
    house: <><path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/></>,
    hands: <><path d="M12 11V5a1.6 1.6 0 0 1 3.2 0v5"/><path d="M15.2 9.5V4.5a1.6 1.6 0 0 1 3.2 0V12c0 4-2.8 7-7 7-2.2 0-3.6-.8-4.9-2.2L4 13c-.9-1 .5-2.6 1.7-1.7L8 13V6a1.6 1.6 0 0 1 3.2 0v5"/></>,
    plane: <path d="M21 14 3 21l4-7L3 7l18 7-6 3"/>,
    box: <><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    pin: <><path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></>,
    phone: <path d="M5 4h4l1.5 5-2.2 1.4a12 12 0 0 0 5.3 5.3L15 17.5 20 19v-4-1h-2"/>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    check: <path d="m4 12 5 5L20 6"/>,
    quote: <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3M21 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3"/>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    cart: <><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-4 3 2 4-4 4 4"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    trash: <><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1L18 7"/></>,
    up: <path d="m6 15 6-6 6 6"/>,
    down: <path d="m6 9 6 6 6-6"/>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/></>,
    upload: <><path d="M12 15V3m0 0 4 4m-4-4L8 7"/><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>,
    shield: <><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Z"/><path d="m9 12 2 2 4-4"/></>,
    doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
    chart: <><path d="M4 4v16h16"/><path d="M8 14v3M12 10v7M16 6v11"/></>,
    users: <><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.2A3.2 3.2 0 0 1 18 11M17 14.5a6 6 0 0 1 4 5.5"/></>,
    spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>,
    book: <><path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
    close: <path d="M6 6l12 12M18 6 6 18"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    facebook: <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.2c0-.1.1-.2.2-.2Z"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}
Object.assign(window, { Icon });
