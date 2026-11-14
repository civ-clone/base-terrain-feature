import {
  AvailableTerrainFeatureRegistry,
  instance as availableTerrainFeatureRegistryInstance,
} from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Feature from '@civ-clone/core-terrain-feature/Rules/Feature';
import Terrain from '@civ-clone/core-terrain/Terrain';
import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';

/**
 * A terrain `Created` effect: for each available terrain feature, in the registry's order, every `Feature` rule that
 * passes for it and the new terrain is processed. The rules (and their rolls) decide what the terrain gets; a feature
 * with no `Feature` rule (a river placed by the world generator, say) is never given here.
 */
export const placeFeatures =
  (
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    availableTerrainFeatureRegistry: AvailableTerrainFeatureRegistry = availableTerrainFeatureRegistryInstance
  ): ((terrain: Terrain) => void) =>
  (terrain: Terrain): void => {
    const rules = ruleRegistry.get(Feature);

    availableTerrainFeatureRegistry
      .entries()
      .forEach((TerrainFeatureType: typeof TerrainFeature): void =>
        rules
          .filter((rule: Feature): boolean =>
            rule.validate(TerrainFeatureType, terrain)
          )
          .forEach((rule: Feature): void =>
            rule.process(TerrainFeatureType, terrain)
          )
      );
  };

export default placeFeatures;
