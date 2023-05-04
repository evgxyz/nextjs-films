
export function isClient(ctxUrl: string) {
  return (ctxUrl.search(/^\/_next\/data/i) >= 0);
}

