import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import Watercourse from './Watercourse';

/** Whether `feature` is a resource the square holds: anything but a `Watercourse`. */
export const isResource = (feature: TerrainFeature): boolean =>
  !(feature instanceof Watercourse);

export default isResource;
