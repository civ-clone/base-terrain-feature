import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
/**
 * A feature that water runs along (a river, for one), as opposed to a resource
 * that a square happens to hold. It sits alongside a resource rather than
 * standing in for one, so code that means "the square's resource" asks
 * `isResource`.
 */
export declare class Watercourse extends TerrainFeature {}
export default Watercourse;
