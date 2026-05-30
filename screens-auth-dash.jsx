// StudyWithMe wireframes — Auth + Dashboard variations
// Each exported component takes { lang } and returns a wireframe screen.

// ─────────────────────────────────────────────────────────────
// AUTH — Sign-up / Login
// ─────────────────────────────────────────────────────────────

const AuthSplit = ({ lang }) => (
  <WBrowser url="studywith.me/signup">
    <div style={{ flex: 1, display: 'flex' }}>
      {/* Left illustration zone */}
      <div style={{
        flex: 1, background: 'var(--paper-2)', borderRight: '1.5px solid var(--ink)',
        padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div className="w-hand" style={{ fontSize: 28 }}>StudyWithMe</div>
        <div>
          <div className="w-img" style={{ width: 260, height: 200, marginBottom: 24 }}>
            <span>{lang === 'fr' ? 'illustration · café-étude' : 'illustration · study café'}</span>
          </div>
          <div className="w-hand" style={{ fontSize: 34, lineHeight: 1.1, marginBottom: 8 }}>
            {lang === 'fr' ? <>Étudie. <span className="w-underline">Ensemble.</span></> : <>Study. <span className="w-underline">Together.</span></>}
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 15, color: 'var(--ink-mute)', maxWidth: 320 }}>
            {lang === 'fr'
              ? 'Organise tes sessions, rejoins des salles, retrouve une communauté qui révise avec toi.'
              : 'Plan your sessions, join rooms, find a community that revises alongside you.'}
          </div>
        </div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>
          {lang === 'fr' ? '“the lofi study buddy.”' : '“the lofi study buddy.”'}
        </div>
      </div>
      {/* Right form */}
      <div style={{ flex: 1, padding: '64px 80px', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="w-hand" style={{ fontSize: 26 }}>{lang === 'fr' ? 'Créer un compte' : 'Create account'}</div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'déjà inscrit ?' : 'have an account?'} <u>{lang === 'fr' ? 'se connecter' : 'sign in'}</u></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <WBtn ghost style={{ flex: 1, justifyContent: 'center' }}>G  Google</WBtn>
          <WBtn ghost style={{ flex: 1, justifyContent: 'center' }}>  Apple</WBtn>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="w-line-thin" style={{ flex: 1 }} />
          <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'ou' : 'or'}</span>
          <div className="w-line-thin" style={{ flex: 1 }} />
        </div>
        <div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Prénom' : 'First name'}</div>
          <input className="w-input" placeholder={lang === 'fr' ? 'Léa' : 'Léa'} />
        </div>
        <div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Email étudiant' : 'Student email'}</div>
          <input className="w-input" placeholder="lea@univ.fr" />
        </div>
        <div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Mot de passe' : 'Password'}</div>
          <input className="w-input" placeholder="••••••••" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>
          <div className="w-check done" /> {lang === 'fr' ? "J'accepte les CGU & politique de confidentialité" : 'I agree to the terms & privacy policy'}
        </div>
        <WBtn primary style={{ justifyContent: 'center', padding: '10px 14px', marginTop: 4 }}>
          {lang === 'fr' ? 'Créer mon compte →' : 'Create my account →'}
        </WBtn>
        <WAnno x={420} y={120} rotate={4}>{lang === 'fr' ? 'confirmation par email (US-01)' : 'email confirmation (US-01)'}</WAnno>
      </div>
    </div>
  </WBrowser>
);

