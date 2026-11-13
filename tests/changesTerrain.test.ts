import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';
import changesTerrain from '../lib/changesTerrain';
import { expect } from 'chai';

class Wet extends Terrain {}
class Marsh extends Wet {}
class Dry extends Terrain {}
class Sand extends Terrain {}

describe('changesTerrain', (): void => {
  const tile = null as unknown as Tile;

  it('holds when the old terrain is one of `from` and the new one is one of `to`', (): void => {
    const criterion = changesTerrain([Wet, Sand], [Dry]);

    expect(criterion(tile, new Wet(), new Dry())).to.true;
    expect(criterion(tile, new Marsh(), new Dry())).to.true;
    expect(criterion(tile, new Sand(), new Dry())).to.true;
    expect(criterion(tile, new Dry(), new Dry())).to.false;
    expect(criterion(tile, new Wet(), new Sand())).to.false;
    expect(criterion(tile, new Dry(), new Wet())).to.false;
  });

  it('never holds for an empty list', (): void => {
    expect(changesTerrain([], [Dry])(tile, new Wet(), new Dry())).to.false;
    expect(changesTerrain([Wet], [])(tile, new Wet(), new Dry())).to.false;
  });
});
