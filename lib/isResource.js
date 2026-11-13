"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResource = void 0;
const Watercourse_1 = require("./Watercourse");
/** Whether `feature` is a resource the square holds: anything but a `Watercourse`. */
const isResource = (feature) => !(feature instanceof Watercourse_1.default);
exports.isResource = isResource;
exports.default = exports.isResource;
//# sourceMappingURL=isResource.js.map