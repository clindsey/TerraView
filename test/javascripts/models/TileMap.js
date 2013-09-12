if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/TileMap.js'] === 'undefined'){_$jscoverage['public/javascripts/models/TileMap.js']=[];
_$jscoverage['public/javascripts/models/TileMap.js'].source=['window.require.register("models/TileMap", function(require, module) {var HeightmapModel, Model, config, utils,',
'  __slice = [].slice;',
'',
'Model = require("models/base/Model");',
'',
'HeightmapModel = require("models/Heightmap");',
'',
'config = require("config");',
'',
'utils = require("lib/utils");',
'',
'module.exports = Model.extend("TileMapModel", {',
'  create: function(tileSourceModelName) {',
'    var tileMapModel;',
'    tileMapModel = this._super();',
'    tileMapModel.tileCache = [];',
'    tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);',
'    return tileMapModel;',
'  }',
'}, {',
'  collectNeighbors: function(worldX, worldY) {',
'    var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;',
'    xl = config.worldTileWidth;',
'    yl = config.worldTileHeight;',
'    cx = function(ox) {',
'      return utils.clamp(ox, xl);',
'    };',
'    cy = function(oy) {',
'      return utils.clamp(oy, yl);',
'    };',
'    n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));',
'    e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);',
'    s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));',
'    w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);',
'    ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));',
'    se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));',
'    sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));',
'    nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));',
'    return [n, e, s, w, ne, se, sw, nw];',
'  },',
'  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {',
'    var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;',
'    data = [];',
'    xOffset = Math.floor(sliceWidth / 2);',
'    yOffset = Math.floor(sliceHeight / 2);',
'    _results = [];',
'    for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      data[y] = [];',
'      _results.push((function() {',
'        var _j, _ref1, _results1;',
'        _results1 = [];',
'        for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'          worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);',
'          worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);',
'          _results1.push(data[y][x] = this.getTile(worldX, worldY));',
'        }',
'        return _results1;',
'      }).call(this));',
'    }',
'    return _results;',
'  },',
'  getCell: function() {',
'    var args, _ref;',
'    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];',
'    return (_ref = this.tileSourceModel).getCell.apply(_ref, args);',
'  },',
'  getTile: function(worldX, worldY) {',
'    var cell, index, neighbors, _base;',
'    if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {',
'      return this.tileCache[worldY][worldX];',
'    }',
'    cell = this.tileSourceModel.getCell(worldX, worldY);',
'    neighbors = this.collectNeighbors(worldX, worldY);',
'    index = this.getIndexByNeighbors(cell, neighbors);',
'    if ((_base = this.tileCache)[worldY] == null) {',
'      _base[worldY] = [];',
'    }',
'    return this.tileCache[worldY][worldX] = index;',
'  },',
'  getIndexByNeighbors: function(tileValue, neighbors) {',
'    var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;',
'    index = 0;',
'    n = neighbors[0];',
'    e = neighbors[1];',
'    s = neighbors[2];',
'    w = neighbors[3];',
'    ne = neighbors[4];',
'    se = neighbors[5];',
'    sw = neighbors[6];',
'    nw = neighbors[7];',
'    if (tileValue) {',
'      a = n << n * 4;',
'      b = e << e * 5;',
'      c = s << s * 6;',
'      d = w << w * 7;',
'      e = ne << ne * 0;',
'      f = se << se * 1;',
'      g = nw << nw * 3;',
'      h = sw << sw * 2;',
'      index = a + b + c + d + e + f + g + h;',
'    }',
'    return index;',
'  },',
'  dispose: function() {',
'    this.tileSourceModel.dispose();',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/TileMap.js'][49]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][1]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][47]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][1]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][60]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][6]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][4]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][64]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][10]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][8]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][65]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][16]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][12]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][14]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][15]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][69]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][22]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][17]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][18]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][73]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][29]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][24]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][28]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][23]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][26]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][25]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][75]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][33]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][31]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][32]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][81]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][42]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][35]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][34]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][36]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][37]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][38]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][39]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][85]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][46]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][45]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][43]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][44]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][88]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][57]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][50]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][54]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][53]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][52]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][51]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][48]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][55]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][93]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][63]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][94]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][74]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][68]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][70]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][72]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][97]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][76]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][98]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][84]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][83]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][82]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][78]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][100]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][86]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][91]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][92]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][89]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][90]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][87]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][95]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][96]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][99]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][102]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][105]=0;
_$jscoverage['public/javascripts/models/TileMap.js'][106]=0;
}_$jscoverage['public/javascripts/models/TileMap.js'][1]++;
window.require.register("models/TileMap", function(require, module) {_$jscoverage['public/javascripts/models/TileMap.js'][1]++;
var HeightmapModel, Model, config, utils,
  __slice = [].slice;

_$jscoverage['public/javascripts/models/TileMap.js'][4]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/TileMap.js'][6]++;
HeightmapModel = require("models/Heightmap");

_$jscoverage['public/javascripts/models/TileMap.js'][8]++;
config = require("config");

_$jscoverage['public/javascripts/models/TileMap.js'][10]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/models/TileMap.js'][12]++;
module.exports = Model.extend("TileMapModel", {
  create: function(tileSourceModelName) {
    _$jscoverage['public/javascripts/models/TileMap.js'][14]++;
var tileMapModel;
    _$jscoverage['public/javascripts/models/TileMap.js'][15]++;
tileMapModel = this._super();
    _$jscoverage['public/javascripts/models/TileMap.js'][16]++;
tileMapModel.tileCache = [];
    _$jscoverage['public/javascripts/models/TileMap.js'][17]++;
tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);
    _$jscoverage['public/javascripts/models/TileMap.js'][18]++;
return tileMapModel;
  }
}, {
  collectNeighbors: function(worldX, worldY) {
    _$jscoverage['public/javascripts/models/TileMap.js'][22]++;
var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;
    _$jscoverage['public/javascripts/models/TileMap.js'][23]++;
xl = config.worldTileWidth;
    _$jscoverage['public/javascripts/models/TileMap.js'][24]++;
yl = config.worldTileHeight;
    _$jscoverage['public/javascripts/models/TileMap.js'][25]++;
cx = function(ox) {
      _$jscoverage['public/javascripts/models/TileMap.js'][26]++;
return utils.clamp(ox, xl);
    };
    _$jscoverage['public/javascripts/models/TileMap.js'][28]++;
cy = function(oy) {
      _$jscoverage['public/javascripts/models/TileMap.js'][29]++;
return utils.clamp(oy, yl);
    };
    _$jscoverage['public/javascripts/models/TileMap.js'][31]++;
n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][32]++;
e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);
    _$jscoverage['public/javascripts/models/TileMap.js'][33]++;
s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][34]++;
w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);
    _$jscoverage['public/javascripts/models/TileMap.js'][35]++;
ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][36]++;
se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][37]++;
sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][38]++;
nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));
    _$jscoverage['public/javascripts/models/TileMap.js'][39]++;
