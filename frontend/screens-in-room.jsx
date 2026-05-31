// StudyWithMe wireframes — In-Room study session (the heart of the product)
// Multiple variations exploring layout for: video tiles, pomodoro,
// lofi music player, chat, todos, whiteboard, leaderboard, ambient scene.

// Helper: a "video tile" placeholder w/ camera-on
const VideoTile = ({ name, time, mic = true, cam = true, focus = false, lang }) => (
  <div className="w-box" style={{ background: cam ? 'var(--ink)' : 'var(--paper-2)', color: cam ? 'var(--paper)' : 'var(--ink)', position: 'relative', overflow: 'hidden', aspectRatio: '4 / 3' }}>
    {cam ? (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 40, opacity: 0.5 }}>{name[0]}</div>
    ) : (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <WAv initials={name[0]} size={42} />
      </div>
    )}
    {/* name pill */}
    <div style={{ position: 'absolute', bottom: 6, left: 6, fontFamily: 'Kalam, cursive', fontSize: 11, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '1px 6px', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
      {!mic && <span>🔇</span>}
      {name}
    </div>
    {/* timer */}
    {time && (
      <div style={{ position: 'absolute', top: 6, right: 6, fontFamily: 'Architects Daughter, cursive', fontSize: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '1px 5px', borderRadius: 3 }}>{time}</div>
    )}
    {focus && (
      <div style={{ position: 'absolute', top: 6, left: 6, fontFamily: 'Kalam, cursive', fontSize: 10, background: 'var(--accent)', color: '#fff', padding: '1px 6px', borderRadius: 3 }}>{lang === 'fr' ? 'focus' : 'focus'}</div>
    )}
  </div>
);

// Pomodoro big-clock
const Pomodoro = ({ time = '14:32', label, phase = 'focus', cycle = '2/4', lang, compact = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}>
    <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: 1 }}>{label || (lang === 'fr' ? 'POMODORO · CONCENTRATION' : 'POMODORO · FOCUS')}</div>
    <div className="w-hand" style={{ fontSize: compact ? 56 : 90, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{time}</div>
    <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>
      {lang === 'fr' ? 'cycle' : 'cycle'} {cycle} · {phase === 'focus' ? (lang === 'fr' ? 'focus' : 'focus') : (lang === 'fr' ? 'pause' : 'break')}
    </div>
    {!compact && (
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <WBtn style={{ padding: '4px 12px' }}>‖ {lang === 'fr' ? 'pause' : 'pause'}</WBtn>
        <WBtn style={{ padding: '4px 12px' }}>↻</WBtn>
        <WBtn style={{ padding: '4px 12px' }}>{lang === 'fr' ? 'sauter →' : 'skip →'}</WBtn>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────
// IN-ROOM Variation A — Classic call-app layout (video center, sidebar tools)
// ─────────────────────────────────────────────────────────────
const InRoomClassic = ({ lang }) => (
  <WBrowser url="studywith.me/r/algebra-l2-x9k">
    {/* room top bar */}
    <div style={{ height: 50, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14, borderBottom: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
      <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }} />
      <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Révision algèbre L2' : 'Algebra L2 revision'}</div>
      <WChip>{lang === 'fr' ? '5 personnes' : '5 people'}</WChip>
      <WChip>☂ {lang === 'fr' ? 'lofi café' : 'lofi café'}</WChip>
      <div className="w-mono" style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'session · 47:21' : 'session · 47:21'}</div>
      <WBtn>{lang === 'fr' ? 'inviter' : 'invite'}</WBtn>
      <WBtn primary style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>{lang === 'fr' ? 'quitter' : 'leave'} ×</WBtn>
    </div>

    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      {/* Left: todo list */}
      <div style={{ width: 240, padding: 18, borderRight: '1.5px solid var(--ink)', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div className="w-hand" style={{ fontSize: 16, marginBottom: 6 }}>{lang === 'fr' ? 'Objectifs session' : 'Session goals'}</div>
          {[
            { t: lang === 'fr' ? 'Exercice 3.1 à 3.5' : 'Exercise 3.1 to 3.5', done: true },
            { t: lang === 'fr' ? 'Relire théorème ' : 'Re-read theorem', done: true },
            { t: lang === 'fr' ? 'Annales 2023' : '2023 past papers', done: false },
            { t: lang === 'fr' ? 'Faire fiche récap' : 'Make summary sheet', done: false },
          ].map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 12, padding: '3px 0' }}>
              <div className={`w-check ${g.done ? 'done' : ''}`} style={{ marginTop: 2 }} />
              <span style={{ textDecoration: g.done ? 'line-through' : 'none', opacity: g.done ? 0.5 : 1 }}>{g.t}</span>
            </div>
          ))}
          <div className="w-input-box" style={{ marginTop: 6, fontSize: 11, padding: '4px 8px' }}>+ {lang === 'fr' ? 'ajouter…' : 'add…'}</div>
        </div>
        <div className="w-line-thin" />
        <div>
          <div className="w-hand" style={{ fontSize: 16, marginBottom: 8 }}>{lang === 'fr' ? 'Classement focus' : 'Focus leaderboard'}</div>
          {[
            { n: 'Sami', t: '47m', star: '✦' },
            { n: 'Léa (toi)', t: '47m', star: '✦' },
            { n: 'Inès', t: '32m', star: '' },
            { n: 'Yann', t: '21m', star: '' },
            { n: 'Marwa', t: '18m', star: '' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontFamily: 'Kalam, cursive', fontSize: 12 }}>
              <span style={{ width: 14, color: 'var(--ink-mute)' }}>{i + 1}</span>
              <WAv initials={p.n[0]} size={22} style={{ fontSize: 10 }} />
              <span style={{ flex: 1, fontWeight: i === 1 ? 700 : 400 }}>{p.n}</span>
              <span className="w-mono" style={{ fontSize: 11 }}>{p.t} {p.star}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center: pomodoro + video grid */}
      <div style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
        <div className="w-box" style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 20 }}>
          <Pomodoro lang={lang} compact />
          {/* progress bar */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginBottom: 4 }}>
              <span>{lang === 'fr' ? 'cycle 2/4' : 'cycle 2/4'}</span>
              <span>{lang === 'fr' ? '14:32 restant' : '14:32 left'}</span>
            </div>
            <div style={{ height: 10, background: 'var(--paper-2)', border: '1.25px solid var(--ink)', borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '100%', width: '42%', background: 'var(--ink)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', marginTop: 6 }}>
              {['25 focus','5 ⏸','25 focus','5 ⏸','25 focus','5 ⏸','25 focus','15 ⏸'].map((s, i) => (
                <span key={i} style={{ opacity: i < 3 ? 1 : 0.4 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        {/* video grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, minHeight: 0 }}>
          <VideoTile name="Léa" time="47:21" focus lang={lang} />
          <VideoTile name="Sami" time="47:21" lang={lang} />
          <VideoTile name="Inès" time="32:08" lang={lang} mic={false} />
          <VideoTile name="Yann" time="21:14" lang={lang} cam={false} />
          <VideoTile name="Marwa" time="18:02" lang={lang} cam={false} mic={false} />
          <div className="w-box-dashed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4, color: 'var(--ink-mute)' }}>
            <div style={{ fontSize: 28 }}>+</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11 }}>{lang === 'fr' ? 'inviter' : 'invite'}</div>
          </div>
        </div>
        {/* bottom controls */}
        <div className="w-box" style={{ padding: 10, display: 'flex', justifyContent: 'center', gap: 10 }}>
          {['🎤','📷','💬','📋','🎨','✋'].map((i, k) => (
            <div key={k} className="w-box-soft" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{i}</div>
          ))}
          <div style={{ flex: 1 }} />
          {/* music mini-player */}
          <div className="w-box-soft" style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, height: 38 }}>
            <span style={{ fontSize: 16 }}>♪</span>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11 }}>
              <div style={{ fontWeight: 700 }}>{lang === 'fr' ? 'pluie sur fenêtre' : 'rain on window'}</div>
              <div style={{ color: 'var(--ink-mute)', fontSize: 10 }}>lofi · ambient ▸ ‖</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: chat */}
      <div style={{ width: 260, borderLeft: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
        <div className="w-tabs" style={{ padding: '0 14px' }}>
          <div className="w-tab active">{lang === 'fr' ? 'chat' : 'chat'}</div>
          <div className="w-tab">{lang === 'fr' ? 'tableau' : 'board'}</div>
          <div className="w-tab">{lang === 'fr' ? 'notes' : 'notes'}</div>
        </div>
        <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
          {[
            { n: 'Sami', t: '14:02', m: lang === 'fr' ? 'on commence par le 3.1 ?' : 'shall we start with 3.1?' },
            { n: 'Inès', t: '14:03', m: lang === 'fr' ? 'oui je suis prête' : 'yes I\'m ready' },
            { n: 'Léa',  t: '14:03', m: lang === 'fr' ? 'parfait. mute pendant 25min' : 'perfect. muting for 25min', mine: true },
            { n: 'Yann', t: '14:18', m: lang === 'fr' ? 'quelqu\'un a fait 3.3 ?' : 'anyone did 3.3?' },
            { n: 'Sami', t: '14:20', m: lang === 'fr' ? 'je partage ma photo dans 2min' : 'sharing my photo in 2min' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: c.mine ? 'flex-end' : 'flex-start' }}>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', marginBottom: 2 }}>{c.n} · {c.t}</div>
              <div className={c.mine ? 'w-box-fill' : 'w-box'} style={{ padding: '5px 9px', maxWidth: '85%', fontFamily: 'Kalam, cursive', fontSize: 12 }}>{c.m}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 10, borderTop: '1.5px dashed var(--ink-mute)' }}>
          <div className="w-input-box" style={{ fontSize: 12 }}>{lang === 'fr' ? 'écrire un message…' : 'write a message…'}</div>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// IN-ROOM Variation B — Immersive lofi scene (full-bleed background)
// ─────────────────────────────────────────────────────────────
const InRoomImmersive = ({ lang }) => (
  <WBrowser url="studywith.me/r/lofi-cafe">
    <div style={{ flex: 1, position: 'relative', background: 'var(--paper-2)', overflow: 'hidden' }}>
      {/* "scene" — sketched cafe */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="var(--ink-mute)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        {/* window */}
        <rect x="60" y="80" width="200" height="220" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <line x1="160" y1="80" x2="160" y2="300" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="60" y1="190" x2="260" y2="190" stroke="var(--ink)" strokeWidth="1.5" />
        {/* rain streaks */}
        {Array.from({length: 22}).map((_, i) => (
          <line key={i} x1={80 + i * 9} y1={100 + (i*13) % 80} x2={75 + i * 9} y2={130 + (i*13) % 80} stroke="var(--ink-mute)" strokeWidth="1"/>
        ))}
        {/* desk */}
        <line x1="0" y1="540" x2="100%" y2="540" stroke="var(--ink)" strokeWidth="2" />
        {/* mug */}
        <ellipse cx="380" cy="540" rx="40" ry="6" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
        <rect x="340" y="480" width="80" height="60" fill="none" stroke="var(--ink)" strokeWidth="2" rx="6"/>
        <path d="M 420 495 Q 450 500, 450 520 Q 450 535, 420 530" fill="none" stroke="var(--ink)" strokeWidth="2"/>
        {/* lamp */}
        <line x1="900" y1="540" x2="900" y2="380" stroke="var(--ink)" strokeWidth="2"/>
        <path d="M 860 380 L 940 380 L 920 340 L 880 340 Z" fill="none" stroke="var(--ink)" strokeWidth="2"/>
        {/* books */}
        <rect x="600" y="500" width="20" height="40" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
        <rect x="620" y="490" width="20" height="50" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
        <rect x="640" y="510" width="20" height="30" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
        {/* plant */}
        <rect x="1000" y="500" width="60" height="40" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
        <path d="M 1030 500 C 1020 470, 1010 460, 1015 440 M 1030 500 C 1040 470, 1050 460, 1045 440 M 1030 500 L 1030 450" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
      </svg>

      {/* big pomodoro center */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', background: 'rgba(253,252,247,0.85)', padding: '20px 40px', border: '1.5px solid var(--ink)', borderRadius: 8 }}>
        <Pomodoro time="14:32" cycle="2/4" lang={lang} />
      </div>

      {/* floating top-left scene + room title */}
      <div style={{ position: 'absolute', top: 16, left: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }} />
        <div className="w-hand" style={{ fontSize: 18, background: 'rgba(253,252,247,0.85)', padding: '2px 8px', borderRadius: 4 }}>{lang === 'fr' ? 'Café lofi · pluie' : 'Lofi café · rain'}</div>
        <WChip style={{ background: 'rgba(253,252,247,0.85)' }}>23 {lang === 'fr' ? 'étudiants' : 'students'}</WChip>
      </div>
      <div style={{ position: 'absolute', top: 16, right: 20, display: 'flex', gap: 8 }}>
        <WBtn style={{ background: 'rgba(253,252,247,0.9)' }}>{lang === 'fr' ? 'inviter' : 'invite'}</WBtn>
        <WBtn style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>{lang === 'fr' ? 'quitter' : 'leave'} ×</WBtn>
      </div>

      {/* video tiles strip bottom */}
      <div style={{ position: 'absolute', bottom: 90, left: 20, right: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
        {['L', 'S', 'I', 'Y', 'M'].map((n, i) => (
          <div key={i} className="w-box" style={{ width: 120, aspectRatio: '4/3', background: i < 3 ? 'var(--ink)' : 'var(--paper-2)', color: i < 3 ? 'var(--paper)' : 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 28, opacity: i < 3 ? 0.5 : 1 }}>{n}</div>
            <div style={{ position: 'absolute', bottom: 4, left: 4, fontFamily: 'Kalam, cursive', fontSize: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '1px 5px', borderRadius: 3 }}>{['Léa','Sami','Inès','Yann','Marwa'][i]}</div>
          </div>
        ))}
        <div className="w-box-dashed" style={{ width: 80, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-mute)', fontFamily: 'Kalam, cursive' }}>+ 18</div>
      </div>

      {/* bottom control bar */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, background: 'rgba(253,252,247,0.92)', padding: 10, border: '1.5px solid var(--ink)', borderRadius: 28 }}>
        {[
          { i: '🎤', on: true },
          { i: '📷', on: true },
          { i: '💬', on: false },
          { i: '📋', on: false },
          { i: '🎨', on: false },
          { i: '✋', on: false },
        ].map((c, k) => (
          <div key={k} style={{
            width: 40, height: 40, borderRadius: 20, border: '1.5px solid var(--ink)',
            background: c.on ? 'var(--ink)' : 'transparent', color: c.on ? 'var(--paper)' : 'var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
          }}>{c.i}</div>
        ))}
      </div>

      {/* lofi player floating right */}
      <div className="w-box" style={{ position: 'absolute', top: 80, right: 20, padding: 14, width: 220, background: 'rgba(253,252,247,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div className="w-img" style={{ width: 50, height: 50, fontSize: 18 }}>♪</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="w-hand" style={{ fontSize: 14 }}>{lang === 'fr' ? 'pluie sur fenêtre' : 'rain on window'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>lofi · ambient</div>
          </div>
        </div>
        <div style={{ height: 4, background: 'var(--paper-2)', border: '1px solid var(--ink)', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ height: '100%', width: '38%', background: 'var(--ink)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, fontSize: 14 }}>
          <span>◂◂</span><span>▸</span><span>▸▸</span><span style={{ marginLeft: 'auto', fontSize: 12 }}>🔊</span>
        </div>
      </div>

      {/* mini todo top-left */}
      <div className="w-box" style={{ position: 'absolute', top: 80, left: 20, padding: 14, width: 210, background: 'rgba(253,252,247,0.95)' }}>
        <div className="w-hand" style={{ fontSize: 14, marginBottom: 6 }}>{lang === 'fr' ? 'mes objectifs' : 'my goals'}</div>
        {[
          { t: lang === 'fr' ? 'Ex. 3.1 → 3.5' : 'Ex. 3.1 → 3.5', done: true },
          { t: lang === 'fr' ? 'Annales 2023' : '2023 papers', done: false },
          { t: lang === 'fr' ? 'Fiche récap' : 'Summary sheet', done: false },
        ].map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 12, padding: '2px 0' }}>
            <div className={`w-check ${g.done ? 'done' : ''}`} />
            <span style={{ textDecoration: g.done ? 'line-through' : 'none', opacity: g.done ? 0.5 : 1 }}>{g.t}</span>
          </div>
        ))}
      </div>
      <WAnno x="55%" y="64%" rotate={2}>{lang === 'fr' ? 'scène anime selon ambiance' : 'scene animates with vibe'}</WAnno>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// IN-ROOM Variation C — Focus mode (video minimized, big task center)
// ─────────────────────────────────────────────────────────────
const InRoomFocus = ({ lang }) => (
  <WBrowser url="studywith.me/r/algebra-l2-x9k?focus=1">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
      {/* slim top bar with pomodoro */}
      <div style={{ height: 70, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18, borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }} />
          <div className="w-hand" style={{ fontSize: 17 }}>{lang === 'fr' ? 'Révision algèbre' : 'Algebra revision'}</div>
        </div>
        <div style={{ width: 1.5, height: 30, background: 'var(--ink-mute)', opacity: 0.4 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'focus' : 'focus'}</span>
          <div className="w-hand" style={{ fontSize: 32, fontVariantNumeric: 'tabular-nums' }}>14:32</div>
          <WBtn style={{ padding: '3px 10px' }}>‖</WBtn>
        </div>
        <div className="w-mono" style={{ fontSize: 12, color: 'var(--ink-mute)' }}>cycle 2/4</div>
        <div style={{ flex: 1 }} />
        {/* mini video row */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['L','S','I','Y','M'].map((n, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 6, border: '1.25px solid var(--ink)', background: i < 3 ? 'var(--ink)' : 'var(--paper-2)', color: i < 3 ? 'var(--paper)' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 16, position: 'relative' }}>
              {n}
              {i < 3 && <div style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: 'var(--accent-2)', border: '1.5px solid var(--paper)' }} />}
            </div>
          ))}
          <WBtn style={{ padding: '3px 8px' }}>{lang === 'fr' ? 'voir tous' : 'see all'} ›</WBtn>
        </div>
        <WBtn style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>{lang === 'fr' ? 'quitter' : 'leave'} ×</WBtn>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* main task / whiteboard area */}
        <div style={{ flex: 1, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: 1 }}>{lang === 'fr' ? "TÂCHE EN COURS" : 'CURRENT TASK'}</div>
              <div className="w-hand" style={{ fontSize: 26 }}>{lang === 'fr' ? 'Annales 2023 · exercice 4' : '2023 paper · exercise 4'}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <WBtn style={{ padding: '4px 10px' }}>‹ {lang === 'fr' ? 'précédent' : 'prev'}</WBtn>
              <WBtn primary style={{ padding: '4px 10px' }}>✓ {lang === 'fr' ? 'terminé' : 'done'}</WBtn>
              <WBtn style={{ padding: '4px 10px' }}>{lang === 'fr' ? 'suivant' : 'next'} ›</WBtn>
            </div>
          </div>

          <div className="w-box" style={{ flex: 1, position: 'relative', background: 'var(--paper-2)' }}>
            {/* whiteboard tools */}
            <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4 }}>
              {['↑','✎','▭','◯','T','◆','⌫'].map((i, k) => (
                <div key={k} className="w-box-soft" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, background: 'var(--paper)' }}>{i}</div>
              ))}
            </div>
            <div style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'tableau partagé · 3 utilisateurs' : 'shared whiteboard · 3 users'}</div>
            {/* mock sketch */}
            <svg style={{ position: 'absolute', inset: 50, opacity: 0.6 }} viewBox="0 0 600 350">
              <text x="20" y="40" fontFamily="Caveat, cursive" fontSize="22" fill="var(--ink)">Si A·B = 0 ⇒</text>
              <text x="60" y="80" fontFamily="Caveat, cursive" fontSize="18" fill="var(--ink)">ker(A) ⊃ Im(B)</text>
              <line x1="20" y1="100" x2="350" y2="100" stroke="var(--ink-mute)" strokeWidth="1"/>
              <text x="20" y="140" fontFamily="Caveat, cursive" fontSize="22" fill="var(--ink)">Démonstration:</text>
              <text x="40" y="170" fontFamily="Architects Daughter, cursive" fontSize="14" fill="var(--ink-mute)">∀ x ∈ Im(B), ∃ y tel que x = B·y</text>
              <text x="40" y="195" fontFamily="Architects Daughter, cursive" fontSize="14" fill="var(--ink-mute)">A·x = A·(B·y) = (A·B)·y = 0</text>
              <rect x="20" y="220" width="200" height="60" fill="none" stroke="var(--accent)" strokeWidth="2" rx="4"/>
              <text x="30" y="245" fontFamily="Caveat, cursive" fontSize="16" fill="var(--accent)">→ donc x ∈ ker(A)</text>
              <circle cx="430" cy="220" r="40" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
              <text x="430" y="225" fontFamily="Caveat, cursive" fontSize="14" fill="var(--ink)" textAnchor="middle">CQFD</text>
            </svg>
          </div>
        </div>

        {/* right rail: tasks + lofi */}
        <div style={{ width: 280, padding: 22, borderLeft: '1.5px solid var(--ink)', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div className="w-hand" style={{ fontSize: 17, marginBottom: 8 }}>{lang === 'fr' ? 'Plan de session' : 'Session plan'}</div>
            {[
              { t: lang === 'fr' ? 'Ex. 3.1 → 3.5' : 'Ex. 3.1 → 3.5', done: true },
              { t: lang === 'fr' ? 'Relire théorème' : 'Re-read theorem', done: true },
              { t: lang === 'fr' ? 'Annales 2023 · ex. 4' : '2023 paper · ex. 4', done: false, current: true },
              { t: lang === 'fr' ? 'Annales 2023 · ex. 5' : '2023 paper · ex. 5', done: false },
              { t: lang === 'fr' ? 'Fiche récap' : 'Summary sheet', done: false },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 12, padding: '4px 6px', marginLeft: -6, marginRight: -6, borderRadius: 4, background: g.current ? 'var(--paper)' : 'transparent', border: g.current ? '1.25px solid var(--ink)' : '1.25px solid transparent' }}>
                <div className={`w-check ${g.done ? 'done' : ''}`} style={{ marginTop: 2 }} />
                <span style={{ textDecoration: g.done ? 'line-through' : 'none', opacity: g.done ? 0.5 : 1, flex: 1, fontWeight: g.current ? 700 : 400 }}>{g.t}</span>
                {g.current && <span style={{ fontSize: 10, color: 'var(--accent)' }}>▸</span>}
              </div>
            ))}
          </div>
          <div className="w-line-thin" />
          <div className="w-box" style={{ padding: 12, background: 'var(--paper)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="w-img" style={{ width: 40, height: 40, fontSize: 14 }}>♪</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="w-hand" style={{ fontSize: 13 }}>{lang === 'fr' ? 'café piano' : 'café piano'}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)' }}>lofi · jazz</div>
              </div>
              <span style={{ fontSize: 13 }}>▸</span>
            </div>
            <div style={{ height: 3, background: 'var(--paper-2)', border: '1px solid var(--ink)', borderRadius: 2, marginTop: 8 }}><div style={{ width: '38%', height: '100%', background: 'var(--ink)' }} /></div>
          </div>
          <div className="w-box-dashed" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="w-hand" style={{ fontSize: 14 }}>💡 {lang === 'fr' ? 'astuce' : 'tip'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'tape ⌥ + F pour masquer tout sauf le tableau' : 'press ⌥ + F to hide everything but the board'}</div>
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// IN-ROOM Variation D — "Co-cafe" / always-on voice channel style
// ─────────────────────────────────────────────────────────────
const InRoomCafe = ({ lang }) => (
  <WBrowser url="studywith.me/r/lofi-cafe">
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      {/* Left: room nav (servers/rooms list) */}
      <div style={{ width: 70, padding: '14px 8px', borderRight: '1.5px solid var(--ink)', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontWeight: 700 }}>S</div>
        <div className="w-line-thin" style={{ width: 30 }} />
        {['☂','∑','A','🔥','◷','+'].map((i, k) => (
          <div key={k} className={k === 0 ? 'w-box-fill' : 'w-box'} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, borderRadius: 10 }}>{i}</div>
        ))}
      </div>

      {/* Channel list */}
      <div style={{ width: 220, padding: 18, borderRight: '1.5px solid var(--ink)', background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="w-hand" style={{ fontSize: 17 }}>{lang === 'fr' ? 'Café lofi · pluie' : 'Lofi café · rain'}</div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', letterSpacing: 1 }}>{lang === 'fr' ? 'TABLES' : 'TABLES'}</div>
        {[
          { n: lang === 'fr' ? '🔊 table fenêtre' : '🔊 window table', count: 5, active: true },
          { n: lang === 'fr' ? '🔊 coin lecture' : '🔊 reading nook', count: 3 },
          { n: lang === 'fr' ? '🔊 silence total' : '🔊 silent table', count: 8 },
          { n: lang === 'fr' ? '🔇 salon vide' : '🔇 empty lounge', count: 0 },
        ].map((c, i) => (
          <div key={i} className="w-sidebar-item" style={{
            padding: '6px 8px', borderRadius: 4, background: c.active ? 'var(--ink)' : 'transparent',
            color: c.active ? 'var(--paper)' : 'var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <span style={{ fontFamily: 'Kalam, cursive', fontSize: 13 }}>{c.n}</span>
            <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11, opacity: 0.7 }}>{c.count}</span>
          </div>
        ))}
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', letterSpacing: 1, marginTop: 8 }}>{lang === 'fr' ? 'CANAUX' : 'CHANNELS'}</div>
        {['# général', '# entraide', '# pause-café'].map((c, i) => (
          <div key={i} style={{ padding: '4px 8px', fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)' }}>{c}</div>
        ))}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1.25px solid var(--ink)', borderRadius: 6, background: 'var(--paper-2)' }}>
          <WAv initials="L" size={28} />
          <div style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 11 }}>
            <div style={{ fontWeight: 700 }}>Léa</div>
            <div style={{ color: 'var(--ink-mute)', fontSize: 10 }}>{lang === 'fr' ? 'concentrée · 47min' : 'focused · 47min'} ✦</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div className="w-box-soft" style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>🎤</div>
            <div className="w-box-soft" style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>📷</div>
          </div>
        </div>
      </div>

      {/* Main: scene + members */}
      <div style={{ flex: 1, position: 'relative', background: 'var(--paper-2)', overflow: 'hidden' }}>
        {/* faded scene */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} preserveAspectRatio="xMidYMid slice">
          <rect x="40" y="80" width="220" height="240" fill="none" stroke="var(--ink)" strokeWidth="2"/>
          {Array.from({length: 18}).map((_, i) => (
            <line key={i} x1={60 + i * 11} y1={100 + (i*17) % 80} x2={55 + i * 11} y2={130 + (i*17) % 80} stroke="var(--ink-mute)" strokeWidth="1"/>
          ))}
          <line x1="0" y1="540" x2="100%" y2="540" stroke="var(--ink)" strokeWidth="2"/>
        </svg>

        {/* top bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '14px 24px', borderBottom: '1.5px dashed var(--ink-mute)' }}>
          <div className="w-hand" style={{ fontSize: 20 }}>🔊 {lang === 'fr' ? 'table fenêtre' : 'window table'}</div>
          <WChip style={{ marginLeft: 10 }}>5 / 8</WChip>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Pomodoro time="14:32" cycle="2/4" lang={lang} compact />
          </div>
        </div>

        {/* member tiles */}
        <div style={{ position: 'relative', padding: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { n: 'Léa',  s: lang === 'fr' ? '47m · algèbre' : '47m · algebra', mine: true, c: true },
            { n: 'Sami', s: lang === 'fr' ? '47m · maths' : '47m · math', c: true },
            { n: 'Inès', s: lang === 'fr' ? '32m · anglais' : '32m · english', c: true, mic: false },
            { n: 'Yann', s: lang === 'fr' ? '21m · stats' : '21m · stats', c: false },
            { n: 'Marwa', s: lang === 'fr' ? '18m · histoire' : '18m · history', c: false },
          ].map((m, i) => (
            <div key={i} className="w-box" style={{ padding: 14, background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {m.c ? (
                  <div style={{ width: 60, height: 60, borderRadius: 30, background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 26, position: 'relative' }}>
                    {m.n[0]}
                    {m.mic === false && <div style={{ position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, border: '2px solid var(--paper)' }}>🔇</div>}
                  </div>
                ) : (
                  <WAv initials={m.n[0]} size={60} />
                )}
                <div style={{ flex: 1 }}>
                  <div className="w-hand" style={{ fontSize: 16 }}>{m.n}{m.mine ? ` (${lang === 'fr' ? 'toi' : 'you'})` : ''}</div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{m.s}</div>
                </div>
              </div>
              {/* audio waveform mock */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
                {Array.from({length: 18}).map((_, k) => (
                  <div key={k} style={{ flex: 1, background: m.mic === false ? 'var(--ink-mute)' : 'var(--accent-2)', height: `${20 + (k * (i+1)) % 80}%`, opacity: m.mic === false ? 0.3 : 0.8, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          ))}
          <div className="w-box-dashed" style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, color: 'var(--ink-mute)' }}>
            <div style={{ fontSize: 24 }}>+</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12 }}>{lang === 'fr' ? '3 places · inviter' : '3 seats · invite'}</div>
          </div>
        </div>
      </div>

      {/* Right: chat */}
      <div style={{ width: 280, borderLeft: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1.5px dashed var(--ink-mute)', fontFamily: 'Kalam, cursive', fontSize: 13, fontWeight: 700 }}>{lang === 'fr' ? '# entraide' : '# help'}</div>
        <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
          {[
            { n: 'Sami', t: '14:02', m: lang === 'fr' ? 'qq\'un a la correction du DS 2024 ?' : "anyone has the 2024 paper solution?" },
            { n: 'Yann', t: '14:05', m: 'http://lien.com/correction.pdf' },
            { n: 'Inès', t: '14:14', m: lang === 'fr' ? 'merci !!' : 'thanks !!' },
            { n: 'Léa',  t: '14:32', m: lang === 'fr' ? 'pause dans 14min ☕' : 'break in 14min ☕', mine: true },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <WAv initials={c.n[0]} size={26} style={{ fontSize: 11 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)' }}><b style={{ color: 'var(--ink)' }}>{c.n}</b> · {c.t}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12 }}>{c.m}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 12, borderTop: '1.5px dashed var(--ink-mute)' }}>
          <div className="w-input-box" style={{ fontSize: 12 }}>{lang === 'fr' ? 'écrire dans # entraide' : 'message # help'}</div>
        </div>
      </div>
    </div>
  </WBrowser>
);

Object.assign(window, { InRoomClassic, InRoomImmersive, InRoomFocus, InRoomCafe });
