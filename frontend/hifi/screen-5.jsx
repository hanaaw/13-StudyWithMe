// StudyWithMe hi-fi — Stats A (overview), Notifications A

// ─────────────────────────────────────────────────────────────
// STATS A — KPI + activity chart + breakdown
// ─────────────────────────────────────────────────────────────

const ScreenStats = () => {
  const lang = useLang();
  const [period, setPeriod] = React.useState('7d');

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Tes" en="Your" />}
          titleEm={<Tx fr="statistiques" en="stats" />}
          sub={<><Tx fr="ta semaine en chiffres · " en="your week in numbers · " /><span className="font-pixel">+2h</span> <Tx fr="par rapport à la semaine dernière" en="vs last week" /> ✦</>}
          action={<>
            <Seg value={period} onChange={setPeriod} options={[
              { id: '7d',  label: tx(lang, '7j',  '7d') },
              { id: '30d', label: tx(lang, '30j', '30d') },
              { id: '3m',  label: tx(lang, '3 mois', '3 mo') },
              { id: 'all', label: tx(lang, 'tout',  'all') },
            ]} />
            <Btn icon="download"><Tx fr="exporter rapport" en="export report" /></Btn>
          </>}
        />

        <div className="content">
          {/* KPI ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {/* focus time */}
            <Card style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 11, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 8 }}>
                <Icon name="bolt" size={12}/> <Tx fr="Temps focus" en="Focus time" />
              </div>
              <div className="font-pixel" style={{ fontSize: 38, lineHeight: 1, color: 'var(--text)' }}>12h 34m</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: 'var(--mint-600)', fontWeight: 600 }}>
                <Icon name="arrowUp" size={12} stroke={2.5}/> +2h
                <span style={{ color: 'var(--text-soft)', fontWeight: 400 }}><Tx fr="vs sem. dernière" en="vs last wk" /></span>
              </div>
              {/* sparkline */}
              <svg width="100%" height="40" viewBox="0 0 200 40" style={{ marginTop: 10 }}>
                <polyline points="0,30 30,25 60,28 90,15 120,18 150,8 180,12 200,5"
                  fill="none" stroke="var(--pink-500)" strokeWidth="2" />
                <circle cx="200" cy="5" r="4" fill="var(--pink-500)"/>
              </svg>
            </Card>

            {/* sessions */}
            <Card>
              <div style={{ fontSize: 11, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 8 }}>
                <Icon name="check" size={12}/> <Tx fr="Sessions terminées" en="Sessions done" />
              </div>
              <div className="font-pixel" style={{ fontSize: 38, lineHeight: 1, color: 'var(--text)' }}>23</div>
              <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 8 }}>
                <Tx fr="dont " en="incl. " /><span className="font-pixel" style={{ color: 'var(--text)' }}>18</span> <Tx fr="pomodoros · " en="pomodoros · " /><span className="font-pixel" style={{ color: 'var(--text)' }}>5</span> <Tx fr="en salle" en="in rooms" />
              </div>
              <div style={{ display: 'flex', gap: 3, marginTop: 12 }}>
                {Array.from({length: 23}).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 14, borderRadius: 2,
                    background: i < 18 ? 'var(--pink-400)' : 'var(--lav-300)' }} />
                ))}
              </div>
            </Card>

            {/* streak — featured */}
            <Card kind="pink" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -8, right: -8, opacity: 0.4 }}>
                <Icon name="fire" size={80} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--pink-800)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 8 }}>
                <Tx fr="Série en cours" en="Current streak" /> ✦
              </div>
              <div className="font-pixel" style={{ fontSize: 38, lineHeight: 1, color: 'var(--ink-900)' }}>12 <span style={{ fontSize: 18 }}>jours</span></div>
              <div style={{ fontSize: 12, color: 'var(--pink-800)', marginTop: 8 }}>
                <Tx fr="record perso : 18 jours" en="best: 18 days" /> · <Tx fr="6 jours pour battre" en="6 days to beat" />
              </div>
              {/* progress to record */}
              <div style={{ marginTop: 12, height: 6, background: 'rgba(255,255,255,0.4)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: '67%', height: '100%', background: 'var(--ink-900)' }} />
              </div>
            </Card>

            {/* top subject */}
            <Card kind="lav">
              <div style={{ fontSize: 11, color: 'var(--lav-700)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 8 }}>
                <Icon name="trophy" size={12}/> <Tx fr="Matière n°1" en="Top subject" />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.1, color: 'var(--ink-900)' }}><Tx fr="Algèbre" en="Algebra" /></div>
              <div style={{ fontSize: 12, color: 'var(--lav-700)', marginTop: 6 }}>
                <span className="font-pixel" style={{ color: 'var(--ink-900)' }}>4h 12m</span> · 33% <Tx fr="du temps" en="of time" />
              </div>
              {/* mini donut */}
              <div style={{ marginTop: 12 }}>
                <svg width="60" height="60" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="5"/>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#2a1d36" strokeWidth="5"
                          strokeDasharray="29 88" strokeDashoffset="0" transform="rotate(-90 18 18)" strokeLinecap="round"/>
                </svg>
              </div>
            </Card>
          </div>

          {/* Activity chart + breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 24 }}>
            <Card
              title={<><Icon name="stats" size={18}/> <Tx fr="Activité" en="Activity" /></>}
              action={<div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: 'var(--pink-400)', borderRadius: 2 }} /> solo
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: 'var(--lav-400)', borderRadius: 2 }} /> <Tx fr="salle" en="room" />
                </span>
              </div>}>
              {/* bar chart */}
              <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 14, padding: '0 4px', position: 'relative' }}>
                {[0.25, 0.5, 0.75].map(y => (
                  <div key={y} style={{ position: 'absolute', left: 0, right: 0, bottom: `${y * 100}%`, borderTop: '1px dashed var(--border)' }} />
                ))}
                {(lang === 'fr' ? ['Mer','Jeu','Ven','Sam','Dim','Lun','Mar'] : ['Wed','Thu','Fri','Sat','Sun','Mon','Tue']).map((d, i) => {
                  const solo = [50, 80, 45, 30, 60, 90, 70][i];
                  const room = [20, 30, 10, 50, 40, 25, 50][i];
                  const total = ((solo + room) / 100 * 1.5).toFixed(1);
                  const today = i === 6;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: 200, width: '85%', gap: 2 }}>
                        <div style={{ background: 'var(--lav-400)', height: room, width: '100%', borderRadius: '6px 6px 0 0' }} />
                        <div style={{ background: 'var(--pink-400)', height: solo, width: '100%', borderRadius: room ? 0 : '6px 6px 0 0' }} />
                      </div>
                      <div style={{ fontSize: 11.5, fontWeight: today ? 700 : 500, color: today ? 'var(--text)' : 'var(--text-soft)' }}>{d}</div>
                      <div className="font-pixel" style={{ fontSize: 13, color: today ? 'var(--pink-600)' : 'var(--text-soft)' }}>{total}h</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title={<><Icon name="book" size={18}/> <Tx fr="Par matière" en="By subject" /></>}>
              {[
                { n: tx(lang, 'Algèbre',  'Algebra'),  v: 33, h: '4h 12m', c: 'var(--pink-400)' },
                { n: tx(lang, 'Anglais',  'English'),  v: 22, h: '2h 50m', c: 'var(--lav-400)' },
                { n: 'Stats',                          v: 18, h: '2h 14m', c: 'var(--mint-400)' },
                { n: tx(lang, 'Histoire', 'History'),  v: 14, h: '1h 38m', c: 'var(--peach-400)' },
                { n: tx(lang, 'Lecture',  'Reading'),  v: 13, h: '1h 30m', c: 'var(--pink-600)' },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, background: s.c, borderRadius: 2 }} />
                      <span style={{ fontWeight: 500 }}>{s.n}</span>
                    </span>
                    <span className="font-pixel" style={{ color: 'var(--text-mute)', fontSize: 14 }}>{s.h}</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${s.v * 3}%`, height: '100%', background: s.c, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Bottom row: badges + heatmap snippet + friends leaderboard */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {/* badges */}
            <Card title={<><Icon name="sparkle" size={18}/> <Tx fr="Badges" en="Badges" /></>}
              action={<span className="font-pixel" style={{ fontSize: 15, color: 'var(--text-soft)' }}>8 / 24</span>}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { i: '✦', l: tx(lang, '7 jours', '7 days'), on: true },
                  { i: '🌙', l: tx(lang, 'Noctambule', 'Night owl'), on: true },
                  { i: '☀', l: tx(lang, 'Lève-tôt', 'Early bird'), on: true },
                  { i: '∑', l: '10h math', on: true },
                  { i: '◷', l: '50 pomo', on: true },
                  { i: '👥', l: tx(lang, 'Social', 'Social'), on: true },
                  { i: '🔥', l: '30j', on: false },
                  { i: '🏆', l: 'Top 10', on: false },
                ].map((b, i) => (
                  <div key={i} style={{
                    background: b.on ? 'var(--surface-2)' : 'transparent',
                    border: b.on ? '1px solid var(--border)' : '1px dashed var(--border-strong)',
                    borderRadius: 'var(--r-md)',
                    padding: 10, textAlign: 'center',
                    opacity: b.on ? 1 : 0.4,
                    cursor: 'pointer',
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{b.i}</div>
                    <div style={{ fontSize: 10, fontWeight: 500 }}>{b.l}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* friends ranking */}
            <Card title={<><Icon name="trophy" size={18}/> <Tx fr="Classement amis" en="Friends ranking" /></>}
              action={<Seg value="wk" options={[{id:'wk',label:tx(lang,'sem','wk')},{id:'mo',label:tx(lang,'mois','mo')},{id:'all',label:tx(lang,'tout','all')}]}/>}>
              {[
                { p: 1, n: 'Sami K.',    h: '18h 04m', d: '🥇', pal: 0 },
                { p: 2, n: tx(lang, 'Léa (toi)', 'Léa (you)'), h: '12h 34m', d: '🥈', pal: 3, mine: true },
                { p: 3, n: 'Yann M.',    h: '10h 22m', d: '🥉', pal: 2 },
                { p: 4, n: 'Marwa A.',   h: '8h 47m',  d: '',   pal: 3 },
                { p: 5, n: 'Inès B.',    h: '7h 12m',  d: '',   pal: 1 },
              ].map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--r-md)',
                  background: p.mine ? 'var(--grad-brand-soft)' : 'transparent',
                  border: p.mine ? '1px solid var(--pink-300)' : '1px solid transparent',
                  marginBottom: 2,
                }}>
                  <span className="font-pixel" style={{ width: 18, fontSize: 14, color: 'var(--text-soft)' }}>#{p.p}</span>
                  <Av name={p.n} size={28} palette={p.pal} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: p.mine ? 700 : 500 }}>{p.n}</span>
                  <span className="font-pixel" style={{ fontSize: 14 }}>{p.h}</span>
                  {p.d && <span style={{ fontSize: 14 }}>{p.d}</span>}
                </div>
              ))}
            </Card>

            {/* hours of day */}
            <Card title={<><Icon name="calendar" size={18}/> <Tx fr="Quand j'étudie" en="When I study" /></>}>
              <p className="card__sub" style={{ marginTop: -12, marginBottom: 12 }}>
                <Tx fr="ton créneau d'or : " en="your sweet spot: " /><b><Tx fr="14h — 16h" en="2pm — 4pm" /></b>
              </p>
              {/* hours-of-day heatmap (24 cols x 7 rows -> simplified to 12 cols) */}
              <div style={{ display: 'grid', gridTemplateColumns: '24px repeat(12, 1fr)', gap: 2 }}>
                <div />
                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((h, i) => (
                  <div key={i} style={{ fontSize: 9, color: 'var(--text-soft)', textAlign: 'center', fontFamily: 'var(--font-pixel)' }}>{h}</div>
                ))}
                {[lang === 'fr' ? 'L' : 'M', lang === 'fr' ? 'M' : 'T', lang === 'fr' ? 'M' : 'W', lang === 'fr' ? 'J' : 'T', lang === 'fr' ? 'V' : 'F', 'S', 'D'].map((d, r) => (
                  <React.Fragment key={r}>
                    <div style={{ fontSize: 10, color: 'var(--text-soft)' }}>{d}</div>
                    {Array.from({length: 12}).map((_, c) => {
                      // dense around col 7 (14h) and col 4 (8h)
                      const v = c === 7 ? (r < 5 ? 4 : 2) :
                                c === 4 ? (r < 5 ? 3 : 1) :
                                c === 8 ? (r < 5 ? 3 : 2) :
                                c === 9 ? (r < 5 ? 2 : 1) :
                                c === 5 ? (r < 5 ? 2 : 1) :
                                ((c + r) % 5 === 0 ? 1 : 0);
                      const colors = ['var(--surface-2)', 'var(--pink-200)', 'var(--pink-300)', 'var(--pink-400)', 'var(--pink-600)'];
                      return <div key={c} style={{
                        aspectRatio: '1', background: colors[v], borderRadius: 2,
                      }} title={`${d} ${[0,2,4,6,8,10,12,14,16,18,20,22][c]}h: ${v}`} />;
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 10, color: 'var(--text-soft)', justifyContent: 'flex-end' }}>
                <span><Tx fr="moins" en="less" /></span>
                {['var(--surface-2)', 'var(--pink-200)', 'var(--pink-300)', 'var(--pink-400)', 'var(--pink-600)'].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, background: c, borderRadius: 2 }} />
                ))}
                <span><Tx fr="plus" en="more" /></span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS A — feed + preferences
// ─────────────────────────────────────────────────────────────

const ScreenNotifications = () => {
  const lang = useLang();
  const [filter, setFilter] = React.useState('all');

  const notifs = [
    {
      type: 'reminder', icon: 'sparkle', accent: 'pink', unread: true, urgent: true,
      title: tx(lang, 'Session « Anglais avec Sami » dans 15 min', 'Session "English with Sami" in 15 min'),
      d: tx(lang, '14:00 · salle partagée · pomodoro 25/5', '14:00 · shared room · pomodoro 25/5'),
      time: tx(lang, "à l'instant", 'just now'),
      action: <Btn size="sm" kind="primary"><Tx fr="rejoindre" en="join" /></Btn>,
    },
    {
      type: 'friend', icon: 'trophy', accent: 'peach', unread: true,
      title: <><b>Sami</b> {tx(lang, 'a battu son record (3h focus)', 'broke their record (3h focus)')}</>,
      d: tx(lang, 'Maths · 18h cette semaine', 'Math · 18h this week'),
      time: tx(lang, 'il y a 12 min', '12 min ago'),
      avatar: 'Sami',
      pal: 0,
      action: <Btn size="sm">♥ <Tx fr="féliciter" en="cheer" /></Btn>,
    },
    {
      type: 'invite', icon: 'rooms', accent: 'lav', unread: true,
      title: <><b>Inès</b> {tx(lang, "t'invite dans « Pomodoro 25/5 »", 'invited you to "Pomodoro 25/5"')}</>,
      d: tx(lang, 'avec Marwa, Tom · 6 places restantes', 'with Marwa, Tom · 6 seats left'),
      time: tx(lang, 'il y a 1h', '1h ago'),
      avatar: 'Inès',
      pal: 1,
      action: <div style={{ display: 'flex', gap: 6 }}>
        <Btn size="sm" kind="ghost"><Tx fr="décliner" en="decline" /></Btn>
        <Btn size="sm" kind="primary"><Tx fr="rejoindre" en="join" /></Btn>
      </div>,
    },
    {
      type: 'streak', icon: 'fire', accent: 'pink',
      title: tx(lang, 'Tu as débloqué le badge « série 12 jours » ✦', 'You unlocked the "12-day streak ✦" badge'),
      d: tx(lang, '+50 pts XP · partager avec tes amis ?', '+50 XP · share with friends?'),
      time: tx(lang, 'hier', 'yesterday'),
      action: <Btn size="sm" icon="share"><Tx fr="partager" en="share" /></Btn>,
    },
    {
      type: 'system', icon: 'layers', accent: 'mint',
      title: tx(lang, 'Ton planning a été synchronisé avec Google Calendar', 'Your planning synced with Google Calendar'),
      d: tx(lang, '12 sessions ajoutées · 3 conflits résolus', '12 sessions added · 3 conflicts resolved'),
      time: tx(lang, 'hier', 'yesterday'),
      action: <Btn size="sm"><Tx fr="voir détails" en="details" /></Btn>,
    },
    {
      type: 'reminder', icon: 'calendar', accent: 'pink',
      title: tx(lang, 'DS d\'algèbre dans 3 jours — révise ?', 'Algebra exam in 3 days — review?'),
      d: tx(lang, 'suggestion : 2 sessions de 1h cette semaine', 'suggestion: 2 sessions of 1h this week'),
      time: tx(lang, 'il y a 2h', '2h ago'),
      action: <Btn size="sm" icon="plus"><Tx fr="planifier" en="schedule" /></Btn>,
    },
    {
      type: 'friend', icon: 'friends', accent: 'lav',
      title: <><b>Yann</b> {tx(lang, 'commence une session de stats', 'started a stats session')}</>,
      d: tx(lang, 'café lofi · 12 personnes', 'lofi café · 12 people'),
      time: tx(lang, 'il y a 3h', '3h ago'),
      avatar: 'Yann',
      pal: 2,
      action: <Btn size="sm" icon="play"><Tx fr="rejoindre" en="join" /></Btn>,
    },
  ];

  const filtered = filter === 'all' ? notifs :
    filter === 'reminders' ? notifs.filter(n => n.type === 'reminder' || n.type === 'streak') :
    filter === 'social' ? notifs.filter(n => n.type === 'friend' || n.type === 'invite') :
    notifs.filter(n => n.type === 'invite' || (n.type === 'friend' && n.title.props?.children?.[1]?.includes?.('session')));

  const accentBg = {
    pink: 'var(--pink-100)',  lav: 'var(--lav-100)',
    mint: 'var(--mint-200)', peach: 'var(--peach-200)',
  };
  const accentFg = {
    pink: 'var(--pink-700)',  lav: 'var(--lav-700)',
    mint: 'var(--mint-600)',  peach: 'var(--peach-600)',
  };

  return (
    <div className="app">
      <Sidebar />
      <div>
        <TopBar
          title={<Tx fr="Tes" en="Your" />}
          titleEm={<Tx fr="notifications" en="notifications" />}
          sub={<><span className="font-pixel">3</span> <Tx fr="non lues · " en="unread · " /><span className="font-pixel">12</span> <Tx fr="au total" en="total" /></>}
          action={<>
            <Btn size="sm" icon="check"><Tx fr="tout lu" en="mark all read" /></Btn>
          </>}
        />
        <div className="content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Feed */}
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
              {[
                { id: 'all',       l: tx(lang, 'tout',       'all'),       n: 12 },
                { id: 'reminders', l: tx(lang, 'rappels',    'reminders'), n: 3 },
                { id: 'social',    l: tx(lang, 'social',     'social'),    n: 6 },
                { id: 'rooms',     l: tx(lang, 'salles',     'rooms'),     n: 2 },
              ].map(t => (
                <span key={t.id} onClick={() => setFilter(t.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 'var(--r-pill)',
                    background: filter === t.id ? 'var(--grad-brand)' : 'var(--surface)',
                    border: '1px solid ' + (filter === t.id ? 'transparent' : 'var(--border)'),
                    color: filter === t.id ? 'var(--ink-900)' : 'var(--text-mute)',
                    fontSize: 13, fontWeight: filter === t.id ? 600 : 500, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                  {t.l}
                  <span className="font-pixel" style={{ fontSize: 13, opacity: 0.7 }}>{t.n}</span>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.map((n, i) => (
                <div key={i} style={{
                  background: 'var(--surface)',
                  border: '1px solid ' + (n.urgent ? 'var(--pink-300)' : 'var(--border)'),
                  borderRadius: 'var(--r-lg)', padding: 18,
                  display: 'flex', alignItems: 'center', gap: 16,
                  position: 'relative',
                  boxShadow: n.urgent ? '0 0 0 3px var(--pink-100)' : 'var(--shadow-xs)',
                }}>
                  {/* icon or avatar */}
                  {n.avatar ? (
                    <Av name={n.avatar} size={44} palette={n.pal} />
                  ) : (
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--r-md)',
                      background: accentBg[n.accent], color: accentFg[n.accent],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon name={n.icon} size={20} />
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: n.unread ? 600 : 500 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 2 }}>{n.d}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-soft)' }}>{n.time}</span>
                    {n.action}
                    {n.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--pink-500)' }} />}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 22 }}>
              <Btn size="sm" kind="ghost"><Tx fr="charger plus" en="load more" /></Btn>
            </div>
          </div>

          {/* Preferences sidebar */}
          <div style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
            <Card title={<><Icon name="settings" size={18}/> <Tx fr="Préférences" en="Preferences" /></>}>
              <p className="card__sub" style={{ marginTop: -12, marginBottom: 16 }}>
                <Tx fr="Choisis ce qui te notifie." en="Choose what notifies you." />
              </p>
              {[
                { l: tx(lang, 'Rappel avant chaque session', 'Reminder before each session'), sub: tx(lang, '15 min avant', '15 min before'), on: true, chans: 'push · email' },
                { l: tx(lang, 'Récap quotidien du soir', 'Daily evening recap'),              sub: '21:00',                                  on: true, chans: 'push' },
                { l: tx(lang, "Un ami démarre une session", 'A friend starts a session'),    sub: '',                                       on: true, chans: 'push' },
                { l: tx(lang, 'Invitations en salle', 'Room invites'),                       sub: '',                                       on: true, chans: 'push · email' },
                { l: tx(lang, 'Badges débloqués', 'Badge unlocked'),                          sub: '',                                       on: false, chans: '' },
                { l: tx(lang, 'Comparatif hebdo', 'Weekly summary'),                          sub: tx(lang, 'dimanche soir', 'sunday evening'), on: true, chans: 'email' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px dashed var(--border)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.l}</div>
                    {p.sub && <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>{p.sub}</div>}
                    {p.on && p.chans && (
                      <div style={{ fontSize: 10, color: 'var(--pink-700)', marginTop: 4, fontFamily: 'var(--font-pixel)', letterSpacing: 0.5 }}>▸ {p.chans}</div>
                    )}
                  </div>
                  <Switch on={p.on} />
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 12, background: 'var(--surface-2)', borderRadius: 'var(--r-md)', fontSize: 11.5, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                <b style={{ color: 'var(--text)' }}><Tx fr="Canaux disponibles : " en="Available channels: " /></b>
                <Tx fr="email, notifications push web, push mobile (iOS/Android)" en="email, web push, mobile push (iOS/Android)" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenStats, ScreenNotifications });
