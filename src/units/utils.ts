
export function signCompare<T>(x: T, y: T) {
  return x == y ? 0 : (x < y ? -1 : 1);
}

export async function delay(ms: number) {
  await new Promise(r => { setTimeout(() => r(1), ms) });
}

/* export function sortByKey<T extends object>(obj: T): T {
  return (
    Object.fromEntries(
      Object.entries(obj)
        .sort((x, y) => signCompare(x[0], y[0]))
    )
  ) as T;
} */