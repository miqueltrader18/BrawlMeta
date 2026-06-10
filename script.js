
const API_URL = 'https://api.brawlapi.com/v1/brawlers';

const I18N = {
  es: {
    navHome:'Inicio', navBuilds:'Best builds', navTier:'Tier list', navTop10:'Top 10', navBeginners:'Principiantes', navSolo:'Solo Showdown', navGem:'Gem Grab', navDirectory:'Directorio',
    heroEyebrow:'WEB REAL · BUILDS · META · SEO',
    heroTitle:'Brawl Meta',
    heroText:'Consulta todos los brawlers, sus mejores builds, gadgets, habilidades estelares, gears recomendados, tier list y Top 10 de win rate en una web clara y rápida.',
    ctaBuilds:'Ver best builds', ctaTier:'Ver tier list', ctaTop10:'Ver Top 10', ctaDirectory:'Ver directorio',
    mode:'Modo', liveApi:'Live API + fallback', brawlers:'Brawlers', updated:'Actualizado',
    buildsEyebrow:'BEST BUILDS', buildsTitle:'Best builds para cada brawler', buildsText:'Busca cualquier brawler y abre su build sin errores 404. Cada build usa una sola página segura: build.html?b=nombre.',
    searchPlaceholder:'Buscar brawler: Shelly, Bolt, Damian…', allRarities:'Todas',
    viewBuild:'Ver build', bestGadget:'Mejor gadget', bestStar:'Mejor habilidad estelar', bestGears:'Gears recomendados',
    tierEyebrow:'TIER LIST', tierTitle:'Brawl Stars Tier List', tierText:'Tier list actualizada con los 104 brawlers repartidos en S, A, B, C y D. Los nuevos que lleguen por API aparecen como provisionales.',
    topEyebrow:'TOP 10 WIN RATE', topTitle:'Top 10 brawlers con mejor win rate', topText:'Los porcentajes están separados de la tier list para que sea más claro.',
    directoryTitle:'Directorio completo de brawlers', directoryText:'Todos los brawlers en una sola página para mejorar navegación interna y SEO long-tail.',
    notFound:'No se ha encontrado este brawler.', overview:'Resumen', rarity:'Rareza', liveBuild:'Build live', fallbackBuild:'Build segura', related:'Páginas relacionadas',
    seoTitle:'SEO fuerte preparado para Google', seoText:'La web tiene titles, meta descriptions, canonical, sitemap, robots, Open Graph, schema y enlaces internos para posicionar búsquedas de builds, tier list y win rates.',
    footer:'Fan website. No afiliada, patrocinada ni aprobada específicamente por Supercell.',
    wr:'Win rate', pick:'Pick rate', source:'Fuente / nota'
  },
  en: {
    navHome:'Home', navBuilds:'Best builds', navTier:'Tier list', navTop10:'Top 10', navBeginners:'Beginners', navSolo:'Solo Showdown', navGem:'Gem Grab', navDirectory:'Directory',
    heroEyebrow:'REAL WEBSITE · BUILDS · META · SEO',
    heroTitle:'Brawl Meta',
    heroText:'Browse every brawler, best builds, gadgets, star powers, recommended gears, tier list and Top 10 win rate in one clear and fast website.',
    ctaBuilds:'See best builds', ctaTier:'See tier list', ctaTop10:'See Top 10', ctaDirectory:'Open directory',
    mode:'Mode', liveApi:'Live API + fallback', brawlers:'Brawlers', updated:'Updated',
    buildsEyebrow:'BEST BUILDS', buildsTitle:'Best builds for every brawler', buildsText:'Search any brawler and open the build without 404 errors. Every build uses one safe page: build.html?b=name.',
    searchPlaceholder:'Search brawler: Shelly, Bolt, Damian…', allRarities:'All',
    viewBuild:'View build', bestGadget:'Best gadget', bestStar:'Best star power', bestGears:'Recommended gears',
    tierEyebrow:'TIER LIST', tierTitle:'Brawl Stars Tier List', tierText:'Updated tier list with all 104 brawlers split into S, A, B, C and D. New API-only brawlers appear as provisional.',
    topEyebrow:'TOP 10 WIN RATE', topTitle:'Top 10 highest win rate brawlers', topText:'Percentages are separated from the tier list so the site stays clearer.',
    directoryTitle:'Full brawler directory', directoryText:'Every brawler on one page to improve navigation and long-tail SEO.',
    notFound:'This brawler was not found.', overview:'Overview', rarity:'Rarity', liveBuild:'Live build', fallbackBuild:'Safe fallback build', related:'Related pages',
    seoTitle:'Strong SEO prepared for Google', seoText:'The site includes titles, meta descriptions, canonicals, sitemap, robots, Open Graph, schema and internal links for build, tier list and win rate searches.',
    footer:'Fan website. Not affiliated with, sponsored by or specifically approved by Supercell.',
    wr:'Win rate', pick:'Pick rate', source:'Source / note'
  }
};

