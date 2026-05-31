// StudyWithMe wireframes — Discover students, Profile, Stats, Notifications

// ─────────────────────────────────────────────────────────────
// DISCOVER STUDENTS (US-06) — find study buddies
// ─────────────────────────────────────────────────────────────

const studentData = (lang) => [
  { n: 'Sami K.',   sub: 'Maths · Stats',          uni: 'Sorbonne L2', avail: lang === 'fr' ? 'soirs · weekend' : 'evenings · weekend', match: 92 },
  { n: 'Inès B.',   sub: 'Anglais · Histoire',     uni: 'Sciences Po L1', avail: lang === 'fr' ? 'après-midi' : 'afternoons', match: 88 },
  { n: 'Yann M.',   sub: 'Informatique',           uni: 'Paris-Saclay L3', avail: lang === 'fr' ? 'matin' : 'mornings', match: 85 },
  { n: 'Marwa A.',  sub: 'Bio · Chimie',           uni: 'UPMC L2', avail: lang === 'fr' ? 'flexible' : 'flexible', match: 84 },
  { n: 'Tom L.',    sub: 'Histoire · Géographie',  uni: 'Nanterre L1', avail: lang === 'fr' ? 'soirs' : 'evenings', match: 79 },
  { n: 'Anaïs G.',  sub: 'Économie · Stats',       uni: 'Dauphine L2', avail: lang === 'fr' ? 'weekend' : 'weekend', match: 76 },
];

const DiscoverGrid = ({ lang }) => {
  const students = studentData(lang);
  return (
    <WBrowser url="studywith.me/discover">
      <WTopNav active="disc" lang={lang} />
      <div style={{ flex: 1, padding: '22px 32px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div>
            <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Trouve ton study buddy' : 'Find your study buddy'}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? '142 étudiants compatibles cette semaine' : '142 compatible students this week'}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <WChip fill>{lang === 'fr' ? 'compatibilité' : 'match'} ✦</WChip>
            <WChip>{lang === 'fr' ? 'matières' : 'subjects'}</WChip>
            <WChip>{lang === 'fr' ? 'dispos' : 'avail.'}</WChip>
            <WChip>{lang === 'fr' ? 'université' : 'university'}</WChip>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '230px', gap: 14, overflow: 'hidden' }}>
          {students.map((s, i) => (
            <div key={i} className="w-box" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
              {/* match badge */}
              <div className="w-box-highlight" style={{ position: 'absolute', top: 10, right: 10, padding: '2px 8px', borderRadius: 999, fontFamily: 'Kalam, cursive', fontSize: 11, fontWeight: 700, transform: 'rotate(3deg)' }}>{s.match}%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <WAv initials={s.n[0]} size={56} style={{ fontSize: 24 }} />
                <div>
                  <div className="w-hand" style={{ fontSize: 18 }}>{s.n}</div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{s.uni}</div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{lang === 'fr' ? 'matières' : 'subjects'}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {s.sub.split(' · ').map(tag => <WChip key={tag}>{tag}</WChip>)}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{lang === 'fr' ? 'disponible' : 'available'}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13 }}>{s.avail}</div>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 6 }}>
                <WBtn style={{ padding: '5px 10px', fontSize: 12 }}>{lang === 'fr' ? 'profil' : 'profile'}</WBtn>
                <WBtn primary style={{ padding: '5px 10px', fontSize: 12, flex: 1, justifyContent: 'center' }}>+ {lang === 'fr' ? 'inviter en salle' : 'invite to room'}</WBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WBrowser>
  );
};

