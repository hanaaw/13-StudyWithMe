// StudyWithMe wireframes — Planning + Rooms browse + Create room

// ─────────────────────────────────────────────────────────────
// PLANNING — calendar variations (US-03)
// ─────────────────────────────────────────────────────────────

const PlanningWeek = ({ lang }) => {
  const days = lang === 'fr' ? ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const hours = ['08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'];
  const events = [
    { d: 0, h: 1, len: 2, t: 'Algèbre',  tag: 'solo' },
    { d: 1, h: 3, len: 1, t: 'Anglais',  tag: 'room' },
    { d: 2, h: 2, len: 1.5, t: 'Histoire', tag: 'solo' },
    { d: 3, h: 0, len: 1, t: 'Stats',    tag: 'solo' },
    { d: 4, h: 5, len: 2, t: 'Examens',  tag: 'room' },
    { d: 5, h: 4, len: 1, t: 'Lecture',  tag: 'solo' },
  ];
  return (
    <WBrowser url="studywith.me/planning">
      <WTopNav active="plan" lang={lang} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 32px', gap: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Mon planning' : 'My planning'}</div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
            <WBtn style={{ padding: '4px 10px' }}>‹</WBtn>
            <WBtn style={{ padding: '4px 10px' }}>›</WBtn>
            <WBtn style={{ padding: '4px 10px', fontSize: 12 }}>{lang === 'fr' ? 'aujourd\'hui' : 'today'}</WBtn>
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 16, marginLeft: 8 }}>{lang === 'fr' ? '24 — 30 nov. 2025' : 'Nov 24 — 30, 2025'}</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <div className="w-tabs" style={{ borderBottom: 'none' }}>
              <div className="w-tab" style={{ padding: '4px 10px', borderBottom: 'none', border: '1.25px solid var(--ink)', borderRadius: '4px 0 0 4px' }}>{lang === 'fr' ? 'jour' : 'day'}</div>
              <div className="w-tab active" style={{ padding: '4px 10px', borderBottom: 'none', background: 'var(--ink)', color: 'var(--paper)' }}>{lang === 'fr' ? 'semaine' : 'week'}</div>
              <div className="w-tab" style={{ padding: '4px 10px', borderBottom: 'none', border: '1.25px solid var(--ink)', borderRadius: '0 4px 4px 0' }}>{lang === 'fr' ? 'mois' : 'month'}</div>
            </div>
            <WBtn primary>+ {lang === 'fr' ? 'Nouvelle session' : 'New session'}</WBtn>
          </div>
        </div>

        <div className="w-box" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
          {/* day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', borderBottom: '1.5px solid var(--ink)' }}>
            <div />
            {days.map((d, i) => (
              <div key={i} style={{ padding: '8px 10px', borderLeft: '1px dashed var(--ink-mute)', fontFamily: 'Kalam, cursive', fontSize: 13 }}>
                <div style={{ fontWeight: 700 }}>{d}</div>
                <div style={{ color: 'var(--ink-mute)', fontSize: 11 }}>{24 + i}</div>
              </div>
            ))}
          </div>
          {/* grid */}
          <div style={{ flex: 1, position: 'relative', display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {hours.map((h, i) => (
                <div key={i} style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', padding: '2px 6px', borderTop: '1px dashed var(--ink-mute)' }}>{h}</div>
              ))}
            </div>
            {Array.from({length: 7}).map((_, day) => (
              <div key={day} style={{ position: 'relative', borderLeft: '1px dashed var(--ink-mute)', display: 'flex', flexDirection: 'column' }}>
                {hours.map((_, i) => <div key={i} style={{ flex: 1, borderTop: '1px dashed var(--ink-mute)' }} />)}
                {events.filter(e => e.d === day).map((e, i) => {
                  const top = (e.h / hours.length) * 100;
                  const hgt = (e.len / hours.length) * 100;
                  return (
                    <div key={i} className={e.tag === 'room' ? 'w-box-highlight' : 'w-box-fill'}
                      style={{ position: 'absolute', left: 4, right: 4, top: `${top}%`, height: `${hgt}%`,
                               padding: 6, fontFamily: 'Kalam, cursive', fontSize: 11,
                               color: e.tag === 'room' ? 'var(--ink)' : 'var(--paper)' }}>
                      <div style={{ fontWeight: 700 }}>{e.t}</div>
                      <div style={{ opacity: 0.7, fontSize: 10 }}>{e.tag === 'room' ? '· room' : '· solo'}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <WAnno x={460} y={88}>{lang === 'fr' ? 'glisser pour créer une session' : 'drag to create a session'}</WAnno>
      </div>
    </WBrowser>
  );
};

const PlanningDay = ({ lang }) => (
  <WBrowser url="studywith.me/planning/today">
    <WTopNav active="plan" lang={lang} />
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      {/* Left subject panel */}
      <div style={{ width: 240, padding: 24, borderRight: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
        <div className="w-hand" style={{ fontSize: 18, marginBottom: 14 }}>{lang === 'fr' ? 'Mes matières' : 'My subjects'}</div>
        {[
          { n: lang === 'fr' ? 'Algèbre' : 'Algebra', c: 'var(--accent)' },
          { n: lang === 'fr' ? 'Anglais' : 'English', c: 'var(--accent-2)' },
          { n: lang === 'fr' ? 'Histoire' : 'History', c: '#7b6695' },
          { n: 'Stats',   c: '#c98e42' },
          { n: lang === 'fr' ? 'Lecture' : 'Reading', c: '#5b6b7b' },
        ].map((s, i) => (
          <div key={i} className="w-box-dashed" style={{ padding: 8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'grab' }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: s.c, border: '1px solid var(--ink)' }} />
            <span style={{ fontFamily: 'Kalam, cursive', fontSize: 13 }}>{s.n}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>⠿</span>
          </div>
        ))}
        <WBtn ghost style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 12 }}>+ {lang === 'fr' ? 'matière' : 'subject'}</WBtn>

        <div className="w-hand" style={{ fontSize: 18, marginTop: 24, marginBottom: 10 }}>{lang === 'fr' ? 'Objectifs jour' : 'Day goals'}</div>
        {[
          { t: lang === 'fr' ? '2h focus' : '2h focus', done: true },
          { t: lang === 'fr' ? '4 pomodoros' : '4 pomodoros', done: false },
          { t: lang === 'fr' ? 'Réviser vocab' : 'Review vocab', done: false },
        ].map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Kalam, cursive', fontSize: 12, padding: '3px 0' }}>
            <div className={`w-check ${g.done ? 'done' : ''}`} />
            <span style={{ textDecoration: g.done ? 'line-through' : 'none', opacity: g.done ? 0.5 : 1 }}>{g.t}</span>
          </div>
        ))}
      </div>

      {/* Day timeline */}
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Mardi 24' : 'Tuesday 24'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? '3 sessions · 2h 30min planifiées' : '3 sessions · 2h 30m planned'}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <WBtn>{lang === 'fr' ? '⌖ Google Calendar' : '⌖ Google Calendar'}</WBtn>
            <WBtn primary>+ {lang === 'fr' ? 'Session' : 'Session'}</WBtn>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: 60, display: 'flex', flexDirection: 'column' }}>
            {['08','10','12','14','16','18','20','22'].map((h, i) => (
              <div key={i} style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', borderTop: '1px dashed var(--ink-mute)', paddingTop: 2 }}>{h}:00</div>
            ))}
          </div>
          <div style={{ flex: 1, position: 'relative', borderLeft: '1.5px solid var(--ink)' }}>
            {[0,1,2,3,4,5,6,7].map(i => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i*12.5}%`, borderTop: '1px dashed var(--ink-mute)' }} />)}
            {/* now line */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: '36%', borderTop: '2px solid var(--accent)' }}>
              <span style={{ position: 'absolute', left: 8, top: -10, background: 'var(--accent)', color: 'var(--paper)', fontFamily: 'Kalam, cursive', fontSize: 10, padding: '1px 6px', borderRadius: 3 }}>{lang === 'fr' ? "maintenant 14:48" : 'now 14:48'}</span>
            </div>
            {/* events */}
            <div className="w-box-fill" style={{ position: 'absolute', left: 10, right: 50, top: '6%', height: '12%', padding: 10 }}>
              <div style={{ fontWeight: 700, fontFamily: 'Kalam, cursive', fontSize: 13 }}>{lang === 'fr' ? 'Algèbre · révision DS' : 'Algebra · exam prep'}</div>
              <div style={{ fontSize: 11, fontFamily: 'Kalam, cursive', opacity: 0.7 }}>09:00 — 10:30 · solo</div>
            </div>
            <div className="w-box-highlight" style={{ position: 'absolute', left: 10, right: 50, top: '38%', height: '12%', padding: 10 }}>
              <div style={{ fontWeight: 700, fontFamily: 'Kalam, cursive', fontSize: 13 }}>{lang === 'fr' ? 'Anglais avec Sami & Inès' : 'English w/ Sami & Inès'}</div>
              <div style={{ fontSize: 11, fontFamily: 'Kalam, cursive' }}>14:00 — 15:30 · shared room</div>
            </div>
            <div className="w-box" style={{ position: 'absolute', left: 10, right: 50, top: '66%', height: '10%', padding: 10 }}>
              <div style={{ fontWeight: 700, fontFamily: 'Kalam, cursive', fontSize: 13 }}>{lang === 'fr' ? 'Lecture · chap. 4' : 'Reading · ch. 4'}</div>
              <div style={{ fontSize: 11, fontFamily: 'Kalam, cursive', color: 'var(--ink-mute)' }}>20:30 — 21:30 · solo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

const PlanningKanban = ({ lang }) => {
  const cols = [
    { id: 'today', title: lang === 'fr' ? "Aujourd'hui" : 'Today', items: [
      { t: 'Algèbre · DS', sub: '09:00 · 1h30', tag: 'solo' },
      { t: 'Anglais (Sami)', sub: '14:00 · 1h30', tag: 'room' },
      { t: 'Lecture · ch. 4', sub: '20:30 · 1h', tag: 'solo' },
    ]},
    { id: 'week', title: lang === 'fr' ? 'Cette semaine' : 'This week', items: [
      { t: 'Histoire · ch. 2', sub: 'mer · 16:00', tag: 'solo' },
      { t: 'Stats · TD', sub: 'jeu · 10:00', tag: 'solo' },
      { t: 'Examens janv.', sub: 'ven · 18:00', tag: 'room' },
      { t: 'Vocabulaire EN', sub: 'sam · 11:00', tag: 'solo' },
    ]},
    { id: 'later', title: lang === 'fr' ? 'Plus tard' : 'Later', items: [
      { t: 'Préparer DS algèbre', sub: '+ 2 semaines', tag: '' },
      { t: 'Lire Bourdieu', sub: 'dec', tag: '' },
    ]},
    { id: 'done', title: lang === 'fr' ? 'Terminé' : 'Done', items: [
      { t: 'Stats · ch. 1', sub: lang === 'fr' ? 'hier · 1h' : 'yesterday · 1h', tag: '✓' },
      { t: 'Anglais · 30min', sub: lang === 'fr' ? 'hier · pomodoro' : 'yesterday · pomodoro', tag: '✓' },
    ]},
  ];
  return (
    <WBrowser url="studywith.me/planning">
      <WTopNav active="plan" lang={lang} />
      <div style={{ flex: 1, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Mon tableau' : 'My board'}</div>
          <div className="w-input-box" style={{ marginLeft: 18, fontSize: 12, padding: '5px 12px', width: 200 }}>⌕ {lang === 'fr' ? 'rechercher session' : 'search session'}</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <div className="w-tabs" style={{ borderBottom: 'none' }}>
              <div className="w-tab" style={{ padding: '4px 10px', borderBottom: 'none', border: '1.25px solid var(--ink)', borderRadius: '4px 0 0 4px' }}>{lang === 'fr' ? 'cal' : 'cal'}</div>
              <div className="w-tab active" style={{ padding: '4px 10px', borderBottom: 'none', background: 'var(--ink)', color: 'var(--paper)' }}>{lang === 'fr' ? 'kanban' : 'kanban'}</div>
            </div>
            <WBtn primary>+ {lang === 'fr' ? 'Session' : 'Session'}</WBtn>
          </div>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, minHeight: 0 }}>
          {cols.map(c => (
            <div key={c.id} style={{ background: 'var(--paper-2)', border: '1.5px solid var(--ink)', borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div className="w-hand" style={{ fontSize: 17 }}>{c.title}</div>
                <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{c.items.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, overflow: 'hidden' }}>
                {c.items.map((it, i) => (
                  <div key={i} className="w-box" style={{ background: 'var(--paper)', padding: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, fontWeight: 700, flex: 1 }}>{it.t}</div>
                      {it.tag && <WChip fill={it.tag === '✓'} style={{ fontSize: 10, padding: '0 6px' }}>{it.tag}</WChip>}
                    </div>
                    <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>{it.sub}</div>
                  </div>
                ))}
                <div className="w-box-dashed" style={{ padding: 8, textAlign: 'center', fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>+ {lang === 'fr' ? 'ajouter' : 'add'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WBrowser>
  );
};

// ─────────────────────────────────────────────────────────────
// ROOMS — Browse shared rooms (US-04)
// ─────────────────────────────────────────────────────────────

const roomData = (lang) => [
  { t: lang === 'fr' ? 'Café lofi · pluie' : 'Lofi café · rain', subj: lang === 'fr' ? 'tout sujet' : 'any subject', n: 23, mood: '☂', tag: 'public' },
  { t: lang === 'fr' ? 'Maths sup · examen' : 'Math prep · exam',  subj: lang === 'fr' ? 'algèbre, analyse' : 'algebra, calculus', n: 6, mood: '∑', tag: 'public' },
  { t: lang === 'fr' ? 'Anglais conversation' : 'English conversation', subj: lang === 'fr' ? 'oral, vocab' : 'speaking, vocab', n: 8, mood: 'A', tag: 'public' },
  { t: lang === 'fr' ? 'Bibliothèque calme' : 'Quiet library',  subj: lang === 'fr' ? 'silence total' : 'total silence', n: 14, mood: '✦', tag: 'public' },
  { t: lang === 'fr' ? 'Examens janvier' : 'January exams',  subj: lang === 'fr' ? 'révisions intenses' : 'intense revision', n: 41, mood: '🔥', tag: 'public' },
  { t: lang === 'fr' ? 'Histoire · L1' : 'History · L1',      subj: lang === 'fr' ? 'antiquité, moyen-âge' : 'ancient, medieval', n: 4, mood: '◐', tag: 'public' },
  { t: lang === 'fr' ? 'Pomodoro 25/5' : 'Pomodoro 25/5',    subj: lang === 'fr' ? 'focus structuré' : 'structured focus', n: 12, mood: '◷', tag: 'public' },
  { t: lang === 'fr' ? 'Code · web dev' : 'Code · web dev',  subj: 'js, html, css', n: 7, mood: '⌘', tag: 'public' },
];

const RoomsGrid = ({ lang }) => {
  const rooms = roomData(lang);
  return (
    <WBrowser url="studywith.me/rooms">
      <WTopNav active="rooms" lang={lang} />
      <div style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Salles d\'étude' : 'Study rooms'}</div>
          <div className="w-input-box" style={{ marginLeft: 'auto', width: 280, fontSize: 12, padding: '5px 12px' }}>⌕ {lang === 'fr' ? 'rechercher par matière, ambiance…' : 'search by subject, vibe…'}</div>
          <WBtn primary style={{ marginLeft: 10 }}>+ {lang === 'fr' ? 'Créer une salle' : 'Create a room'}</WBtn>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(lang === 'fr'
            ? ['toutes','maths','langues','code','sciences humaines','lofi','pomodoro','silencieuses','+ filtres']
            : ['all','math','languages','code','humanities','lofi','pomodoro','silent','+ filters']
          ).map((f, i) => <WChip key={i} fill={i === 0}>{f}</WChip>)}
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '160px', gap: 14, overflow: 'hidden' }}>
          {rooms.map((r, i) => (
            <div key={i} className="w-box" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="w-img" style={{ flex: 1, border: 'none', borderBottom: '1.5px solid var(--ink)', borderRadius: 0, fontSize: 30 }}>{r.mood}</div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 13 }}>{r.t}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
                    <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{r.n}</span>
                  </div>
                </div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{r.subj}</div>
              </div>
            </div>
          ))}
        </div>
        <WAnno x={500} y={70} rotate={2}>{lang === 'fr' ? 'cliquer carte → rejoindre instant.' : 'click card → instant join'}</WAnno>
      </div>
    </WBrowser>
  );
};

const RoomsList = ({ lang }) => {
  const rooms = roomData(lang);
  return (
    <WBrowser url="studywith.me/rooms">
      <WTopNav active="rooms" lang={lang} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Filter sidebar */}
        <div style={{ width: 220, padding: 22, borderRight: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Filtres' : 'Filters'}</div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Matière' : 'Subject'}</div>
          {['Maths','Anglais','Histoire','Code','Stats'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 13, padding: '3px 0' }}>
              <div className={`w-check ${i < 2 ? 'done' : ''}`} />{s}
            </div>
          ))}
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginTop: 14, marginBottom: 4 }}>{lang === 'fr' ? 'Ambiance' : 'Vibe'}</div>
          {[lang === 'fr' ? 'Lofi' : 'Lofi', lang === 'fr' ? 'Silence' : 'Silent', 'Pomodoro', lang === 'fr' ? 'Café' : 'Café'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 13, padding: '3px 0' }}>
              <div className={`w-check ${i === 0 ? 'done' : ''}`} />{s}
            </div>
          ))}
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginTop: 14, marginBottom: 4 }}>{lang === 'fr' ? 'Taille' : 'Size'}</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['<5','5-15','15+'].map((s, i) => <WChip key={i} fill={i === 1}>{s}</WChip>)}
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginTop: 14, marginBottom: 4 }}>{lang === 'fr' ? 'Avec amis' : 'With friends'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Kalam, cursive', fontSize: 13 }}><div className="w-check" /> {lang === 'fr' ? 'au moins 1 ami présent' : 'at least 1 friend'}</div>
        </div>

        {/* List */}
        <div style={{ flex: 1, padding: '20px 28px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="w-hand" style={{ fontSize: 24 }}>{lang === 'fr' ? '38 salles trouvées' : '38 rooms found'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'trier · activité ▾' : 'sort · activity ▾'}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
            {rooms.map((r, i) => (
              <div key={i} className="w-box" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="w-img" style={{ width: 56, height: 56, fontSize: 22, flexShrink: 0 }}>{r.mood}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 15 }}>{r.t}</div>
                    {i === 1 && <WChip>{lang === 'fr' ? '1 ami' : '1 friend'} ✦</WChip>}
                  </div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{r.subj} · {r.n} {lang === 'fr' ? 'étudiants' : 'students'}</div>
                </div>
                <div style={{ display: 'flex', gap: -8 }}>
                  {Array.from({length: Math.min(4, Math.floor(r.n/2))}).map((_, j) => (
                    <WAv key={j} initials={String.fromCharCode(65+j)} size={26} style={{ marginLeft: j === 0 ? 0 : -8, fontSize: 10, background: j%2 ? 'var(--paper-2)' : 'var(--paper)' }} />
                  ))}
                </div>
                <WBtn primary style={{ padding: '5px 14px' }}>{lang === 'fr' ? 'rejoindre' : 'join'} →</WBtn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WBrowser>
  );
};

const RoomsMap = ({ lang }) => (
  <WBrowser url="studywith.me/explore">
    <WTopNav active="rooms" lang={lang} />
    <div style={{ flex: 1, position: 'relative', background: 'var(--paper-2)', overflow: 'hidden' }}>
      {/* grid background */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <defs>
          <pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M0 50 L50 50 L50 0" fill="none" stroke="var(--ink-mute)" strokeWidth="0.5" strokeDasharray="2 2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>

      {/* Floating room "venues" */}
      {[
        { x: '12%', y: '18%', t: lang === 'fr' ? 'Café lofi' : 'Lofi café', m: '☂', n: 23, big: true },
        { x: '34%', y: '12%', t: lang === 'fr' ? 'Maths sup' : 'Math prep', m: '∑', n: 6 },
        { x: '52%', y: '24%', t: lang === 'fr' ? 'Examens janv.' : 'Jan exams', m: '🔥', n: 41, big: true },
        { x: '72%', y: '14%', t: 'Anglais', m: 'A', n: 8 },
        { x: '18%', y: '52%', t: lang === 'fr' ? 'Bibliothèque' : 'Library', m: '✦', n: 14 },
        { x: '42%', y: '58%', t: 'Pomodoro', m: '◷', n: 12 },
        { x: '64%', y: '48%', t: 'Code', m: '⌘', n: 7 },
        { x: '84%', y: '56%', t: lang === 'fr' ? 'Histoire' : 'History', m: '◐', n: 4 },
      ].map((r, i) => {
        const size = r.big ? 140 : 100;
        return (
          <div key={i} className="w-box" style={{ position: 'absolute', left: r.x, top: r.y, width: size, padding: 10, background: 'var(--paper)', boxShadow: '3px 3px 0 var(--ink)' }}>
            <div className="w-img" style={{ height: 56, fontSize: r.big ? 28 : 20, marginBottom: 6, border: '1px solid var(--ink)' }}>{r.m}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 12 }}>{r.t}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: 'var(--accent)' }} /> {r.n}
              </div>
              <span style={{ fontFamily: 'Kalam, cursive', fontSize: 10, textDecoration: 'underline' }}>{lang === 'fr' ? 'entrer' : 'enter'}</span>
            </div>
          </div>
        );
      })}

      {/* dotted paths */}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <path d="M 110 200 Q 250 280, 370 200" stroke="var(--ink-mute)" fill="none" strokeWidth="1.5" strokeDasharray="3 4"/>
        <path d="M 370 200 Q 520 220, 700 240" stroke="var(--ink-mute)" fill="none" strokeWidth="1.5" strokeDasharray="3 4"/>
      </svg>

      {/* legend */}
      <div className="w-box" style={{ position: 'absolute', top: 20, right: 20, padding: 12, background: 'var(--paper)' }}>
        <div className="w-hand" style={{ fontSize: 14, marginBottom: 6 }}>{lang === 'fr' ? 'Carte des salles' : 'Map of rooms'}</div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'explore comme un campus virtuel' : 'explore like a virtual campus'}</div>
      </div>

      {/* bottom mini search */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        <div className="w-input-box" style={{ width: 280, background: 'var(--paper)' }}>⌕ {lang === 'fr' ? 'sauter vers… café lofi, maths…' : 'jump to… lofi café, math…'}</div>
        <WBtn primary>+ {lang === 'fr' ? 'Ma salle' : 'My room'}</WBtn>
      </div>
      <WAnno x={460} y={120}>{lang === 'fr' ? 'tailles = activité' : 'sizes = activity'}</WAnno>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// CREATE ROOM (US-05)
// ─────────────────────────────────────────────────────────────

const CreateRoomModal = ({ lang }) => (
  <WBrowser url="studywith.me/rooms">
    <WTopNav active="rooms" lang={lang} />
    <div style={{ flex: 1, position: 'relative', background: 'var(--paper-2)' }}>
      {/* dimmed background grid of cards (faint) */}
      <div style={{ position: 'absolute', inset: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, opacity: 0.25 }}>
        {Array.from({length: 8}).map((_, i) => <div key={i} className="w-box" style={{ height: 140 }} />)}
      </div>
      {/* modal */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-box" style={{ width: 540, padding: 28, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--ink)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="w-hand" style={{ fontSize: 24 }}>{lang === 'fr' ? 'Créer une salle' : 'Create a room'}</div>
            <span style={{ fontFamily: 'Kalam, cursive', fontSize: 18 }}>×</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Nom' : 'Name'}</div>
              <div className="w-input-box">{lang === 'fr' ? 'Révision algèbre L2' : 'Algebra L2 revision'}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Matière' : 'Subject'}</div>
              <div className="w-input-box">{lang === 'fr' ? 'Mathématiques ▾' : 'Mathematics ▾'}</div>
            </div>
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Ambiance' : 'Vibe'}</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[
              { l: 'Lofi café', m: '☂' },
              { l: lang === 'fr' ? 'Bibliothèque' : 'Library', m: '✦' },
              { l: lang === 'fr' ? 'Forêt' : 'Forest', m: '🌲' },
              { l: 'Pomodoro', m: '◷' },
            ].map((v, i) => (
              <div key={i} className={i === 0 ? 'w-box-highlight' : 'w-box'} style={{ flex: 1, padding: 10, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{v.m}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11 }}>{v.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Visibilité' : 'Visibility'}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <WChip>{lang === 'fr' ? '🔒 privée' : '🔒 private'}</WChip>
                <WChip fill>{lang === 'fr' ? '🌍 publique' : '🌍 public'}</WChip>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', marginBottom: 4 }}>{lang === 'fr' ? 'Capacité' : 'Capacity'}</div>
              <div className="w-input-box">8 {lang === 'fr' ? 'pers. ▾' : 'ppl ▾'}</div>
            </div>
          </div>
          <div className="w-box-dashed" style={{ padding: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <WIco shape="square" size={18} />
            <div style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 12 }}>
              <div style={{ fontWeight: 700 }}>{lang === 'fr' ? 'Lien d\'invitation' : 'Invite link'}</div>
              <div style={{ color: 'var(--ink-mute)' }}>studywith.me/r/algebra-l2-x9k</div>
            </div>
            <WBtn style={{ padding: '3px 10px', fontSize: 11 }}>{lang === 'fr' ? 'copier' : 'copy'}</WBtn>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <WBtn>{lang === 'fr' ? 'annuler' : 'cancel'}</WBtn>
            <WBtn primary>{lang === 'fr' ? 'Créer & entrer →' : 'Create & enter →'}</WBtn>
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

const CreateRoomWizard = ({ lang }) => (
  <WBrowser url="studywith.me/rooms/new">
    <WTopNav active="rooms" lang={lang} />
    <div style={{ flex: 1, padding: '32px 80px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center' }}>
        <div className="w-hand" style={{ fontSize: 32, marginBottom: 4 }}>{lang === 'fr' ? 'Configure ta salle' : 'Set up your room'}</div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'étape 2 sur 3' : 'step 2 of 3'}</div>
      </div>
      {/* progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        {['basics', lang === 'fr' ? 'ambiance' : 'vibe', lang === 'fr' ? 'invitations' : 'invites'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, border: '1.5px solid var(--ink)', background: i <= 1 ? 'var(--ink)' : 'var(--paper)', color: i <= 1 ? 'var(--paper)' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Kalam, cursive', fontSize: 11, fontWeight: 700 }}>{i+1}</div>
              <span style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: i === 1 ? 'var(--ink)' : 'var(--ink-mute)' }}>{s}</span>
            </div>
            {i < 2 && <div style={{ width: 36, height: 1.5, background: i < 1 ? 'var(--ink)' : 'var(--ink-mute)', opacity: i < 1 ? 1 : 0.4 }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, minHeight: 0 }}>
        {/* Left: choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="w-hand" style={{ fontSize: 20 }}>{lang === 'fr' ? '1. Choisis l\'ambiance' : '1. Pick the vibe'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[
              { l: 'Café lofi', m: '☂', sub: lang === 'fr' ? 'pluie, jazz doux' : 'rain, soft jazz', sel: true },
              { l: lang === 'fr' ? 'Bibliothèque' : 'Library', m: '✦', sub: lang === 'fr' ? 'silence total' : 'total silence' },
              { l: lang === 'fr' ? 'Forêt' : 'Forest', m: '🌲', sub: lang === 'fr' ? 'oiseaux, vent' : 'birds, wind' },
              { l: lang === 'fr' ? 'Cheminée' : 'Fireplace', m: '🔥', sub: lang === 'fr' ? 'crépitement' : 'crackling' },
              { l: 'Pomodoro', m: '◷', sub: lang === 'fr' ? 'minuteur structuré' : 'structured timer' },
              { l: 'Silence', m: '∅', sub: lang === 'fr' ? 'aucun son' : 'no sound' },
            ].map((v, i) => (
              <div key={i} className={v.sel ? 'w-box-highlight' : 'w-box'} style={{ padding: 12, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{v.m}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 13 }}>{v.l}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)' }}>{v.sub}</div>
              </div>
            ))}
          </div>

          <div className="w-hand" style={{ fontSize: 20, marginTop: 6 }}>{lang === 'fr' ? '2. Outils dans la salle' : '2. Tools in the room'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { l: 'Pomodoro 25/5', on: true },
              { l: lang === 'fr' ? 'Vidéo (caméra)' : 'Video (camera)', on: true },
              { l: lang === 'fr' ? 'Chat texte' : 'Text chat', on: true },
              { l: lang === 'fr' ? 'Tableau partagé' : 'Whiteboard', on: false },
              { l: lang === 'fr' ? 'Liste de tâches' : 'To-do list', on: true },
              { l: lang === 'fr' ? 'Classement temps' : 'Time leaderboard', on: false },
            ].map((it, i) => (
              <div key={i} className="w-box-soft" style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 16, borderRadius: 8, border: '1.25px solid var(--ink)', background: it.on ? 'var(--ink)' : 'var(--paper)', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 1, left: it.on ? 13 : 1, width: 12, height: 12, borderRadius: 6, background: 'var(--paper)', border: '1px solid var(--ink)' }} />
                </div>
                <span style={{ fontFamily: 'Kalam, cursive', fontSize: 12 }}>{it.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: preview */}
        <div className="w-box-dashed" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--paper)' }}>
          <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Aperçu' : 'Preview'}</div>
          <div className="w-img" style={{ flex: 1, fontSize: 50 }}>☂</div>
          <div className="w-hand" style={{ fontSize: 16 }}>{lang === 'fr' ? 'Révision algèbre L2' : 'Algebra L2 revision'}</div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>
            {lang === 'fr' ? 'Café lofi · pluie · jazz doux · 8 places' : 'Lofi café · rain · soft jazz · 8 seats'}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <WChip>pomodoro</WChip><WChip>chat</WChip><WChip>{lang === 'fr' ? 'caméra' : 'camera'}</WChip><WChip>{lang === 'fr' ? 'todo' : 'todo'}</WChip>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <WBtn>‹ {lang === 'fr' ? 'précédent' : 'back'}</WBtn>
        <WBtn primary>{lang === 'fr' ? 'continuer →' : 'continue →'}</WBtn>
      </div>
    </div>
  </WBrowser>
);

Object.assign(window, { PlanningWeek, PlanningDay, PlanningKanban, RoomsGrid, RoomsList, RoomsMap, CreateRoomModal, CreateRoomWizard });
