import AvailableTerrainFeatureRegistry from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import Created from '@civ-clone/core-terrain/Rules/Created';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Feature from '@civ-clone/core-terrain-feature/Rules/Feature';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Terrain from '@civ-clone/core-terrain/Terrain';
import TerrainFeature from '@civ-clone/core-terrain-feature/TerrainFeature';
import TerrainFeatureRegistry from '@civ-clone/core-terrain-feature/TerrainFeatureRegistry';
import { expect } from 'chai';
import placeFeatures from '../lib/placeFeatures';

class Wet extends Terrain {}
class Dry extends Terrain {}
class Ore extends TerrainFeature {}
class Fruit extends TerrainFeature {}
class Stream extends TerrainFeature {}

describe('placeFeatures', (): void => {
  it('gives a new terrain what its Feature rules allow, feature by feature in the available order', (): void => {
    const ruleRegistry = new RuleRegistry(),
      available = new AvailableTerrainFeatureRegistry(),
      features = new TerrainFeatureRegistry(),
      asked: string[] = [],
      rule = (
        FeatureType: typeof TerrainFeature,
        TerrainType: typeof Terrain
      ) =>
        new Feature(
          new Criterion((Type: typeof TerrainFeature): boolean => {
            asked.push(`${Type.name}?${FeatureType.name}`);

            return Type === FeatureType;
          }),
          new Criterion(
            (Type: typeof TerrainFeature, terrain: Terrain): boolean =>
              terrain instanceof TerrainType
          ),
          new Effect((Type: typeof TerrainFeature, terrain: Terrain): void =>
            features.register(new Type(terrain))
          )
        );

    // Stream is available but has no rule: nothing places it.
    available.register(Fruit, Ore, Stream);

    ruleRegistry.register(
      rule(Ore, Wet),
      rule(Fruit, Wet),
      rule(Fruit, Dry),
      new Created(new Effect(placeFeatures(ruleRegistry, available)))
    );

    const wet = new Wet(ruleRegistry),
      dry = new Dry(ruleRegistry);

    expect(
      features
        .getByTerrain(wet)
        .map((feature: TerrainFeature) => feature.constructor.name)
    ).to.deep.equal(['Fruit', 'Ore']);
    expect(
      features
        .getByTerrain(dry)
        .map((feature: TerrainFeature) => feature.constructor.name)
    ).to.deep.equal(['Fruit']);
    // Every rule is asked about each available feature, in the registry's order.
    expect(asked.slice(0, 9)).to.deep.equal([
      'Fruit?Ore',
      'Fruit?Fruit',
      'Fruit?Fruit',
      'Ore?Ore',
      'Ore?Fruit',
      'Ore?Fruit',
      'Stream?Ore',
      'Stream?Fruit',
      'Stream?Fruit',
    ]);
  });
});
