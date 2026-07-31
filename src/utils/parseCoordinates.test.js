import { parseCoordinates } from './parseCoordinates';

describe('parseCoordinates', () => {
  test('парсит координаты с пробелом после запятой', () => {
    expect(parseCoordinates('51.50851, -0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('парсит координаты без пробела после запятой', () => {
    expect(parseCoordinates('51.50851,-0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('парсит координаты в квадратных скобках', () => {
    expect(parseCoordinates('[51.50851, -0.12572]')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('нормализует юникодный минус (−) в обычный дефис', () => {
    expect(parseCoordinates('51.50851, −0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('парсит положительные широту и долготу', () => {
    expect(parseCoordinates('55.7558, 37.6173')).toEqual({
      latitude: 55.7558,
      longitude: 37.6173,
    });
  });

  test('игнорирует лишние пробелы по краям строки', () => {
    expect(parseCoordinates('  51.50851, -0.12572  ')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test('кидает исключение на произвольный текст', () => {
    expect(() => parseCoordinates('это не координаты')).toThrow();
  });

  test('кидает исключение при неверном разделителе', () => {
    expect(() => parseCoordinates('51.50851; -0.12572')).toThrow();
  });

  test('кидает исключение при пустой строке', () => {
    expect(() => parseCoordinates('')).toThrow();
  });

  test('кидает исключение при координатах вне диапазона', () => {
    expect(() => parseCoordinates('200, 200')).toThrow();
  });

  test('кидает исключение, если аргумент не строка', () => {
    expect(() => parseCoordinates(undefined)).toThrow();
    expect(() => parseCoordinates(null)).toThrow();
    expect(() => parseCoordinates(51.50851)).toThrow();
  });
});
