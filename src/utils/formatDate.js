export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yy = pad(date.getFullYear() % 100);
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${dd}.${mm}.${yy} ${hh}:${min}`;
}
