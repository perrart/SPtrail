// Utilitários de aleatoriedade do motor de jogo.

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function chance(probability: number): boolean {
  return Math.random() < probability;
}

export function pickWeighted<T>(items: T[], weightOf: (item: T) => number): T | null {
  const pool = items.filter((i) => weightOf(i) > 0);
  if (pool.length === 0) return null;
  const total = pool.reduce((sum, i) => sum + weightOf(i), 0);
  let roll = Math.random() * total;
  for (const item of pool) {
    roll -= weightOf(item);
    if (roll <= 0) return item;
  }
  return pool[pool.length - 1];
}

export function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[randInt(0, items.length - 1)];
}

/** Embaralha uma lista (Fisher-Yates) sem alterar o array original. */
export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Sorteia `count` itens distintos de uma lista, opcionalmente forçando a inclusão de um item. */
export function sampleDistinct<T>(items: T[], count: number, forceInclude?: T): T[] {
  const shuffled = shuffle(items);
  let result = shuffled.slice(0, count);
  if (forceInclude !== undefined && !result.includes(forceInclude)) {
    result = [forceInclude, ...result.slice(0, Math.max(0, count - 1))];
  }
  return shuffle(result);
}
