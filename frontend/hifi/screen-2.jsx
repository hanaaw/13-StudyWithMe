// StudyWithMe hi-fi — Rooms browse (A grid), Create room (B wizard), In-room (B immersive)

// ─────────────────────────────────────────────────────────────
// ROOMS A — card grid
// ─────────────────────────────────────────────────────────────

// Per-room hero "scene" — minimal SVG sketches reflecting the vibe
const RoomScene = ({ kind, height = 140 }) => {
  const bg = {
    cafe:     'linear-gradient(135deg, #f3d4df 0%, #e4b7c6 100%)',
    library:  'linear-gradient(135deg, #ddd2e9 0%, #d0c4e1 100%)',
    forest:   'linear-gradient(135deg, #d8eee2 0%, #8fc7a8 100%)',
    fire:     'linear-gradient(135deg, #fde2c8 0%, #f4b787 100%)',
    pomodoro: 'linear-gradient(135deg, #e4b7c6 0%, #d0c4e1 100%)',
    code:     'linear-gradient(135deg, #d0c4e1 0%, #b8a8d0 100%)',
    exam:     'linear-gradient(135deg, #f4b787 0%, #e58a8a 100%)',
    history:  'linear-gradient(135deg, #e3dce8 0%, #c8c1ce 100%)',
  }[kind];
  return (
    <div style={{ height, background: bg, position: 'relative', overflow: 'hidden' }}>
      {kind === 'cafe' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          {/* window */}
          <rect x="60" y="30" width="80" height="60" fill="none" stroke="#fff" strokeWidth="2" opacity=".7"/>
          <line x1="100" y1="30" x2="100" y2="90" stroke="#fff" strokeWidth="1.5" opacity=".7"/>
          <line x1="60" y1="60" x2="140" y2="60" stroke="#fff" strokeWidth="1.5" opacity=".7"/>
          {/* rain */}
          {Array.from({length: 30}).map((_, i) => (
            <line key={i} x1={20 + (i*7) % 180} y1={(i*13) % 140}
                  x2={15 + (i*7) % 180} y2={20 + (i*13) % 140}
                  stroke="#fff" strokeWidth="1" opacity=".5"/>
          ))}
          {/* coffee */}
          <circle cx="170" cy="115" r="12" fill="#fff" opacity=".4"/>
          <circle cx="170" cy="113" r="8" fill="#a35e7d"/>
        </svg>
      )}
      {kind === 'library' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          {[20, 32, 44, 56, 68].map((x, i) => (
            <rect key={i} x={x} y={40 - i*3} width="10" height={70 + i*3} fill="#fff" opacity={0.4 + i*0.1}/>
          ))}
          {[120, 132, 144, 156, 168].map((x, i) => (
            <rect key={i} x={x} y={50 + i*2} width="10" height={60 - i*2} fill="#fff" opacity={0.4 + i*0.1}/>
          ))}
          <circle cx="100" cy="30" r="14" fill="#fff" opacity=".5"/>
          <path d="M86 30 Q100 14 114 30 Q100 46 86 30 Z" fill="#fff" opacity=".7"/>
        </svg>
      )}
      {kind === 'pomodoro' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="100" cy="70" r="50" fill="#fff" opacity=".25"/>
          <circle cx="100" cy="70" r="38" fill="none" stroke="#fff" strokeWidth="3" opacity=".8"
                  strokeDasharray="239" strokeDashoffset="80" transform="rotate(-90 100 70)"/>
          <text x="100" y="76" fontFamily="VT323, monospace" fontSize="22" fill="#3d212f" textAnchor="middle" fontWeight="700">25:00</text>
        </svg>
      )}
      {kind === 'forest' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <path d="M30 110 L50 60 L70 110 Z" fill="#fff" opacity=".4"/>
          <path d="M40 110 L60 50 L80 110 Z" fill="#fff" opacity=".6"/>
          <path d="M120 110 L140 65 L160 110 Z" fill="#fff" opacity=".5"/>
          <path d="M130 110 L150 55 L170 110 Z" fill="#fff" opacity=".7"/>
          <circle cx="160" cy="35" r="8" fill="#fff" opacity=".8"/>
        </svg>
      )}
      {kind === 'fire' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <rect x="60" y="80" width="80" height="50" fill="#fff" opacity=".3"/>
          <path d="M100 30 Q80 60 90 80 Q100 70 100 60 Q110 70 110 80 Q120 60 100 30 Z" fill="#fff" opacity=".9"/>
          <path d="M100 50 Q90 65 95 78 Q100 73 100 68 Q105 73 105 78 Q110 65 100 50 Z" fill="#cf8447"/>
        </svg>
      )}
      {kind === 'code' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <text x="20" y="50" fontFamily="VT323, monospace" fontSize="14" fill="#fff" opacity=".7">{`const study = () => {`}</text>
          <text x="30" y="70" fontFamily="VT323, monospace" fontSize="14" fill="#fff" opacity=".8">{`focus(25);`}</text>
          <text x="30" y="90" fontFamily="VT323, monospace" fontSize="14" fill="#fff" opacity=".8">{`break(5);`}</text>
          <text x="20" y="110" fontFamily="VT323, monospace" fontSize="14" fill="#fff" opacity=".7">{`}`}</text>
        </svg>
      )}
      {kind === 'exam' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <rect x="50" y="20" width="100" height="105" fill="#fff" opacity=".9" rx="2"/>
          {[40, 55, 70, 85, 100].map((y, i) => <rect key={i} x={60} y={y} width={i === 4 ? 50 : 80} height="3" fill="#cf8447" opacity={i === 4 ? .5 : .8}/>)}
          <text x="100" y="34" fontFamily="VT323, monospace" fontSize="13" fill="#3d212f" textAnchor="middle">EXAM 2026</text>
        </svg>
      )}
      {kind === 'history' && (
        <svg width="100%" height="100%" viewBox="0 0 200 140" style={{ position: 'absolute', inset: 0 }}>
          <path d="M60 30 L140 30 L140 110 L60 110 Z" fill="#fff" opacity=".3"/>
          <path d="M65 35 L135 35 L135 105 L65 105 Z" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".8"/>
          {[50, 60, 70, 80, 90, 100].map((y, i) => <line key={i} x1="70" y1={y} x2={120 - i*5} y2={y} stroke="#fff" strokeWidth="1" opacity=".7"/>)}
        </svg>
      )}
    </div>
  );
};

