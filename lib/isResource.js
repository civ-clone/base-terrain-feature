"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResource = void 0;
const Watercourse_1 = require("./Watercourse");
/**
 * Whether `feature` is a resource the square holds: anything but a
 * `Watercourse`. Any other feature counts, including one a rule set treats as
 * part of the terrain rather than a special (Civ1's Grassland Shield, say), so
 * a rule that means "special" may still need to exclude those itself.
 */
const isResource = (feature) => !(feature instanceof Watercourse_1.default);
exports.isResource = isResource;
exports.default = exports.isResource;
//# sourceMappingURL=isResource.js.map