import Terrain from '@civ-clone/core-terrain/Terrain';
import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import TerrainFeatureRegistry from '@civ-clone/core-terrain-feature/TerrainFeatureRegistry';
import Tile from '@civ-clone/core-world/Tile';
/**
 * The features the square has on `to`, given the ones it had on `from`. It may
 * also register features itself (a rule that rolls for one, say) and return
 * none.
 */
export type FeatureReplacer = (
  features: TerrainFeature[],
  to: Terrain,
  from: Terrain,
  tile: Tile
) => TerrainFeature[];
/**
 * A `TerrainChanged` effect: `replace` decides the square's features on its new
 * terrain from the ones on its old terrain. The replacements are registered
 * first (if there are any), then every feature of the old terrain is
 * unregistered, so none is left behind on a terrain no tile has.
 */
export declare const replaceFeatures: (
  terrainFeatureRegistry: TerrainFeatureRegistry,
  replace: FeatureReplacer
) => (tile: Tile, from: Terrain, to: Terrain) => void;
/**
 * A `TerrainChanged` effect that keeps every feature on the square: each one
 * is cloned onto the new terrain, in the same order, and the old ones are
 * unregistered.
 */
export declare const carryFeatures: (
  terrainFeatureRegistry: TerrainFeatureRegistry
) => (tile: Tile, from: Terrain, to: Terrain) => void;
export default replaceFeatures;
