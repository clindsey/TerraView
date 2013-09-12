if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/Tile.js'] === 'undefined'){_$jscoverage['public/javascripts/views/Tile.js']=[];
_$jscoverage['public/javascripts/views/Tile.js'].source=['window.require.register("views/Tile", function(require, module) {var View, config, utils;',
'',
'View = require("views/base/View");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("TileView", {',
'  create: function(tileModel) {',
'    var view;',
'    view = this._super();',
'    view.model = tileModel;',
'    view.el = new createjs.Bitmap(utils.tilesetImg);',
'    view.model.setIndexCallback(function() {',
'      return view.setSpritePosition();',
'    });',
'    view.setSpritePosition();',
'    return view;',
'  }',
'}, {',
'  setSpritePosition: function() {',
'    var index, x, y;',
'    index = this.model.index;',
'    x = index % config.tileWidth;',
'    y = Math.floor(index / config.tileHeight);',
'    return this.el.sourceRect = new createjs.Rectangle(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/views/Tile.js'][15]=0;
_$jscoverage['public/javascripts/views/Tile.js'][1]=0;
_$jscoverage['public/javascripts/views/Tile.js'][18]=0;
_$jscoverage['public/javascripts/views/Tile.js'][1]=0;
_$jscoverage['public/javascripts/views/Tile.js'][19]=0;
_$jscoverage['public/javascripts/views/Tile.js'][5]=0;
_$jscoverage['public/javascripts/views/Tile.js'][3]=0;
_$jscoverage['public/javascripts/views/Tile.js'][24]=0;
_$jscoverage['public/javascripts/views/Tile.js'][11]=0;
_$jscoverage['public/javascripts/views/Tile.js'][9]=0;
_$jscoverage['public/javascripts/views/Tile.js'][7]=0;
_$jscoverage['public/javascripts/views/Tile.js'][12]=0;
_$jscoverage['public/javascripts/views/Tile.js'][13]=0;
_$jscoverage['public/javascripts/views/Tile.js'][14]=0;
_$jscoverage['public/javascripts/views/Tile.js'][16]=0;
_$jscoverage['public/javascripts/views/Tile.js'][23]=0;
_$jscoverage['public/javascripts/views/Tile.js'][25]=0;
_$jscoverage['public/javascripts/views/Tile.js'][26]=0;
_$jscoverage['public/javascripts/views/Tile.js'][27]=0;
}_$jscoverage['public/javascripts/views/Tile.js'][1]++;
window.require.register("views/Tile", function(require, module) {_$jscoverage['public/javascripts/views/Tile.js'][1]++;
var View, config, utils;

_$jscoverage['public/javascripts/views/Tile.js'][3]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/views/Tile.js'][5]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/views/Tile.js'][7]++;
config = require("config");

_$jscoverage['public/javascripts/views/Tile.js'][9]++;
module.exports = View.extend("TileView", {
  create: function(tileModel) {
    _$jscoverage['public/javascripts/views/Tile.js'][11]++;
var view;
    _$jscoverage['public/javascripts/views/Tile.js'][12]++;
view = this._super();
    _$jscoverage['public/javascripts/views/Tile.js'][13]++;
view.model = tileModel;
    _$jscoverage['public/javascripts/views/Tile.js'][14]++;
view.el = new createjs.Bitmap(utils.tilesetImg);
    _$jscoverage['public/javascripts/views/Tile.js'][15]++;
view.model.setIndexCallback(function() {
      _$jscoverage['public/javascripts/views/Tile.js'][16]++;
return view.setSpritePosition();
    });
    _$jscoverage['public/javascripts/views/Tile.js'][18]++;
view.setSpritePosition();
    _$jscoverage['public/javascripts/views/Tile.js'][19]++;
return view;
  }
}, {
  setSpritePosition: function() {
    _$jscoverage['public/javascripts/views/Tile.js'][23]++;
var index, x, y;
    _$jscoverage['public/javascripts/views/Tile.js'][24]++;
index = this.model.index;
    _$jscoverage['public/javascripts/views/Tile.js'][25]++;
x = index % config.tileWidth;
    _$jscoverage['public/javascripts/views/Tile.js'][26]++;
y = Math.floor(index / config.tileHeight);
    _$jscoverage['public/javascripts/views/Tile.js'][27]++;
return this.el.sourceRect = new createjs.Rectangle(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
  }
});
});
