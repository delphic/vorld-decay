## Theme
Exploring sci-fi ruins / abandoned facilities.  

### Base Goals
Support drop in / drop out cooperative play.
Exploration w/ interesting traversal options.
  Verticality.

*Design Suggestion*:
You need to search for objects throughout the facility to enable progression.
The objects are usable multiple times so you help those that come after you.

Or perhaps there are 'puzzles' to solve, repairs to make, which hold for a given amount of time.

The ultimate goal might be to escape / progress to the next area, which requires multiple objects.

If we use teleporters, c.f. Environment Generation, we can use the mechanic of them having
power sources which are transferable, but clearly you can leave an area if there's no power source, so there's always an exit, players can't trap other players.

If we want to give a time limit to players they could require power cores themselves.

*Further Suggestion*:
If information (e.g. mapping info) was automatically gathered by players, if a player dies,
their corpse might contain useful information for their next play through and/or other players.

Simple version might be 'keys' (that aren't consumed), so rather than having to collect them
again you find the corpse and retrieve them, this also opens the possibility of sharing keys
with other players.

### Atmosphere
'Bugs' / Plant Growth
Machine Hums
Dark fog, some materials have lower simulated fog density and appear to glow.

### Stretch Goals
Environmental hazards beyond drops
Enemies and Basic Combat

## Environment Generation
We want loops in the environment but they're quite hard to actually generate, so
we have (multiple) teleporters between sections, which we use to make the loops.
Sections themselves then can be relatively sprawling.

We build sections with a modular room based approach w/ attach points defining valid
adjacent rooms. Rooms are pre-authored and can be different sizes, they'll have a
footprint which prevents addition of conflicting sections.
