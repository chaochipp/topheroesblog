import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260410_101019 from './20260410_101019';
import * as migration_20260410_110401 from './20260410_110401';
import * as migration_20260410_112909 from './20260410_112909';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260410_101019.up,
    down: migration_20260410_101019.down,
    name: '20260410_101019',
  },
  {
    up: migration_20260410_110401.up,
    down: migration_20260410_110401.down,
    name: '20260410_110401',
  },
  {
    up: migration_20260410_112909.up,
    down: migration_20260410_112909.down,
    name: '20260410_112909'
  },
];