const AuthCard = ({ lang }) => (
  <WBrowser url="studywith.me/signin">
    <div style={{ flex: 1, position: 'relative', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* floating decorative wireframe boxes */}
      <div className="w-box-dashed" style={{ position: 'absolute', width: 80, height: 80, top: 60, left: 90, transform: 'rotate(-8deg)' }} />
      <div className="w-img" style={{ position: 'absolute', width: 120, height: 80, top: 100, right: 110, transform: 'rotate(6deg)' }}>{lang === 'fr' ? 'lampe' : 'lamp'}</div>
      <div className="w-box-dashed" style={{ position: 'absolute', width: 100, height: 60, bottom: 90, left: 140, transform: 'rotate(4deg)' }} />
      <div className="w-img" style={{ position: 'absolute', width: 90, height: 90, bottom: 80, right: 160, transform: 'rotate(-6deg)' }}>{lang === 'fr' ? 'mug' : 'mug'}</div>
      {/* central card */}
      <div className="w-box" style={{ width: 380, padding: 36, background: 'var(--paper)', boxShadow: '6px 6px 0 var(--ink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 20 }}>S</div>
          <div className="w-hand" style={{ fontSize: 22 }}>StudyWithMe</div>
        </div>
        <div className="w-hand" style={{ fontSize: 26, marginBottom: 4 }}>{lang === 'fr' ? 'Bon retour 👋' : 'Welcome back 👋'}</div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)', marginBottom: 20 }}>
          {lang === 'fr' ? 'Connecte-toi pour continuer ta série de révisions.' : 'Sign in to keep your streak going.'}
        </div>
        <div className="w-input-box" style={{ marginBottom: 10 }}>lea@univ.fr</div>
        <div className="w-input-box" style={{ marginBottom: 8 }}>••••••••</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginBottom: 16 }}>
          <span><span className="w-check done" /> {lang === 'fr' ? 'rester connectée' : 'remember me'}</span>
          <u>{lang === 'fr' ? 'oublié ?' : 'forgot?'}</u>
        </div>
        <WBtn primary style={{ justifyContent: 'center', padding: '10px 14px', width: '100%' }}>
          {lang === 'fr' ? 'Se connecter' : 'Sign in'}
        </WBtn>
        <div style={{ textAlign: 'center', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginTop: 14 }}>
          {lang === 'fr' ? 'Nouveau ici ?' : 'New here?'} <u>{lang === 'fr' ? "S'inscrire" : 'Create one'}</u>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// DASHBOARD variations
// ─────────────────────────────────────────────────────────────

// Variation A — Sidebar + cozy welcome + module grid
const DashboardSidebar = ({ lang }) => (
  <WBrowser url="studywith.me/home">
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <WSideNav active="home" lang={lang} />
      <div style={{ flex: 1, padding: 32, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="w-hand" style={{ fontSize: 32 }}>
              {lang === 'fr' ? 'Bonsoir Léa,' : 'Good evening Léa,'}
            </div>
            <div style={{ fontFamily: 'Kalam, cursive', color: 'var(--ink-mute)', fontSize: 14 }}>
              {lang === 'fr' ? '3 sessions prévues · 2h 30min · '  : '3 sessions planned · 2h 30min · '}
              <span className="w-underline">{lang === 'fr' ? 'série 12 jours ✦' : '12-day streak ✦'}</span>
            </div>
          </div>
          <WBtn primary>+ {lang === 'fr' ? 'Démarrer une session' : 'Start a session'}</WBtn>
        </div>

        {/* Row 1: Today + Friends now */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <W style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="w-hand" style={{ fontSize: 20 }}>{lang === 'fr' ? "Aujourd'hui" : 'Today'}</div>
              <span style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'voir tout' : 'see all'} →</span>
            </div>
            {[
              { t: '09:00', l: lang === 'fr' ? 'Algèbre — révision DS' : 'Algebra — exam prep', tag: lang === 'fr' ? 'Solo' : 'Solo' , done: true},
              { t: '14:00', l: lang === 'fr' ? 'Anglais avec Sami & Inès' : 'English w/ Sami & Inès', tag: 'Room', done: false},
              { t: '20:30', l: lang === 'fr' ? 'Lecture · chap. 4' : 'Reading · ch. 4', tag: 'Solo', done: false},
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px dashed var(--ink-mute)' }}>
                <div className={`w-check ${s.done ? 'done' : ''}`} />
                <div className="w-mono" style={{ width: 56, fontSize: 13, color: 'var(--ink-mute)' }}>{s.t}</div>
                <div style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 14, textDecoration: s.done ? 'line-through' : 'none', color: s.done ? 'var(--ink-mute)' : 'var(--ink)' }}>{s.l}</div>
                <WChip>{s.tag}</WChip>
                <WBtn style={{ padding: '3px 10px', fontSize: 12 }}>▶ {lang === 'fr' ? 'lancer' : 'start'}</WBtn>
              </div>
            ))}
          </W>
          <W style={{ padding: 20 }}>
            <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Amis en révision' : 'Friends studying'} <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>(4)</span></div>
            {['Sami', 'Inès', 'Yann', 'Marwa'].map((n, i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ position: 'relative' }}>
                  <WAv initials={n[0]} size={32} />
                  <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: 5, background: 'var(--accent-2)', border: '1.5px solid var(--paper)' }} />
                </div>
                <div style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 13 }}>
                  <div style={{ fontWeight: 700 }}>{n}</div>
                  <div style={{ color: 'var(--ink-mute)', fontSize: 11 }}>{i === 0 ? (lang === 'fr' ? 'algèbre · 45 min' : 'algebra · 45 min') : i === 1 ? (lang === 'fr' ? 'anglais · 12 min' : 'english · 12 min') : (lang === 'fr' ? 'pause' : 'on break')}</div>
                </div>
                <WBtn style={{ padding: '2px 8px', fontSize: 11 }}>{lang === 'fr' ? 'rejoindre' : 'join'}</WBtn>
              </div>
            ))}
          </W>
        </div>

        {/* Row 2: Suggested rooms + streak */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
          <W style={{ padding: 20 }}>
            <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Salles recommandées' : 'Recommended rooms'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { t: lang === 'fr' ? 'Bibliothèque calme' : 'Quiet library', n: '14', tag: 'lofi' },
                { t: lang === 'fr' ? 'Pomodoro · maths' : 'Pomodoro · math', n: '6', tag: '25/5' },
                { t: lang === 'fr' ? 'Café d\'examens' : 'Exam café', n: '23', tag: '🔥' },
              ].map((r, i) => (
                <div key={i} className="w-box" style={{ padding: 12 }}>
                  <div className="w-img" style={{ height: 60, marginBottom: 8 }}>{r.tag}</div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 13 }}>{r.t}</div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{r.n} {lang === 'fr' ? 'étudiants' : 'students'}</div>
                </div>
              ))}
            </div>
          </W>
          <W kind="highlight" style={{ padding: 20 }}>
            <div className="w-hand" style={{ fontSize: 18, marginBottom: 4 }}>{lang === 'fr' ? 'Cette semaine' : 'This week'}</div>
            <div className="w-hand" style={{ fontSize: 38, marginBottom: 8 }}>8h 24min</div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {[60, 40, 90, 70, 30, 50, 20].map((h, i) => (
                <div key={i} style={{ flex: 1, height: 50, position: 'relative', border: '1px solid var(--ink)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${h}%`, background: 'var(--ink)' }} />
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', display: 'flex', justifyContent: 'space-between' }}>
              {(lang === 'fr' ? ['L','M','M','J','V','S','D'] : ['M','T','W','T','F','S','S']).map((d,i)=><span key={i}>{d}</span>)}
            </div>
          </W>
        </div>
        <WAnno x={620} y={250}>{lang === 'fr' ? '“Bonsoir/Bonjour” selon heure' : '“Good morning/evening” by time'}</WAnno>
      </div>
    </div>
  </WBrowser>
);

// Variation B — Top nav + magazine cards
const DashboardMag = ({ lang }) => (
  <WBrowser url="studywith.me/home">
    <WTopNav active="home" lang={lang} />
    <div style={{ flex: 1, padding: '24px 48px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Hero */}
      <div className="w-box-highlight" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="w-hand" style={{ fontSize: 30, marginBottom: 4 }}>
            {lang === 'fr' ? 'Prête à reprendre ?' : 'Ready to resume?'}
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 14, color: 'var(--ink-mute)' }}>
            {lang === 'fr' ? 'Reprise depuis : “Algèbre — chap. 4”' : 'Resume from: "Algebra — ch. 4"'} · 14:00
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <WBtn>{lang === 'fr' ? 'voir planning' : 'view planning'}</WBtn>
          <WBtn primary>▶ {lang === 'fr' ? 'Reprendre' : 'Resume'}</WBtn>
        </div>
      </div>

      {/* 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, flex: 1, minHeight: 0 }}>
        {/* Calendar mini */}
        <W style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 10 }}>{lang === 'fr' ? 'Mes sessions' : 'My sessions'}</div>
          {[
            { t: 'Mon 24', subj: lang === 'fr' ? 'Algèbre' : 'Algebra' },
            { t: 'Tue 25', subj: lang === 'fr' ? 'Anglais · groupe' : 'English · group' },
            { t: 'Wed 26', subj: lang === 'fr' ? 'Histoire' : 'History' },
            { t: 'Thu 27', subj: lang === 'fr' ? 'Stats' : 'Stats' },
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px dashed var(--ink-mute)' }}>
              <div className="w-mono" style={{ fontSize: 12, color: 'var(--ink-mute)', width: 50 }}>{d.t}</div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, flex: 1 }}>{d.subj}</div>
              <WIco shape="circle" size={10} />
            </div>
          ))}
          <div style={{ textAlign: 'center', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginTop: 8 }}>
            + {lang === 'fr' ? 'ajouter une session' : 'add a session'}
          </div>
        </W>

        {/* Active rooms */}
        <W style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 10 }}>{lang === 'fr' ? 'Salles actives' : 'Live rooms'}</div>
          {[
            { t: lang === 'fr' ? 'Café lofi' : 'Lofi café', n: 23 },
            { t: lang === 'fr' ? 'Maths sup' : 'Math prep', n: 6 },
            { t: lang === 'fr' ? 'Examens janv.' : 'Jan exams', n: 14 },
          ].map((r, i) => (
            <div key={i} className="w-box-dashed" style={{ padding: 10, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="w-img" style={{ width: 38, height: 38, borderRadius: 6 }}>♪</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, fontWeight: 700 }}>{r.t}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{r.n} {lang === 'fr' ? 'en révision' : 'studying'}</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }} />
            </div>
          ))}
        </W>

        {/* Streak / badges */}
        <W style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 10 }}>{lang === 'fr' ? 'Progression' : 'Progress'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div className="w-hand" style={{ fontSize: 22 }}>12</div>
              <div style={{ position: 'absolute', bottom: -8, fontFamily: 'Caveat, cursive', fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'jours' : 'days'}</div>
            </div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13 }}>
              <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Série en cours !' : 'On a streak!'}</div>
              <div style={{ color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Plus 3 jours pour un nouveau badge ✦' : '3 more days for a new badge ✦'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['✦','◆','★','◯'].map((s, i) => (
              <div key={i} className="w-box-dashed" style={{ flex: 1, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, opacity: i < 2 ? 1 : 0.3 }}>{s}</div>
            ))}
          </div>
        </W>
      </div>
    </div>
  </WBrowser>
);

