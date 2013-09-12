TerraView
===

[View the Demo here](http://clindsey.github.io/TerraView/).

A procedurally generated planet with simple critters, rendered on canvas.

Built with coffeescript on grunt, using gamecore.js and easel.

Usage
=====

* `make install` - npm and bower installs
* `make test` - runs mocha tests, generates instrumented scripts
* `make live` - serves the page on port `3333`, rebuilds and runs tests when files have changed
* `open http://localhost:3333/` - view the code running in the browser
* `open http://localhost:3333/test` - run tests in browser and view coverage report
* `open http://localhost:3333/docs/` - code documentation

Description
=====

##### Overview

This is a  method of procedural content generation to create a landscape with bodies of land and water.
The world will is explorable through a viewport.
The world has no edges, everything wraps to the other side and appears seamless.
The world will also be inhabited by creatures that wander around.

##### Technology Used

* gamecore.js - adds object pools and factories
* PRNG - a seed random number generator
* HTML5 canvas - the display platform
* easel.js - a graphics library
* grunt - the build tool used for this project
* coffeescript - the programming language used in this simulation
* mocha, chai, sinon.js, blanket.js - the tools used in testing
* docco - documentation generator

Details
=====

##### Heightmaps

The landscape is created by generating a cluster of heightmap chunks and stitching them together.
A heightmap can be as simple as a 2-dimensional array of numbers, where each value represents a height in a field.
A general quality of these cell values is that they gradually change heights across the field, forming smooth slopes.

Once a heightmap field is generated, cells can then be converted to walkable/nonwalkable flags by referencing their value to an arbitrary threshold.
The walkable areas are treated as land and the nonwalkable areas are treated as water. 

Heightmap Chunks are segments that form the parent Heightmap.
A chunk only needs to be told its' corner values to be created; the remaining intermediate points can then be discovered using bilinear interpolation.
Chunks are then stitched together and their corner values overlay with their neighbors.
Values are determined using the x/y position of the chunk and a PRNG with a seed value.

The Heightmap is made to lazy load content, only generating portions of itself as they're requested.
Future requests for discovered tiles will not need to be computed as they will be stored and served from a cache.
This has allowed for very large worlds with minimal memory footprint; as the world is explored and cached, the memory usage will increase until the entire world has been cached.

Using the TileMap, a rectangular portion of the heightmap can be retrieved.
If the boundaries of this rectangle go outside of the dimensions of the heightmap, the reference indices will be wrapped to the opposite edge.
This makes the world seamless and without edges even though it is actually a rectangle.

##### Tiles

A spritesheet image exists with all possible land tile configurations.
In this simulation, there are only 2 types of tile (land and water) and each will have 8 neighbors; there will be a total of 256 (2^8) tiles.

A spritesheet tile index is picked by referencing the heightmap cell value at a certain location, checking whether if it's land or water, checking it's neighbors to see whether they are land or water, then using a bitmask to compute the x/y position of the tile in the spritesheet.
[More info about bitmasks here](http://www.angryfishstudios.com/2011/04/adventures-in-bitmasking/).

If the target we're trying to find a tile for is water, we simply set the spritesheet index to be 0, since water doesn't connect to other water in any special way.

Land will be a different case, since land can connect to each other in many different ways.

##### Rendering the World

To actually draw the world on the screen, Viewport is used.
The viewport is responsible for creating the tile display objects and keeping track of where on the world we're currently looking.
As the viewport moves, the display tiles update their spritesheet indices; no tiles are created or destroyed, just their spritesheet indices are updated.

##### Adding Inhabitants

The world can be inhabited by creatures that can sense their environment.
In this simulation, the creatures are extremely simple and only demonstrate the basics of the concept.
An EntityManager causes all creatures to update some frequency.
The creatures will position themselves on the world based on the viewport, to handle wrapping around the world.