const roomData = (lang) => [
  { t: tx(lang, 'Café lofi · pluie', 'Lofi café · rain'), subj: tx(lang, 'tout sujet', 'any subject'), n: 23, kind: 'cafe', tag: 'public', friends: 2 },
  { t: tx(lang, 'Pomodoro · maths', 'Pomodoro · math'), subj: tx(lang, 'algèbre, analyse', 'algebra, calculus'), n: 6, kind: 'pomodoro', tag: 'public', friends: 1 },
  { t: tx(lang, 'Bibliothèque calme', 'Quiet library'), subj: tx(lang, 'silence total', 'total silence'), n: 14, kind: 'library', tag: 'public', friends: 0 },
  { t: tx(lang, 'Examens janvier', 'January exams'), subj: tx(lang, 'révisions intenses', 'intense revision'), n: 41, kind: 'exam', tag: 'public', hot: true, friends: 3 },
  { t: tx(lang, 'Forêt · oiseaux', 'Forest · birds'), subj: tx(lang, 'ambiance nature', 'nature ambience'), n: 8, kind: 'forest', tag: 'public', friends: 0 },
  { t: tx(lang, 'Cheminée d\'hiver', 'Winter fireplace'), subj: tx(lang, 'crépitement', 'crackling'), n: 12, kind: 'fire', tag: 'public', friends: 0 },
  { t: tx(lang, 'Code · web dev', 'Code · web dev'), subj: 'js, html, css', n: 7, kind: 'code', tag: 'public', friends: 1 },
  { t: tx(lang, 'Histoire · L1', 'History · L1'), subj: tx(lang, 'antiquité, moyen-âge', 'ancient, medieval'), n: 4, kind: 'history', tag: 'public', friends: 0 },
];

