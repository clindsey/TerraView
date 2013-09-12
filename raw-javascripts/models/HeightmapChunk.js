var Model,
  __slice = [].slice;

Model = require("models/base/Model");

module.exports = Model.extend("HeightmapChunkModel", {
  create: function() {
    var args, model;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    model = this._super();
    model.cells = this.bilinearInterpolate.apply(this, args);
    return model;
  },
  bilinearInterpolate: function(nw, ne, se, sw, width, height) {
    var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;
    xLookup = [];
    cells = [];
    for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      cells[y] = [];
      yStep = y / (height - 1);
      for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        if (xLookup[x] != null) {
          xStep = xLookup[x];
        } else {
          xStep = xLookup[x] = x / (width - 1);
        }
        topHeight = nw + xStep * (ne - nw);
        bottomHeight = sw + xStep * (se - sw);
        cellHeight = topHeight + yStep * (bottomHeight - topHeight);
        cells[y][x] = Math.floor(cellHeight);
      }
    }
    return cells;
  }
}, {
  dispose: function() {
    return this._super();
  }
});
