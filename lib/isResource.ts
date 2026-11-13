import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import Watercourse from './Watercourse';

/**
 * Whether `feature` is a resource the square holds: anything but a
 * `Watercourse`. Any other feature counts, including one a rule set treats as
 * part of the terrain rather than a special (Civ1's Grassland Shield, say), so
 * a rule that means "special" may still need to exclude those itself.
 */
export const isResource = (feature: TerrainFeature): boolean =>
  !(feature instanceof Watercourse);

export default isResource;