const ScreenRooms = () => {
  const lang = useLang();
  const { setRoute } = React.useContext(RouteCtx);
  const rooms = roomData(lang);
  const [filter, setFilter] = React.useState('all');

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Salles d'" en="Study " />}
          titleEm={<Tx fr="étude" en="rooms" />}
          sub={<span><span className="font-pixel">142</span> {tx(lang, 'étudiants en ligne · trouve ta vibe', 'students online · find your vibe')}</span>}
          action={<Btn kind="primary" icon="plus" onClick={() => setRoute('createroom')}><Tx fr="Créer une salle" en="Create a room" /></Btn>}
        />
        <div className="content">
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
            {[
              { id: 'all',     label: tx(lang, '✦ toutes', '✦ all') },
              { id: 'friends', label: tx(lang, '✿ avec amis', '✿ with friends') },
              { id: 'math',    label: tx(lang, '∑ maths', '∑ math') },
              { id: 'lang',    label: tx(lang, 'A langues', 'A languages') },
              { id: 'code',    label: '⌘ code' },
              { id: 'hum',     label: tx(lang, '◐ sc. humaines', '◐ humanities') },
              { id: 'lofi',    label: '☕ lofi' },
              { id: 'pomo',    label: '◷ pomodoro' },
              { id: 'silent',  label: tx(lang, '✶ silencieuses', '✶ silent') },
            ].map(f => (
              <span key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 'var(--r-pill)',
                  background: filter === f.id ? 'var(--ink-900)' : 'var(--surface)',
                  color: filter === f.id ? 'var(--ink-50)' : 'var(--text-mute)',
                  border: filter === f.id ? '1px solid transparent' : '1px solid var(--border)',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer', userSelect: 'none',
                  transition: 'all .15s',
                }}>{f.label}</span>
            ))}
          </div>

          {/* Sort + count */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--text-mute)' }}>
              <span className="font-pixel" style={{ fontSize: 16, color: 'var(--text)' }}>38</span>{' '}
              <Tx fr="salles trouvées" en="rooms found" />
            </span>
            <div style={{ flex: 1 }} />
            <Seg value="grid" options={[
              { id: 'grid', label: <Icon name="grid" size={13} /> },
              { id: 'list', label: <Icon name="list" size={13} /> },
            ]} />
            <Btn size="sm" kind="ghost" iconRight="next" style={{ marginLeft: 8 }}><Tx fr="activité ▾" en="activity ▾" /></Btn>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {rooms.map((r, i) => (
              <div key={i} onClick={() => setRoute('room')}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)', position: 'relative',
                  transition: 'transform .2s, box-shadow .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                <RoomScene kind={r.kind} />
                {r.hot && (
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <span className="tape">🔥 HOT</span>
                  </div>
                )}
                {r.friends > 0 && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--surface)', borderRadius: 'var(--r-pill)', padding: '3px 8px 3px 4px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex' }}>
                      {['S', 'I', 'Y'].slice(0, r.friends).map((n, k) => (
                        <div key={k} style={{ marginLeft: k ? -6 : 0, boxShadow: '0 0 0 1.5px var(--surface)', borderRadius: '50%' }}>
                          <Av name={n} size={18} palette={k} />
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--pink-700)' }}>
                      {r.friends} <Tx fr="amis" en="friends" />
                    </span>
                  </div>
                )}
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r.t}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-soft)', marginBottom: 10 }}>{r.subj}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="pulse-dot" />
                      <span className="font-pixel" style={{ fontSize: 16, color: 'var(--text)' }}>{r.n}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-soft)' }}><Tx fr="en révision" en="studying" /></span>
                    </div>
                    <Btn size="sm" kind="primary"><Tx fr="entrer" en="join" /></Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// CREATE ROOM B — Step wizard (step 2: vibe + tools + preview)
// ─────────────────────────────────────────────────────────────

