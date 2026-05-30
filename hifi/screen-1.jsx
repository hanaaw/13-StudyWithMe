// StudyWithMe hi-fi — Sign-in (B), Dashboard (A), Planning (C kanban)

// ─────────────────────────────────────────────────────────────
// SIGN IN — centered card with floating pixel-cozy decorations
// ─────────────────────────────────────────────────────────────

const ScreenSignIn = () => {
  const lang = useLang();
  const { setRoute } = React.useContext(RouteCtx);
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      {/* floating decorations */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '12%', left: '8%', transform: 'rotate(-10deg)', animation: 'float 6s ease-in-out infinite' }}>
          <StickyAccent size={80} />
        </div>
        <div style={{ position: 'absolute', top: '18%', right: '10%', transform: 'rotate(8deg)', animation: 'float 7s ease-in-out infinite .5s' }}>
          <StickyAccent size={64} color="#d0c4e1" />
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: '12%' }}>
          <span className="tape">SWM ★ 2026</span>
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', transform: 'rotate(-6deg)', animation: 'float 8s ease-in-out infinite 1s' }}>
          <div style={{ width: 100, height: 100, background: 'var(--lav-200)',
            borderRadius: 16, padding: 14, boxShadow: 'var(--shadow-md)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Icon name="coffee" size={22} />
            <div className="font-pixel" style={{ fontSize: 12, color: 'var(--lav-700)' }}>14:32</div>
          </div>
        </div>
        {/* pixel grid speckles */}
        {Array.from({length: 24}).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            width: 4, height: 4,
            background: i % 2 ? '#e4b7c6' : '#d0c4e1',
            opacity: 0.3,
          }} />
        ))}
      </div>

      {/* card */}
      <div style={{
        position: 'relative',
        width: 460,
        background: 'var(--surface)',
        borderRadius: 'var(--r-xl)',
        padding: '40px 44px 36px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
      }}>
        {/* tape on top */}
        <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}>
          <div style={{ background: 'var(--pink-300)', padding: '4px 24px', borderRadius: 4, boxShadow: 'var(--shadow-sm)' }}>
            <span className="font-pixel" style={{ fontSize: 13, color: 'var(--pink-800)', letterSpacing: 1.5 }}>★ HELLO ★</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <Logo size={48} />
          <div>
            <div className="sidebar__wordmark" style={{ fontSize: 24 }}>STUDYWITHME</div>
            <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>
              <Tx fr="révise avec le monde ✿" en="study with the world ✿" />
            </div>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, marginBottom: 4 }}>
          <Tx fr={<>Bon retour, <em style={{ color: 'var(--pink-600)' }}>amie</em> ✿</>} en={<>Welcome <em style={{ color: 'var(--pink-600)' }}>back</em> ✿</>} />
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--text-mute)', marginBottom: 22 }}>
          <Tx fr="continue ta série de 12 jours." en="keep your 12-day streak alive." />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label={tx(lang, 'Email étudiant', 'Student email')} placeholder="lea@univ.fr" value="lea.mansouri@sorbonne-universite.fr" />
          <Input label={tx(lang, 'Mot de passe', 'Password')} placeholder="••••••••" value="••••••••••" type="password" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-mute)', cursor: 'pointer' }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--grad-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-900)' }}>
              <Icon name="check" size={12} stroke={2.5} />
            </span>
            <Tx fr="rester connectée" en="remember me" />
          </label>
          <a style={{ fontSize: 13, color: 'var(--pink-700)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            <Tx fr="oublié ?" en="forgot?" />
          </a>
        </div>

        <Btn kind="primary" block size="lg" iconRight="arrowRight" onClick={() => setRoute('dashboard')}>
          <Tx fr="Se connecter" en="Sign in" />
        </Btn>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1 }}>
            <Tx fr="ou" en="or" />
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Btn icon="google" block><Tx fr="Google" en="Google" /></Btn>
          <Btn icon="apple" block><Tx fr="Apple" en="Apple" /></Btn>
        </div>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-soft)', marginTop: 22 }}>
          <Tx fr="Nouvelle ici ?" en="New here?" />{' '}
          <a style={{ color: 'var(--pink-700)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            <Tx fr="Créer un compte" en="Create an account" />
          </a>
        </div>
      </div>

      <CanvasChrome />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DASHBOARD A — sidebar cozy welcome + module grid
// ─────────────────────────────────────────────────────────────

const ScreenDashboard = () => {
  const lang = useLang();
  const { setRoute } = React.useContext(RouteCtx);

  const sessions = [
    { t: '09:00', l: tx(lang, 'Algèbre — révision DS', 'Algebra — exam prep'), tag: 'solo', dur: '1h 30', done: true },
    { t: '14:00', l: tx(lang, 'Anglais avec Sami & Inès', 'English w/ Sami & Inès'), tag: 'room', dur: '1h 30', done: false, current: true },
    { t: '20:30', l: tx(lang, 'Lecture · chap. 4', 'Reading · ch. 4'), tag: 'solo', dur: '1h', done: false },
  ];
  const friends = [
    { n: 'Sami', sub: tx(lang, 'algèbre · 45 min', 'algebra · 45 min'), s: 'online', pal: 0 },
    { n: 'Inès', sub: tx(lang, 'anglais · 12 min', 'english · 12 min'), s: 'online', pal: 1 },
    { n: 'Yann', sub: tx(lang, 'en pause', 'on break'), s: 'away', pal: 2 },
    { n: 'Marwa', sub: tx(lang, 'salle privée', 'private room'), s: 'online', pal: 3 },
  ];

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Bonsoir," en="Good evening," />}
          titleEm={<>Léa ✿</>}
          sub={<><span className="font-pixel">3</span> {tx(lang, 'sessions ·', 'sessions ·')} <span className="font-pixel">2h 30min</span> {tx(lang, '· série', '· streak')} <span className="font-pixel">12 ✦</span></>}
          action={<Btn kind="primary" icon="play" onClick={() => setRoute('room')}><Tx fr="Démarrer focus 25min" en="Start 25min focus" /></Btn>}
        />
        <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* HERO: continue your session */}
          <div style={{
            background: 'var(--grad-brand)',
            borderRadius: 'var(--r-xl)',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            color: 'var(--ink-900)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* pixel decoration */}
            <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.6, transform: 'rotate(15deg)' }}>
              <StickyAccent size={120} color="#fff" />
            </div>
            <div style={{ position: 'absolute', bottom: -20, right: 80, opacity: 0.5, transform: 'rotate(-8deg)' }}>
              <StickyAccent size={80} color="#fff" />
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div className="font-pixel" style={{ fontSize: 14, letterSpacing: 1.5, opacity: 0.7, marginBottom: 6 }}>
                ✦ <Tx fr="REPRENDRE OÙ TU EN ÉTAIS" en="PICK UP WHERE YOU LEFT OFF" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>
                <Tx fr="« Anglais avec Sami & Inès »" en="“English with Sami & Inès”" />
              </div>
              <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 16 }}>
                <Tx fr="dans 1h 12min · salle partagée · pomodoro 25/5" en="in 1h 12min · shared room · pomodoro 25/5" />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Btn kind="ink" icon="play" onClick={() => setRoute('room')}><Tx fr="Rejoindre" en="Join" /></Btn>
                <Btn onClick={() => setRoute('planning')}><Tx fr="Voir planning" en="View planning" /></Btn>
              </div>
            </div>

            {/* avatars stack */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
              <div style={{ display: 'flex' }}>
                {['S','I','L'].map((n,i) => (
                  <div key={i} style={{ marginLeft: i ? -14 : 0, boxShadow: '0 0 0 3px var(--pink-400)', borderRadius: '50%' }}>
                    <Av name={n} size={52} palette={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GRID row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            {/* Today */}
            <Card
              title={<><Icon name="calendar" size={18} /><Tx fr="Aujourd'hui" en="Today" /></>}
              action={<Btn size="sm" kind="ghost" iconRight="arrowRight" onClick={() => setRoute('planning')}><Tx fr="planning" en="planning" /></Btn>}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {sessions.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 8px',
                    borderTop: i ? '1px dashed var(--border)' : 'none',
                    background: s.current ? 'var(--grad-brand-soft)' : 'transparent',
                    marginLeft: -8, marginRight: -8, paddingLeft: 14, paddingRight: 14,
                    borderRadius: s.current ? 'var(--r-md)' : 0,
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 4,
                      background: s.done ? 'var(--grad-brand)' : 'transparent',
                      border: s.done ? 'none' : '1.5px solid var(--border-strong)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--ink-900)',
                    }}>{s.done && <Icon name="check" size={12} stroke={2.5} />}</span>
                    <div className="font-pixel" style={{ width: 56, fontSize: 18, color: 'var(--text-mute)' }}>{s.t}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, textDecoration: s.done ? 'line-through' : 'none', opacity: s.done ? 0.5 : 1 }}>{s.l}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>{s.dur}</div>
                    </div>
                    <Chip kind={s.tag === 'room' ? 'lav' : 'pink'}>{s.tag === 'room' ? <><Icon name="rooms" size={11}/>{tx(lang, 'salle', 'room')}</> : <><Icon name="user" size={11}/>solo</>}</Chip>
                    {s.current && <Btn size="sm" kind="primary" icon="play" onClick={() => setRoute('room')}>{tx(lang, 'rejoindre', 'join')}</Btn>}
                  </div>
                ))}
              </div>
            </Card>

            {/* Friends */}
            <Card
              title={<><Icon name="friends" size={18} /><Tx fr="Amis · en révision" en="Friends · studying" /></>}
              action={<span className="font-pixel" style={{ fontSize: 18, color: 'var(--mint-600)' }}>4</span>}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {friends.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Av name={f.n} size={36} status={f.s} palette={f.pal} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{f.n}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-soft)' }}>{f.sub}</div>
                    </div>
                    <Btn size="sm">{tx(lang, 'rejoindre', 'join')}</Btn>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* GRID row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            {/* Recommended rooms */}
            <Card
              title={<><Icon name="sparkle" size={18} /><Tx fr="Salles recommandées" en="Recommended rooms" /></>}
              action={<Btn size="sm" kind="ghost" iconRight="arrowRight" onClick={() => setRoute('rooms')}>{tx(lang, 'tout voir', 'see all')}</Btn>}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { t: tx(lang, 'Bibliothèque calme', 'Quiet library'), n: 14, m: '✦', c: 'var(--lav-200)', sub: tx(lang, 'silence total', 'total silence') },
                  { t: tx(lang, 'Pomodoro · maths', 'Pomodoro · math'), n: 6,  m: '◷', c: 'var(--pink-200)', sub: '25/5 · ∑' },
                  { t: tx(lang, 'Café d\'examens', 'Exam café'), n: 23, m: '☕', c: 'var(--peach-200)', sub: tx(lang, 'lofi · pluie', 'lofi · rain') },
                ].map((r, i) => (
                  <div key={i} style={{
                    background: r.c, borderRadius: 'var(--r-md)', padding: 14, cursor: 'pointer',
                    transition: 'transform .15s',
                  }} onClick={() => setRoute('room')}>
                    <div style={{ fontSize: 30, marginBottom: 10 }}>{r.m}</div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink-900)' }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-700)', opacity: 0.7, marginTop: 2 }}>{r.sub}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                      <div className="pulse-dot" />
                      <span className="font-pixel" style={{ fontSize: 13, color: 'var(--ink-900)' }}>{r.n}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly stats */}
            <Card
              kind="lav"
              title={<><Tx fr="Cette semaine" en="This week" /></>}
              action={<Chip kind="ink"><span className="font-pixel">+2h</span></Chip>}
            >
              <div className="font-pixel" style={{ fontSize: 46, lineHeight: 1, marginBottom: 14, color: 'var(--ink-900)' }}>8h 24m</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 70, marginBottom: 8 }}>
                {[60, 40, 90, 70, 30, 50, 20].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 2 ? 'var(--ink-900)' : 'var(--lav-500)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    {i === 2 && <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'var(--ink-900)' }} className="font-pixel">max</div>}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-700)', opacity: 0.7 }}>
                {(lang === 'fr' ? ['L','M','M','J','V','S','D'] : ['M','T','W','T','F','S','S']).map((d,i)=><span key={i}>{d}</span>)}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PLANNING C — Kanban board
