"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changesTerrain = void 0;
/**
 * A `TerrainChanged` criterion: the change is from one of `from`'s types to
 * one of `to`'s.
 */
const changesTerrain = (from, to) => (tile, was, now) => from.some((TerrainType) => was instanceof TerrainType) &&
    to.some((TerrainType) => now instanceof TerrainType);
exports.changesTerrain = changesTerrain;
exports.default = exports.changesTerrain;
//# sourceMappingURL=changesTerrain.js.map