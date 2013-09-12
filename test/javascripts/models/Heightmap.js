if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/Heightmap.js'] === 'undefined'){_$jscoverage['public/javascripts/models/Heightmap.js']=[];
_$jscoverage['public/javascripts/models/Heightmap.js'].source=['window.require.register("models/Heightmap", function(require, module) {var HeightmapChunkModel, Model, config, utils;',
'',
'Model = require("models/base/Model");',
'',
'utils = require("lib/utils");',
'',
'HeightmapChunkModel = require("models/HeightmapChunk");',
'',
'config = require("config");',
'',
'module.exports = Model.extend("HeightmapModel", {',
'  create: function(seed) {',
'    var heightmapModel;',
'    heightmapModel = this._super();',
'    heightmapModel.seed = seed;',
'    heightmapModel.chunkCache = [];',
'    return heightmapModel;',
'  }',
'}, {',
'  getCell: function(worldX, worldY) {',
'    var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;',
'    worldChunkX = Math.floor(worldX / config.chunkWidth);',
'    worldChunkY = Math.floor(worldY / config.chunkHeight);',
'    chunkX = worldX % config.chunkWidth;',
'    chunkY = worldY % config.chunkHeight;',
'    chunk = this.getChunk(worldChunkX, worldChunkY);',
'    heightmap = [];',
'    heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);',
'    return heightmapData[chunkY][chunkX];',
'  },',
'  getChunk: function(worldChunkX, worldChunkY) {',
'    var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base;',
'    if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {',
'      return this.chunkCache[worldChunkY][worldChunkX];',
'    }',
'    worldTileWidth = config.worldTileWidth;',
'    worldTileHeight = config.worldTileHeight;',
'    worldChunkWidth = config.worldChunkWidth;',
'    worldChunkHeight = config.worldChunkHeight;',
'    chunkWidth = config.chunkWidth;',
'    chunkHeight = config.chunkHeight;',
'    maxElevation = config.maxElevation;',
'    seed = this.seed;',
'    nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;',
'    if (worldChunkX + 1 === worldChunkWidth) {',
'      ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;',
'    } else {',
'      ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;',
'    }',
'    if (worldChunkY + 1 === worldChunkWidth) {',
'      sw = utils.random(worldChunkX + seed) * maxElevation;',
'      if (worldChunkX + 1 === worldChunkHeight) {',
'        se = utils.random(seed) * maxElevation;',
'      } else {',
'        se = utils.random(worldChunkX + 1 + seed) * maxElevation;',
'      }',
'    } else {',
'      sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;',
'      if (worldChunkX + 1 === worldChunkWidth) {',
'        se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;',
'      } else {',
'        se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;',
'      }',
'    }',
'    if ((_base = this.chunkCache)[worldChunkY] == null) {',
'      _base[worldChunkY] = [];',
'    }',
'    return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);',
'  },',
'  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {',
'    var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;',
'    maxElevation = config.maxElevation;',
'    _results = [];',
'    for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {',
'      cellRow = cells[cy];',
'      _results.push((function() {',
'        var _j, _len1, _results1;',
'        _results1 = [];',
'        for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {',
'          cell = cellRow[cx];',
'          yIndex = cy + (worldChunkY * cells.length);',
'          xIndex = cx + (worldChunkX * cellRow.length);',
'          if (heightmap[yIndex] == null) {',
'            heightmap[yIndex] = [];',
'          }',
'          _results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));',
'        }',
'        return _results1;',
'      })());',
'    }',
'    return _results;',
'  },',
'  dispose: function() {',
'    _.each(this.chunkCache, function(chunkCacheRow) {',
'      return _.each(chunkCacheRow, function(chunkModel) {',
'        if (chunkModel != null) {',
'          return chunkModel.dispose();',
'        }',
'      });',
'    });',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/Heightmap.js'][53]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][1]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][55]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][1]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][52]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][5]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][3]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][58]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][9]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][7]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][62]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][15]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][11]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][13]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][14]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][50]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][21]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][16]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][17]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][65]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][26]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][23]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][22]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][24]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][25]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][72]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][32]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][27]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][28]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][29]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][77]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][39]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][33]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][34]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][36]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][38]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][37]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][81]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][43]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][42]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][40]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][41]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][83]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][44]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][86]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][45]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][79]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][59]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][48]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][51]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][46]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][76]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][71]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][60]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][68]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][66]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][97]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][78]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][75]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][73]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][74]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][80]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][82]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][84]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][88]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][91]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][94]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][95]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][96]=0;
_$jscoverage['public/javascripts/models/Heightmap.js'][101]=0;
}_$jscoverage['public/javascripts/models/Heightmap.js'][1]++;
window.require.register("models/Heightmap", function(require, module) {_$jscoverage['public/javascripts/models/Heightmap.js'][1]++;
var HeightmapChunkModel, Model, config, utils;

_$jscoverage['public/javascripts/models/Heightmap.js'][3]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/Heightmap.js'][5]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/models/Heightmap.js'][7]++;
HeightmapChunkModel = require("models/HeightmapChunk");

_$jscoverage['public/javascripts/models/Heightmap.js'][9]++;
config = require("config");

_$jscoverage['public/javascripts/models/Heightmap.js'][11]++;
module.exports = Model.extend("HeightmapModel", {
  create: function(seed) {
    _$jscoverage['public/javascripts/models/Heightmap.js'][13]++;
var heightmapModel;
    _$jscoverage['public/javascripts/models/Heightmap.js'][14]++;
heightmapModel = this._super();
    _$jscoverage['public/javascripts/models/Heightmap.js'][15]++;
heightmapModel.seed = seed;
    _$jscoverage['public/javascripts/models/Heightmap.js'][16]++;
heightmapModel.chunkCache = [];
    _$jscoverage['public/javascripts/models/Heightmap.js'][17]++;
return heightmapModel;
  }
}, {
  getCell: function(worldX, worldY) {
    _$jscoverage['public/javascripts/models/Heightmap.js'][21]++;
var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;
    _$jscoverage['public/javascripts/models/Heightmap.js'][22]++;
worldChunkX = Math.floor(worldX / config.chunkWidth);
    _$jscoverage['public/javascripts/models/Heightmap.js'][23]++;
worldChunkY = Math.floor(worldY / config.chunkHeight);
    _$jscoverage['public/javascripts/models/Heightmap.js'][24]++;
chunkX = worldX % config.chunkWidth;
    _$jscoverage['public/javascripts/models/Heightmap.js'][25]++;
chunkY = worldY % config.chunkHeight;
    _$jscoverage['public/javascripts/models/Heightmap.js'][26]++;
chunk = this.getChunk(worldChunkX, worldChunkY);
    _$jscoverage['public/javascripts/models/Heightmap.js'][27]++;
heightmap = [];
    _$jscoverage['public/javascripts/models/Heightmap.js'][28]++;
heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);
    _$jscoverage['public/javascripts/models/Heightmap.js'][29]++;
return heightmapData[chunkY][chunkX];
  },
  getChunk: function(worldChunkX, worldChunkY) {
    _$jscoverage['public/javascripts/models/Heightmap.js'][32]++;
var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base;
    _$jscoverage['public/javascripts/models/Heightmap.js'][33]++;
if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][34]++;
return this.chunkCache[worldChunkY][worldChunkX];
    }
    _$jscoverage['public/javascripts/models/Heightmap.js'][36]++;
worldTileWidth = config.worldTileWidth;
    _$jscoverage['public/javascripts/models/Heightmap.js'][37]++;
worldTileHeight = config.worldTileHeight;
    _$jscoverage['public/javascripts/models/Heightmap.js'][38]++;
worldChunkWidth = config.worldChunkWidth;
    _$jscoverage['public/javascripts/models/Heightmap.js'][39]++;
worldChunkHeight = config.worldChunkHeight;
    _$jscoverage['public/javascripts/models/Heightmap.js'][40]++;
chunkWidth = config.chunkWidth;
    _$jscoverage['public/javascripts/models/Heightmap.js'][41]++;
chunkHeight = config.chunkHeight;
    _$jscoverage['public/javascripts/models/Heightmap.js'][42]++;
maxElevation = config.maxElevation;
    _$jscoverage['public/javascripts/models/Heightmap.js'][43]++;
seed = this.seed;
    _$jscoverage['public/javascripts/models/Heightmap.js'][44]++;
nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;
    _$jscoverage['public/javascripts/models/Heightmap.js'][45]++;
if (worldChunkX + 1 === worldChunkWidth) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][46]++;
ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;
    } else {
      _$jscoverage['public/javascripts/models/Heightmap.js'][48]++;
ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
    }
    _$jscoverage['public/javascripts/models/Heightmap.js'][50]++;
