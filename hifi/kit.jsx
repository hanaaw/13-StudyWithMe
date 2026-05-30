// StudyWithMe hi-fi — design system primitives + i18n

const LangCtx = React.createContext({ lang: 'fr', setLang: () => {} });
const ThemeCtx = React.createContext({ theme: 'light', setTheme: () => {} });
const RouteCtx = React.createContext({ route: 'dashboard', setRoute: () => {} });

const useLang = () => React.useContext(LangCtx).lang;
const tx = (lang, fr, en) => (lang === 'fr' ? fr : en);

// Tiny inline-text bilingual helper
const Tx = ({ fr, en }) => {
  const lang = useLang();
  return <>{lang === 'fr' ? fr : en}</>;
};

// ── Logo (pixel notepad SVG, faithful to user's PNG) ──
const Logo = ({ size = 38 }) => (
  <img src="hifi/logo-mark.png" alt="StudyWithMe" width={size} height={size}
       className="pixelated"
       style={{ display: 'block', filter: 'drop-shadow(2px 2px 0 rgba(228,183,198,0.3))' }} />
);

const Wordmark = ({ size = 22, glitch = true }) => (
  <span className="font-pixel" style={{
    fontSize: size,
    lineHeight: 1,
    letterSpacing: 1,
    textShadow: glitch ? '1px 0 0 #e4b7c6, -1px 0 0 #d0c4e1' : 'none',
  }}>STUDYWITHME</span>
);

// ── Icons (inline, minimal, monoline) ──
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const s = size;
  const sw = stroke;
  const paths = {
    home: <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-4v-6h-8v6H4a1 1 0 0 1-1-1v-8.5z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    rooms: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 6V4h8v2M3 12h18"/></>,
    discover: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    friends: <><circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7M17 11a3 3 0 1 0 0-6M22 21c0-3.314-2.239-6-5-6"/></>,
    stats: <><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    play: <path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    next: <path d="m9 6 6 6-6 6"/>,
    prev: <path d="M15 6l-6 6 6 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="m5 12 5 5L20 7"/>,
    x: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    micOff: <><path d="m2 2 20 20"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6M19 10v1a7 7 0 0 1-.11 1.23M17.66 17.66A7 7 0 0 1 5 11M12 18v3"/></>,
    cam: <><path d="m23 7-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    camOff: <><path d="M16 8.43 23 4v13M16 16.5V18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.5M1 1l22 22"/></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    flag: <><path d="M4 22V4a1 1 0 0 1 1-1h12.5a.5.5 0 0 1 .4.8l-3.4 4.6a.5.5 0 0 0 0 .6l3.4 4.6a.5.5 0 0 1-.4.8H4z"/></>,
    music: <><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 18V6l12-2v12"/></>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></>,
    fire: <path d="M12 2s4 5 4 9a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 1 1 2 2 2 0-4 1-8 1-8zM18 17a6 6 0 0 1-12 0c0-1 .5-2 1-3"/>,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 4H4v3a3 3 0 0 0 3 3M17 4h3v3a3 3 0 0 1-3 3"/></>,
    sparkle: <path d="m12 2 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" fill="currentColor" stroke="none"/>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    leaf: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 22s0-7 7-7"/>,
    coffee: <><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></>,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    arrowUp: <><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>,
    handraise: <><path d="M18 11V6a2 2 0 1 0-4 0v4M14 10V4a2 2 0 1 0-4 0v6M10 10.5V6a2 2 0 1 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></>,
    sliders: <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></>,
    google: <path d="M21.35 11.1H12v2.84h5.36c-.24 1.34-1.4 3.94-5.36 3.94-3.22 0-5.86-2.66-5.86-5.94s2.64-5.94 5.86-5.94c1.84 0 3.07.78 3.77 1.46l2.58-2.48C16.79 3.55 14.6 2.5 12 2.5 6.78 2.5 2.5 6.77 2.5 12s4.28 9.5 9.5 9.5c5.48 0 9.12-3.86 9.12-9.26 0-.62-.07-1.1-.17-1.64z" fill="currentColor" stroke="none"/>,
    apple: <path d="M16.5 13.4c-.04-2.66 2.18-3.93 2.28-3.99-1.24-1.82-3.18-2.07-3.86-2.1-1.64-.17-3.21.97-4.04.97-.85 0-2.13-.95-3.5-.92-1.8.03-3.46 1.05-4.39 2.65-1.87 3.24-.48 8.03 1.35 10.66.89 1.29 1.96 2.74 3.36 2.69 1.35-.05 1.86-.87 3.5-.87 1.62 0 2.09.87 3.51.85 1.45-.03 2.37-1.31 3.26-2.61 1.03-1.5 1.45-2.95 1.48-3.03-.03-.01-2.83-1.09-2.87-4.3zM13.85 5.46c.73-.89 1.22-2.12 1.09-3.35-1.05.04-2.33.7-3.08 1.58-.68.78-1.27 2.03-1.11 3.23 1.17.09 2.36-.59 3.1-1.46z" fill="currentColor" stroke="none"/>,
    pin: <><path d="M12 2l7 7-3 3v6l-4-4-4 4v-6L5 9z"/></>,
    layers: <><path d="m12 2-10 5 10 5 10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></>,
    headphones: <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>,
    drag: <><circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="18" r="1.5" fill="currentColor"/><circle cx="15" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="18" r="1.5" fill="currentColor"/></>,
    expand: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.home}
    </svg>
  );
};

