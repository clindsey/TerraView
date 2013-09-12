if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/HeightmapChunk.js'] === 'undefined'){_$jscoverage['public/javascripts/models/HeightmapChunk.js']=[];
_$jscoverage['public/javascripts/models/HeightmapChunk.js'].source=['window.require.register("models/HeightmapChunk", function(require, module) {var Model,',
'  __slice = [].slice;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("HeightmapChunkModel", {',
'  create: function() {',
'    var args, model;',
'    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];',
'    model = this._super();',
'    model.cells = this.bilinearInterpolate.apply(this, args);',
'    return model;',
'  },',
'  bilinearInterpolate: function(nw, ne, se, sw, width, height) {',
'    var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;',
'    xLookup = [];',
'    cells = [];',
'    for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      cells[y] = [];',
'      yStep = y / (height - 1);',
'      for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'        if (xLookup[x] != null) {',
'          xStep = xLookup[x];',
'        } else {',
'          xStep = xLookup[x] = x / (width - 1);',
'        }',
'        topHeight = nw + xStep * (ne - nw);',
'        bottomHeight = sw + xStep * (se - sw);',
'        cellHeight = topHeight + yStep * (bottomHeight - topHeight);',
'        cells[y][x] = Math.floor(cellHeight);',
'      }',
'    }',
'    return cells;',
'  }',
'}, {',
'  dispose: function() {',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][23]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][1]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][25]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][1]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][22]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][8]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][6]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][4]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][28]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][10]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][9]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][30]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][16]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][12]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][11]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][15]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][17]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][18]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][19]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][20]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][21]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][27]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][29]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][33]=0;
_$jscoverage['public/javascripts/models/HeightmapChunk.js'][37]=0;
}_$jscoverage['public/javascripts/models/HeightmapChunk.js'][1]++;
window.require.register("models/HeightmapChunk", function(require, module) {_$jscoverage['public/javascripts/models/HeightmapChunk.js'][1]++;
var Model,
  __slice = [].slice;

_$jscoverage['public/javascripts/models/HeightmapChunk.js'][4]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/HeightmapChunk.js'][6]++;
module.exports = Model.extend("HeightmapChunkModel", {
  create: function() {
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][8]++;
var args, model;
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][9]++;
args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][10]++;
model = this._super();
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][11]++;
model.cells = this.bilinearInterpolate.apply(this, args);
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][12]++;
return model;
  },
  bilinearInterpolate: function(nw, ne, se, sw, width, height) {
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][15]++;
var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][16]++;
xLookup = [];
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][17]++;
cells = [];
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][18]++;
for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/models/HeightmapChunk.js'][19]++;
cells[y] = [];
      _$jscoverage['public/javascripts/models/HeightmapChunk.js'][20]++;
yStep = y / (height - 1);
      _$jscoverage['public/javascripts/models/HeightmapChunk.js'][21]++;
for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        _$jscoverage['public/javascripts/models/HeightmapChunk.js'][22]++;
if (xLookup[x] != null) {
          _$jscoverage['public/javascripts/models/HeightmapChunk.js'][23]++;
xStep = xLookup[x];
        } else {
          _$jscoverage['public/javascripts/models/HeightmapChunk.js'][25]++;
xStep = xLookup[x] = x / (width - 1);
        }
        _$jscoverage['public/javascripts/models/HeightmapChunk.js'][27]++;
topHeight = nw + xStep * (ne - nw);
        _$jscoverage['public/javascripts/models/HeightmapChunk.js'][28]++;
bottomHeight = sw + xStep * (se - sw);
        _$jscoverage['public/javascripts/models/HeightmapChunk.js'][29]++;
cellHeight = topHeight + yStep * (bottomHeight - topHeight);
        _$jscoverage['public/javascripts/models/HeightmapChunk.js'][30]++;
cells[y][x] = Math.floor(cellHeight);
      }
    }
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][33]++;
return cells;
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/models/HeightmapChunk.js'][37]++;
return this._super();
  }
});
});
