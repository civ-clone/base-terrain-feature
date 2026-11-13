"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watercourse = void 0;
const TerrainFeature_1 = require("@civ-clone/core-terrain-feature/TerrainFeature");
/**
 * A feature that water runs along (a river, for one), as opposed to a resource
 * that a square happens to hold. It sits alongside a resource rather than
 * standing in for one, so code that means "the square's resource" asks
 * `isResource`.
 */
class Watercourse extends TerrainFeature_1.default {
}
exports.Watercourse = Watercourse;
exports.default = Watercourse;
//# sourceMappingURL=Watercourse.js.map