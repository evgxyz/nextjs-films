
export function signCompare<T>(x: T, y: T) {
  return x == y ? 0 : (x < y ? -1 : 1);
}

export async function delay(ms: number) {
  await new Promise(r => { setTimeout(() => r(1), ms) });
}