"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeFeatures = void 0;
const AvailableTerrainFeatureRegistry_1 = require("@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Feature_1 = require("@civ-clone/core-terrain-feature/Rules/Feature");
/**
 * A terrain `Created` effect: for each available terrain feature, in the registry's order, every `Feature` rule that
 * passes for it and the new terrain is processed. The rules (and their rolls) decide what the terrain gets; a feature
 * with no `Feature` rule (a river placed by the world generator, say) is never given here.
 */
const placeFeatures = (ruleRegistry = RuleRegistry_1.instance, availableTerrainFeatureRegistry = AvailableTerrainFeatureRegistry_1.instance) => (terrain) => {
    const rules = ruleRegistry.get(Feature_1.default);
    availableTerrainFeatureRegistry
        .entries()
        .forEach((TerrainFeatureType) => rules
        .filter((rule) => rule.validate(TerrainFeatureType, terrain))
        .forEach((rule) => rule.process(TerrainFeatureType, terrain)));
};
exports.placeFeatures = placeFeatures;
exports.default = exports.placeFeatures;
//# sourceMappingURL=placeFeatures.js.map