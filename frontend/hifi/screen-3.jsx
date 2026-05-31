// StudyWithMe hi-fi — In-room B (Immersive lofi café scene)
// Full-bleed: animated cafe scene background, floating pomodoro & video strip,
// lofi music player, todo list, controls dock.

// ── Animated cafe-window scene background ──
const CafeScene = () => (
  <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
       style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3d2c4b"/>
        <stop offset="50%" stopColor="#5a4267"/>
        <stop offset="100%" stopColor="#a35e7d"/>
      </linearGradient>
      <linearGradient id="indoor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3d212f"/>
        <stop offset="100%" stopColor="#2a1d36"/>
      </linearGradient>
      <radialGradient id="lamp" cx="0.5" cy="0.3" r="0.5">
        <stop offset="0%" stopColor="#f4b787" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#f4b787" stopOpacity="0"/>
      </radialGradient>
      <pattern id="windowTile" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="url(#sky)"/>
      </pattern>
    </defs>

    {/* indoor floor & walls */}
    <rect width="1440" height="900" fill="url(#indoor)"/>

    {/* big window left */}
    <rect x="60" y="60" width="500" height="500" fill="url(#sky)" stroke="#e4b7c6" strokeWidth="3" opacity="0.95"/>
    {/* mullions */}
    <line x1="310" y1="60" x2="310" y2="560" stroke="#e4b7c6" strokeWidth="3" opacity="0.7"/>
    <line x1="60" y1="310" x2="560" y2="310" stroke="#e4b7c6" strokeWidth="3" opacity="0.7"/>

    {/* moon */}
    <circle cx="180" cy="180" r="42" fill="#fdf6f9" opacity="0.95"/>
    <circle cx="200" cy="170" r="38" fill="#3d2c4b" opacity="0.4"/>

    {/* rain streaks (long) */}
    {Array.from({length: 60}).map((_, i) => (
      <line key={i}
        x1={70 + (i * 8) % 480}
        y1={70 + (i * 19) % 480}
        x2={62 + (i * 8) % 480}
        y2={110 + (i * 19) % 480}
        stroke="#fff" strokeWidth="1.5" opacity="0.45"/>
    ))}

    {/* rain droplets on glass */}
    {Array.from({length: 12}).map((_, i) => (
      <circle key={i} cx={90 + (i*43) % 460} cy={80 + (i*61) % 470} r={1.5 + i%3} fill="#fff" opacity="0.55"/>
    ))}

    {/* lamp glow right */}
    <ellipse cx="1180" cy="120" rx="200" ry="200" fill="url(#lamp)" />

    {/* hanging lamp */}
    <line x1="1180" y1="0" x2="1180" y2="80" stroke="#e4b7c6" strokeWidth="2" opacity="0.6"/>
    <path d="M 1140 80 L 1220 80 L 1205 130 L 1155 130 Z" fill="#e4b7c6" opacity="0.8" stroke="#a35e7d" strokeWidth="2"/>
    <ellipse cx="1180" cy="135" rx="30" ry="6" fill="#f4b787" opacity="0.9"/>

    {/* desk / horizon line */}
    <rect x="0" y="640" width="1440" height="260" fill="#2a1d36" opacity="0.95"/>
    <line x1="0" y1="640" x2="1440" y2="640" stroke="#e4b7c6" strokeWidth="2" opacity="0.5"/>

    {/* desk objects: books stack left of window */}
    <g transform="translate(700, 560)">
      <rect x="0" y="0" width="60" height="80" fill="#e4b7c6" opacity="0.8" stroke="#3d212f" strokeWidth="2"/>
      <rect x="10" y="-15" width="60" height="80" fill="#d0c4e1" opacity="0.8" stroke="#3d212f" strokeWidth="2"/>
      <rect x="20" y="-35" width="60" height="80" fill="#fde2c8" opacity="0.8" stroke="#3d212f" strokeWidth="2"/>
      <rect x="22" y="-25" width="56" height="5" fill="#cf8447" opacity="0.5"/>
    </g>

    {/* coffee mug right */}
    <g transform="translate(950, 540)">
      <ellipse cx="50" cy="100" rx="50" ry="8" fill="#3d2c4b" opacity="0.6"/>
      <path d="M 10 30 L 90 30 L 85 100 L 15 100 Z" fill="#fdf6f9" opacity="0.9" stroke="#3d212f" strokeWidth="2"/>
      <path d="M 90 45 Q 115 45 115 65 Q 115 85 90 85" fill="none" stroke="#3d212f" strokeWidth="2.5"/>
      <ellipse cx="50" cy="35" rx="40" ry="4" fill="#6d3e55"/>
      {/* steam */}
      <path d="M 35 25 Q 30 10 40 0 Q 50 -10 45 -20" stroke="#fdf6f9" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M 55 25 Q 60 12 50 0 Q 40 -10 55 -20" stroke="#fdf6f9" strokeWidth="1.5" fill="none" opacity="0.6"/>
    </g>

    {/* plant far right */}
    <g transform="translate(1280, 480)">
      <rect x="0" y="100" width="80" height="60" fill="#d0c4e1" stroke="#3d212f" strokeWidth="2"/>
      <path d="M 40 100 C 20 50, 5 30, 15 0 M 40 100 C 60 50, 75 30, 65 0 M 40 100 L 40 10" stroke="#8fc7a8" strokeWidth="3" fill="none"/>
      <ellipse cx="25" cy="25" rx="15" ry="8" fill="#8fc7a8" opacity="0.9"/>
      <ellipse cx="55" cy="25" rx="15" ry="8" fill="#8fc7a8" opacity="0.9"/>
      <ellipse cx="40" cy="0" rx="12" ry="6" fill="#8fc7a8" opacity="0.9"/>
    </g>

    {/* pixel sparkles drifting */}
    {Array.from({length: 30}).map((_, i) => (
      <rect key={i}
        x={(i * 71) % 1440}
        y={50 + (i * 47) % 550}
        width="3" height="3"
        fill={i % 2 ? "#e4b7c6" : "#d0c4e1"}
        opacity={0.3 + (i % 5) * 0.1}/>
    ))}
  </svg>
);

