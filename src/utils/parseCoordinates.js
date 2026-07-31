const COORDINATES_RE = /^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/;

export function parseCoordinates(input) {
  if (typeof input !== 'string') {
    throw new Error('Координаты должны быть строкой');
  }

  const normalized = input
    .trim()
    .replace(/^\[|\]$/g, '')
    .trim()
    .replace(/[−–—]/g, '-');

  const match = COORDINATES_RE.exec(normalized);
  if (!match) {
    throw new Error('Неверный формат координат');
  }

  const latitude = parseFloat(match[1]);
  const longitude = parseFloat(match[2]);

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new Error('Координаты вне допустимого диапазона');
  }

  return { latitude, longitude };
}
