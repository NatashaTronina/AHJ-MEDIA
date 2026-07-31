import { parseCoordinates } from '../utils/parseCoordinates';

/**
 * Modal fallback shown when Geolocation API is unavailable/denied.
 * Lets the user type coordinates manually; validates them with
 * parseCoordinates before resolving.
 *
 * @param {string} defaultValue
 * @returns {Promise<{latitude: number, longitude: number}|null>} resolves
 *   with parsed coordinates, or null if the user cancelled.
 */
export function openCoordinatesModal(defaultValue = '51.50851, -0.12572') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const title = document.createElement('h2');
    title.className = 'modal__title';
    title.textContent = 'Что-то пошло не так';

    const text = document.createElement('p');
    text.className = 'modal__text';
    text.textContent =
      'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, ' +
      'дайте разрешение на использование геолокации, либо введите координаты вручную.';

    const label = document.createElement('label');
    label.className = 'modal__label';
    label.textContent = 'Широта и долгота через запятую';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'modal__input';
    input.value = defaultValue;
    label.append(input);

    const error = document.createElement('div');
    error.className = 'modal__error';

    const actions = document.createElement('div');
    actions.className = 'modal__actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'modal__btn modal__btn--cancel';
    cancelBtn.textContent = 'Отмена';

    const okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'modal__btn modal__btn--ok';
    okBtn.textContent = 'OK';

    actions.append(cancelBtn, okBtn);
    modal.append(title, text, label, error, actions);
    overlay.append(modal);
    document.body.append(overlay);
    input.focus();
    input.select();

    const close = (result) => {
      overlay.remove();
      resolve(result);
    };

    const clearError = () => {
      input.classList.remove('is-invalid');
      error.textContent = '';
    };

    const confirm = () => {
      try {
        const coordinates = parseCoordinates(input.value);
        close(coordinates);
      } catch (err) {
        input.classList.add('is-invalid');
        error.textContent = err.message;
      }
    };

    input.addEventListener('input', clearError);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') confirm();
      if (event.key === 'Escape') close(null);
    });
    cancelBtn.addEventListener('click', () => close(null));
    okBtn.addEventListener('click', confirm);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close(null);
    });
  });
}
