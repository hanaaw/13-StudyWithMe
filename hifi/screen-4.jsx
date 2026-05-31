// StudyWithMe hi-fi — Discover A (student grid), Profile A (edit), Stats A (overview), Notifications A

// ─────────────────────────────────────────────────────────────
// DISCOVER A — find study buddies (compatibility grid)
// ─────────────────────────────────────────────────────────────

const studentData = (lang) => [
  { n: 'Sami Kessouri', sub: 'Maths · Stats',         uni: 'Sorbonne · L2', avail: tx(lang, 'soirs · weekend', 'evenings · weekend'), match: 92, palette: 0, online: true,  bio: tx(lang, 'Prépare le DS de janvier. Méthode pomodoro 25/5.', 'Prepping Jan exam. Pomodoro 25/5 method.'), tags: ['Algèbre', 'Analyse', 'Stats'] },
  { n: 'Inès Belhaj',   sub: 'Anglais · Histoire',    uni: 'Sciences Po · L1', avail: tx(lang, 'après-midi', 'afternoons'), match: 88, palette: 1, online: true,  bio: tx(lang, 'Recherche groupe pour préparer le TOEFL.', 'Looking for a TOEFL prep group.'), tags: ['Anglais', 'Oral'] },
  { n: 'Yann Moreau',   sub: 'Informatique',          uni: 'Saclay · L3',     avail: tx(lang, 'matins', 'mornings'), match: 85, palette: 2, online: false, bio: tx(lang, 'Dev web · révise les algos en JS.', 'Web dev · reviewing algorithms in JS.'), tags: ['JS', 'Algo'] },
  { n: 'Marwa Aït',     sub: 'Bio · Chimie',          uni: 'UPMC · L2',       avail: tx(lang, 'flexible', 'flexible'), match: 84, palette: 3, online: true,  bio: tx(lang, 'Examens partout. Cherche groupe sérieux.', 'Exams everywhere. Looking for serious group.'), tags: ['Biochimie'] },
  { n: 'Tom Lefebvre',  sub: 'Histoire · Géo',        uni: 'Nanterre · L1',   avail: tx(lang, 'soirs', 'evenings'),   match: 79, palette: 0, online: true,  bio: tx(lang, 'Géopolitique. Café lofi obligatoire ✿', 'Geopolitics. Lofi café mandatory ✿'), tags: ['Histoire', 'Géo'] },
  { n: 'Anaïs Garnier', sub: 'Économie · Stats',      uni: 'Dauphine · L2',   avail: tx(lang, 'weekend', 'weekend'),   match: 76, palette: 1, online: false, bio: tx(lang, 'Échange contre cours d\'anglais ;)', 'Trading economics for english tutoring ;)'), tags: ['Éco', 'Stats'] },
];

