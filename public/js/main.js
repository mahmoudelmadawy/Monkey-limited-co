document.getElementById('year').textContent = new Date().getFullYear();

const HELMET_HEX = { red: '#E63946', green: '#2D9D5F', blue: '#3A86FF' };

function monkeyAvatarSVG(helmetColor) {
  const hat = HELMET_HEX[helmetColor] || '#FFC72C';
  return `
  <svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true">
    <circle cx="40" cy="40" r="38" fill="#F4EBD8"/>
    <circle cx="40" cy="46" r="24" fill="#8B5E34"/>
    <ellipse cx="40" cy="50" rx="14" ry="13" fill="#D9B589"/>
    <circle cx="25" cy="44" r="7" fill="#8B5E34"/>
    <circle cx="55" cy="44" r="7" fill="#8B5E34"/>
    <circle cx="25" cy="44" r="3.4" fill="#D9B589"/>
    <circle cx="55" cy="44" r="3.4" fill="#D9B589"/>
    <circle cx="35" cy="49" r="2" fill="#3A2618"/>
    <circle cx="45" cy="49" r="2" fill="#3A2618"/>
    <path d="M35 57 Q40 61 45 57" stroke="#3A2618" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M20 40 A 20 16 0 0 1 60 40 Z" fill="${hat}"/>
    <rect x="17" y="37" width="46" height="6" rx="3" fill="${hat}"/>
  </svg>`;
}

function crewCardHTML(engineer) {
  const joined = new Date(engineer.joined_date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short'
  });
  return `
    <article class="crew-card" data-helmet="${engineer.helmet_color}">
      <div class="avatar">${monkeyAvatarSVG(engineer.helmet_color)}</div>
      <div>
        <h3>${escapeHTML(engineer.name)}</h3>
        <p class="crew-role">${escapeHTML(engineer.role)} &middot; ${engineer.helmet_color} helmet</p>
        <p class="crew-meta">${escapeHTML(engineer.species)} &middot; ${escapeHTML(engineer.specialty)}</p>
        <p class="crew-meta">On site since ${joined} &middot; ${engineer.bananas_per_day} bananas/day</p>
      </div>
    </article>`;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

let allEngineers = [];

async function loadCrew() {
  const board = document.getElementById('crew-board');
  try {
    const res = await fetch('/api/engineers');
    if (!res.ok) throw new Error('bad response');
    allEngineers = await res.json();
    renderCrew('all');
  } catch (err) {
    board.innerHTML = `<p class="crew-error">Couldn't reach the site office database. Is the Postgres server running?</p>`;
  }
}

function renderCrew(filter) {
  const board = document.getElementById('crew-board');
  const list = filter === 'all'
    ? allEngineers
    : allEngineers.filter((e) => e.helmet_color === filter);

  if (list.length === 0) {
    board.innerHTML = `<p class="crew-empty">No one's wearing that helmet today.</p>`;
    return;
  }
  board.innerHTML = list.map(crewCardHTML).join('');
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderCrew(btn.dataset.filter);
  });
});

loadCrew();

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('contact-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  status.className = 'contact-status';

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('failed');
    status.textContent = 'Message delivered to the site office. A monkey will reply soon.';
    status.className = 'contact-status ok';
    form.reset();
  } catch (err) {
    status.textContent = 'That message fell out of the tree. Please try again.';
    status.className = 'contact-status err';
  }
});