return [n, e, s, w, ne, se, sw, nw];
  },
  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {
    _$jscoverage['public/javascripts/models/TileMap.js'][42]++;
var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;
    _$jscoverage['public/javascripts/models/TileMap.js'][43]++;
data = [];
    _$jscoverage['public/javascripts/models/TileMap.js'][44]++;
xOffset = Math.floor(sliceWidth / 2);
    _$jscoverage['public/javascripts/models/TileMap.js'][45]++;
yOffset = Math.floor(sliceHeight / 2);
    _$jscoverage['public/javascripts/models/TileMap.js'][46]++;
_results = [];
    _$jscoverage['public/javascripts/models/TileMap.js'][47]++;
for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/models/TileMap.js'][48]++;
data[y] = [];
      _$jscoverage['public/javascripts/models/TileMap.js'][49]++;
_results.push((function() {
        _$jscoverage['public/javascripts/models/TileMap.js'][50]++;
var _j, _ref1, _results1;
        _$jscoverage['public/javascripts/models/TileMap.js'][51]++;
_results1 = [];
        _$jscoverage['public/javascripts/models/TileMap.js'][52]++;
for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          _$jscoverage['public/javascripts/models/TileMap.js'][53]++;
worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);
          _$jscoverage['public/javascripts/models/TileMap.js'][54]++;
worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);
          _$jscoverage['public/javascripts/models/TileMap.js'][55]++;
_results1.push(data[y][x] = this.getTile(worldX, worldY));
        }
        _$jscoverage['public/javascripts/models/TileMap.js'][57]++;
return _results1;
      }).call(this));
    }
    _$jscoverage['public/javascripts/models/TileMap.js'][60]++;
