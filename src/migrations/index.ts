import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260410_101019 from './20260410_101019';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260410_101019.up,
    down: migration_20260410_101019.down,
    name: '20260410_101019'
  },
];
