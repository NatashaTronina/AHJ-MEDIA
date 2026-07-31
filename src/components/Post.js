import eyeIcon from '../assets/icons/eye.svg';
import { formatDate } from '../utils/formatDate';

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function renderFooter(post) {
  const footer = createEl('div', 'post__footer');
  const [lat, lng] = post.coordinates;
  const coords = createEl('span', null, `[${lat}, ${lng}]`);
  const icon = document.createElement('img');
  icon.src = eyeIcon;
  icon.alt = '';
  footer.append(coords, icon);
  return footer;
}

function renderHeader(post, textNode) {
  const header = createEl('div', 'post__header');
  const date = createEl('span', 'post__date', formatDate(post.date));
  if (textNode) header.append(textNode, date);
  else header.append(date);
  return header;
}

/**
 * Simulates playback progress for demo media posts that have no real
 * recorded file behind them yet (audio/video recording is a later task).
 */
function attachSimulatedPlayback(playBtn, range, durationMs = 8000) {
  let timer = null;
  let elapsed = 0;
  const tick = 100;

  const stop = () => {
    clearInterval(timer);
    timer = null;
    playBtn.classList.remove('is-playing');
  };

  playBtn.addEventListener('click', () => {
    if (timer) {
      stop();
      return;
    }
    if (elapsed >= durationMs) elapsed = 0;
    playBtn.classList.add('is-playing');
    timer = setInterval(() => {
      elapsed += tick;
      range.value = String(Math.min(100, (elapsed / durationMs) * 100));
      if (elapsed >= durationMs) stop();
    }, tick);
  });

  range.addEventListener('input', () => {
    elapsed = (Number(range.value) / 100) * durationMs;
  });
}

function renderTextPost(post) {
  const card = createEl('article', 'post');
  const textNode = createEl('p', 'post__text', post.text);
  card.append(renderHeader(post), textNode, renderFooter(post));
  return card;
}

function renderAudioPost(post) {
  const card = createEl('article', 'post');
  const player = createEl('div', 'post__player post__media');
  const playBtn = createEl('button', 'post__play-btn');
  playBtn.type = 'button';
  playBtn.setAttribute('aria-label', 'Воспроизвести аудиозапись');
  const range = document.createElement('input');
  range.type = 'range';
  range.className = 'post__range';
  range.min = '0';
  range.max = '100';
  range.value = '0';
  player.append(playBtn, range);
  attachSimulatedPlayback(playBtn, range);
  card.append(renderHeader(post), player, renderFooter(post));
  return card;
}

function renderVideoPost(post) {
  const card = createEl('article', 'post');
  const frame = createEl('div', 'post__video-frame post__media');
  const playOverlay = createEl('button', 'post__video-play');
  playOverlay.type = 'button';
  playOverlay.setAttribute('aria-label', 'Воспроизвести видеозапись');
  frame.append(playOverlay);

  const player = createEl('div', 'post__player');
  const playBtn = createEl('button', 'post__play-btn');
  playBtn.type = 'button';
  playBtn.setAttribute('aria-label', 'Воспроизвести видеозапись');
  const range = document.createElement('input');
  range.type = 'range';
  range.className = 'post__range';
  range.min = '0';
  range.max = '100';
  range.value = '0';
  player.append(playBtn, range);

  attachSimulatedPlayback(playBtn, range);
  playOverlay.addEventListener('click', () => playBtn.click());

  card.append(renderHeader(post), frame, player, renderFooter(post));
  return card;
}

export function renderPost(post) {
  switch (post.type) {
    case 'audio':
      return renderAudioPost(post);
    case 'video':
      return renderVideoPost(post);
    case 'text':
    default:
      return renderTextPost(post);
  }
}