const DiscoverProfile = ({ lang }) => (
  <WBrowser url="studywith.me/u/sami-k">
    <WTopNav active="disc" lang={lang} />
    <div style={{ flex: 1, padding: '28px 60px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28, overflow: 'hidden' }}>
      {/* Left: identity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="w-box" style={{ padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6, position: 'relative' }}>
          <div className="w-box-highlight" style={{ position: 'absolute', top: 12, right: 12, padding: '3px 10px', borderRadius: 999, fontFamily: 'Kalam, cursive', fontSize: 12, fontWeight: 700, transform: 'rotate(3deg)' }}>92% ✦</div>
          <WAv initials="S" size={84} style={{ fontSize: 36 }} />
          <div className="w-hand" style={{ fontSize: 24 }}>Sami Kessouri</div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>Sorbonne · L2 Mathématiques</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <WBtn primary style={{ padding: '5px 12px' }}>+ {lang === 'fr' ? 'Inviter en salle' : 'Invite to room'}</WBtn>
            <WBtn style={{ padding: '5px 10px' }}>+ {lang === 'fr' ? 'Ami' : 'Friend'}</WBtn>
          </div>
        </div>
        <div className="w-box-dashed" style={{ padding: 16 }}>
          <div className="w-hand" style={{ fontSize: 14, color: 'var(--ink-mute)', marginBottom: 6 }}>{lang === 'fr' ? 'BIO' : 'BIO'}</div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, lineHeight: 1.5 }}>
            {lang === 'fr'
              ? '« Étudiant en maths, j\'aime travailler en sessions structurées (pomodoro). Cherche groupe pour préparer DS de janvier. »'
              : '"Math student, I like structured pomodoro sessions. Looking for a group to prep January exams."'}
          </div>
        </div>
        <div className="w-box" style={{ padding: 16 }}>
          <div className="w-hand" style={{ fontSize: 14, marginBottom: 8 }}>{lang === 'fr' ? 'Disponibilités' : 'Availability'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: 4, fontFamily: 'Kalam, cursive', fontSize: 10 }}>
            <div />
            {(lang === 'fr' ? ['L','M','M','J','V','S','D'] : ['M','T','W','T','F','S','S']).map((d, i) => <div key={i} style={{ textAlign: 'center', color: 'var(--ink-mute)' }}>{d}</div>)}
            {['matin','aprem','soir'].map((slot, r) => (
              <React.Fragment key={r}>
                <div style={{ color: 'var(--ink-mute)' }}>{slot}</div>
                {Array.from({length: 7}).map((_, c) => {
                  const on = (r === 2 && c < 5) || (r === 1 && c > 4) || (r === 1 && c === 0);
                  return <div key={c} style={{ aspectRatio: '1', border: '1px solid var(--ink)', background: on ? 'var(--ink)' : 'transparent' }} />;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Right: details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
        <div className="w-box" style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 16, marginBottom: 8 }}>{lang === 'fr' ? 'Matières & objectifs' : 'Subjects & goals'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { t: 'Algèbre linéaire', sub: 'L2 · révision DS', c: 'var(--accent)' },
              { t: 'Analyse', sub: 'L2 · théorèmes', c: 'var(--accent-2)' },
              { t: 'Stats', sub: 'L2 · TD', c: '#7b6695' },
            ].map((s, i) => (
              <div key={i} className="w-box-soft" style={{ padding: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, background: s.c, border: '1px solid var(--ink)', marginBottom: 6 }} />
                <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 700, fontSize: 13 }}>{s.t}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="w-box" style={{ padding: 16 }}>
            <div className="w-hand" style={{ fontSize: 16, marginBottom: 8 }}>{lang === 'fr' ? 'Style d\'étude' : 'Study style'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { k: lang === 'fr' ? 'Pomodoro' : 'Pomodoro', v: '25 / 5' },
                { k: lang === 'fr' ? 'Ambiance' : 'Vibe',     v: lang === 'fr' ? 'lofi · café' : 'lofi · café' },
                { k: lang === 'fr' ? 'Groupe idéal' : 'Group size', v: '2-4' },
                { k: lang === 'fr' ? 'Caméra' : 'Camera',    v: lang === 'fr' ? 'parfois' : 'sometimes' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 13, padding: '4px 0', borderBottom: '1px dashed var(--ink-mute)' }}>
                  <span style={{ color: 'var(--ink-mute)' }}>{r.k}</span>
                  <span style={{ fontWeight: 700 }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-box" style={{ padding: 16 }}>
            <div className="w-hand" style={{ fontSize: 16, marginBottom: 8 }}>{lang === 'fr' ? 'Stats publiques' : 'Public stats'}</div>
            <div className="w-hand" style={{ fontSize: 24 }}>34h <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'ce mois' : 'this month'}</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 30, marginTop: 8 }}>
              {[40,70,30,90,60,80,50,75,40,90,65,45].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--ink)', borderRadius: 1 }} />
              ))}
            </div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>{lang === 'fr' ? '🔥 série 23 jours' : '🔥 23-day streak'}</div>
          </div>
        </div>

        <div className="w-box" style={{ padding: 16 }}>
          <div className="w-hand" style={{ fontSize: 16, marginBottom: 8 }}>{lang === 'fr' ? 'Salles fréquentées' : 'Frequent rooms'}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Maths sup · examen', 'Café lofi · pluie', 'Pomodoro 25/5', 'Examens janvier'].map((r, i) => (
              <WChip key={i}>♪ {r}</WChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// PROFILE EDIT (US-07)
// ─────────────────────────────────────────────────────────────

const ProfileEdit = ({ lang }) => (
  <WBrowser url="studywith.me/me/edit">
    <WTopNav active="home" lang={lang} />
    <div style={{ flex: 1, padding: '24px 60px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, overflow: 'hidden' }}>
      {/* sub-nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div className="w-hand" style={{ fontSize: 20, marginBottom: 10 }}>{lang === 'fr' ? 'Réglages' : 'Settings'}</div>
        {[
          { t: lang === 'fr' ? 'Profil' : 'Profile', active: true },
          { t: lang === 'fr' ? 'Matières & dispos' : 'Subjects & avail.' },
          { t: lang === 'fr' ? 'Notifications' : 'Notifications' },
          { t: lang === 'fr' ? 'Intégrations' : 'Integrations' },
          { t: lang === 'fr' ? 'Confidentialité' : 'Privacy' },
          { t: lang === 'fr' ? 'Compte' : 'Account' },
        ].map((it, i) => (
          <div key={i} className={`w-sidebar-item ${it.active ? 'active' : ''}`} style={{ borderRadius: 4 }}>{it.t}</div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Mon profil' : 'My profile'}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <WBtn>{lang === 'fr' ? 'voir profil public' : 'view public'}</WBtn>
            <WBtn primary>{lang === 'fr' ? 'Enregistrer' : 'Save'}</WBtn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>
          {/* photo */}
          <div className="w-box" style={{ padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <WAv initials="L" size={100} style={{ fontSize: 44 }} />
            <WBtn>{lang === 'fr' ? 'Changer photo' : 'Change photo'}</WBtn>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'JPG / PNG · max 2MB' : 'JPG / PNG · max 2MB'}</div>
          </div>

          {/* form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Prénom' : 'First name'}</div>
                <div className="w-input-box">Léa</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Nom' : 'Last name'}</div>
                <div className="w-input-box">Mansouri</div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Pseudo' : 'Username'}</div>
              <div className="w-input-box">@lea.m</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Université / école' : 'University / school'}</div>
              <div className="w-input-box">Sorbonne — L2 Mathématiques</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)' }}>{lang === 'fr' ? 'Bio' : 'Bio'}</div>
              <div className="w-input-box" style={{ minHeight: 60 }}>
                {lang === 'fr' ? 'Cherche groupe de révision pour le DS d\'algèbre de janvier. Méthode pomodoro privilégiée…' : 'Looking for a study group for January algebra exam. Prefer pomodoro method…'}
              </div>
            </div>
          </div>
        </div>

        {/* subjects */}
        <div className="w-box" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Mes matières' : 'My subjects'}</div>
            <WBtn>+ {lang === 'fr' ? 'matière' : 'subject'}</WBtn>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Algèbre', 'Analyse', 'Statistiques', 'Anglais', 'Histoire'].map((s, i) => (
              <WChip key={i} fill={i < 3}>{s} ×</WChip>
            ))}
            <WChip><span style={{ color: 'var(--ink-mute)' }}>+ {lang === 'fr' ? 'ajouter' : 'add'}</span></WChip>
          </div>
        </div>

        <div className="w-box" style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 10 }}>{lang === 'fr' ? 'Disponibilités' : 'Availability'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: 4, fontFamily: 'Kalam, cursive', fontSize: 11, maxWidth: 600 }}>
            <div />
            {(lang === 'fr' ? ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map((d, i) => <div key={i} style={{ textAlign: 'center', color: 'var(--ink-mute)' }}>{d}</div>)}
            {[lang === 'fr' ? 'Matin' : 'Morn', lang === 'fr' ? 'Aprem' : 'Aft', lang === 'fr' ? 'Soir' : 'Eve'].map((slot, r) => (
              <React.Fragment key={r}>
                <div style={{ color: 'var(--ink-mute)' }}>{slot}</div>
                {Array.from({length: 7}).map((_, c) => {
                  const on = (r === 2) || (r === 1 && c >= 5);
                  return <div key={c} style={{ aspectRatio: '1', border: '1.25px solid var(--ink)', background: on ? 'var(--ink)' : 'transparent', borderRadius: 2 }} />;
                })}
              </React.Fragment>
            ))}
          </div>
          <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)', marginTop: 8 }}>{lang === 'fr' ? '✶ clique sur une case pour basculer la disponibilité' : '✶ click a cell to toggle availability'}</div>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// STATS / Focus tracker (US-09)
