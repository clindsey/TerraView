if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/Tile.js'] === 'undefined'){_$jscoverage['public/javascripts/models/Tile.js']=[];
_$jscoverage['public/javascripts/models/Tile.js'].source=['window.require.register("models/Tile", function(require, module) {var Model;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("TileModel", {',
'  create: function(index, x, y) {',
'    var model;',
'    model = this._super();',
'    model.index = index;',
'    model.x = x;',
'    model.y = y;',
'    return model;',
'  }',
'}, {',
'  setIndex: function(index) {',
'    if (this.index !== index) {',
'      this.index = index;',
'      return this.onChangeIndex();',
'    }',
'  },',
'  setIndexCallback: function(callback) {',
'    return this.onChangeIndex = callback;',
'  },',
'  onChangeIndex: function() {}',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/Tile.js'][12]=0;
_$jscoverage['public/javascripts/models/Tile.js'][1]=0;
_$jscoverage['public/javascripts/models/Tile.js'][17]=0;
_$jscoverage['public/javascripts/models/Tile.js'][1]=0;
_$jscoverage['public/javascripts/models/Tile.js'][3]=0;
_$jscoverage['public/javascripts/models/Tile.js'][5]=0;
_$jscoverage['public/javascripts/models/Tile.js'][7]=0;
_$jscoverage['public/javascripts/models/Tile.js'][8]=0;
_$jscoverage['public/javascripts/models/Tile.js'][9]=0;
_$jscoverage['public/javascripts/models/Tile.js'][10]=0;
_$jscoverage['public/javascripts/models/Tile.js'][11]=0;
_$jscoverage['public/javascripts/models/Tile.js'][16]=0;
_$jscoverage['public/javascripts/models/Tile.js'][18]=0;
_$jscoverage['public/javascripts/models/Tile.js'][22]=0;
}_$jscoverage['public/javascripts/models/Tile.js'][1]++;
window.require.register("models/Tile", function(require, module) {_$jscoverage['public/javascripts/models/Tile.js'][1]++;
var Model;

_$jscoverage['public/javascripts/models/Tile.js'][3]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/Tile.js'][5]++;
module.exports = Model.extend("TileModel", {
  create: function(index, x, y) {
    _$jscoverage['public/javascripts/models/Tile.js'][7]++;
var model;
    _$jscoverage['public/javascripts/models/Tile.js'][8]++;
model = this._super();
    _$jscoverage['public/javascripts/models/Tile.js'][9]++;
model.index = index;
    _$jscoverage['public/javascripts/models/Tile.js'][10]++;
model.x = x;
    _$jscoverage['public/javascripts/models/Tile.js'][11]++;
model.y = y;
    _$jscoverage['public/javascripts/models/Tile.js'][12]++;
return model;
  }
}, {
  setIndex: function(index) {
    _$jscoverage['public/javascripts/models/Tile.js'][16]++;
if (this.index !== index) {
      _$jscoverage['public/javascripts/models/Tile.js'][17]++;
this.index = index;
      _$jscoverage['public/javascripts/models/Tile.js'][18]++;
return this.onChangeIndex();
    }
  },
  setIndexCallback: function(callback) {
    _$jscoverage['public/javascripts/models/Tile.js'][22]++;
return this.onChangeIndex = callback;
  },
  onChangeIndex: function() {}
});
});
