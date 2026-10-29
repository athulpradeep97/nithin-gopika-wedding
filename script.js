import { firebaseConfig } from './firebase-config.js';
import { site } from './site-config.js';

const $ = id => document.getElementById(id);
const EVENT = new Date(site.dateISO);
const fmt = o => EVENT.toLocaleDateString('en-IN',{...o,timeZone:'Asia/Kolkata'});
const d = {...site,
  couple: `${site.groomFirst} & ${site.brideFirst}`,
  fullLine: `${site.groomFull} weds ${site.brideFull}`,
  dateText: fmt({day:'numeric',month:'long',year:'numeric'}),
  weekday: fmt({weekday:'long'}), dayNum: fmt({day:'numeric'}),
  monthShort: fmt({month:'short'}).toUpperCase()};
d.marquee = `${d.fullLine}   ✿   ${d.dateText}   ✿   Lekshmi Auditorium, ${site.place}   ✿   `;
document.querySelectorAll('[data-t]').forEach(e => { const v = d[e.dataset.t] ?? ''; e.textContent = v; e.hidden = !v; });
document.querySelectorAll('[data-show]').forEach(e => e.hidden = site.show[e.dataset.show] === false);
let mapLink = site.mapsUrl || '';
if (mapLink && !/^https?:\/\//i.test(mapLink)) {
    mapLink = 'https://' + mapLink;
}
$('maps').href = mapLink; 

$('tel').href = 'tel:' + site.phone;
document.title = `${d.couple} | ${site.eventTitle}`;


/* ---------- Opening screen + music ---------- */
const audio = $('audio'), musicBtn = $('music');
function setMusic(on){
  musicBtn.classList.toggle('on', on); musicBtn.setAttribute('aria-pressed', on);
  if (on) audio.play().catch(() => setMusic(false)); else audio.pause();
}
$('open').addEventListener('click', () => {
  $('gate').classList.add('open'); document.body.classList.remove('locked');
  setMusic(true); startPetals();
});
musicBtn.addEventListener('click', () => setMusic(audio.paused));

/* ---------- Falling petals ---------- */
function startPetals(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = $('petals');
  const colors = ['#f4a6b8','#e8798f','#ffffff','#fff5f7','#f3d98f','#e8c25f'];  // rose, white, gold
  setInterval(() => {
    const p = document.createElement('i'); p.className = 'petal';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.left = Math.random()*100 + 'vw';
    p.style.setProperty('--dx', (Math.random()*160-80) + 'px');
    p.style.animationDuration = 8 + Math.random()*8 + 's';
    p.style.transform = `scale(${.6+Math.random()*.8})`;
    box.appendChild(p); setTimeout(() => p.remove(), 16000);
  }, 900);
}