// ─────────────────────────────────────────────────────────────

const StatsOverview = ({ lang }) => (
  <WBrowser url="studywith.me/stats">
    <WTopNav active="stats" lang={lang} />
    <div style={{ flex: 1, padding: '22px 32px', display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Tes statistiques' : 'Your stats'}</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {(lang === 'fr' ? ['7j','30j','3 mois','tout'] : ['7d','30d','3 mo','all']).map((p, i) => (
            <WChip key={i} fill={i === 0}>{p}</WChip>
          ))}
          <WBtn style={{ marginLeft: 10 }}>{lang === 'fr' ? 'Exporter rapport →' : 'Export report →'}</WBtn>
        </div>
      </div>

      {/* top KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { l: lang === 'fr' ? 'Temps focus' : 'Focus time', v: '12h 34m', delta: '+2h vs ' + (lang === 'fr' ? 'semaine dernière' : 'last week') },
          { l: lang === 'fr' ? 'Sessions terminées' : 'Sessions done', v: '23', delta: lang === 'fr' ? '18 pomodoros' : '18 pomodoros' },
          { l: lang === 'fr' ? 'Série en cours' : 'Current streak', v: '12 ✦', delta: lang === 'fr' ? 'record perso: 18 jours' : 'best: 18 days' },
          { l: lang === 'fr' ? 'Matière principale' : 'Top subject', v: 'Algèbre', delta: '4h 12m (33%)' },
        ].map((k, i) => (
          <div key={i} className={i === 2 ? 'w-box-highlight' : 'w-box'} style={{ padding: 16 }}>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 12, color: 'var(--ink-mute)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{k.l}</div>
            <div className="w-hand" style={{ fontSize: 30, lineHeight: 1.1 }}>{k.v}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* main chart + breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="w-box" style={{ padding: 18, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Activité · 7 derniers jours' : 'Activity · last 7 days'}</div>
            <div style={{ display: 'flex', gap: 10, fontFamily: 'Kalam, cursive', fontSize: 11 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, background: 'var(--ink)' }} /> solo</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, background: 'var(--accent)' }} /> {lang === 'fr' ? 'salle' : 'room'}</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '0 10px 30px', position: 'relative' }}>
            {/* horizontal grid */}
            {[0.25, 0.5, 0.75].map(y => (
              <div key={y} style={{ position: 'absolute', left: 0, right: 0, bottom: `${30 + y * (100-30)}%`, borderTop: '1px dashed var(--ink-mute)', opacity: 0.4 }} />
            ))}
            {(lang === 'fr' ? ['Mer','Jeu','Ven','Sam','Dim','Lun','Mar'] : ['Wed','Thu','Fri','Sat','Sun','Mon','Tue']).map((d, i) => {
              const solo = [50, 80, 45, 30, 60, 90, 70][i];
              const room = [20, 30, 10, 50, 40, 25, 50][i];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: 200, width: '70%' }}>
                    <div style={{ background: 'var(--accent)', height: room, width: '100%', border: '1px solid var(--ink)' }} />
                    <div style={{ background: 'var(--ink)', height: solo, width: '100%' }} />
                  </div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11 }}>{d}</div>
                  <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)' }}>{Math.round((solo+room)/100*1.5*10)/10}h</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-box" style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Par matière' : 'By subject'}</div>
          {[
            { n: 'Algèbre',  v: 33, h: '4h 12m', c: 'var(--accent)' },
            { n: 'Anglais',  v: 22, h: '2h 50m', c: 'var(--accent-2)' },
            { n: 'Stats',    v: 18, h: '2h 14m', c: '#7b6695' },
            { n: 'Histoire', v: 14, h: '1h 38m', c: '#c98e42' },
            { n: 'Lecture',  v: 13, h: '1h 30m', c: '#5b6b7b' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, background: s.c, border: '1px solid var(--ink)' }} />{s.n}</span>
                <span style={{ color: 'var(--ink-mute)' }}>{s.h}</span>
              </div>
              <div style={{ height: 8, border: '1.25px solid var(--ink)', borderRadius: 4, marginTop: 4, overflow: 'hidden', background: 'var(--paper-2)' }}>
                <div style={{ width: `${s.v * 3}%`, height: '100%', background: s.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </WBrowser>
);

const StatsHeatmap = ({ lang }) => (
  <WBrowser url="studywith.me/stats">
    <WTopNav active="stats" lang={lang} />
    <div style={{ flex: 1, padding: '22px 32px', display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Année d\'études' : 'Study year'}</div>
        <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13, color: 'var(--ink-mute)', marginLeft: 14 }}>{lang === 'fr' ? '184 jours d\'étude · 312h cumulées' : '184 study days · 312 cumulative hours'}</div>
      </div>

      {/* heatmap */}
      <div className="w-box" style={{ padding: 22 }}>
        <div className="w-hand" style={{ fontSize: 17, marginBottom: 12 }}>{lang === 'fr' ? 'Constance · 12 derniers mois' : 'Consistency · last 12 months'}</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* week labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'Kalam, cursive', fontSize: 9, color: 'var(--ink-mute)', padding: '14px 4px 0 0', justifyContent: 'space-around' }}>
            {(lang === 'fr' ? ['L','M','M','J','V','S','D'] : ['M','T','W','T','F','S','S']).map((d,i)=><div key={i} style={{ height: 10 }}>{i % 2 === 0 ? d : ''}</div>)}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)', marginBottom: 4 }}>
              {(lang === 'fr' ? ['Déc','Jan','Fév','Mar','Avr','Mai','Jui','Jui','Aoû','Sep','Oct','Nov'] : ['Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov']).map((m,i)=><span key={i}>{m}</span>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gridTemplateRows: 'repeat(7, 1fr)', gap: 2, gridAutoFlow: 'column', aspectRatio: '7 / 1' }}>
              {Array.from({length: 52*7}).map((_, i) => {
                const v = ([0, 0, 1, 0, 2, 3, 4, 0, 1, 2, 3, 3, 4, 2, 0, 0, 1, 2, 1])[i % 19];
                const colors = ['transparent', '#d8d4c4', '#a5a18c', '#6e6957', 'var(--ink)'];
                return <div key={i} style={{ background: colors[v] || 'transparent', border: v === 0 ? '1px solid var(--ink-mute)' : '1px solid var(--ink)', borderRadius: 1 }} />;
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: 'Kalam, cursive', fontSize: 10, color: 'var(--ink-mute)' }}>
              <span>{lang === 'fr' ? 'moins' : 'less'}</span>
              {['transparent', '#d8d4c4', '#a5a18c', '#6e6957', 'var(--ink)'].map((c, i) => <div key={i} style={{ width: 12, height: 12, background: c, border: c === 'transparent' ? '1px solid var(--ink-mute)' : '1px solid var(--ink)', borderRadius: 1 }} />)}
              <span>{lang === 'fr' ? 'plus' : 'more'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        {/* leaderboard */}
        <div className="w-box" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="w-hand" style={{ fontSize: 18 }}>{lang === 'fr' ? 'Classement des amis' : 'Friends leaderboard'}</div>
            <div className="w-tabs" style={{ borderBottom: 'none' }}>
              <div className="w-tab active" style={{ padding: '3px 8px', fontSize: 11 }}>{lang === 'fr' ? 'sem.' : 'wk'}</div>
              <div className="w-tab" style={{ padding: '3px 8px', fontSize: 11 }}>{lang === 'fr' ? 'mois' : 'mo'}</div>
              <div className="w-tab" style={{ padding: '3px 8px', fontSize: 11 }}>{lang === 'fr' ? 'tout' : 'all'}</div>
            </div>
          </div>
          {[
            { p: 1, n: 'Sami K.',   h: '18h 04m', d: lang === 'fr' ? '🥇 champion' : '🥇 champion', mine: false },
            { p: 2, n: 'Léa (toi)', h: '12h 34m', d: '🥈',                                        mine: true },
            { p: 3, n: 'Yann M.',   h: '10h 22m', d: '🥉',                                        mine: false },
            { p: 4, n: 'Marwa A.',  h: '8h 47m',  d: '',                                          mine: false },
            { p: 5, n: 'Inès B.',   h: '7h 12m',  d: '',                                          mine: false },
            { p: 6, n: 'Tom L.',    h: '5h 02m',  d: '',                                          mine: false },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px', borderRadius: 4,
              background: p.mine ? 'var(--paper-2)' : 'transparent',
              border: p.mine ? '1.25px solid var(--ink)' : '1.25px solid transparent',
              marginBottom: 4
            }}>
              <span className="w-mono" style={{ fontSize: 13, width: 18, color: 'var(--ink-mute)' }}>#{p.p}</span>
              <WAv initials={p.n[0]} size={28} style={{ fontSize: 12 }} />
              <span style={{ flex: 1, fontFamily: 'Kalam, cursive', fontSize: 13, fontWeight: p.mine ? 700 : 400 }}>{p.n}</span>
              <span className="w-mono" style={{ fontSize: 12 }}>{p.h}</span>
              <span style={{ fontFamily: 'Kalam, cursive', fontSize: 11 }}>{p.d}</span>
            </div>
          ))}
        </div>

        {/* badges */}
        <div className="w-box" style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Badges débloqués' : 'Badges unlocked'} <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>(8 / 24)</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { i: '✦', l: lang === 'fr' ? 'Série 7j' : '7-day streak', on: true },
              { i: '🌙', l: lang === 'fr' ? 'Noctambule' : 'Night owl', on: true },
              { i: '☀', l: lang === 'fr' ? 'Lève-tôt' : 'Early bird', on: true },
              { i: '∑', l: '10h maths', on: true },
              { i: '◷', l: '50 pomos', on: true },
              { i: '👥', l: lang === 'fr' ? 'Sociable' : 'Social', on: true },
              { i: '🔥', l: lang === 'fr' ? 'Série 30j' : '30-day streak', on: false },
              { i: '🏆', l: 'Top 10', on: false },
            ].map((b, i) => (
              <div key={i} className={b.on ? 'w-box' : 'w-box-dashed'} style={{ padding: 10, textAlign: 'center', opacity: b.on ? 1 : 0.4 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{b.i}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 10, lineHeight: 1.2 }}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS (US-08)
// ─────────────────────────────────────────────────────────────

const Notifications = ({ lang }) => (
  <WBrowser url="studywith.me/notifications">
    <WTopNav active="home" lang={lang} />
    <div style={{ flex: 1, padding: '22px 60px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="w-hand" style={{ fontSize: 28 }}>{lang === 'fr' ? 'Notifications' : 'Notifications'}</div>
        <div className="w-tabs" style={{ marginLeft: 20, borderBottom: 'none' }}>
          <div className="w-tab active">{lang === 'fr' ? 'tout' : 'all'}</div>
          <div className="w-tab">{lang === 'fr' ? 'rappels' : 'reminders'}</div>
          <div className="w-tab">{lang === 'fr' ? 'social' : 'social'}</div>
          <div className="w-tab">{lang === 'fr' ? 'salles' : 'rooms'}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <WBtn>{lang === 'fr' ? '✓ tout lu' : '✓ mark all read'}</WBtn>
          <WBtn>{lang === 'fr' ? '⚙ paramètres' : '⚙ settings'}</WBtn>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18, minHeight: 0 }}>
        {/* feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
          {[
            { type: 'reminder', i: '◷', t: lang === 'fr' ? 'Session « Anglais avec Sami » dans 15 min' : 'Session "English with Sami" in 15 min', d: lang === 'fr' ? '14:00 · salle partagée' : '14:00 · shared room', unread: true, accent: true },
            { type: 'friend',  i: '✦',  t: lang === 'fr' ? 'Sami a battu son record (3h focus)' : 'Sami broke their record (3h focus)', d: lang === 'fr' ? 'il y a 12 min · réagir' : '12 min ago · react', unread: true },
            { type: 'invite',  i: '👥', t: lang === 'fr' ? 'Inès t\'invite dans « Pomodoro 25/5 »' : 'Inès invited you to "Pomodoro 25/5"', d: lang === 'fr' ? 'il y a 1h · accepter / décliner' : '1h ago · accept / decline', unread: true },
            { type: 'streak',  i: '🔥', t: lang === 'fr' ? 'Tu as débloqué le badge « série 12 jours »' : 'You unlocked the "12-day streak" badge', d: lang === 'fr' ? 'hier · partager ?' : 'yesterday · share?' },
            { type: 'system',  i: '⚙',  t: lang === 'fr' ? 'Ton planning a été synchronisé avec Google Calendar' : 'Your planning synced with Google Calendar', d: lang === 'fr' ? 'hier · voir détails' : 'yesterday · view details' },
            { type: 'reminder',i: '◷',  t: lang === 'fr' ? 'Demain · DS d\'algèbre dans 3 jours — révise ?' : 'Tomorrow · algebra exam in 3 days — review?', d: lang === 'fr' ? 'rappel automatique' : 'auto-reminder' },
          ].map((n, i) => (
            <div key={i} className="w-box" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 14,
              borderRadius: 0, borderTop: i === 0 ? '1.5px solid var(--ink)' : 'none',
              background: n.unread ? 'var(--paper-2)' : 'var(--paper)',
              borderLeft: n.accent ? '4px solid var(--accent)' : '1.5px solid var(--ink)'
            }}>
              <div className="w-box-soft" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{n.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 14, fontWeight: n.unread ? 700 : 400 }}>{n.t}</div>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{n.d}</div>
              </div>
              {n.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)' }} />}
              {n.type === 'invite' && (
                <div style={{ display: 'flex', gap: 4 }}>
                  <WBtn style={{ padding: '3px 9px', fontSize: 11 }}>{lang === 'fr' ? 'décliner' : 'decline'}</WBtn>
                  <WBtn primary style={{ padding: '3px 9px', fontSize: 11 }}>{lang === 'fr' ? 'rejoindre' : 'join'}</WBtn>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* preferences panel */}
        <div className="w-box" style={{ padding: 18 }}>
          <div className="w-hand" style={{ fontSize: 18, marginBottom: 12 }}>{lang === 'fr' ? 'Préférences' : 'Preferences'}</div>
          {[
            { l: lang === 'fr' ? 'Rappel avant chaque session' : 'Reminder before each session', sub: lang === 'fr' ? '15 minutes avant' : '15 minutes before', on: true },
            { l: lang === 'fr' ? 'Récap quotidien du soir' : 'Daily evening recap', sub: '21:00', on: true },
            { l: lang === 'fr' ? 'Quand un ami démarre une session' : 'When a friend starts a session', sub: '', on: true },
            { l: lang === 'fr' ? 'Invitations en salle' : 'Room invites', sub: '', on: true },
            { l: lang === 'fr' ? 'Badges débloqués' : 'Badge unlocked', sub: '', on: false },
            { l: lang === 'fr' ? 'Comparatif hebdo' : 'Weekly summary', sub: lang === 'fr' ? 'dimanche soir' : 'sunday evening', on: true },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px dashed var(--ink-mute)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Kalam, cursive', fontSize: 13 }}>{p.l}</div>
                {p.sub && <div style={{ fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>{p.sub}</div>}
              </div>
              <div style={{ width: 30, height: 18, borderRadius: 9, border: '1.25px solid var(--ink)', background: p.on ? 'var(--ink)' : 'var(--paper)', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 1, left: p.on ? 14 : 1, width: 14, height: 14, borderRadius: 7, background: 'var(--paper)', border: '1px solid var(--ink)' }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontFamily: 'Kalam, cursive', fontSize: 11, color: 'var(--ink-mute)' }}>
            {lang === 'fr' ? 'Canaux: email · push web · push mobile' : 'Channels: email · web push · mobile push'}
          </div>
        </div>
      </div>
    </div>
  </WBrowser>
);

Object.assign(window, { DiscoverGrid, DiscoverProfile, ProfileEdit, StatsOverview, StatsHeatmap, Notifications });