// ── Member video tile (in floating strip) ──
const VideoTile = ({ name, time, palette, focused, mic = true, cam = true, mine }) => (
  <div style={{
    width: 140, height: 105,
    background: cam ? `linear-gradient(135deg, ${palette === 1 ? '#d0c4e1' : palette === 2 ? '#8fc7a8' : palette === 3 ? '#f4b787' : '#e4b7c6'}, #3d2c4b)` : 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    border: focused ? '2px solid #e4b7c6' : '1px solid rgba(255,255,255,0.2)',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    backdropFilter: cam ? 'none' : 'blur(20px)',
  }}>
    {cam ? (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 50, color: 'rgba(255,255,255,0.7)' }}>
        {name[0]}
      </div>
    ) : (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Av name={name} size={42} palette={palette} />
      </div>
    )}
    {focused && (
      <div style={{ position: 'absolute', top: 6, left: 6, background: 'var(--pink-400)', color: 'var(--ink-900)', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Icon name="sparkle" size={10} /> focus
      </div>
    )}
    <div style={{ position: 'absolute', bottom: 6, left: 6, display: 'flex', alignItems: 'center', gap: 4,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '2px 8px' }}>
      {!mic && <Icon name="micOff" size={10} />}
      <span style={{ color: '#fff', fontSize: 11, fontWeight: 500 }}>{name}{mine ? ' (you)' : ''}</span>
    </div>
    <div className="font-pixel" style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 4, padding: '1px 6px', color: '#fff', fontSize: 13 }}>{time}</div>
  </div>
);