/* ---------- Countdown ---------- */
function tick(){
  let t = Math.max(0, EVENT - Date.now()) / 1000;
  const v = [Math.floor(t/86400), Math.floor(t%86400/3600), Math.floor(t%3600/60), Math.floor(t%60)];
  ['d','h','m','s'].forEach((k,i) => $(k).textContent = String(v[i]).padStart(2,'0'));
}
tick(); setInterval(tick, 1000);
/* ---------- Hero: rotating photos, overlay, spinning petals ---------- */
function initHero(){
  const hero = document.querySelector('.hero'); if (!hero) return;
  const arch = hero.querySelector('.arch');
  const mk = (tag, cls) => { const e = document.createElement(tag); e.className = cls; return e; };
  const loadable = list => Promise.all((list || []).map(src => new Promise(res => {
    const i = new Image(); i.onload = () => res(src); i.onerror = () => res(null); i.src = src;
  }))).then(a => a.filter(Boolean));

  // Rearrange existing content: text on one side, arch on the other
  const bg = mk('div', 'hero-bg'), overlay = mk('div', 'hero-overlay');
  const inner = mk('div', 'hero-inner'), text = mk('div', 'hero-text'), art = mk('div', 'hero-art');
  bg.setAttribute('aria-hidden', 'true'); overlay.setAttribute('aria-hidden', 'true');
  [...hero.children].forEach(el => { if (el !== arch) text.append(el); });

  const mandala = mk('div', 'mandala'); mandala.setAttribute('aria-hidden', 'true');
  const petals = (n, cy, rx, ry) => Array.from({length: n}, (_, i) =>
    `<ellipse cx="200" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${i * 360 / n} 200 200)"/>`).join('');
  mandala.innerHTML = `<svg viewBox="0 0 400 400"><g class="p1">${petals(16, 70, 20, 58)}</g><g class="p2">${petals(12, 122, 16, 34)}</g></svg>`;
  art.append(mandala); if (arch) art.append(arch);
  inner.append(text, art);
  hero.replaceChildren(bg, overlay, inner);

  // Crossfade helper
  const ms = (site.slideSeconds || 5) * 1000;
  const cycle = (srcs, make, every) => {
    if (!srcs.length) return;
    const els = srcs.map(make); let i = 0; els[0].classList.add('on');
    if (els.length > 1) setInterval(() => {
      els[i].classList.remove('on'); i = (i + 1) % els.length; els[i].classList.add('on');
    }, every);
  };

  loadable(site.heroBackgrounds).then(srcs => cycle(srcs, src => {
    const l = mk('div', 'layer'); l.style.backgroundImage = `url("${src}")`; bg.append(l); return l;
  }, ms * 1.5));

  if (arch) loadable(site.archPhotos).then(srcs => {
    const stack = mk('div', 'arch-stack'); arch.replaceChildren(stack);
    cycle(srcs, src => {
      const im = document.createElement('img'); im.src = src; im.alt = d.couple; stack.append(im); return im;
    }, ms);
  });
}
initHero();
/* ---------- Add to calendar (.ics) ---------- */
$('cal').addEventListener('click', e => {
  e.preventDefault();
  const z = x => x.toISOString().replace(/[-:]|\.\d{3}/g,'');
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',
    'DTSTART:'+z(EVENT),'DTEND:'+z(new Date(+EVENT+4*3600e3)),
    `SUMMARY:${site.eventTitle} – ${d.couple}`,
    'LOCATION:'+site.venue.replace(/,/g,'\\,'),
    `DESCRIPTION:${d.fullLine}. ${site.timeText}.`,
    'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], {type:'text/calendar'}));
  a.download = 'wedding-reception.ics'; a.click();
});

// Bride & Gromm Reception

function renderReceptions() {
  const container = document.getElementById("split");
  if (!container) return;

  const receptions = (site.receptions || [])
    .filter(item => item.enabled !== false);

  container.replaceChildren();

  receptions.forEach(item => {
    const card = document.createElement("article");
    card.className = "ecard split-card";

    // Optional image
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title || "Reception";
      card.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "ebody";

    function addText(tag, className, value) {
      if (!value || !String(value).trim()) return;

      const element = document.createElement(tag);
      element.className = className;
      element.textContent = value;
      body.appendChild(element);
    }

    addText("p", "script gold-t", item.label);
    addText("h3", "serif", item.title);
    addText("p", "ml", item.titleMl);

    const details = [
      ["Date", item.dateText],
      ["Time", item.timeText],
      ["Venue", item.venue]
    ].filter(([, value]) => value && String(value).trim());

    if (details.length) {
      const dl = document.createElement("dl");

      details.forEach(([label, value]) => {
        const dt = document.createElement("dt");
        dt.textContent = label;

        const dd = document.createElement("dd");
        dd.textContent = value;

        dl.append(dt, dd);
      });

      body.appendChild(dl);
    }

    addText("p", "serif-i note", item.note);

    if (item.mapsUrl) {
      const row = document.createElement("div");
      row.className = "row";

      const link = document.createElement("a");
      link.className = "btn";
      link.textContent = "Directions";
      link.href = item.mapsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      row.appendChild(link);
      body.appendChild(row);
    }

    card.appendChild(body);
    container.appendChild(card);
  });

  // Hide the entire section when no cards are enabled.
  container.hidden = receptions.length === 0;
}

// Call during page initialization.
renderReceptions();


