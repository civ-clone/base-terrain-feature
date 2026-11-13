"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carryFeatures = exports.replaceFeatures = void 0;
/**
 * A `TerrainChanged` effect: `replace` decides the square's features on its new
 * terrain from the ones on its old terrain. The replacements are registered
 * first (if there are any), then every feature of the old terrain is
 * unregistered, so none is left behind on a terrain no tile has.
 */
const replaceFeatures = (terrainFeatureRegistry, replace) => (tile, from, to) => {
    const features = terrainFeatureRegistry.getByTerrain(from), replacements = replace(features, to, from, tile);
    if (replacements.length > 0) {
        terrainFeatureRegistry.register(...replacements);
    }
    terrainFeatureRegistry.unregister(...features);
};
exports.replaceFeatures = replaceFeatures;
/**
 * A `TerrainChanged` effect that keeps every feature on the square: each one
 * is cloned onto the new terrain, in the same order, and the old ones are
 * unregistered.
 */
const carryFeatures = (terrainFeatureRegistry) => (0, exports.replaceFeatures)(terrainFeatureRegistry, (features, to) => features.map((feature) => feature.clone(to)));
exports.carryFeatures = carryFeatures;
exports.default = exports.replaceFeatures;
//# sourceMappingURL=replaceFeatures.js.map