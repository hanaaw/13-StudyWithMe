// StudyWithMe hi-fi — root app, routing, providers

function App() {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('swm-lang') || 'fr'; } catch { return 'fr'; }
  });
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('swm-theme') || 'light'; } catch { return 'light'; }
  });
  const [route, setRoute] = React.useState(() => {
    try { return localStorage.getItem('swm-route') || 'dashboard'; } catch { return 'dashboard'; }
  });

  React.useEffect(() => { try { localStorage.setItem('swm-lang',  lang); } catch {} }, [lang]);
  React.useEffect(() => {
    try { localStorage.setItem('swm-theme', theme); } catch {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  React.useEffect(() => { try { localStorage.setItem('swm-route', route); } catch {} }, [route]);

  const langCtx  = React.useMemo(() => ({ lang, setLang }),   [lang]);
  const themeCtx = React.useMemo(() => ({ theme, setTheme }), [theme]);
  const routeCtx = React.useMemo(() => ({ route, setRoute }), [route]);

  const SCREENS = {
    signin:        ScreenSignIn,
    dashboard:     ScreenDashboard,
    planning:      ScreenPlanning,
    rooms:         ScreenRooms,
    createroom:    ScreenCreateRoom,
    room:          ScreenInRoom,
    discover:      ScreenDiscover,
    profile:       ScreenProfile,
    stats:         ScreenStats,
    notifications: ScreenNotifications,
    friends:       ScreenDiscover, // alias
  };

  const ScreenComp = SCREENS[route] || ScreenDashboard;

  return (
    <LangCtx.Provider value={langCtx}>
      <ThemeCtx.Provider value={themeCtx}>
        <RouteCtx.Provider value={routeCtx}>
          <ScreenComp />
        </RouteCtx.Provider>
      </ThemeCtx.Provider>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
