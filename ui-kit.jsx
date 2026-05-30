// StudyWithMe — wireframe UI kit + bilingual helpers
// Reusable sketchy primitives used by all screen wireframes.

const LangCtx = React.createContext({ lang: 'fr', setLang: () => {} });

// T() — quick bilingual text helper: pass { fr, en } or just a string.
const T = ({ fr, en }) => {
  const { lang } = React.useContext(LangCtx);
  return lang === 'fr' ? fr : en;
};

// Inline string helper (when you need to compose).
const t = (lang, fr, en) => (lang === 'fr' ? fr : en);

// ─── Primitives ───

// W: a wireframe box with optional dashed/fill/highlight variant
const W = ({ as = 'div', kind, style, className = '', children, ...rest }) => {
  const cls = {
    box: 'w-box',
    soft: 'w-box-soft',
    dashed: 'w-box-dashed',
    fill: 'w-box-fill',
    highlight: 'w-box-highlight',
    img: 'w-img',
  }[kind] || 'w-box';
  const Tag = as;
  return <Tag className={`${cls} ${className}`} style={style} {...rest}>{children}</Tag>;
};

// Sketchy button
const WBtn = ({ primary, ghost, children, style, onClick }) => (
  <div
    className={`w-btn ${primary ? 'w-btn-primary' : ''} ${ghost ? 'w-btn-ghost' : ''}`}
    style={style} onClick={onClick}>{children}</div>
);

// Avatar circle
const WAv = ({ initials = 'A', size = 36, style }) => (
  <div className="w-avatar" style={{ width: size, height: size, fontSize: size * 0.45, ...style }}>{initials}</div>
);

// Chip
const WChip = ({ children, fill, style }) => (
  <span className={`w-chip ${fill ? 'w-chip-fill' : ''}`} style={style}>{children}</span>
);