return _results;
  },
  getCell: function() {
    _$jscoverage['public/javascripts/models/TileMap.js'][63]++;
var args, _ref;
    _$jscoverage['public/javascripts/models/TileMap.js'][64]++;
args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _$jscoverage['public/javascripts/models/TileMap.js'][65]++;
return (_ref = this.tileSourceModel).getCell.apply(_ref, args);
  },
  getTile: function(worldX, worldY) {
    _$jscoverage['public/javascripts/models/TileMap.js'][68]++;
var cell, index, neighbors, _base;
    _$jscoverage['public/javascripts/models/TileMap.js'][69]++;
if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {
      _$jscoverage['public/javascripts/models/TileMap.js'][70]++;
return this.tileCache[worldY][worldX];
    }
    _$jscoverage['public/javascripts/models/TileMap.js'][72]++;
cell = this.tileSourceModel.getCell(worldX, worldY);
    _$jscoverage['public/javascripts/models/TileMap.js'][73]++;
neighbors = this.collectNeighbors(worldX, worldY);
    _$jscoverage['public/javascripts/models/TileMap.js'][74]++;
index = this.getIndexByNeighbors(cell, neighbors);
    _$jscoverage['public/javascripts/models/TileMap.js'][75]++;
if ((_base = this.tileCache)[worldY] == null) {
      _$jscoverage['public/javascripts/models/TileMap.js'][76]++;
_base[worldY] = [];
    }
    _$jscoverage['public/javascripts/models/TileMap.js'][78]++;
return this.tileCache[worldY][worldX] = index;
  },
  getIndexByNeighbors: function(tileValue, neighbors) {
    _$jscoverage['public/javascripts/models/TileMap.js'][81]++;
var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;
    _$jscoverage['public/javascripts/models/TileMap.js'][82]++;
index = 0;
    _$jscoverage['public/javascripts/models/TileMap.js'][83]++;
n = neighbors[0];
    _$jscoverage['public/javascripts/models/TileMap.js'][84]++;
e = neighbors[1];
    _$jscoverage['public/javascripts/models/TileMap.js'][85]++;
s = neighbors[2];
    _$jscoverage['public/javascripts/models/TileMap.js'][86]++;
w = neighbors[3];
    _$jscoverage['public/javascripts/models/TileMap.js'][87]++;
ne = neighbors[4];
    _$jscoverage['public/javascripts/models/TileMap.js'][88]++;
se = neighbors[5];
    _$jscoverage['public/javascripts/models/TileMap.js'][89]++;
sw = neighbors[6];
    _$jscoverage['public/javascripts/models/TileMap.js'][90]++;
nw = neighbors[7];
    _$jscoverage['public/javascripts/models/TileMap.js'][91]++;
if (tileValue) {
      _$jscoverage['public/javascripts/models/TileMap.js'][92]++;
a = n << n * 4;
      _$jscoverage['public/javascripts/models/TileMap.js'][93]++;
b = e << e * 5;
      _$jscoverage['public/javascripts/models/TileMap.js'][94]++;
c = s << s * 6;
      _$jscoverage['public/javascripts/models/TileMap.js'][95]++;
d = w << w * 7;
      _$jscoverage['public/javascripts/models/TileMap.js'][96]++;
e = ne << ne * 0;
      _$jscoverage['public/javascripts/models/TileMap.js'][97]++;
f = se << se * 1;
      _$jscoverage['public/javascripts/models/TileMap.js'][98]++;
g = nw << nw * 3;
      _$jscoverage['public/javascripts/models/TileMap.js'][99]++;
h = sw << sw * 2;
      _$jscoverage['public/javascripts/models/TileMap.js'][100]++;
index = a + b + c + d + e + f + g + h;
    }
    _$jscoverage['public/javascripts/models/TileMap.js'][102]++;
return index;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/models/TileMap.js'][105]++;
this.tileSourceModel.dispose();
    _$jscoverage['public/javascripts/models/TileMap.js'][106]++;
return this._super();
  }
});
});
