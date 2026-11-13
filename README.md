# base-terrain-feature

What happens to a square's features when its terrain changes, and a marker for features that aren't resources. A
feature is bound to its `Terrain` instance, so when `Tile.setTerrain` swaps the terrain, core-world's
`TerrainChanged(tile, from, to)` rules decide what follows the square onto `to`.

- `lib/replaceFeatures`:
  - `replaceFeatures(terrainFeatureRegistry, replace)` is a `TerrainChanged` effect. `replace(features, to, from, tile)`
    returns the square's features on the new terrain, given the ones it had on the old one (it may register features
    itself and return none). The replacements are registered first, then every feature of the old terrain is
    unregistered.
  - `carryFeatures(terrainFeatureRegistry)` is the default: every feature is cloned onto the new terrain, in order.
- `lib/changesTerrain`: `changesTerrain(from, to)` is a `TerrainChanged` criterion that holds when the old terrain is
  one of the `from` types and the new one is one of the `to` types.
- `lib/Watercourse`: `Watercourse`, a `TerrainFeature` that water runs along (a river, for one) rather than a resource
  the square holds.
- `lib/isResource`: `isResource(feature)` is true for any feature but a `Watercourse`.

A library: it has no `main` and registers no rules. A ruleset registers its own `TerrainChanged` rules with these. See
`civ1-world` for Civilization's.
