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