if (worldChunkY + 1 === worldChunkWidth) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][51]++;
sw = utils.random(worldChunkX + seed) * maxElevation;
      _$jscoverage['public/javascripts/models/Heightmap.js'][52]++;
if (worldChunkX + 1 === worldChunkHeight) {
        _$jscoverage['public/javascripts/models/Heightmap.js'][53]++;
se = utils.random(seed) * maxElevation;
      } else {
        _$jscoverage['public/javascripts/models/Heightmap.js'][55]++;
se = utils.random(worldChunkX + 1 + seed) * maxElevation;
      }
    } else {
      _$jscoverage['public/javascripts/models/Heightmap.js'][58]++;
sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      _$jscoverage['public/javascripts/models/Heightmap.js'][59]++;
if (worldChunkX + 1 === worldChunkWidth) {
        _$jscoverage['public/javascripts/models/Heightmap.js'][60]++;
se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      } else {
        _$jscoverage['public/javascripts/models/Heightmap.js'][62]++;
se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
      }
    }
    _$jscoverage['public/javascripts/models/Heightmap.js'][65]++;
if ((_base = this.chunkCache)[worldChunkY] == null) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][66]++;
_base[worldChunkY] = [];
    }
    _$jscoverage['public/javascripts/models/Heightmap.js'][68]++;