let API_CACHE = null;
let LIVE_ROSTER = null;

function currentLang(){ return localStorage.getItem('bm_lang') || 'es'; }
function t(key){ return (I18N[currentLang()] && I18N[currentLang()][key]) || key; }
function normalize(name){ return String(name || '').toLowerCase().replace(/[^a-z0-9]+/g,''); }
function slugify(name){ return String(name || '').toLowerCase().replace(/&/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function initials(name){ return String(name||'').split(/\s+/).map(s=>s[0]).join('').slice(0,2).toUpperCase(); }
function rarityClass(r){ return String(r||'').toLowerCase().replace(/[^a-z0-9]+/g,'-'); }
function buildHref(slug){ return `build.html?b=${encodeURIComponent(slug)}`; }
function escapeHtml(str){ return String(str ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function setLang(lang){
  localStorage.setItem('bm_lang', lang);
  document.documentElement.lang = lang;
  updateLangButtons();
  applyTranslations();
  updateSeoForCurrentPage();
  routeInit();
}
function updateLangButtons(){ document.querySelectorAll('[data-lang-btn]').forEach(btn => btn.classList.toggle('active', btn.dataset.langBtn === currentLang())); }
function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
}
function initLang(){
  document.documentElement.lang = currentLang();
  updateLangButtons();
  applyTranslations();
  document.querySelectorAll('[data-lang-btn]').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.langBtn)));
}

