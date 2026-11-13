import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';

/**
 * A `TerrainChanged` criterion: the change is from one of `from`'s types to
 * one of `to`'s.
 */
export const changesTerrain =
  (
    from: (typeof Terrain)[],
    to: (typeof Terrain)[]
  ): ((tile: Tile, was: Terrain, now: Terrain) => boolean) =>
  (tile: Tile, was: Terrain, now: Terrain): boolean =>
    from.some(
      (TerrainType: typeof Terrain): boolean => was instanceof TerrainType
    ) &&
    to.some(
      (TerrainType: typeof Terrain): boolean => now instanceof TerrainType
    );

export default changesTerrain;
