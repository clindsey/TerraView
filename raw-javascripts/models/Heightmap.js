var HeightmapChunkModel, Model, config, utils;

Model = require("models/base/Model");

utils = require("lib/utils");

HeightmapChunkModel = require("models/HeightmapChunk");

config = require("config");

module.exports = Model.extend("HeightmapModel", {
  create: function(seed) {
    var heightmapModel;
    heightmapModel = this._super();
    heightmapModel.seed = seed;
    heightmapModel.chunkCache = [];
    return heightmapModel;
  }
}, {
  getCell: function(worldX, worldY) {
    var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;
    worldChunkX = Math.floor(worldX / config.chunkWidth);
    worldChunkY = Math.floor(worldY / config.chunkHeight);
    chunkX = worldX % config.chunkWidth;
    chunkY = worldY % config.chunkHeight;
    chunk = this.getChunk(worldChunkX, worldChunkY);
    heightmap = [];
    heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);
    return heightmapData[chunkY][chunkX];
  },
  getChunk: function(worldChunkX, worldChunkY) {
    var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base;
    if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {
      return this.chunkCache[worldChunkY][worldChunkX];
    }
    worldTileWidth = config.worldTileWidth;
    worldTileHeight = config.worldTileHeight;
    worldChunkWidth = config.worldChunkWidth;
    worldChunkHeight = config.worldChunkHeight;
    chunkWidth = config.chunkWidth;
    chunkHeight = config.chunkHeight;
    maxElevation = config.maxElevation;
    seed = this.seed;
    nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;
    if (worldChunkX + 1 === worldChunkWidth) {
      ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;
    } else {
      ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
    }
    if (worldChunkY + 1 === worldChunkWidth) {
      sw = utils.random(worldChunkX + seed) * maxElevation;
      if (worldChunkX + 1 === worldChunkHeight) {
        se = utils.random(seed) * maxElevation;
      } else {
        se = utils.random(worldChunkX + 1 + seed) * maxElevation;
      }
    } else {
      sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      if (worldChunkX + 1 === worldChunkWidth) {
        se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      } else {
        se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
      }
    }
    if ((_base = this.chunkCache)[worldChunkY] == null) {
      _base[worldChunkY] = [];
    }
    return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);
  },
  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {
    var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;
    maxElevation = config.maxElevation;
    _results = [];
    for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {
      cellRow = cells[cy];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {
          cell = cellRow[cx];
          yIndex = cy + (worldChunkY * cells.length);
          xIndex = cx + (worldChunkX * cellRow.length);
          if (heightmap[yIndex] == null) {
            heightmap[yIndex] = [];
          }
          _results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));
        }
        return _results1;
      })());
    }
    return _results;
  },
  dispose: function() {
    _.each(this.chunkCache, function(chunkCacheRow) {
      return _.each(chunkCacheRow, function(chunkModel) {
        if (chunkModel != null) {
          return chunkModel.dispose();
        }
      });
    });
    return this._super();
  }
});
