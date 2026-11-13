import Terrain from '@civ-clone/core-terrain/Terrain';
import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import Watercourse from '../lib/Watercourse';
import { expect } from 'chai';
import isResource from '../lib/isResource';

class Stream extends Watercourse {}
class Ore extends TerrainFeature {}

describe('isResource', (): void => {
  it('is true for any feature but a Watercourse', (): void => {
    const terrain = new Terrain();

    expect(isResource(new Ore(terrain))).to.true;
    expect(isResource(new TerrainFeature(terrain))).to.true;
    expect(isResource(new Watercourse(terrain))).to.false;
    expect(isResource(new Stream(terrain))).to.false;
  });

  it('clones a Watercourse as the same type', (): void => {
    const terrain = new Terrain(),
      clone = new Stream(new Terrain()).clone(terrain);

    expect(clone).to.instanceof(Stream);
    expect(clone.terrain()).to.equal(terrain);
  });
});
