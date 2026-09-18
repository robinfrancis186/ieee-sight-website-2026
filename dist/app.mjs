export const projects = {
  water: { category:'water', title:'Water that reaches home.', subtitle:'D2Re-B · Baveli, Wayanad', focus:'Water & clean energy', location:'Baveli, Wayanad', partner:'IEEE Kerala Section SIGHT and GEC Wayanad SIGHT', image:'assets/water-large.jpg', imageCaption:'Project photograph · IEEE Humanitarian Technologies', alt:'Project team beside the D2Re-B water tanks in Baveli', description:'A solar-powered water system developed with the community, combining pumping, storage, drinking water filtration and street lighting.', story:[['The need','Residents relied on a nearby river for daily water collection.'],['The response','Solar-powered pumping and filtration bring water closer to the community.'],['Local ownership','Local SIGHT student volunteers supported monitoring and maintenance.']], source:'https://ieeeht.org/programs/tech4good/india/domestic-drinking-resevoir/' },
  lumen: { category:'water', title:'Light after sunset.', subtitle:'LUMEN · Muvattupuzha · 2022', focus:'Street lighting', location:'Muvattupuzha, Kerala', partner:'IEEE Kerala Section SIGHT · EPICS in IEEE support', image:'assets/lumen.webp', imageCaption:'Conceptual illustration, not a photograph of the LUMEN installation.', alt:'Illustration of a solar streetlight among Kerala palms at dusk', description:'LUMEN brought street lighting to a tribal colony in Muvattupuzha. The project was implemented in 2022 with support from EPICS in IEEE.', story:[['Local need','Street lighting was the focus of this community project.'],['Volunteer effort','The Kerala Section SIGHT Group put the project into practice.'],['Documented work','IEEE highlighted LUMEN in its 2022 Group of the Year recognition.']], source:'https://sight.ieee.org/2023/03/congratulations-to-the-2022-sight-groups-of-the-year/' },
  steam: { category:'education', title:'Learning by making.', subtitle:'STEAM for Social Good', focus:'Education & participation', location:'Kerala', partner:'IEEE Kerala Section SIGHT and the Kerala Section Education Society Chapter', image:'assets/learning.webp', imageCaption:'Conceptual illustration, not a photograph of the programme.', alt:'Illustration of an electronics learning workspace with a small robot', description:'An after-school coding camp and makeathon connected young people with design thinking and sustainable development.', story:[['Build skills','A ten-day after-school coding camp introduced practical skills.'],['Apply ideas','A two-day makeathon focused on applying design thinking.'],['Shared purpose','Learning activities connected with the UN Sustainable Development Goals.']], source:'https://sight.ieee.org/2023/03/congratulations-to-the-2022-sight-groups-of-the-year/' }
};
export function visibleProjectIds(category) {
  if (!['all','water','education'].includes(category)) return [];
  return Object.keys(projects).filter(id => category === 'all' || projects[id].category === category);
}
export function scrollProgress(scroll, height, viewport) {
  return Math.max(0, Math.min(1, scroll / Math.max(1, height - viewport)));
}
function initialize() {
  const $ = selector => document.querySelector(selector);
  const menu = $('.menu-toggle'), nav = $('#navigation'), header = $('.header');
  function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('open',open); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width:981px)').addEventListener('change', closeMenu);

  const filters = $('.filters'), grid = $('.project-grid');
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]'); if (!button) return;
    const category = button.dataset.filter, visible = visibleProjectIds(category);
    filters.querySelectorAll('button').forEach(item => { const selected = item === button; item.classList.toggle('active',selected); item.setAttribute('aria-pressed',String(selected)); });
    grid.querySelectorAll('[data-project]').forEach(card => { card.hidden = !visible.includes(card.dataset.project); if (!card.hidden) card.classList.add('visible'); });
    grid.classList.toggle('is-filtered',category !== 'all'); grid.classList.toggle('education-only',category === 'education');
    $('#filter-status').textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'} shown.`;
  });

  const dialog = $('#project-dialog');
  function closeDialog() { dialog.close(); }
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const project = projects[card.dataset.project]; if (!project) return;
      event.preventDefault();
      $('#dialog-eyebrow').textContent = `PROJECT STORY / ${project.focus.toUpperCase()}`;
      $('#dialog-title').textContent = project.title; $('#dialog-subtitle').textContent = project.subtitle;
      $('#dialog-description').textContent = project.description;
      $('#dialog-image').src = project.image; $('#dialog-image').alt = project.alt;
      $('#dialog-image-caption').textContent = project.imageCaption;
      $('#dialog-source').href = project.source;
      $('#dialog-page').href = `project-${card.dataset.project}.html`;
      $('#dialog-story').replaceChildren(...project.story.map(([title,copy]) => { const section = document.createElement('div'), heading = document.createElement('h3'), paragraph = document.createElement('p'); heading.textContent=title; paragraph.textContent=copy; section.append(heading,paragraph); return section; }));
      const context = $('#dialog-context'); context.replaceChildren();
      [['Location',project.location],['Focus',project.focus],['Partnership',project.partner]].forEach(([label,value]) => { const term=document.createElement('dt'), description=document.createElement('dd'); term.textContent=label.toUpperCase(); description.textContent=value; context.append(term,description); });
      dialog.showModal(); document.body.classList.add('modal-open'); $('#dialog-title').focus();
    }));
    $('.dialog-close').addEventListener('click',closeDialog); $('#dialog-back').addEventListener('click',closeDialog);
    dialog.addEventListener('close',() => document.body.classList.remove('modal-open'));
    dialog.addEventListener('click',event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(); });
  }

  const audiences = {volunteer:'Bring your curiosity and skills. Connect with the Kerala team to explore volunteering and community projects.',college:'Bring your college into the conversation. Connect with the Kerala team about student participation and SIGHT Group collaboration.',partner:'Bring your local knowledge. Connect with the Kerala team to discuss a community challenge or partnership.'};
  document.querySelectorAll('[data-audience]').forEach(link => link.addEventListener('click',() => { $('#join-message').textContent = audiences[link.dataset.audience]; }));

  const motionButton = $('#motion-toggle'), reducedPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  try { userPaused = localStorage.getItem('sight-motion-paused') === 'true'; } catch {}
  let reduced = false;
  function applyMotion() {
    reduced = userPaused || reducedPreference.matches;
    document.documentElement.classList.toggle('reduce-motion',reduced);
    motionButton.setAttribute('aria-pressed',String(reduced));
    motionButton.setAttribute('aria-label',reduced ? 'Motion paused' : 'Pause motion');
    motionButton.querySelector('span').textContent = reduced ? 'Motion paused' : 'Pause motion';
    motionButton.querySelector('img').src = reduced ? 'assets/icons/play.svg' : 'assets/icons/pause.svg';
    if (reduced) { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); $('.hero').style.setProperty('--parallax','0px'); }
  }
  motionButton.addEventListener('click',() => { if (reducedPreference.matches) { motionButton.querySelector('span').textContent='Reduced motion on device'; return; } userPaused=!userPaused; try { localStorage.setItem('sight-motion-paused',String(userPaused)); } catch {} applyMotion(); });
  reducedPreference.addEventListener('change',applyMotion); applyMotion();
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } },{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    document.documentElement.classList.add('motion-ready');

  }
  let framePending = false;
  function paintScroll() {
    const y=window.scrollY;
    header.classList.toggle('scrolled',y>20);
    nav.querySelectorAll('a[href^="#"]').forEach(link => { const section=document.querySelector(link.hash), rect=section.getBoundingClientRect(), marker=window.innerHeight*.35; if(rect.top<=marker && rect.bottom>marker) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
    header.style.setProperty('--progress',String(scrollProgress(y,document.documentElement.scrollHeight,window.innerHeight)));
    if (!reduced && y < 1000) $('.hero').style.setProperty('--parallax',`${Math.min(y*.13,80)}px`);
    framePending=false;
  }
  window.addEventListener('scroll',() => { if (!framePending) { framePending=true; requestAnimationFrame(paintScroll); } },{passive:true});
  window.addEventListener('resize',paintScroll); paintScroll();
}
if (typeof document !== 'undefined') initialize();