return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);
  },
  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {
    _$jscoverage['public/javascripts/models/Heightmap.js'][71]++;
var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;
    _$jscoverage['public/javascripts/models/Heightmap.js'][72]++;
maxElevation = config.maxElevation;
    _$jscoverage['public/javascripts/models/Heightmap.js'][73]++;
_results = [];
    _$jscoverage['public/javascripts/models/Heightmap.js'][74]++;
for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][75]++;
cellRow = cells[cy];
      _$jscoverage['public/javascripts/models/Heightmap.js'][76]++;
_results.push((function() {
        _$jscoverage['public/javascripts/models/Heightmap.js'][77]++;
var _j, _len1, _results1;
        _$jscoverage['public/javascripts/models/Heightmap.js'][78]++;
_results1 = [];
        _$jscoverage['public/javascripts/models/Heightmap.js'][79]++;
for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {
          _$jscoverage['public/javascripts/models/Heightmap.js'][80]++;
cell = cellRow[cx];
          _$jscoverage['public/javascripts/models/Heightmap.js'][81]++;
yIndex = cy + (worldChunkY * cells.length);
          _$jscoverage['public/javascripts/models/Heightmap.js'][82]++;
xIndex = cx + (worldChunkX * cellRow.length);
          _$jscoverage['public/javascripts/models/Heightmap.js'][83]++;
if (heightmap[yIndex] == null) {
            _$jscoverage['public/javascripts/models/Heightmap.js'][84]++;
heightmap[yIndex] = [];
          }
          _$jscoverage['public/javascripts/models/Heightmap.js'][86]++;
_results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));
        }
        _$jscoverage['public/javascripts/models/Heightmap.js'][88]++;
return _results1;
      })());
    }
    _$jscoverage['public/javascripts/models/Heightmap.js'][91]++;
return _results;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/models/Heightmap.js'][94]++;
_.each(this.chunkCache, function(chunkCacheRow) {
      _$jscoverage['public/javascripts/models/Heightmap.js'][95]++;
return _.each(chunkCacheRow, function(chunkModel) {
        _$jscoverage['public/javascripts/models/Heightmap.js'][96]++;
if (chunkModel != null) {
          _$jscoverage['public/javascripts/models/Heightmap.js'][97]++;
return chunkModel.dispose();
        }
      });
    });
    _$jscoverage['public/javascripts/models/Heightmap.js'][101]++;
return this._super();
  }
});
});
