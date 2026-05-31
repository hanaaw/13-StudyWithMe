// StudyWithMe — wireframe canvas mount

const ARTBOARD_W = 1280;
const ARTBOARD_H = 800;
const AB_AUTH_W = 1100;

function CanvasApp() {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('swm-lang') || 'fr'; } catch { return 'fr'; }
  });
  React.useEffect(() => { try { localStorage.setItem('swm-lang', lang); } catch {} }, [lang]);

  const ctx = React.useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LangCtx.Provider value={ctx}>
      {/* floating toolbar */}
      <div style={{
        position: 'fixed', top: 18, right: 18, zIndex: 999,
        display: 'flex', gap: 8, background: '#fdfcf7',
        border: '1.5px solid #1a1a1a', borderRadius: 999, padding: 4,
        boxShadow: '3px 3px 0 #1a1a1a',
        fontFamily: '"Kalam", cursive', fontSize: 13,
      }}>
        {[
          { id: 'fr', l: '🇫🇷 FR' },
          { id: 'en', l: '🇬🇧 EN' },
        ].map(o => (
          <div key={o.id}
            onClick={() => setLang(o.id)}
            style={{
              padding: '4px 14px', borderRadius: 999, cursor: 'pointer',
              background: lang === o.id ? '#1a1a1a' : 'transparent',
              color: lang === o.id ? '#fdfcf7' : '#1a1a1a',
              fontWeight: lang === o.id ? 700 : 400
            }}>{o.l}</div>
        ))}
      </div>

      {/* canvas title pinned top-left for context */}
      <div style={{
        position: 'fixed', top: 18, left: 18, zIndex: 999,
        fontFamily: '"Caveat", cursive',
        background: '#fdfcf7', border: '1.5px solid #1a1a1a', borderRadius: 8,
        padding: '6px 14px', boxShadow: '3px 3px 0 #1a1a1a',
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>StudyWithMe — Wireframes</div>
        <div style={{ fontFamily: '"Kalam", cursive', fontSize: 11, color: '#6b6b6b' }}>
          {lang === 'fr'
            ? 'esquisses · explore les variantes · clique l\'angle ↗ pour zoomer'
            : 'low-fi sketches · explore variants · click ↗ to expand'}
        </div>
      </div>

      <DesignCanvas>
        <DCSection id="auth" title={lang === 'fr' ? 'Authentification' : 'Authentication'}
          subtitle={lang === 'fr' ? 'US-01, US-02 · inscription et connexion' : 'US-01, US-02 · sign up & sign in'}>
          <DCArtboard id="auth-split" label={lang === 'fr' ? 'A · Split — inscription' : 'A · Split — sign up'} width={AB_AUTH_W} height={ARTBOARD_H}><AuthSplit lang={lang} /></DCArtboard>
          <DCArtboard id="auth-card"  label={lang === 'fr' ? 'B · Carte centrée — connexion' : 'B · Centered card — sign in'} width={AB_AUTH_W} height={ARTBOARD_H}><AuthCard lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="dashboard" title={lang === 'fr' ? 'Tableau de bord' : 'Dashboard'}
          subtitle={lang === 'fr' ? 'L\'écran d\'accueil après connexion' : 'Home screen after sign-in'}>
          <DCArtboard id="dash-sidebar" label={lang === 'fr' ? 'A · Sidebar — accueil cosy' : 'A · Sidebar — cozy home'} width={ARTBOARD_W} height={ARTBOARD_H}><DashboardSidebar lang={lang} /></DCArtboard>
          <DCArtboard id="dash-mag"     label={lang === 'fr' ? 'B · Magazine — cartes 3 colonnes' : 'B · Magazine — 3 columns'} width={ARTBOARD_W} height={ARTBOARD_H}><DashboardMag lang={lang} /></DCArtboard>
          <DCArtboard id="dash-focus"   label={lang === 'fr' ? 'C · Focus — action centrale' : 'C · Focus — central action'} width={ARTBOARD_W} height={ARTBOARD_H}><DashboardFocus lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="planning" title={lang === 'fr' ? 'Planning d\'étude' : 'Study planning'}
          subtitle={lang === 'fr' ? 'US-03 · créer, modifier, supprimer des sessions' : 'US-03 · create, edit, delete sessions'}>
          <DCArtboard id="plan-week"   label={lang === 'fr' ? 'A · Calendrier semaine' : 'A · Week calendar'} width={ARTBOARD_W} height={ARTBOARD_H}><PlanningWeek lang={lang} /></DCArtboard>
          <DCArtboard id="plan-day"    label={lang === 'fr' ? 'B · Timeline jour + matières' : 'B · Day timeline + subjects'} width={ARTBOARD_W} height={ARTBOARD_H}><PlanningDay lang={lang} /></DCArtboard>
          <DCArtboard id="plan-kanban" label={lang === 'fr' ? 'C · Kanban (today / week / later)' : 'C · Kanban (today / week / later)'} width={ARTBOARD_W} height={ARTBOARD_H}><PlanningKanban lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="rooms" title={lang === 'fr' ? 'Salles d\'étude · parcourir' : 'Study rooms · browse'}
          subtitle={lang === 'fr' ? 'US-04 · trouver et rejoindre une salle' : 'US-04 · find & join a shared room'}>
          <DCArtboard id="rooms-grid" label={lang === 'fr' ? 'A · Grille de cartes' : 'A · Card grid'} width={ARTBOARD_W} height={ARTBOARD_H}><RoomsGrid lang={lang} /></DCArtboard>
          <DCArtboard id="rooms-list" label={lang === 'fr' ? 'B · Liste + filtres' : 'B · List + filters'} width={ARTBOARD_W} height={ARTBOARD_H}><RoomsList lang={lang} /></DCArtboard>
          <DCArtboard id="rooms-map"  label={lang === 'fr' ? 'C · Carte / campus virtuel' : 'C · Map / virtual campus'} width={ARTBOARD_W} height={ARTBOARD_H}><RoomsMap lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="create-room" title={lang === 'fr' ? 'Créer une salle' : 'Create a room'}
          subtitle={lang === 'fr' ? 'US-05 · ouvrir un espace + lien d\'invitation' : 'US-05 · open a space + invite link'}>
          <DCArtboard id="create-modal"  label={lang === 'fr' ? 'A · Modale rapide' : 'A · Quick modal'} width={ARTBOARD_W} height={ARTBOARD_H}><CreateRoomModal lang={lang} /></DCArtboard>
          <DCArtboard id="create-wizard" label={lang === 'fr' ? 'B · Assistant étape par étape' : 'B · Step-by-step wizard'} width={ARTBOARD_W} height={ARTBOARD_H}><CreateRoomWizard lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="in-room" title={lang === 'fr' ? 'Session en salle · cœur du produit' : 'In-room session · the heart'}
          subtitle={lang === 'fr' ? 'pomodoro + vidéo + lofi + chat + todo + tableau' : 'pomodoro + video + lofi + chat + todo + whiteboard'}>
          <DCArtboard id="room-classic"   label={lang === 'fr' ? 'A · Classique (sidebar todo + vidéo + chat)' : 'A · Classic (sidebar todo + video + chat)'} width={ARTBOARD_W} height={ARTBOARD_H}><InRoomClassic lang={lang} /></DCArtboard>
          <DCArtboard id="room-immersive" label={lang === 'fr' ? 'B · Immersif (scène café lofi)' : 'B · Immersive (lofi café scene)'} width={ARTBOARD_W} height={ARTBOARD_H}><InRoomImmersive lang={lang} /></DCArtboard>
          <DCArtboard id="room-focus"     label={lang === 'fr' ? 'C · Focus (tableau au centre)' : 'C · Focus (whiteboard centered)'} width={ARTBOARD_W} height={ARTBOARD_H}><InRoomFocus lang={lang} /></DCArtboard>
          <DCArtboard id="room-cafe"      label={lang === 'fr' ? 'D · Voix toujours-active (style Discord)' : 'D · Always-on voice (Discord-style)'} width={ARTBOARD_W} height={ARTBOARD_H}><InRoomCafe lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="discover" title={lang === 'fr' ? 'Découvrir des étudiants' : 'Discover students'}
          subtitle={lang === 'fr' ? 'US-06 · trouver un study group' : 'US-06 · find a study group'}>
          <DCArtboard id="discover-grid"    label={lang === 'fr' ? 'A · Grille de cartes (compatibilité)' : 'A · Card grid (match %)'} width={ARTBOARD_W} height={ARTBOARD_H}><DiscoverGrid lang={lang} /></DCArtboard>
          <DCArtboard id="discover-profile" label={lang === 'fr' ? 'B · Profil détaillé' : 'B · Profile detail'} width={ARTBOARD_W} height={ARTBOARD_H}><DiscoverProfile lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="profile" title={lang === 'fr' ? 'Mon profil · édition' : 'My profile · edit'}
          subtitle={lang === 'fr' ? 'US-07 · infos personnelles, matières, disponibilités' : 'US-07 · personal info, subjects, availability'}>
          <DCArtboard id="profile-edit" label={lang === 'fr' ? 'A · Formulaire + sous-nav' : 'A · Form + sub-nav'} width={ARTBOARD_W} height={ARTBOARD_H}><ProfileEdit lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="stats" title={lang === 'fr' ? 'Suivi du temps & stats' : 'Time tracking & stats'}
          subtitle={lang === 'fr' ? 'US-09 · mesurer la productivité' : 'US-09 · measure productivity'}>
          <DCArtboard id="stats-overview" label={lang === 'fr' ? 'A · Vue d\'ensemble (KPI + chart)' : 'A · Overview (KPI + chart)'} width={ARTBOARD_W} height={ARTBOARD_H}><StatsOverview lang={lang} /></DCArtboard>
          <DCArtboard id="stats-heatmap"  label={lang === 'fr' ? 'B · Heatmap année + classement amis' : 'B · Year heatmap + friend leaderboard'} width={ARTBOARD_W} height={ARTBOARD_H}><StatsHeatmap lang={lang} /></DCArtboard>
        </DCSection>

        <DCSection id="notifs" title="Notifications"
          subtitle={lang === 'fr' ? 'US-08 · rappels de session et activité sociale' : 'US-08 · session reminders & social activity'}>
          <DCArtboard id="notifs-feed" label={lang === 'fr' ? 'A · Flux + préférences' : 'A · Feed + preferences'} width={ARTBOARD_W} height={ARTBOARD_H}><Notifications lang={lang} /></DCArtboard>
        </DCSection>
      </DesignCanvas>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasApp />);
