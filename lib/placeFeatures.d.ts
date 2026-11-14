import { AvailableTerrainFeatureRegistry } from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Terrain from '@civ-clone/core-terrain/Terrain';
/**
 * A terrain `Created` effect: for each available terrain feature, in the registry's order, every `Feature` rule that
 * passes for it and the new terrain is processed. The rules (and their rolls) decide what the terrain gets; a feature
 * with no `Feature` rule (a river placed by the world generator, say) is never given here.
 */
export declare const placeFeatures: (
  ruleRegistry?: RuleRegistry,
  availableTerrainFeatureRegistry?: AvailableTerrainFeatureRegistry
) => (terrain: Terrain) => void;
export default placeFeatures;