const ScreenCreateRoom = () => {
  const lang = useLang();
  const { setRoute } = React.useContext(RouteCtx);
  const [vibe, setVibe] = React.useState('cafe');
  const [tools, setTools] = React.useState({ pomo: true, video: true, chat: true, board: false, todo: true, leader: false, music: true });

  const vibes = [
    { id: 'cafe',     name: tx(lang, 'Café lofi', 'Lofi café'),     sub: tx(lang, 'pluie · jazz doux', 'rain · soft jazz'),     emoji: '☕' },
    { id: 'library',  name: tx(lang, 'Bibliothèque', 'Library'),     sub: tx(lang, 'silence total', 'total silence'),           emoji: '✦' },
    { id: 'forest',   name: tx(lang, 'Forêt', 'Forest'),             sub: tx(lang, 'oiseaux · vent', 'birds · wind'),           emoji: '🌲' },
    { id: 'fire',     name: tx(lang, 'Cheminée', 'Fireplace'),       sub: tx(lang, 'crépitement', 'crackling'),                 emoji: '🔥' },
    { id: 'pomodoro', name: 'Pomodoro',                              sub: tx(lang, 'minuteur structuré', 'structured timer'),   emoji: '◷' },
    { id: 'silence',  name: 'Silence',                               sub: tx(lang, 'aucun son', 'no sound'),                    emoji: '∅' },
  ];
  const toolList = [
    { k: 'pomo',   l: 'Pomodoro 25/5',                            sub: tx(lang, 'cycles focus + pause', 'focus + break cycles'), icon: 'sparkle' },
    { k: 'video',  l: tx(lang, 'Vidéo (caméra)', 'Video (camera)'), sub: tx(lang, 'jusqu\'à 8 caméras', 'up to 8 cameras'),       icon: 'cam' },
    { k: 'chat',   l: tx(lang, 'Chat texte', 'Text chat'),         sub: tx(lang, 'fil de discussion latéral', 'side thread'),    icon: 'chat' },
    { k: 'music',  l: tx(lang, 'Musique lofi', 'Lofi music'),      sub: tx(lang, 'synchronisée pour tous', 'synced for all'),    icon: 'music' },
    { k: 'todo',   l: tx(lang, 'Liste de tâches partagée', 'Shared to-do list'), sub: tx(lang, 'objectifs de session', 'session goals'), icon: 'check' },
    { k: 'board',  l: tx(lang, 'Tableau blanc', 'Whiteboard'),     sub: tx(lang, 'collaboration visuelle', 'visual collab'),     icon: 'edit' },
    { k: 'leader', l: tx(lang, 'Classement temps', 'Time leaderboard'), sub: tx(lang, 'compétition douce', 'gentle competition'), icon: 'trophy' },
  ];

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Configure ta" en="Set up your" />}
          titleEm={<Tx fr="salle ✿" en="room ✿" />}
          sub={<><Tx fr="étape" en="step" /> <span className="font-pixel">2</span> <Tx fr="sur" en="of" /> <span className="font-pixel">3</span></>}
          action={<>
            <Btn icon="prev" onClick={() => setRoute('rooms')}><Tx fr="annuler" en="cancel" /></Btn>
            <Btn kind="primary" iconRight="arrowRight"><Tx fr="continuer" en="continue" /></Btn>
          </>}
        />
        <div className="content">
          {/* Progress steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28, maxWidth: 500 }}>
            {[
              { l: tx(lang, 'l\'essentiel', 'basics'),    done: true },
              { l: tx(lang, 'ambiance',     'vibe'),      active: true },
              { l: tx(lang, 'invitations',  'invites') },
            ].map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: s.done ? 'var(--mint-400)' : s.active ? 'var(--grad-brand)' : 'var(--surface-2)',
                    border: !s.done && !s.active ? '1px solid var(--border)' : 'none',
                    color: s.done || s.active ? 'var(--ink-900)' : 'var(--text-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-pixel)', fontSize: 14, fontWeight: 700,
                  }}>{s.done ? <Icon name="check" size={14} stroke={2.5}/> : i + 1}</div>
                  <span style={{ fontSize: 13.5, fontWeight: s.active ? 600 : 500, color: s.active ? 'var(--text)' : 'var(--text-soft)' }}>{s.l}</span>
                </div>
                {i < 2 && <div style={{ width: 48, height: 2, background: s.done ? 'var(--mint-400)' : 'var(--border)', margin: '0 14px' }} />}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 28 }}>
            {/* Left: choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <section>
                <div style={{ marginBottom: 14 }}>
                  <h3 className="card__title" style={{ fontSize: 22 }}>
                    <Tx fr="1. Choisis l'ambiance" en="1. Pick the vibe" />
                  </h3>
                  <p className="card__sub" style={{ marginBottom: 0 }}>
                    <Tx fr="L'arrière-plan, les sons et la musique de la salle." en="The room's background, sounds and music." />
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {vibes.map(v => (
                    <div key={v.id} onClick={() => setVibe(v.id)}
                      style={{
                        background: vibe === v.id ? 'var(--grad-brand-soft)' : 'var(--surface)',
                        border: '1.5px solid ' + (vibe === v.id ? 'var(--pink-400)' : 'var(--border)'),
                        borderRadius: 'var(--r-lg)',
                        padding: 16, cursor: 'pointer',
                        transition: 'all .15s',
                        position: 'relative',
                      }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{v.emoji}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{v.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-soft)', marginTop: 2 }}>{v.sub}</div>
                      {vibe === v.id && (
                        <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: '50%', background: 'var(--grad-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="check" size={12} stroke={3}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div style={{ marginBottom: 14 }}>
                  <h3 className="card__title" style={{ fontSize: 22 }}>
                    <Tx fr="2. Outils dans la salle" en="2. Tools in the room" />
                  </h3>
                  <p className="card__sub" style={{ marginBottom: 0 }}>
                    <Tx fr="Active ce dont ton groupe a besoin." en="Toggle what your group needs." />
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {toolList.map(t => (
                    <div key={t.k} onClick={() => setTools(s => ({ ...s, [t.k]: !s[t.k] }))}
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid ' + (tools[t.k] ? 'var(--pink-300)' : 'var(--border)'),
                        borderRadius: 'var(--r-md)',
                        padding: '12px 14px',
                        display: 'flex', alignItems: 'center', gap: 12,
                        cursor: 'pointer',
                        boxShadow: tools[t.k] ? '0 0 0 2px var(--pink-100)' : 'none',
                      }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 'var(--r-sm)',
                        background: tools[t.k] ? 'var(--grad-brand)' : 'var(--surface-2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: tools[t.k] ? 'var(--ink-900)' : 'var(--text-soft)',
                        flexShrink: 0,
                      }}>
                        <Icon name={t.icon} size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.l}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>{t.sub}</div>
                      </div>
                      <Switch on={tools[t.k]} />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: live preview */}
            <div style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="eye" size={14} />
                  <span style={{ fontSize: 12, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                    <Tx fr="aperçu en direct" en="live preview" />
                  </span>
                </div>
                <RoomScene kind={vibe} height={180} />
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 }}>
                    <Tx fr="Révision algèbre L2" en="Algebra L2 revision" />
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-soft)', marginBottom: 14 }}>
                    <Tx fr="Sorbonne · DS janvier · 8 places" en="Sorbonne · January exam · 8 seats" />
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {tools.pomo   && <Chip kind="pink">◷ pomodoro</Chip>}
                    {tools.video  && <Chip kind="lav"><Icon name="cam" size={11}/> {tx(lang, 'caméra', 'camera')}</Chip>}
                    {tools.chat   && <Chip kind="mint"><Icon name="chat" size={11}/> chat</Chip>}
                    {tools.music  && <Chip kind="peach"><Icon name="music" size={11}/> lofi</Chip>}
                    {tools.todo   && <Chip kind="pink"><Icon name="check" size={11}/> todo</Chip>}
                    {tools.board  && <Chip kind="lav"><Icon name="edit" size={11}/> {tx(lang, 'tableau', 'board')}</Chip>}
                    {tools.leader && <Chip kind="peach"><Icon name="trophy" size={11}/> {tx(lang, 'classement', 'ranks')}</Chip>}
                  </div>
                  <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon name="link" size={16} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        <Tx fr="lien d'invitation" en="invite link" />
                      </div>
                      <div className="font-pixel" style={{ fontSize: 14, color: 'var(--pink-700)' }}>
                        studywith.me/r/algebra-l2-x9k
                      </div>
                    </div>
                    <Btn size="sm" icon="copy">{tx(lang, 'copier', 'copy')}</Btn>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <Btn icon="prev" block><Tx fr="précédent" en="back" /></Btn>
                <Btn kind="primary" iconRight="check" block><Tx fr="continuer" en="continue" /></Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenRooms, ScreenCreateRoom });