function avatarPalette(name){
  const palettes = [
    ['#f97316','#7c2d12'], ['#22c55e','#14532d'], ['#3b82f6','#172554'], ['#eab308','#78350f'],
    ['#ec4899','#831843'], ['#8b5cf6','#4c1d95'], ['#14b8a6','#134e4a'], ['#ef4444','#7f1d1d'],
    ['#fb7185','#4a044e'], ['#38bdf8','#082f49']
  ];
  const key = normalize(name);
  let hash = 0;
  for(let i=0;i<key.length;i++) hash = ((hash * 31) + key.charCodeAt(i)) >>> 0;
  return palettes[hash % palettes.length];
}
function svgAvatarDataUri(name){
  const [c1,c2] = avatarPalette(name);
  const safe = escapeHtml(name);
  const ini = escapeHtml(initials(name));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" role="img" aria-label="${safe}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
    <rect width="220" height="220" rx="34" fill="url(#g)"/>
    <circle cx="110" cy="78" r="45" fill="rgba(255,255,255,.18)"/>
    <path d="M42 190c10-42 36-63 68-63s58 21 68 63" fill="rgba(255,255,255,.18)"/>
    <circle cx="110" cy="78" r="30" fill="rgba(255,255,255,.82)"/>
    <text x="110" y="90" text-anchor="middle" font-size="30" font-family="Arial" font-weight="900" fill="${c2}">${ini}</text>
    <rect x="22" y="158" width="176" height="34" rx="17" fill="rgba(0,0,0,.32)"/>
    <text x="110" y="181" text-anchor="middle" font-size="16" font-family="Arial" font-weight="800" fill="#fff">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function imageFallback(name){ return IMAGE_OVERRIDES[normalize(name)] || svgAvatarDataUri(name); }
function getImage(api, name){
  if(api?.imageUrl2) return api.imageUrl2;
  if(api?.imageUrl) return api.imageUrl;
  if(api?.imageUrl3) return api.imageUrl3;
  if(api?.id) return `https://cdn.brawlify.com/brawlers/borderless/${api.id}.png`;
  return imageFallback(name);
}
function avatarMarkup(name, img, big=false){
  const src = img || imageFallback(name);
  return `<img src="${src}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.onerror=null;this.src=svgAvatarDataUri('${escapeHtml(name)}')">`;
}

async function fetchJson(url){
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
async function fetchApiBrawlers(){
  if(API_CACHE) return API_CACHE;
  let cacheList = [];
  try{
    const cache = await fetchJson('assets/api-cache.json');
    cacheList = cache.list || cache.data || [];
  }catch(e){}
  try{
    const live = await fetchJson(API_URL);
    API_CACHE = live.list || live.data || [];
    if(API_CACHE.length) return API_CACHE;
  }catch(e){
    console.warn('Live API unavailable, using local fallback.', e);
  }
  API_CACHE = cacheList;
  return API_CACHE;
}
function apiToStatic(api){
  const name = api.name;
  const rarity = api.rarity?.name || api.rarity || 'Provisional';
  return { name, rarity, slug: slugify(name), dynamic:true };
}
async function getRoster(){
  if(LIVE_ROSTER) return LIVE_ROSTER;
  const apiList = await fetchApiBrawlers();
  const byNorm = new Map();
  STATIC_BRAWLERS.forEach(b => byNorm.set(normalize(b.name), {...b, dynamic:false}));
  apiList.forEach(api => {
    if(!api?.name) return;
    const key = normalize(api.name);
    const current = byNorm.get(key);
    byNorm.set(key, current ? {...current, api} : {...apiToStatic(api), api});
  });
  LIVE_ROSTER = Array.from(byNorm.values()).sort((a,b) => {
    const ai = STATIC_BRAWLERS.findIndex(x => normalize(x.name) === normalize(a.name));
    const bi = STATIC_BRAWLERS.findIndex(x => normalize(x.name) === normalize(b.name));
    return (ai === -1 ? 9999 : ai) - (bi === -1 ? 9999 : bi) || a.name.localeCompare(b.name);
  });
  return LIVE_ROSTER;
}
function findBrawler(nameOrSlug, roster){
  const n = normalize(nameOrSlug);
  return roster.find(b => normalize(b.slug) === n || normalize(b.name) === n);
}
function findApiFor(name, roster){
  const b = roster.find(x => normalize(x.name) === normalize(name));
  return b?.api || null;
}

function gearLabel(key){
  const labels = {
    damage:{es:'Daño',en:'Damage'}, shield:{es:'Escudo',en:'Shield'}, speed:{es:'Velocidad',en:'Speed'},
    vision:{es:'Visión',en:'Vision'}, health:{es:'Salud',en:'Health'}, reload:{es:'Recarga',en:'Reload'}
  };
  return labels[key]?.[currentLang()] || key;
}
function localGear(key){ return {name: gearLabel(key), imageUrl: `images/gears/${key}.png`}; }
function chooseFallbackGears(api, b){
  const type = String(api?.class?.name || api?.class || '').toLowerCase();
  if(type.includes('assassin')) return ['speed','damage'];
  if(type.includes('controller')) return ['vision','damage'];
  if(type.includes('sniper') || type.includes('marksman')) return ['damage','vision'];
  if(type.includes('tank')) return ['health','shield'];
  if(type.includes('support')) return ['reload','shield'];
  if(type.includes('artillery') || type.includes('thrower')) return ['damage','reload'];
  return ['damage','shield'];
}
function fallbackAbility(label, name){
  return {
    name: label,
    description: currentLang()==='es'
      ? `Opción segura para ${name}. Se actualiza con datos live cuando la API tiene gadget o habilidad disponible.`
      : `Safe option for ${name}. It updates with live data when the API has gadget or star power available.`
  };
}
function getBuild(api, b){
  const gadgets = api?.gadgets || [];
  const stars = api?.starPowers || api?.starpowers || [];
  const apiGears = api?.gears || [];
  return {
    gadget: gadgets[0] || fallbackAbility(currentLang()==='es'?'Gadget recomendado':'Recommended gadget', b.name),
    star: stars[0] || fallbackAbility(currentLang()==='es'?'Habilidad recomendada':'Recommended star power', b.name),
    gadgetAlt: gadgets[1] || null,
    starAlt: stars[1] || null,
    gears: apiGears.length >= 2 ? apiGears.slice(0,2) : chooseFallbackGears(api, b).map(localGear),
    isLive: Boolean(gadgets[0] || stars[0])
  };
}
function abilityMini(item, label){
  return `<div class="mini-build"><div class="mini-kicker">${label}</div><div class="mini-ability">
    <div class="ability-icon">${item?.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none';this.parentElement.textContent='★'">` : '★'}</div>
    <div><div class="name">${escapeHtml(item?.name || '—')}</div><div class="desc">${escapeHtml((item?.description || '').slice(0,86))}${(item?.description || '').length>86?'…':''}</div></div>
  </div></div>`;
}
function gearMarkup(gears){
  return `<div class="gears">${(gears || [localGear('damage'),localGear('shield')]).map(g => `<span class="gear-chip"><img src="${g.imageUrl || 'images/gears/damage.png'}" alt="${escapeHtml(g.name)}" onerror="this.src='images/gears/damage.png'"><span>${escapeHtml(g.name)}</span></span>`).join('')}</div>`;
}
function brawlerCard(b){
  const api = b.api || null;
  const img = getImage(api, b.name);
  const build = getBuild(api, b);
  return `<article class="build-row">
    <div class="avatar">${avatarMarkup(b.name,img)}</div>
    <div class="build-main">
      <span class="badge ${rarityClass(b.rarity)}">${escapeHtml(b.rarity)}</span>
      <h3>${escapeHtml(b.name)}</h3>
      <p>${currentLang()==='es'?'Build recomendada con gadget, habilidad estelar y gears.':'Recommended build with gadget, star power and gears.'}</p>
    </div>
    <div class="build-mini-grid">
      ${abilityMini(build.gadget, t('bestGadget'))}
      ${abilityMini(build.star, t('bestStar'))}
      <div class="gear-box"><div class="mini-kicker">${t('bestGears')}</div>${gearMarkup(build.gears)}</div>
    </div>
    <a class="btn primary open-build" href="${buildHref(b.slug)}">${t('viewBuild')}</a>
  </article>`;
}
function tierMini(name, roster){
  const b = findBrawler(name, roster) || {name, rarity:'Provisional', slug:slugify(name)};
  const img = getImage(b.api, b.name);
  return `<a class="tier-mini" href="${buildHref(b.slug)}">
    <div class="avatar">${avatarMarkup(b.name,img)}</div>
    <div><span class="badge ${rarityClass(b.rarity)}">${escapeHtml(b.rarity)}</span><h4>${escapeHtml(b.name)}</h4></div>
  </a>`;
}
function topCard(name, idx, roster){
  const b = findBrawler(name, roster) || {name, rarity:'Provisional', slug:slugify(name)};
  const img = getImage(b.api, b.name);
  const s = TOP10_STATS[name] || {wr:'—',pick:'—'};
  return `<a class="top-card" href="${buildHref(b.slug)}">
    <div class="rank">#${idx+1}</div>
    <div class="avatar">${avatarMarkup(b.name,img)}</div>
    <div>
      <span class="badge ${rarityClass(b.rarity)}">${escapeHtml(b.rarity)}</span>
      <h3>${escapeHtml(b.name)}</h3>
      <div class="top-stats"><span>${t('wr')}: <strong>${s.wr}</strong></span><span>${t('pick')}: <strong>${s.pick}</strong></span></div>
    </div>
  </a>`;
}

function fillRarityFilter(roster){
  const sel = document.getElementById('rarity');
  if(!sel) return;
  const value = sel.value;
  const rarities = [...new Set(roster.map(b => b.rarity).filter(Boolean))];
  sel.innerHTML = `<option value="">${t('allRarities')}</option>` + rarities.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('');
  sel.value = value;
}

async function initHome(){
  const roster = await getRoster();
  const total = document.getElementById('stat-total'); if(total) total.textContent = roster.length;
  const updated = document.getElementById('stat-updated'); if(updated) updated.textContent = SITE_INFO.lastManualUpdate;
  fillRarityFilter(roster);
  const grid = document.getElementById('brawler-grid');
  const search = document.getElementById('search');
  const rarity = document.getElementById('rarity');
  const render = () => {
    const q = normalize(search?.value || '');
    const r = rarity?.value || '';
    const filtered = roster.filter(b => (!q || normalize(b.name).includes(q)) && (!r || b.rarity === r));
    if(grid) grid.innerHTML = filtered.map(brawlerCard).join('') || `<div class="panel">${t('notFound')}</div>`;
  };
  search?.addEventListener('input', render);
  rarity?.addEventListener('change', render);
  render();
}
async function initTier(){
  const roster = await getRoster();
  for(const tier of ['s','a','b','c','d']){
    const el = document.getElementById(`tier-${tier}`);
    if(el) el.innerHTML = (TIER_GROUPS[tier] || []).map(name => tierMini(name, roster)).join('');
  }
  const listed = new Set(Object.values(TIER_GROUPS).flat().map(normalize));
  const provisional = roster.filter(b => !listed.has(normalize(b.name)));
  const newRow = document.getElementById('tier-new');
  const newWrap = document.getElementById('tier-new-row');
  if(newWrap) newWrap.classList.toggle('hidden', provisional.length === 0);
  if(newRow) newRow.innerHTML = provisional.map(b => tierMini(b.name, roster)).join('');
}
async function initTop10(){
  const roster = await getRoster();
  const grid = document.getElementById('top-grid');
  if(grid) grid.innerHTML = Object.keys(TOP10_STATS).map((name, idx) => topCard(name, idx, roster)).join('');
}
async function initBuild(){
  const roster = await getRoster();
  const params = new URLSearchParams(location.search);
  const slug = params.get('b') || params.get('slug') || 'shelly';
  const b = findBrawler(slug, roster);
  const root = document.getElementById('build-root');
  if(!root) return;
  if(!b){
    root.innerHTML = `<section class="section"><div class="panel"><h1>${t('notFound')}</h1><a class="btn primary" href="index.html#builds">${t('ctaBuilds')}</a></div></section>`;
    return;
  }
  const img = getImage(b.api, b.name);
  const build = getBuild(b.api, b);
  const title = `${b.name} Build 2026 - Best Gadget, Star Power & Gears`;
  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if(meta) meta.setAttribute('content', `${b.name} best build for Brawl Stars: recommended gadget, star power and gears. Updated Brawl Meta build page with tier list links.`);
  const canon = document.querySelector('link[rel="canonical"]');
  if(canon) canon.setAttribute('href', `${SITE_INFO.domain}/build.html?b=${encodeURIComponent(b.slug)}`);
  root.innerHTML = `
    <div class="breadcrumbs"><a href="index.html">Brawl Meta</a> / <a href="tier.html">Tier List</a> / ${escapeHtml(b.name)}</div>
    <section class="section">
      <div class="brawler-hero">
        <div class="featured-avatar">${avatarMarkup(b.name,img,true)}</div>
        <div class="panel">
          <div class="eyebrow">${t('viewBuild')}</div>
          <h1>${escapeHtml(b.name)} Build</h1>
          <p class="text-block">${currentLang()==='es'
            ? `Mejor build de ${escapeHtml(b.name)} con gadget, habilidad estelar y gears recomendados. Esta página está pensada para abrir siempre bien desde GitHub y Vercel usando una sola ruta segura.`
            : `Best ${escapeHtml(b.name)} build with recommended gadget, star power and gears. This page is built to open safely from GitHub and Vercel with one stable route.`}</p>
          <div class="info-blocks">
            <div class="small-card"><div class="label">${t('rarity')}</div><div class="value">${escapeHtml(b.rarity)}</div></div>
            <div class="small-card"><div class="label">${t('updated')}</div><div class="value">${SITE_INFO.lastManualUpdate}</div></div>
            <div class="small-card"><div class="label">${t('source')}</div><div class="value">${build.isLive ? t('liveBuild') : t('fallbackBuild')}</div></div>
          </div>
          <div class="actions"><a class="btn primary" href="tier.html">${t('ctaTier')}</a><a class="btn" href="top10.html">${t('ctaTop10')}</a><a class="btn" href="brawler-directory.html">${t('ctaDirectory')}</a></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><div><div class="kicker">${t('bestGadget')}</div><h2>${escapeHtml(b.name)} best build</h2><div class="title-divider"></div></div></div>
      <div class="build-grid">
        <div class="build-card"><div class="best-tag">BEST</div><div class="kicker">${t('bestGadget')}</div><div class="ability"><div class="ability-icon">${build.gadget?.imageUrl ? `<img src="${build.gadget.imageUrl}" alt="${escapeHtml(build.gadget.name)}">` : '★'}</div><div><div class="name">${escapeHtml(build.gadget?.name || '—')}</div><div class="text-block">${escapeHtml(build.gadget?.description || '')}</div></div></div></div>
        <div class="build-card"><div class="best-tag">BEST</div><div class="kicker">${t('bestStar')}</div><div class="ability"><div class="ability-icon">${build.star?.imageUrl ? `<img src="${build.star.imageUrl}" alt="${escapeHtml(build.star.name)}">` : '★'}</div><div><div class="name">${escapeHtml(build.star?.name || '—')}</div><div class="text-block">${escapeHtml(build.star?.description || '')}</div></div></div></div>
        <div class="build-card"><div class="kicker">${t('bestGears')}</div>${gearMarkup(build.gears)}</div>
        <div class="build-card"><div class="kicker">SEO</div><div class="text-block">Related searches: best ${escapeHtml(b.name)} build, ${escapeHtml(b.name)} gadget, ${escapeHtml(b.name)} star power, ${escapeHtml(b.name)} gears, ${escapeHtml(b.name)} tier list.</div></div>
      </div>
    </section>
    <section class="section">
      <div class="panel"><div class="section-head"><div><div class="kicker">${t('related')}</div><h2>${currentLang()==='es'?'Sigue navegando':'Keep exploring'}</h2><div class="title-divider"></div></div></div>
      <div class="actions"><a class="btn primary" href="index.html#builds">Best Builds</a><a class="btn" href="tier.html">Tier List</a><a class="btn" href="top10.html">Top 10</a><a class="btn" href="gem-grab-tier-list.html">Gem Grab</a><a class="btn" href="solo-showdown-tier-list.html">Solo Showdown</a></div></div>
    </section>`;
}

const GUIDE_CONTENT = {
  'best-brawlers-beginners': {
    es: { eyebrow:'GUÍA PARA PRINCIPIANTES', title:'Mejores brawlers para principiantes', intro:'Brawlers fáciles de usar, builds claras y opciones seguras para empezar a subir copas.', sections:[
      ['Top picks para empezar','Shelly, Nita, Jessie, Poco y Colt son opciones buenas para aprender control, daño y posicionamiento.',['shelly','nita','jessie','poco','colt']],
      ['Builds simples que funcionan','Prioriza gadgets fáciles, habilidades de valor constante y gears como daño o escudo.',['bull','rosa','8-bit','pam']],
      ['Siguiente paso','Cuando controles los básicos, prueba Spike, Leon, Sandy o Crow y compáralos con la tier list.',['spike','leon','sandy','crow']]
    ]},
    en: { eyebrow:'BEGINNER GUIDE', title:'Best brawlers for beginners', intro:'Easy brawlers, clear builds and safe picks for pushing trophies.', sections:[
      ['Top picks to start','Shelly, Nita, Jessie, Poco and Colt are good options to learn control, damage and positioning.',['shelly','nita','jessie','poco','colt']],
      ['Simple builds that work','Prioritize easy gadgets, steady star powers and gears like damage or shield.',['bull','rosa','8-bit','pam']],
      ['Next step','Once you know the basics, try Spike, Leon, Sandy or Crow and compare them with the tier list.',['spike','leon','sandy','crow']]
    ]}
  },
  'solo-showdown-tier-list': {
    es: { eyebrow:'SOLO SHOWDOWN', title:'Mejores brawlers para Solo Showdown', intro:'Picks fuertes para sobrevivir, hacer presión y cerrar partidas.', sections:[
      ['Supervivencia y presión','Leon, Crow, Cordelius y Kit destacan por movilidad y capacidad de castigar errores.',['leon','crow','cordelius','kit']],
      ['Agresivos de corto alcance','Bull, Shelly, Fang y Buzz funcionan bien en arbustos y zonas cerradas.',['bull','shelly','fang','buzz']],
      ['Cómo usar esta guía','Abre cada build y compara los picks con la tier list general.',['leon','crow','cordelius','kit']]
    ]},
    en: { eyebrow:'SOLO SHOWDOWN', title:'Best brawlers for Solo Showdown', intro:'Strong picks for survival, pressure and end-game control.', sections:[
      ['Survival and pressure','Leon, Crow, Cordelius and Kit stand out for mobility and punishment.',['leon','crow','cordelius','kit']],
      ['Close-range aggression','Bull, Shelly, Fang and Buzz work well in bushes and tight areas.',['bull','shelly','fang','buzz']],
      ['How to use this guide','Open each build and compare the picks with the full tier list.',['leon','crow','cordelius','kit']]
    ]}
  },
  'gem-grab-tier-list': {
    es: { eyebrow:'GEM GRAB', title:'Mejores brawlers para Gem Grab', intro:'Picks con control de línea, protección del portador y valor en partidas largas.', sections:[
      ['Control y presión','Gene, Sandy, Tara y Jessie ayudan a controlar espacios y proteger gemas.',['gene','sandy','tara','jessie']],
      ['Soporte y sustain','Poco, Pam y Gus son opciones sólidas si necesitas curación o aguante.',['poco','pam','gus']],
      ['Comparar builds y meta','Revisa builds y compara con la tier list para ver cómo cambia el meta entre modos.',['gene','sandy','tara','jessie','poco','pam','gus']]
    ]},
    en: { eyebrow:'GEM GRAB', title:'Best brawlers for Gem Grab', intro:'Picks with lane control, carrier protection and long-game value.', sections:[
      ['Control and pressure','Gene, Sandy, Tara and Jessie help control space and protect gems.',['gene','sandy','tara','jessie']],
      ['Support and sustain','Poco, Pam and Gus are solid when you need healing or stability.',['poco','pam','gus']],
      ['Compare builds and meta','Review builds and compare with the tier list to see how meta changes by mode.',['gene','sandy','tara','jessie','poco','pam','gus']]
    ]}
  }
};

async function initGuide(){
  const root = document.getElementById('guide-root');
  const guide = document.body.dataset.guide;
  const content = GUIDE_CONTENT[guide]?.[currentLang()] || GUIDE_CONTENT[guide]?.es;
  if(!root || !content) return;
  document.title = `${content.title} | Brawl Meta`;
  root.innerHTML = `<section class="hero"><div class="panel"><div class="eyebrow">${content.eyebrow}</div><h1>${content.title}</h1><p>${content.intro}</p><div class="actions"><a class="btn primary" href="index.html#builds">${t('ctaBuilds')}</a><a class="btn" href="tier.html">${t('ctaTier')}</a><a class="btn" href="top10.html">${t('ctaTop10')}</a></div></div></section>
  ${content.sections.map(([title,text,links]) => `<section class="section"><div class="panel"><div class="section-head"><div><div class="kicker">${content.eyebrow}</div><h2>${title}</h2><div class="title-divider"></div></div></div><p class="seo-copy">${text}</p><div class="actions">${links.map(slug => `<a class="btn" href="${buildHref(slug)}">${slug.replace(/-/g,' ')}</a>`).join('')}</div></div></section>`).join('')}`;
}
async function initDirectory(){
  const roster = await getRoster();
  const root = document.getElementById('directory-grid');
  if(root) root.innerHTML = roster.map(b => {
    const img = getImage(b.api, b.name);
    return `<a class="tier-mini" href="${buildHref(b.slug)}"><div class="avatar">${avatarMarkup(b.name,img)}</div><div><span class="badge ${rarityClass(b.rarity)}">${escapeHtml(b.rarity)}</span><h4>${escapeHtml(b.name)}</h4></div></a>`;
  }).join('');
}
function updateSeoForCurrentPage(){
  const page = document.body.dataset.page;
  const lang = currentLang();
  const meta = document.querySelector('meta[name="description"]');
  if(page === 'home'){
    document.title = lang==='es' ? 'Brawl Stars Best Builds 2026 - 104 Brawlers, Tier List y Win Rates' : 'Brawl Stars Best Builds 2026 - 104 Brawlers, Tier List and Win Rates';
    if(meta) meta.content = lang==='es' ? 'Best builds de Brawl Stars para los 104 brawlers: gadgets, habilidades estelares, gears, tier list y Top 10 win rate.' : 'Best Brawl Stars builds for all 104 brawlers: gadgets, star powers, gears, tier list and Top 10 win rate.';
  }
}
function routeInit(){
  const page = document.body.dataset.page;
  if(page === 'home') initHome();
  if(page === 'tier') initTier();
  if(page === 'top10') initTop10();
  if(page === 'build') initBuild();
  if(page === 'guide') initGuide();
  if(page === 'directory') initDirectory();
}
window.addEventListener('DOMContentLoaded', () => {
  initLang();
  updateSeoForCurrentPage();
  routeInit();
});
