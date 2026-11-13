import { carryFeatures, replaceFeatures } from '../lib/replaceFeatures';
import Terrain from '@civ-clone/core-terrain/Terrain';
import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import TerrainFeatureRegistry from '@civ-clone/core-terrain-feature/TerrainFeatureRegistry';
import Tile from '@civ-clone/core-world/Tile';
import { expect } from 'chai';

class Wet extends Terrain {}
class Dry extends Terrain {}
class Ore extends TerrainFeature {}
class Fruit extends TerrainFeature {}
class Stone extends TerrainFeature {}

const tile = null as unknown as Tile;

const setUp = (): [
  TerrainFeatureRegistry,
  Terrain,
  Terrain,
  TerrainFeature,
  TerrainFeature
] => {
  const registry = new TerrainFeatureRegistry(),
    elsewhere = new Dry(),
    from = new Wet(),
    before = new Stone(elsewhere),
    after = new Stone(elsewhere);

  registry.register(before, new Ore(from), new Fruit(from), after);

  return [registry, from, new Dry(), before, after];
};

const describeEntries = (
  registry: TerrainFeatureRegistry,
  to: Terrain
): string[] =>
  registry
    .entries()
    .map(
      (feature: TerrainFeature): string =>
        feature.constructor.name + (feature.terrain() === to ? ' (to)' : '')
    );

describe('replaceFeatures', (): void => {
  it('registers the replacements, then unregisters every old feature', (): void => {
    const [registry, from, to] = setUp(),
      calls: unknown[][] = [];

    replaceFeatures(registry, (features, newTerrain, oldTerrain, changed) => {
      calls.push([
        features.map((feature) => feature.constructor.name),
        newTerrain === to,
        oldTerrain === from,
        changed === tile,
        // The old features are still registered while the replacer runs.
        registry.getByTerrain(from).length,
      ]);

      return [new Fruit(newTerrain)];
    })(tile, from, to);

    expect(calls).to.deep.equal([[['Ore', 'Fruit'], true, true, true, 2]]);
    expect(describeEntries(registry, to)).to.deep.equal([
      'Stone',
      'Stone',
      'Fruit (to)',
    ]);
    expect(registry.getByTerrain(from)).to.deep.equal([]);
  });

  it('registers the replacements before unregistering the old features', (): void => {
    const [registry, from, to] = setUp(),
      order: string[] = [],
      register = registry.register.bind(registry),
      unregister = registry.unregister.bind(registry);

    registry.register = (...features: TerrainFeature[]): void => {
      order.push('register ' + features.length);
      register(...features);
    };
    registry.unregister = (...features: TerrainFeature[]): void => {
      order.push('unregister ' + features.length);
      unregister(...features);
    };

    replaceFeatures(registry, (features, newTerrain) => [
      new Ore(newTerrain),
      new Fruit(newTerrain),
    ])(tile, from, to);

    expect(order).to.deep.equal(['register 2', 'unregister 2']);
    expect(describeEntries(registry, to)).to.deep.equal([
      'Stone',
      'Stone',
      'Ore (to)',
      'Fruit (to)',
    ]);
  });

  it("doesn't call `register` when there are no replacements", (): void => {
    const [registry, from, to] = setUp();
    let registered = 0;

    const register = registry.register.bind(registry);

    registry.register = (...features: TerrainFeature[]): void => {
      registered++;
      register(...features);
    };

    replaceFeatures(registry, () => [])(tile, from, to);

    expect(registered).to.equal(0);
    expect(describeEntries(registry, to)).to.deep.equal(['Stone', 'Stone']);
  });

  it('keeps what the replacer registered itself', (): void => {
    const [registry, from, to] = setUp();

    replaceFeatures(registry, (features, newTerrain) => {
      registry.register(new Stone(newTerrain));

      return [];
    })(tile, from, to);

    expect(describeEntries(registry, to)).to.deep.equal([
      'Stone',
      'Stone',
      'Stone (to)',
    ]);
  });

  it('works with no old features', (): void => {
    const registry = new TerrainFeatureRegistry(),
      from = new Wet(),
      to = new Dry();

    replaceFeatures(registry, (features, newTerrain) =>
      features.length === 0 ? [new Ore(newTerrain)] : []
    )(tile, from, to);

    expect(describeEntries(registry, to)).to.deep.equal(['Ore (to)']);
  });
});

describe('carryFeatures', (): void => {
  it('moves every feature onto the new terrain, in order, as the same types', (): void => {
    const [registry, from, to, before, after] = setUp(),
      old = registry.getByTerrain(from);

    carryFeatures(registry)(tile, from, to);

    const carried = registry.getByTerrain(to);

    expect(carried.map((feature) => feature.constructor)).to.deep.equal([
      Ore,
      Fruit,
    ]);
    expect(carried.some((feature) => old.includes(feature))).to.false;
    expect(registry.getByTerrain(from)).to.deep.equal([]);
    expect(registry.entries()).to.deep.equal([before, after, ...carried]);
  });
});
