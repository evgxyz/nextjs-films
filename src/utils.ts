
export function isIntStr(str: string) {
  return /^\d+$/.test(str);
}

export function range(from: number, to: number, step: number = 1) {
  const arr = [];
  for (let i = from; i <= to; i += step) {
    arr.push(i);
  }
  return arr;
}

export function compare<T>(x: T, y: T) {
  if (x === y) return 0;
  return (x < y) ? -1 : 1;
}