// ── Button ──
const Btn = ({ kind, size, icon, iconRight, block, danger, success, children, onClick, style }) => {
  const cls = ['btn'];
  if (kind === 'primary') cls.push('btn--primary');
  if (kind === 'ink')     cls.push('btn--ink');
  if (kind === 'ghost')   cls.push('btn--ghost');
  if (size === 'sm') cls.push('btn--sm');
  if (size === 'lg') cls.push('btn--lg');
  if (size === 'icon') cls.push('btn--icon');
  if (block) cls.push('btn--block');
  if (danger) cls.push('btn--danger');
  if (success) cls.push('btn--success');
  return (
    <button className={cls.join(' ')} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
};

// ── Avatar ──
const palettes = ['', '--lav', '--mint', '--peach'];
const Av = ({ name, size = 36, ring, status, palette }) => {
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  const idx = palette != null ? palette : ((name?.charCodeAt(0) || 0) % palettes.length);
  return (
    <div className={`avatar ${palettes[idx] ? 'avatar' + palettes[idx] : ''} ${ring ? 'avatar--ring' : ''}`}
         style={{ width: size, height: size, fontSize: size * 0.4 }}>
      <span>{initials}</span>
      {status && <span className={`avatar__dot ${status === 'away' ? 'avatar__dot--away' : status === 'off' ? 'avatar__dot--off' : ''}`} />}
    </div>
  );
};

// ── Chip ──
const Chip = ({ kind, lg, dot, children, style, onClick }) => {
  const cls = ['chip'];
  if (kind) cls.push(`chip--${kind}`);
  if (lg) cls.push('chip--lg');
  return (
    <span className={cls.join(' ')} style={style} onClick={onClick}>
      {dot && <span className="chip__dot" style={{ background: dot === true ? 'currentColor' : dot }} />}
      {children}
    </span>
  );
};

// ── Card ──
const Card = ({ kind, title, sub, action, children, style, padding }) => {
  const cls = ['card'];
  if (kind) cls.push(`card--${kind}`);
  return (
    <div className={cls.join(' ')} style={{ ...(padding ? { padding } : {}), ...style }}>
      {(title || action) && (
        <div className="section-title">
          {title && <h3 className="card__title">{title}</h3>}
          {action}
        </div>
      )}
      {sub && <p className="card__sub">{sub}</p>}
      {children}
    </div>
  );
};

// ── Segmented ──
const Seg = ({ options, value, onChange }) => (
  <div className="seg">
    {options.map(o => (
      <div key={o.id} className={`seg__item ${o.id === value ? 'seg__item--active' : ''}`}
           onClick={() => onChange && onChange(o.id)}>{o.label}</div>
    ))}
  </div>
);

// ── Switch ──
const Switch = ({ on, onChange }) => (
  <div className={`switch ${on ? 'switch--on' : ''}`} onClick={() => onChange && onChange(!on)} />
);

// ── Input ──
const Input = ({ label, placeholder, value, type = 'text', lg, multiline, icon }) => (
  <div>
    {label && <label className="label">{label}</label>}
    <div className={`input ${lg ? 'input--lg' : ''}`}>
      {icon && <Icon name={icon} size={16} />}
      {multiline
        ? <textarea defaultValue={value} placeholder={placeholder} rows={3} />
        : <input type={type} defaultValue={value} placeholder={placeholder} />}
    </div>
  </div>
);

// Decorative pixel-art "sticky note" corner (the logo motif applied small)
const StickyAccent = ({ size = 28, color = '#e4b7c6' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className="pixelated">
    <rect x="1" y="2" width="11" height="13" fill={color} stroke="#2a1d36" strokeWidth=".5"/>
    <rect x="2" y="3" width="9" height="1" fill="#fff" opacity=".5"/>
    <rect x="2" y="5" width="6" height="1" fill="#fff" opacity=".5"/>
    <rect x="2" y="7" width="7" height="1" fill="#fff" opacity=".5"/>
    <rect x="2" y="9" width="5" height="1" fill="#fff" opacity=".5"/>
  </svg>
);

Object.assign(window, {
  LangCtx, ThemeCtx, RouteCtx, useLang, tx, Tx,
  Logo, Wordmark, Icon, Btn, Av, Chip, Card, Seg, Switch, Input, StickyAccent,
});