const ScreenInRoom = () => {
  const lang = useLang();
  const { setRoute, setTheme } = React.useContext(RouteCtx);
  const themeCtx = React.useContext(ThemeCtx);
  // Force-dark while in immersive mode for atmosphere
  React.useEffect(() => {
    const prev = themeCtx.theme;
    themeCtx.setTheme('dark');
    return () => themeCtx.setTheme(prev);
  // eslint-disable-next-line
  }, []);

  const [mic, setMic] = React.useState(true);
  const [cam, setCam] = React.useState(true);
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      background: '#160f1f', color: '#f3ecf2', fontFamily: 'var(--font-ui)',
    }}>
      <CafeScene />

      {/* TOP BAR */}
      <div style={{
        position: 'absolute', top: 20, left: 24, right: 24, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          background: 'rgba(33,26,44,0.7)', backdropFilter: 'blur(20px)',
          borderRadius: 'var(--r-pill)', padding: '8px 16px 8px 10px',
          display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid rgba(228,183,198,0.2)',
        }}>
          <Logo size={28} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.1 }}>
              <Tx fr="Café lofi · pluie" en="Lofi café · rain" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
              <div className="pulse-dot" />
              <Tx fr="23 étudiants · session 47:21" en="23 students · session 47:21" />
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Pomodoro center pill */}
        <div style={{
          background: 'rgba(228,183,198,0.15)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(228,183,198,0.3)',
          borderRadius: 'var(--r-pill)', padding: '8px 22px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5 }}>focus</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="timer" style={{ fontSize: 38, lineHeight: 1, color: '#fff' }}>14:32</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>cycle 2/4</span>
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />
          <button onClick={() => {}} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <Icon name="pause" size={18} />
          </button>
        </div>

        <div style={{ flex: 1 }} />

        <button onClick={() => {}}
          style={{
            background: 'rgba(33,26,44,0.7)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(228,183,198,0.2)', color: '#fff',
            borderRadius: 'var(--r-pill)', padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}>
          <Icon name="share" size={14} />
          <Tx fr="inviter" en="invite" />
        </button>
        <button onClick={() => setRoute('dashboard')}
          style={{
            background: 'rgba(229,138,138,0.2)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(229,138,138,0.4)', color: '#ffc4c4',
            borderRadius: 'var(--r-pill)', padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}>
          <Icon name="x" size={14} />
          <Tx fr="quitter" en="leave" />
        </button>
      </div>

      {/* LEFT: TODO + GOALS */}
      <div style={{
        position: 'absolute', top: 110, left: 24, width: 280, zIndex: 10,
        background: 'rgba(33,26,44,0.7)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(228,183,198,0.2)',
        borderRadius: 'var(--r-lg)',
        padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic' }}>
            <Tx fr="mes objectifs" en="my goals" />
          </div>
          <Chip kind="solid"><span className="font-pixel">2 / 5</span></Chip>
        </div>
        {[
          { t: tx(lang, 'Exercice 3.1 → 3.5', 'Exercise 3.1 → 3.5'), done: true },
          { t: tx(lang, 'Relire théorème spectral', 'Re-read spectral theorem'), done: true },
          { t: tx(lang, 'Annales 2023 · ex. 4', '2023 paper · ex. 4'), done: false, current: true },
          { t: tx(lang, 'Annales 2023 · ex. 5', '2023 paper · ex. 5'), done: false },
          { t: tx(lang, 'Fiche récap chapitre', 'Chapter summary sheet'), done: false },
        ].map((g, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '8px 10px', borderRadius: 8,
            background: g.current ? 'rgba(228,183,198,0.15)' : 'transparent',
            border: g.current ? '1px solid rgba(228,183,198,0.4)' : '1px solid transparent',
            marginBottom: 2,
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
              background: g.done ? '#e4b7c6' : 'transparent',
              border: g.done ? 'none' : '1.5px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#2a1d36',
            }}>{g.done && <Icon name="check" size={11} stroke={3}/>}</span>
            <div style={{ flex: 1, fontSize: 13, opacity: g.done ? 0.5 : 1, textDecoration: g.done ? 'line-through' : 'none', fontWeight: g.current ? 600 : 400 }}>
              {g.t}
            </div>
            {g.current && <span className="font-pixel" style={{ fontSize: 13, color: '#e4b7c6' }}>▸</span>}
          </div>
        ))}
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
          <Icon name="plus" size={13} />
          <Tx fr="ajouter un objectif…" en="add a goal…" />
        </div>
      </div>

      {/* RIGHT: lofi player */}
      <div style={{
        position: 'absolute', top: 110, right: 24, width: 280, zIndex: 10,
        background: 'rgba(33,26,44,0.7)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(228,183,198,0.2)',
        borderRadius: 'var(--r-lg)',
        padding: 18,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="music" size={12} />
          <Tx fr="musique d'ambiance" en="ambient music" />
          <span style={{ marginLeft: 'auto' }} className="pulse-dot" />
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 'var(--r-md)',
            background: 'linear-gradient(135deg, #e4b7c6, #d0c4e1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontSize: 30 }}>☔</div>
            {/* spinning vinyl ring */}
            <div style={{ position: 'absolute', inset: 4, border: '1.5px dashed rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'spin 8s linear infinite' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic' }}>
              <Tx fr="pluie sur fenêtre" en="rain on window" />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>lofi · ambient · 24h ♥ 1.2k</div>
          </div>
        </div>
        {/* progress */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, position: 'relative', marginBottom: 6 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '38%', background: 'var(--grad-brand)', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: '38%', top: -4, width: 12, height: 12, borderRadius: '50%', background: '#fff', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
          <span>0:47:21</span>
          <span>∞</span>
        </div>
        {/* controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <button style={{ background: 'transparent', border: 0, color: '#fff', opacity: 0.7, cursor: 'pointer' }}><Icon name="prev" size={20} /></button>
          <button style={{
            width: 44, height: 44, borderRadius: '50%', background: 'var(--grad-brand)',
            color: 'var(--ink-900)', border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(228,183,198,0.4)',
          }}><Icon name="pause" size={18} /></button>
          <button style={{ background: 'transparent', border: 0, color: '#fff', opacity: 0.7, cursor: 'pointer' }}><Icon name="next" size={20} /></button>
        </div>

        {/* track switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12, paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            <Tx fr="changer d'ambiance" en="switch ambience" />
          </div>
          {[
            { i: '☔', l: tx(lang, 'pluie', 'rain'), on: true },
            { i: '☕', l: tx(lang, 'café jazz', 'jazz café'), on: false },
            { i: '🔥', l: tx(lang, 'cheminée', 'fireplace'), on: false },
            { i: '🌲', l: tx(lang, 'forêt', 'forest'), on: false },
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 6,
              background: t.on ? 'rgba(228,183,198,0.15)' : 'transparent',
              cursor: 'pointer', fontSize: 13,
              color: t.on ? '#fff' : 'rgba(255,255,255,0.6)',
            }}>
              <span style={{ fontSize: 14 }}>{t.i}</span>
              <span>{t.l}</span>
              {t.on && <span className="font-pixel" style={{ marginLeft: 'auto', fontSize: 12, color: '#e4b7c6' }}>▸ now</span>}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: chat (toggleable) */}
      {chatOpen && (
        <div style={{
          position: 'absolute', top: 110, right: 320, width: 300,
          background: 'rgba(33,26,44,0.85)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(228,183,198,0.2)', borderRadius: 'var(--r-lg)',
          padding: 16, zIndex: 10,
          display: 'flex', flexDirection: 'column', maxHeight: 520,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17 }}># entraide</div>
            <Icon name="x" size={14} />
          </div>
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: 'Sami', t: '14:02', m: tx(lang, "qq'un a la correction du DS 2024 ?", 'anyone has 2024 paper sol?'), pal: 0 },
              { n: 'Yann', t: '14:05', m: 'http://lien.com/correction.pdf', pal: 2 },
              { n: 'Inès', t: '14:14', m: tx(lang, 'merci !! 💜', 'thanks !! 💜'), pal: 1 },
              { n: 'Léa',  t: '14:32', m: tx(lang, 'pause dans 14min ☕', 'break in 14min ☕'), pal: 3, mine: true },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <Av name={c.n} size={26} palette={c.pal} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}><b style={{ color: '#fff' }}>{c.n}</b> · {c.t}</div>
                  <div style={{ fontSize: 13 }}>{c.m}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed rgba(255,255,255,0.15)', display: 'flex', gap: 6 }}>
            <input placeholder={tx(lang, 'message…', 'message…')}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: 999, fontSize: 12, outline: 0, fontFamily: 'inherit' }} />
          </div>
        </div>
      )}

      {/* BOTTOM: video tile strip */}
      <div style={{
        position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10, zIndex: 10,
      }}>
        <VideoTile name="Léa" time="47:21" focused mine palette={3} cam={cam} mic={mic} />
        <VideoTile name="Sami" time="47:21" palette={0} cam />
        <VideoTile name="Inès" time="32:08" palette={1} cam mic={false} />
        <VideoTile name="Yann" time="21:14" palette={2} cam={false} />
        <VideoTile name="Marwa" time="18:02" palette={3} cam={false} mic={false} />
        <div style={{
          width: 90, height: 105, borderRadius: 12,
          border: '1px dashed rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 4, color: 'rgba(255,255,255,0.6)',
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
          cursor: 'pointer', fontSize: 11,
        }}>
          <Icon name="plus" size={18}/>
          <span className="font-pixel" style={{ fontSize: 14 }}>+18</span>
        </div>
      </div>

      {/* BOTTOM: control dock */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6, zIndex: 10,
        background: 'rgba(33,26,44,0.7)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(228,183,198,0.2)',
        borderRadius: 'var(--r-pill)', padding: 8,
      }}>
        {[
          { i: mic ? 'mic' : 'micOff', on: mic, click: () => setMic(!mic), warn: !mic },
          { i: cam ? 'cam' : 'camOff', on: cam, click: () => setCam(!cam), warn: !cam },
          { i: 'chat', on: chatOpen, click: () => setChatOpen(!chatOpen) },
          { i: 'edit',  on: false },
          { i: 'handraise', on: false },
          { i: 'smile', on: false },
        ].map((c, k) => (
          <button key={k} onClick={c.click} style={{
            width: 46, height: 46, borderRadius: '50%',
            background: c.warn ? '#e58a8a' : c.on ? 'var(--grad-brand)' : 'rgba(255,255,255,0.08)',
            color: c.on || c.warn ? 'var(--ink-900)' : '#fff',
            border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .15s',
          }}>
            <Icon name={c.i} size={18} />
          </button>
        ))}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.15)', margin: '4px 4px' }} />
        {/* leaderboard mini */}
        <div style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="trophy" size={14} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}><Tx fr="classement" en="leaders" />:</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Sami</span>
          <span className="font-pixel" style={{ fontSize: 13, color: '#e4b7c6' }}>47m</span>
        </div>
      </div>

      {/* TINY canvas chrome — minimal, just to nav out of immersive */}
      <CanvasChrome />

      {/* sparkle drift animation */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

Object.assign(window, { ScreenInRoom });