// ─────────────────────────────────────────────────────────────

const ScreenPlanning = () => {
  const lang = useLang();
  const [view, setView] = React.useState('kanban');

  const cols = [
    { id: 'today', title: tx(lang, "Aujourd'hui", 'Today'), kind: 'pink', items: [
      { t: tx(lang, 'Algèbre · révision DS', 'Algebra · exam prep'), sub: '09:00 · 1h30 · ∑', tag: 'solo', subj: 'pink', done: true },
      { t: tx(lang, 'Anglais (Sami + Inès)', 'English (Sami + Inès)'), sub: '14:00 · 1h30 · A', tag: 'room', subj: 'lav', current: true },
      { t: tx(lang, 'Lecture · chap. 4', 'Reading · ch. 4'), sub: '20:30 · 1h · ✦', tag: 'solo', subj: 'mint' },
    ]},
    { id: 'week', title: tx(lang, 'Cette semaine', 'This week'), kind: 'lav', items: [
      { t: tx(lang, 'Histoire · ch. 2', 'History · ch. 2'), sub: tx(lang, 'mer · 16:00', 'wed · 16:00'), tag: 'solo', subj: 'peach' },
      { t: tx(lang, 'Stats · TD', 'Stats · TD'), sub: tx(lang, 'jeu · 10:00', 'thu · 10:00'), tag: 'solo', subj: 'lav' },
      { t: tx(lang, 'Examens janv.', 'Jan exams'), sub: tx(lang, 'ven · 18:00 — gros groupe', 'fri · 18:00 — big group'), tag: 'room', subj: 'pink' },
      { t: tx(lang, 'Vocabulaire EN', 'EN vocab'), sub: tx(lang, 'sam · 11:00', 'sat · 11:00'), tag: 'solo', subj: 'mint' },
    ]},
    { id: 'later', title: tx(lang, 'Plus tard', 'Later'), kind: 'mint', items: [
      { t: tx(lang, 'Préparer DS algèbre', 'Prep algebra exam'), sub: tx(lang, '+ 2 semaines · 3 séances', '+2 weeks · 3 sessions'), tag: 'solo', subj: 'pink' },
      { t: tx(lang, 'Lire Bourdieu (ch. 1-3)', 'Read Bourdieu (ch. 1-3)'), sub: tx(lang, 'décembre', 'december'), tag: 'solo', subj: 'peach' },
    ]},
    { id: 'done', title: tx(lang, 'Terminé', 'Done'), kind: 'peach', items: [
      { t: tx(lang, 'Stats · ch. 1', 'Stats · ch. 1'), sub: tx(lang, 'hier · 1h · ✓', 'yesterday · 1h · ✓'), tag: 'solo', subj: 'lav', done: true },
      { t: tx(lang, 'Anglais · 30min', 'English · 30min'), sub: tx(lang, 'hier · pomodoro · ✓', 'yesterday · pomodoro · ✓'), tag: 'solo', subj: 'mint', done: true },
      { t: tx(lang, 'Histoire · ch. 1', 'History · ch. 1'), sub: tx(lang, 'lun · 45min · ✓', 'mon · 45min · ✓'), tag: 'solo', subj: 'peach', done: true },
    ]},
  ];

  const subjBg = { pink: 'var(--pink-200)', lav: 'var(--lav-200)', mint: 'var(--mint-200)', peach: 'var(--peach-200)' };
  const subjFg = { pink: 'var(--pink-800)', lav: 'var(--lav-700)', mint: 'var(--mint-600)', peach: 'var(--peach-600)' };

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Mon" en="My" />}
          titleEm={<Tx fr="tableau" en="board" />}
          sub={<span><Tx fr="organise tes sessions · " en="organise your sessions · " /><span className="font-pixel">12</span> {tx(lang, 'à venir', 'upcoming')}</span>}
          action={<>
            <Seg value={view} onChange={setView} options={[
              { id: 'cal', label: tx(lang, 'calendrier', 'calendar') },
              { id: 'kanban', label: 'kanban' },
            ]} />
            <Btn kind="primary" icon="plus"><Tx fr="Nouvelle session" en="New session" /></Btn>
          </>}
        />
        <div className="content">
          {/* Quick filter row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
              <Tx fr="matières" en="subjects" />
            </span>
            {[
              { c: 'pink', l: tx(lang, 'Algèbre', 'Algebra'), on: true },
              { c: 'lav', l: tx(lang, 'Anglais', 'English'), on: true },
              { c: 'mint', l: tx(lang, 'Lecture', 'Reading'), on: true },
              { c: 'peach', l: tx(lang, 'Histoire', 'History'), on: false },
              { c: 'lav', l: 'Stats', on: false },
            ].map((s, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 'var(--r-pill)',
                background: s.on ? subjBg[s.c] : 'transparent',
                color: s.on ? subjFg[s.c] : 'var(--text-soft)',
                border: s.on ? 'none' : '1px dashed var(--border-strong)',
                fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
                opacity: s.on ? 1 : 0.6,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'currentColor', opacity: 0.7 }} />
                {s.l}
              </span>
            ))}
            <div style={{ flex: 1 }} />
            <Btn size="sm" icon="filter"><Tx fr="filtres" en="filters" /></Btn>
            <Btn size="sm" icon="layers"><Tx fr="Google Calendar" en="Google Calendar" /></Btn>
          </div>

          {/* Kanban columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {cols.map(c => (
              <div key={c.id} style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: 14,
                display: 'flex', flexDirection: 'column', gap: 10,
                minHeight: 500,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 4px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: subjBg[c.kind] }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, flex: 1 }}>{c.title}</span>
                  <span className="font-pixel" style={{ fontSize: 15, color: 'var(--text-soft)' }}>{c.items.length}</span>
                </div>

                {c.items.map((it, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid ${subjFg[it.subj]}`,
                    borderRadius: 'var(--r-md)',
                    padding: 12,
                    boxShadow: it.current ? '0 0 0 2px var(--pink-400)' : 'var(--shadow-xs)',
                    cursor: 'grab',
                    opacity: it.done ? 0.65 : 1,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, flex: 1, textDecoration: it.done ? 'line-through' : 'none' }}>{it.t}</div>
                      <Chip kind={it.tag === 'room' ? 'lav' : 'pink'}>{it.tag}</Chip>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{it.sub}</span>
                      {it.current && <Chip kind="solid" lg={false}>● live</Chip>}
                    </div>
                    {it.tag === 'room' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                        {['S','I'].map((n, k) => <div key={k} style={{ marginLeft: k ? -8 : 0 }}><Av name={n} size={20} palette={k} /></div>)}
                      </div>
                    )}
                  </div>
                ))}
                <Btn kind="ghost" size="sm" icon="plus" block><Tx fr="ajouter" en="add" /></Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenSignIn, ScreenDashboard, ScreenPlanning });
