window.require.register("models/TileMap", function(require, module) {var HeightmapModel, Model, config, utils,
  __slice = [].slice;

Model = require("models/base/Model");

HeightmapModel = require("models/Heightmap");

config = require("config");

utils = require("lib/utils");

module.exports = Model.extend("TileMapModel", {
  create: function(tileSourceModelName) {
    var tileMapModel;
    tileMapModel = this._super();
    tileMapModel.tileCache = [];
    tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);
    return tileMapModel;
  }
}, {
  collectNeighbors: function(worldX, worldY) {
    var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;
    xl = config.worldTileWidth;
    yl = config.worldTileHeight;
    cx = function(ox) {
      return utils.clamp(ox, xl);
    };
    cy = function(oy) {
      return utils.clamp(oy, yl);
    };
    n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));
    e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);
    s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));
    w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);
    ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));
    se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));
    sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));
    nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));
    return [n, e, s, w, ne, se, sw, nw];
  },
  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {
    var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;
    data = [];
    xOffset = Math.floor(sliceWidth / 2);
    yOffset = Math.floor(sliceHeight / 2);
    _results = [];
    for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      data[y] = [];
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);
          worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);
          _results1.push(data[y][x] = this.getTile(worldX, worldY));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  },
  getCell: function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = this.tileSourceModel).getCell.apply(_ref, args);
  },
  getTile: function(worldX, worldY) {
    var cell, index, neighbors, _base;
    if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {
      return this.tileCache[worldY][worldX];
    }
    cell = this.tileSourceModel.getCell(worldX, worldY);
    neighbors = this.collectNeighbors(worldX, worldY);
    index = this.getIndexByNeighbors(cell, neighbors);
    if ((_base = this.tileCache)[worldY] == null) {
      _base[worldY] = [];
    }
    return this.tileCache[worldY][worldX] = index;
  },
  getIndexByNeighbors: function(tileValue, neighbors) {
    var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;
    index = 0;
    n = neighbors[0];
    e = neighbors[1];
    s = neighbors[2];
    w = neighbors[3];
    ne = neighbors[4];
    se = neighbors[5];
    sw = neighbors[6];
    nw = neighbors[7];
    if (tileValue) {
      a = n << n * 4;
      b = e << e * 5;
      c = s << s * 6;
      d = w << w * 7;
      e = ne << ne * 0;
      f = se << se * 1;
      g = nw << nw * 3;
      h = sw << sw * 2;
      index = a + b + c + d + e + f + g + h;
    }
    return index;
  },
  dispose: function() {
    this.tileSourceModel.dispose();
    return this._super();
  }
});
});