const ScreenDiscover = () => {
  const lang = useLang();
  const students = studentData(lang);
  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Trouve ton" en="Find your" />}
          titleEm={<Tx fr="study buddy ✿" en="study buddy ✿" />}
          sub={<><span className="font-pixel">142</span> <Tx fr="étudiants compatibles cette semaine" en="compatible students this week" /></>}
          action={<Btn icon="sliders"><Tx fr="critères" en="criteria" /></Btn>}
        />
        <div className="content">
          {/* Sort/filter pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
              <Tx fr="trier" en="sort" />
            </span>
            <Chip kind="solid">
              <Icon name="sparkle" size={12} /> <Tx fr="compatibilité" en="match" />
            </Chip>
            <Chip><Tx fr="matières communes" en="shared subjects" /></Chip>
            <Chip><Tx fr="disponibilité" en="availability" /></Chip>
            <Chip><Tx fr="université" en="university" /></Chip>
            <div style={{ flex: 1 }} />
            <Chip kind="mint"><div className="pulse-dot" style={{ background: 'currentColor' }} /> <Tx fr="en ligne maintenant" en="online now" /></Chip>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {students.map((s, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: 22, position: 'relative',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform .15s, box-shadow .15s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                {/* Match badge (sticker style) */}
                <div style={{ position: 'absolute', top: -10, right: 18, transform: 'rotate(4deg)' }}>
                  <div style={{
                    background: s.match >= 90 ? 'var(--grad-brand)' : s.match >= 80 ? 'var(--lav-300)' : 'var(--peach-200)',
                    padding: '4px 12px', borderRadius: 999,
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <Icon name="sparkle" size={12}/>
                    <span className="font-pixel" style={{ fontSize: 17, color: 'var(--ink-900)' }}>{s.match}%</span>
                  </div>
                </div>

                {/* Avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <Av name={s.n} size={56} palette={s.palette} status={s.online ? 'online' : 'off'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, lineHeight: 1.1 }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 2 }}>{s.uni}</div>
                  </div>
                </div>

                {/* Bio */}
                <div style={{ fontSize: 13, color: 'var(--text-mute)', lineHeight: 1.4, marginBottom: 14, minHeight: 36 }}>
                  "{s.bio}"
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  {s.tags.map((t, k) => <Chip key={k} kind={k % 2 === 0 ? 'pink' : 'lav'}>{t}</Chip>)}
                </div>

                {/* Availability */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--text-soft)', marginBottom: 14 }}>
                  <Icon name="calendar" size={12} />
                  <span style={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
                    <Tx fr="dispo:" en="avail:" />
                  </span>
                  <span style={{ color: 'var(--text-mute)' }}>{s.avail}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn size="sm" block icon="eye"><Tx fr="profil" en="profile" /></Btn>
                  <Btn size="sm" kind="primary" block icon="plus"><Tx fr="inviter" en="invite" /></Btn>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <Btn icon="plus"><Tx fr="afficher plus d'étudiants" en="show more students" /></Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PROFILE A — edit profile
// ─────────────────────────────────────────────────────────────

const ScreenProfile = () => {
  const lang = useLang();
  const [tab, setTab] = React.useState('profile');
  const [avail, setAvail] = React.useState(() => {
    // 3 slots x 7 days, prefill: evenings on weekdays, weekends mornings/afternoons
    const s = {};
    [0,1,2,3,4].forEach(d => s[`2-${d}`] = true);
    [5,6].forEach(d => { s[`0-${d}`] = true; s[`1-${d}`] = true; });
    return s;
  });

  const subjects = [
    { l: tx(lang, 'Algèbre linéaire', 'Linear algebra'), c: 'pink', primary: true },
    { l: tx(lang, 'Analyse', 'Calculus'),                c: 'pink', primary: true },
    { l: tx(lang, 'Statistiques', 'Statistics'),         c: 'lav',  primary: true },
    { l: tx(lang, 'Anglais', 'English'),                 c: 'mint' },
    { l: tx(lang, 'Histoire', 'History'),                c: 'peach' },
  ];

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Mon" en="My" />}
          titleEm={<Tx fr="profil" en="profile" />}
          sub={<Tx fr="ton identité publique sur StudyWithMe" en="your public identity on StudyWithMe" />}
          action={<>
            <Btn icon="eye"><Tx fr="voir profil public" en="view as public" /></Btn>
            <Btn kind="primary" icon="check"><Tx fr="Enregistrer" en="Save" /></Btn>
          </>}
        />
        <div className="content" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
          {/* Sub-nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
            {[
              { id: 'profile', l: tx(lang, 'Profil', 'Profile'),                       icon: 'user' },
              { id: 'subj',    l: tx(lang, 'Matières & dispos', 'Subjects & avail.'),  icon: 'book' },
              { id: 'notifs',  l: tx(lang, 'Notifications', 'Notifications'),          icon: 'bell' },
              { id: 'integ',   l: tx(lang, 'Intégrations', 'Integrations'),           icon: 'layers' },
              { id: 'priv',    l: tx(lang, 'Confidentialité', 'Privacy'),             icon: 'eye' },
              { id: 'acc',     l: tx(lang, 'Compte', 'Account'),                       icon: 'settings' },
            ].map(it => (
              <div key={it.id} onClick={() => setTab(it.id)}
                className={`nav-item ${tab === it.id ? 'nav-item--active' : ''}`}
                style={{ marginLeft: 0 }}>
                <span className="nav-item__icon"><Icon name={it.icon} size={15} /></span>
                <span>{it.l}</span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Identity card */}
            <Card>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'flex-start' }}>
                {/* photo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <Av name="Léa Mansouri" size={120} ring />
                    {/* sticker accent */}
                    <div style={{ position: 'absolute', bottom: -8, right: -8 }}>
                      <Btn size="icon" kind="primary"><Icon name="edit" size={14}/></Btn>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>JPG · max 2MB</div>
                  </div>
                </div>

                {/* form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Input label={tx(lang, 'Prénom', 'First name')} value="Léa" />
                    <Input label={tx(lang, 'Nom', 'Last name')} value="Mansouri" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 12 }}>
                    <Input label={tx(lang, 'Pseudo', 'Username')} value="@lea.m" />
                    <Input label={tx(lang, 'Université', 'University')} value="Sorbonne — L2 Mathématiques" />
                  </div>
                  <Input multiline label="Bio" value={tx(lang,
                    "Cherche groupe de révision pour le DS d'algèbre de janvier. Méthode pomodoro privilégiée. Niveau intermédiaire. ✿",
                    "Looking for a study group for January algebra exam. Prefer pomodoro method. Intermediate level. ✿"
                  )} />
                </div>
              </div>
            </Card>

            {/* Public stats sneak */}
            <Card kind="lav" padding="22px 26px">
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                    <Tx fr="visible sur ton profil public" en="shown on your public profile" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, marginTop: 4, fontStyle: 'italic' }}>
                    <Tx fr="« étudier ensemble — mieux »" en={`"study together — better"`} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-pixel" style={{ fontSize: 26, lineHeight: 1, color: 'var(--ink-900)' }}>34h</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: 1 }}><Tx fr="ce mois" en="this month" /></div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-pixel" style={{ fontSize: 26, lineHeight: 1, color: 'var(--ink-900)' }}>12 ✦</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: 1 }}><Tx fr="série" en="streak" /></div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-pixel" style={{ fontSize: 26, lineHeight: 1, color: 'var(--ink-900)' }}>8</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-700)', textTransform: 'uppercase', letterSpacing: 1 }}><Tx fr="badges" en="badges" /></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subjects */}
            <Card title={<><Icon name="book" size={18}/> <Tx fr="Mes matières" en="My subjects" /></>}
              action={<Btn size="sm" icon="plus"><Tx fr="matière" en="subject" /></Btn>}>
              <p className="card__sub" style={{ marginTop: -12, marginBottom: 16 }}>
                <Tx fr="Glisse pour réorganiser. Les 3 premières sont mises en avant." en="Drag to reorder. The first 3 are featured." />
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subjects.map((s, i) => (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 'var(--r-pill)',
                    background: s.primary
                      ? (s.c === 'pink' ? 'var(--pink-200)' : s.c === 'lav' ? 'var(--lav-200)' : s.c === 'mint' ? 'var(--mint-200)' : 'var(--peach-200)')
                      : 'transparent',
                    border: '1px solid ' + (s.primary ? 'transparent' : 'var(--border)'),
                    cursor: 'grab',
                  }}>
                    <Icon name="drag" size={12} />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{s.l}</span>
                    {s.primary && <Icon name="sparkle" size={11} />}
                    <Icon name="x" size={11} />
                  </div>
                ))}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 'var(--r-pill)',
                  border: '1px dashed var(--border-strong)',
                  color: 'var(--text-soft)', fontSize: 13, cursor: 'pointer',
                }}>
                  <Icon name="plus" size={12} /> <Tx fr="ajouter" en="add" />
                </div>
              </div>
            </Card>

            {/* Availability grid */}
            <Card title={<><Icon name="calendar" size={18}/> <Tx fr="Disponibilités" en="Availability" /></>}
              action={<Chip kind="mint"><Icon name="check" size={11}/> <Tx fr="visible aux étudiants" en="visible to students" /></Chip>}>
              <p className="card__sub" style={{ marginTop: -12, marginBottom: 16 }}>
                <Tx fr="Clique une case pour basculer. Les autres étudiants verront tes créneaux pour proposer des sessions." en="Click a cell to toggle. Other students see your slots when proposing sessions." />
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(7, 1fr)', gap: 6, maxWidth: 640 }}>
                <div />
                {(lang === 'fr' ? ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map((d, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d}</div>
                ))}
                {[
                  { l: tx(lang, 'Matin', 'Morn'),   sub: '6 — 12', r: 0 },
                  { l: tx(lang, 'Après-midi', 'Aft'), sub: '12 — 18', r: 1 },
                  { l: tx(lang, 'Soir', 'Eve'),    sub: '18 — 24', r: 2 },
                ].map(slot => (
                  <React.Fragment key={slot.r}>
                    <div style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{slot.l}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-soft)' }}>{slot.sub}</div>
                    </div>
                    {Array.from({length: 7}).map((_, c) => {
                      const key = `${slot.r}-${c}`;
                      const on = !!avail[key];
                      return (
                        <div key={c} onClick={() => setAvail(s => ({ ...s, [key]: !s[key] }))}
                          style={{
                            aspectRatio: '1',
                            background: on ? 'var(--grad-brand)' : 'var(--surface-2)',
                            border: '1px solid ' + (on ? 'transparent' : 'var(--border)'),
                            borderRadius: 'var(--r-sm)',
                            cursor: 'pointer',
                            transition: 'all .12s',
                            position: 'relative',
                          }}>
                          {on && <Icon name="check" size={14} stroke={2.5} />}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, fontSize: 12, color: 'var(--text-soft)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 14, background: 'var(--grad-brand)', borderRadius: 4 }} />
                  <Tx fr="dispo" en="available" />
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 14, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4 }} />
                  <Tx fr="indisponible" en="busy" />
                </span>
                <div style={{ flex: 1 }} />
                <Btn size="sm" icon="copy"><Tx fr="copier de la semaine dernière" en="copy from last week" /></Btn>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenDiscover, ScreenProfile });
