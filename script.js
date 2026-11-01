const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }
});
const launcher = document.querySelector('.chat-launcher');
const panel = document.querySelector('.chat-panel');
const input = document.querySelector('#chat-input');
const body = document.querySelector('#chat-body');
function setChat(open) {
  panel.hidden = !open;
  launcher.setAttribute('aria-expanded', String(open));
  if (open) input.focus(); else launcher.focus();
}
launcher.addEventListener('click', () => setChat(panel.hidden));
document.querySelector('.chat-close').addEventListener('click', () => setChat(false));
function reply(text) {
  const q = text.toLowerCase();
  if (/price|cost|pricing|plan|consultation fee/.test(q)) return 'The original V Web site lists consultation plans from £399, with Pro at £699 and Premium at £999 per consultation. Please get in touch to confirm current pricing for your needs.';
  if (/sprint|day|process|how.*work|prototype|demo/.test(q)) return 'Our remote development sprint moves from a client meeting on day 1, to ideas and a demo on day 2, storyboarding on day 3, and prototyping and user testing on day 4.';
  if (/contact|touch|hire|project|start|talk|email/.test(q)) return 'We would love to hear about your idea! Use the “Get in touch” button on this page to reach the contact form on the original V Web site.';
  if (/service|what.*do|website|web design|app|develop|consult/.test(q)) return 'V Web offers web and mobile app development, remote technical consultation, demos, prototypes and application reviews.';
  if (/where|location|remote|world/.test(q)) return 'V Web works remotely with clients worldwide, using online meetings to collaborate.';
  if (/hello|hi|hey/.test(q)) return 'Hello! What would you like to know about V Web? You can ask about services, the sprint, pricing or how to get in touch.';
  return 'I can help with questions about V Web’s services, development sprint, consultation pricing and how to get in touch. What would you like to know?';
}
function send(text) {
  text = text.trim();
  if (!text) return;
  const add = (content, type) => { const message = document.createElement('div'); message.className = `message ${type}`; message.textContent = content; body.appendChild(message); };
  add(text, 'user');
  add(reply(text), 'bot');
  body.scrollTop = body.scrollHeight;
}
document.querySelector('.chat-form').addEventListener('submit', event => { event.preventDefault(); send(input.value); input.value = ''; input.focus(); });
document.querySelector('.quick-replies').addEventListener('click', event => { if (event.target.matches('button')) send(event.target.textContent); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) setChat(false); });