/* ---------- Guest wishes (Firebase Firestore, localStorage fallback) ---------- */
const PAGE = 12; let shown = PAGE, wishes = [], store;
const configured = firebaseConfig && firebaseConfig.projectId && !firebaseConfig.projectId.startsWith('YOUR');

async function initStore(){
  if (!configured){
    console.warn('Firebase not configured: wishes are stored in this browser only.');
    store = {
      async list(){ return JSON.parse(localStorage.getItem('wishes')||'[]'); },
      async add(w){ const l = JSON.parse(localStorage.getItem('wishes')||'[]'); l.unshift({...w,ts:Date.now()}); localStorage.setItem('wishes', JSON.stringify(l)); }
    };
    return;
  }
  const V = '10.12.2', base = `https://www.gstatic.com/firebasejs/${V}/`;
  const { initializeApp } = await import(base+'firebase-app.js');
  const fs = await import(base+'firebase-firestore.js');
  const db = fs.getFirestore(initializeApp(firebaseConfig));
  const col = fs.collection(db, 'wishes');
  store = {
    async list(){
      const snap = await fs.getDocs(fs.query(col, fs.orderBy('ts','desc'), fs.limit(300)));
      return snap.docs.map(d => ({...d.data(), ts: d.data().ts?.toMillis?.() ?? 0}));
    },
    async add(w){ await fs.addDoc(col, {...w, ts: fs.serverTimestamp()}); }
  };
}

function render(){
  const wall = $('wall'); wall.replaceChildren();
  wishes.slice(0, shown).forEach((w,i) => {
    const c = document.createElement('div'); c.className = 'note-card';
    c.style.setProperty('--r', ((i*37%7)-3)*.4 + 'deg');
    const t = document.createElement('span'); t.textContent = w.text;       // textContent = no HTML injection
    const n = document.createElement('span'); n.className = 'script'; n.textContent = w.name;
    c.append(t, n); wall.append(c);
  });
  $('more').hidden = wishes.length <= shown;
}
async function load(){ try { wishes = await store.list(); } catch(e){ console.error(e); } render(); }
$('more').addEventListener('click', () => { shown += PAGE; render(); });
$('wtext').addEventListener('input', e => $('count').textContent = `${e.target.value.length} / 400`);

$('form').addEventListener('submit', async e => {
  e.preventDefault();
  if ($('hp').value) return;                                              // honeypot
  const name = $('wname').value.trim().slice(0,60), text = $('wtext').value.trim().slice(0,400);
  if (!name || !text) return;
  if (Date.now() - (+localStorage.getItem('lastWish')||0) < 30000){ $('status').textContent = 'Please wait a moment before sending another wish.'; return; }
  $('send').disabled = true; $('status').textContent = 'Sending…';
  try {
    await store.add({name, text}); localStorage.setItem('lastWish', Date.now());
    $('form').reset(); $('count').textContent = '0 / 400';
    $('status').textContent = 'Thank you! Your wishes have been sent.'; await load();
  } catch(err){ console.error(err); $('status').textContent = 'Could not send. Please try again.'; }
  $('send').disabled = false;
});

initStore().then(load);

/* ---------- Side events (groom's / bride's reception) ---------- */
(site.sideEvents || []).forEach(ev => {
  const dt = new Date(ev.dateISO);
  const when = dt.toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata'});
  const card = document.createElement('article'); card.className = 'ecard';
  const body = document.createElement('div'); body.className = 'ebody';
  const add = (tag, cls, text) => { if (!text) return; const e = document.createElement(tag); e.className = cls; e.textContent = text; body.append(e); return e; };
  add('h3', 'serif', ev.title); add('p', 'ml', ev.titleMl); add('p', 'sdate', when);
  const info = add('p', 'sinfo', ev.timeText); if (info){ const v = document.createElement('small'); v.textContent = ev.venue; info.append(v); }
  if (ev.mapsUrl){ const row = document.createElement('div'); row.className = 'row';
    const a = document.createElement('a'); a.className = 'btn'; a.textContent = 'Directions'; a.href = ev.mapsUrl; a.target = '_blank'; a.rel = 'noopener';
    row.append(a); body.append(row); }
  card.append(body); $('split').append(card);
});
