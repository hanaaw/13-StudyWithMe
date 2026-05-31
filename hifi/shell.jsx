// StudyWithMe hi-fi — app shell (sidebar + topbar)

const Sidebar = () => {
  const { route, setRoute } = React.useContext(RouteCtx);
  const lang = useLang();

  const navItems = [
    { id: 'dashboard',     icon: 'home',     fr: 'Accueil',          en: 'Home' },
    { id: 'planning',      icon: 'calendar', fr: 'Planning',         en: 'Planning' },
    { id: 'rooms',         icon: 'rooms',    fr: 'Salles d\'étude',  en: 'Study rooms', count: '12' },
    { id: 'discover',      icon: 'discover', fr: 'Découvrir',        en: 'Discover' },
    { id: 'friends',       icon: 'friends',  fr: 'Amis',             en: 'Friends',     count: '4' },
    { id: 'stats',         icon: 'stats',    fr: 'Statistiques',     en: 'Stats' },
  ];
  const sub = [
    { id: 'notifications', icon: 'bell',     fr: 'Notifications',    en: 'Notifications', count: '3' },
    { id: 'profile',       icon: 'settings', fr: 'Réglages',         en: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <Logo size={42} />
        <div>
          <div className="sidebar__wordmark">SWM</div>
          <div style={{ fontSize: 10.5, color: 'var(--text-soft)', marginTop: 2, letterSpacing: 0.5 }}>
            <Tx fr="étudie. ensemble." en="study. together." />
          </div>
        </div>
      </div>

      <div className="sidebar__group">
        <div className="sidebar__sub"><Tx fr="navigation" en="navigation" /></div>
        {navItems.map(it => (
          <div key={it.id} className={`nav-item ${route === it.id ? 'nav-item--active' : ''}`}
               onClick={() => setRoute(it.id)}>
            <span className="nav-item__icon"><Icon name={it.icon} size={17} /></span>
            <span>{lang === 'fr' ? it.fr : it.en}</span>
            {it.count && <span className="nav-item__count">{it.count}</span>}
          </div>
        ))}
      </div>

      <div className="sidebar__group">
        <div className="sidebar__sub"><Tx fr="moi" en="me" /></div>
        {sub.map(it => (
          <div key={it.id} className={`nav-item ${route === it.id ? 'nav-item--active' : ''}`}
               onClick={() => setRoute(it.id)}>
            <span className="nav-item__icon"><Icon name={it.icon} size={17} /></span>
            <span>{lang === 'fr' ? it.fr : it.en}</span>
            {it.count && <span className="nav-item__count">{it.count}</span>}
          </div>
        ))}
      </div>

      {/* Mini streak / promo */}
      <div style={{
        background: 'var(--grad-brand-soft)',
        borderRadius: 'var(--r-lg)',
        padding: 14,
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span className="sparkle">✦</span>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-soft)', fontWeight: 600 }}>
            <Tx fr="série en cours" en="current streak" />
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="font-pixel" style={{ fontSize: 38, lineHeight: 1, color: 'var(--ink-900)' }}>12</span>
          <span style={{ fontSize: 12, color: 'var(--text-mute)' }}><Tx fr="jours" en="days" /></span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 4 }}>
          <Tx fr="+3 jours pour le badge ✿" en="+3 days for the ✿ badge" />
        </div>
      </div>

      <div className="sidebar__user">
        <Av name="Léa Mansouri" size={36} status="online" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sidebar__user-name">Léa M.</div>
          <div className="sidebar__user-sub">
            <span className="font-pixel">L2</span> · Sorbonne
          </div>
        </div>
      </div>
    </aside>
  );
};

// Top bar (search + title + theme/lang toggles)
const TopBar = ({ title, titleEm, sub, action }) => {
  const { theme, setTheme } = React.useContext(ThemeCtx);
  const { lang, setLang } = React.useContext(LangCtx);

  return (
    <div className="topbar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 className="topbar__title">
          {title}
          {titleEm && <span className="em"> {titleEm}</span>}
        </h1>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--text-soft)' }}>{sub}</div>}
      </div>
      <div className="topbar__spacer" />

      <div className="search">
        <Icon name="discover" size={15} />
        <input placeholder={tx(lang, 'rechercher matières, salles, amis…', 'search subjects, rooms, friends…')} />
        <span className="font-pixel" style={{ color: 'var(--text-soft)', fontSize: 13 }}>⌘K</span>
      </div>

      {action}

      <Btn size="icon" kind="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={16} />
      </Btn>

      <div onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
           style={{
             padding: '6px 10px',
             border: '1px solid var(--border)',
             borderRadius: 'var(--r-pill)',
             fontFamily: 'var(--font-pixel)',
             fontSize: 16,
             cursor: 'pointer',
             userSelect: 'none',
             background: 'var(--surface)',
             color: 'var(--text)',
             letterSpacing: 1,
             minWidth: 50,
             textAlign: 'center',
           }}>
        {lang.toUpperCase()}
      </div>
    </div>
  );
};

// Top-right canvas chrome — only used when there's no shell
const CanvasChrome = ({ showRoute = true }) => {
  const { theme, setTheme } = React.useContext(ThemeCtx);
  const { lang, setLang } = React.useContext(LangCtx);
  const { route, setRoute } = React.useContext(RouteCtx);

  const routes = [
    { id: 'signin',        label: tx(lang, 'Connexion',      'Sign in') },
    { id: 'dashboard',     label: tx(lang, 'Accueil',        'Home') },
    { id: 'planning',      label: tx(lang, 'Planning',       'Planning') },
    { id: 'rooms',         label: tx(lang, 'Salles',         'Rooms') },
    { id: 'createroom',    label: tx(lang, 'Créer salle',    'Create room') },
    { id: 'room',          label: tx(lang, 'Session salle',  'In-room session') },
    { id: 'discover',      label: tx(lang, 'Découvrir',      'Discover') },
    { id: 'profile',       label: tx(lang, 'Profil',         'Profile') },
    { id: 'stats',         label: tx(lang, 'Stats',          'Stats') },
    { id: 'notifications', label: tx(lang, 'Notifications',  'Notifications') },
  ];

  return (
    <div className="canvas-bar">
      {showRoute && <>
        <span className="canvas-bar__label">▸</span>
        <select value={route} onChange={(e) => setRoute(e.target.value)}>
          {routes.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
        <div className="canvas-bar__divider" />
      </>}
      <Btn size="icon" kind="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={15} />
      </Btn>
      <div onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        style={{
          fontFamily: 'var(--font-pixel)', fontSize: 16, cursor: 'pointer',
          padding: '2px 10px', borderRadius: 'var(--r-pill)', background: 'var(--surface-2)',
          letterSpacing: 1, userSelect: 'none',
        }}>{lang.toUpperCase()}</div>
    </div>
  );
};

Object.assign(window, { Sidebar, TopBar, CanvasChrome });
