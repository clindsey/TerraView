window.require.register("config", function(require, module) {var config;

module.exports = config = {
  seed: +(new Date),
  sessionSeed: +(new Date),
  spriteSheetSource: "images/tileset_terra.png",
  tileWidth: 16,
  tileHeight: 16,
  worldChunkWidth: 8,
  worldChunkHeight: 8,
  chunkWidth: 10,
  chunkHeight: 10,
  maxElevation: 10
};

config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;

config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;
});
