import micIcon from '../assets/icons/mic.svg';
import cameraIcon from '../assets/icons/camera.svg';

/**
 * @param {(text: string) => void} onSubmitText
 */
export function createInputPanel(onSubmitText) {
  const panel = document.createElement('div');
  panel.className = 'input-panel';

  const field = document.createElement('input');
  field.type = 'text';
  field.className = 'input-panel__field';
  field.placeholder = 'Написать...';

  const micBtn = document.createElement('button');
  micBtn.type = 'button';
  micBtn.className = 'input-panel__btn input-panel__btn--mic';
  micBtn.setAttribute('aria-disabled', 'true');
  micBtn.append(iconImg(micIcon), createTooltip('Пока не работает'));
  micBtn.addEventListener('click', (event) => event.preventDefault());

  const cameraBtn = document.createElement('button');
  cameraBtn.type = 'button';
  cameraBtn.className = 'input-panel__btn input-panel__btn--camera';
  cameraBtn.setAttribute('aria-disabled', 'true');
  cameraBtn.append(iconImg(cameraIcon), createTooltip('Пока не работает'));
  cameraBtn.addEventListener('click', (event) => event.preventDefault());

  field.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const value = field.value.trim();
    if (!value) return;
    onSubmitText(value);
    field.value = '';
  });

  panel.append(field, micBtn, cameraBtn);
  return panel;
}

function iconImg(src) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  return img;
}

function createTooltip(text) {
  const tooltip = document.createElement('span');
  tooltip.className = 'input-panel__tooltip';
  tooltip.textContent = text;
  return tooltip;
}