// Variation C — Focus-first / minimal hero with central action
const DashboardFocus = ({ lang }) => (
  <WBrowser url="studywith.me">
    <WTopNav active="home" lang={lang} />
    <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
      {/* Left aside */}
      <div style={{ width: 240, padding: 28, borderRight: '1.5px dashed var(--ink-mute)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div className="w-hand" style={{ fontSize: 16, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'à venir' : 'upcoming'}</div>
          {['14:00 · Anglais', '20:30 · Lecture', 'Demain · Algèbre'].map((s, i) => (
            <div key={i} style={{ padding: '6px 0', fontFamily: 'Kalam, cursive', fontSize: 13, borderBottom: '1px dashed var(--ink-mute)' }}>{s}</div>
          ))}
        </div>
        <div>
          <div className="w-hand" style={{ fontSize: 16, color: 'var(--ink-mute)', marginBottom: 6 }}>{lang === 'fr' ? 'goals' : 'goals'}</div>
          {[
            { t: lang === 'fr' ? 'Finir chap. 4' : 'Finish ch. 4', done: true },
            { t: lang === 'fr' ? '5 sessions pomodoro' : '5 pomodoro sessions', done: false },
            { t: lang === 'fr' ? 'Réviser vocabulaire' : 'Vocab review', done: false },
          ].map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Kalam, cursive', fontSize: 13, padding: '4px 0', opacity: g.done ? 0.5 : 1 }}>
              <div className={`w-check ${g.done ? 'done' : ''}`} />
              <span style={{ textDecoration: g.done ? 'line-through' : 'none' }}>{g.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 18 }}>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 14, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'mardi, 24 nov.' : 'Tue, Nov 24'}</div>
        <div className="w-hand" style={{ fontSize: 48, textAlign: 'center', lineHeight: 1 }}>
          {lang === 'fr' ? 'On commence ?' : 'Shall we begin?'}
        </div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 14, color: 'var(--ink-mute)', textAlign: 'center', maxWidth: 360 }}>
          {lang === 'fr' ? 'Prochaine session : Anglais avec Sami & Inès dans 1h 12min.' : 'Next session: English with Sami & Inès in 1h 12min.'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <WBtn primary style={{ padding: '10px 18px', fontSize: 15 }}>▶ {lang === 'fr' ? 'Session focus 25min' : 'Focus 25 min'}</WBtn>
          <WBtn style={{ padding: '10px 18px', fontSize: 15 }}>+ {lang === 'fr' ? 'Rejoindre une salle' : 'Join a room'}</WBtn>
        </div>

        <div className="w-box-dashed" style={{ padding: 14, marginTop: 30, width: 460, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="w-img" style={{ width: 60, height: 60 }}>♪</div>
          <div style={{ flex: 1 }}>
            <div className="w-hand" style={{ fontSize: 16 }}>{lang === 'fr' ? 'Café lofi' : 'Lofi café'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? '23 étudiants · ambiance pluie' : '23 students · rain ambience'}</div>
          </div>
          <WBtn primary>{lang === 'fr' ? 'rejoindre' : 'join'}</WBtn>
        </div>
      </div>

      {/* Right aside: friends-now */}
      <div style={{ width: 240, padding: 28, borderLeft: '1.5px dashed var(--ink-mute)' }}>
        <div className="w-hand" style={{ fontSize: 16, color: 'var(--ink-mute)', marginBottom: 8 }}>{lang === 'fr' ? 'amis · en ligne' : 'friends · online'}</div>
        {[
          { n: 'Sami', s: lang === 'fr' ? 'révise · 45min' : 'studying · 45m', dot: 'a' },
          { n: 'Inès', s: lang === 'fr' ? 'révise · 12min' : 'studying · 12m', dot: 'a' },
          { n: 'Yann', s: lang === 'fr' ? 'pause' : 'on break', dot: 'b' },
          { n: 'Marwa', s: lang === 'fr' ? 'salle privée' : 'private room', dot: 'a' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px dashed var(--ink-mute)' }}>
            <div style={{ position: 'relative' }}>
              <WAv initials={f.n[0]} size={30} />
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: 4, background: f.dot === 'a' ? 'var(--accent-2)' : 'var(--ink-mute)', border: '1.5px solid var(--paper)' }} />
            </div>
            <div style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 12 }}>
              <div style={{ fontWeight: 700 }}>{f.n}</div>
              <div style={{ color: 'var(--ink-mute)', fontSize: 10 }}>{f.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </WBrowser>
);

Object.assign(window, { AuthSplit, AuthCard, DashboardSidebar, DashboardMag, DashboardFocus });
