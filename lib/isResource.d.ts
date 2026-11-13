import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
/**
 * Whether `feature` is a resource the square holds: anything but a
 * `Watercourse`. Any other feature counts, including one a rule set treats as
 * part of the terrain rather than a special (Civ1's Grassland Shield, say), so
 * a rule that means "special" may still need to exclude those itself.
 */
export declare const isResource: (feature: TerrainFeature) => boolean;
export default isResource;
