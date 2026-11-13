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
export const replaceFeatures =
  (
    terrainFeatureRegistry: TerrainFeatureRegistry,
    replace: FeatureReplacer
  ): ((tile: Tile, from: Terrain, to: Terrain) => void) =>
  (tile: Tile, from: Terrain, to: Terrain): void => {
    const features = terrainFeatureRegistry.getByTerrain(from),
      replacements = replace(features, to, from, tile);

    if (replacements.length > 0) {
      terrainFeatureRegistry.register(...replacements);
    }

    terrainFeatureRegistry.unregister(...features);
  };

/**
 * A `TerrainChanged` effect that keeps every feature on the square: each one
 * is cloned onto the new terrain, in the same order, and the old ones are
 * unregistered.
 */
export const carryFeatures = (
  terrainFeatureRegistry: TerrainFeatureRegistry
): ((tile: Tile, from: Terrain, to: Terrain) => void) =>
  replaceFeatures(
    terrainFeatureRegistry,
    (features: TerrainFeature[], to: Terrain): TerrainFeature[] =>
      features.map(
        (feature: TerrainFeature): TerrainFeature => feature.clone(to)
      )
  );

export default replaceFeatures;
