# Configuration options, where world attributes are set.

module.exports = config =
  # The seed serves as the base for random numbers generated, it will determine the shape of the world.
  seed: +new Date

  # The session seed is a running base for random numbers during a session, it will determine the way creatures behave.
  sessionSeed: +new Date

  # Change the seed values to static numbers to cause the simulation to run deterministically.

  # Sprite sheet image to use, it will be cached.
  spriteSheetSource: "images/tileset_terra.png"

  # Spritesheet tile dimensions in pixels.
  tileWidth: 16
  tileHeight: 16

  # The following values will determine the dimensions of the world.

  # Number of chunk clusters in the world. Increase this number to make the world larger.
  worldChunkWidth: 8
  worldChunkHeight: 8

  # Cluster dimensions in tiles. Increase this number to make islands and oceans larger.
  chunkWidth: 10
  chunkHeight: 10

  maxElevation: 10

# The world's absolute size in tiles.
config.worldTileWidth = config.worldChunkWidth * config.chunkWidth
config.worldTileHeight = config.worldChunkHeight * config.chunkHeight