// Text placeholder rows (lorem-ish bars)
const WLines = ({ n = 3, w = ['100%','90%','60%'], gap = 6, height = 6, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
    {Array.from({length:n}).map((_,i)=>(
      <div key={i} className="w-textline" style={{ width: w[i] || (i % 2 === 0 ? '95%' : '70%'), height }} />
    ))}
  </div>
);

// Icon placeholder (simple geometric)
const WIco = ({ shape = 'square', size = 16, color, style }) => {
  const base = { width: size, height: size, color: color || 'currentColor', display: 'inline-block', flexShrink: 0, ...style };
  if (shape === 'circle') return <div className="w-icon w-icon-circle" style={base} />;
  if (shape === 'tri') return <div style={{ ...base, width: 0, height: 0, border: 0, borderLeft: `${size/2}px solid transparent`, borderRight: `${size/2}px solid transparent`, borderBottom: `${size*0.8}px solid currentColor`, color: color || 'currentColor' }} />;
  if (shape === 'star') return <span style={{ ...base, lineHeight: 1, fontSize: size, textAlign: 'center' }}>✦</span>;
  if (shape === 'bell') return <span style={{ ...base, lineHeight: 1, fontSize: size, textAlign: 'center' }}>♪</span>;
  if (shape === 'play') return <div style={{ ...base, width: 0, height: 0, border: 0, borderTop: `${size/2}px solid transparent`, borderBottom: `${size/2}px solid transparent`, borderLeft: `${size}px solid currentColor`, color: color || 'currentColor' }} />;
  return <div className="w-icon" style={base} />;
};

// Annotation post-it style label (red/accent text in a corner)
const WAnno = ({ x, y, children, rotate = -3, color }) => (
  <div className="w-anno" style={{ left: x, top: y, transform: `rotate(${rotate}deg)`, color }}>{children}</div>
);

// Browser chrome (so wireframes look like web app)
const WBrowser = ({ url = 'studywith.me', children, style, theme = 'light' }) => (
  <div className={`w-frame ${theme === 'dark' ? 'dark' : ''}`} style={{ display: 'flex', flexDirection: 'column', ...style }}>
    <div style={{
      height: 32, borderBottom: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center',
      padding: '0 12px', gap: 10, background: 'var(--paper-2)', flexShrink: 0
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.25px solid var(--ink)' }} />
        <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.25px solid var(--ink)' }} />
        <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.25px solid var(--ink)' }} />
      </div>
      <div style={{
        flex: 1, height: 18, border: '1.25px solid var(--ink)', borderRadius: 9,
        padding: '0 12px', display: 'flex', alignItems: 'center', fontFamily: '"Kalam", cursive', fontSize: 11,
        color: 'var(--ink-mute)', background: 'var(--paper)'
      }}>{url}</div>
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

// Top nav for inside the browser (logo + nav links + avatar)
const WTopNav = ({ active = 'home', lang }) => {
  const items = [
    { id: 'home',  fr: 'Accueil',     en: 'Home' },
    { id: 'plan',  fr: 'Planning',    en: 'Planning' },
    { id: 'rooms', fr: 'Salles',      en: 'Rooms' },
    { id: 'disc',  fr: 'Découvrir',   en: 'Discover' },
    { id: 'stats', fr: 'Stats',       en: 'Stats' },
  ];
  return (
    <div className="w-topnav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 18 }}>S</div>
        <div className="w-hand" style={{ fontSize: 22 }}>StudyWithMe</div>
      </div>
      <div style={{ display: 'flex', gap: 22, marginLeft: 24 }}>
        {items.map(it => (
          <div key={it.id} style={{
            fontFamily: 'Kalam, cursive', fontSize: 14,
            color: active === it.id ? 'var(--ink)' : 'var(--ink-mute)',
            fontWeight: active === it.id ? 700 : 400,
            borderBottom: active === it.id ? '2px solid var(--ink)' : '2px solid transparent',
            paddingBottom: 4
          }}>{lang === 'fr' ? it.fr : it.en}</div>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="w-input-box" style={{ width: 180, fontSize: 12, padding: '4px 10px' }}>
          {lang === 'fr' ? '⌕  rechercher…' : '⌕  search…'}
        </div>
        <WIco shape="bell" size={18} />
        <WAv initials="L" size={30} />
      </div>
    </div>
  );
};

// Sidebar nav (alt to topnav)
const WSideNav = ({ active = 'home', lang }) => {
  const items = [
    { id: 'home',  fr: 'Tableau de bord', en: 'Dashboard' },
    { id: 'plan',  fr: 'Planning',        en: 'Planning' },
    { id: 'rooms', fr: 'Salles d\'étude', en: 'Study rooms' },
    { id: 'disc',  fr: 'Découvrir',       en: 'Discover' },
    { id: 'friends',fr:'Amis',            en: 'Friends' },
    { id: 'stats', fr: 'Statistiques',    en: 'Stats' },
    { id: 'set',   fr: 'Réglages',        en: 'Settings' },
  ];
  return (
    <div className="w-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 18 }}>S</div>
        <div className="w-hand" style={{ fontSize: 18 }}>StudyWithMe</div>
      </div>
      <div className="w-line-thin" />
      {items.map(it => (
        <div key={it.id} className={`w-sidebar-item ${active === it.id ? 'active' : ''}`}>
          <WIco shape="square" size={14} />
          {lang === 'fr' ? it.fr : it.en}
        </div>
      ))}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1.25px dashed var(--ink-mute)', borderRadius: 6 }}>
        <WAv initials="L" size={28} />
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12 }}>
          <div style={{ fontWeight: 700 }}>Léa M.</div>
          <div style={{ color: 'var(--ink-mute)', fontSize: 11 }}>{lang === 'fr' ? 'série 12 jours' : '12-day streak'} ✦</div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LangCtx, T, t, W, WBtn, WAv, WChip, WLines, WIco, WAnno, WBrowser, WTopNav, WSideNav });
