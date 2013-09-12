if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/Viewport.js'] === 'undefined'){_$jscoverage['public/javascripts/views/Viewport.js']=[];
_$jscoverage['public/javascripts/views/Viewport.js'].source=['window.require.register("views/Viewport", function(require, module) {var TileModel, TileView, View, config, utils;',
'',
'View = require("views/base/View");',
'',
'TileModel = require("models/Tile");',
'',
'TileView = require("views/Tile");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("ViewportView", {',
'  create: function(viewportModel, tileMapModel) {',
'    var tileView, view, _i, _len, _ref;',
'    view = this._super();',
'    view.model = viewportModel;',
'    view.el = new createjs.Container;',
'    view.tileMapModel = tileMapModel;',
'    view.tileModels = this.buildTileModels(view);',
'    view.tileViews = this.buildTileViews(view);',
'    _ref = view.tileViews;',
'    for (_i = 0, _len = _ref.length; _i < _len; _i++) {',
'      tileView = _ref[_i];',
'      view.el.addChild(tileView.el);',
'    }',
'    EventBus.addEventListener("!key:down", view.onKeyDown, view);',
'    EventBus.addEventListener("!mouse:down", view.onMouseDown, view);',
'    EventBus.addEventListener("!move:" + view.model.uniqueId, view.drawMap, view);',
'    return view;',
'  },',
'  buildTileModels: function(view) {',
'    var model, tileMapData, tileMapModel, tileModel, tiles, x, y, _i, _j, _ref, _ref1;',
'    tileMapModel = view.tileMapModel;',
'    model = view.model;',
'    tileMapData = tileMapModel.getArea(model.width, model.height, model.x, model.y);',
'    tiles = [];',
'    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'        tileModel = TileModel.create(tileMapData[y][x], x, y);',
'        tiles.push(tileModel);',
'      }',
'    }',
'    return tiles;',
'  },',
'  buildTileViews: function(view, img) {',
'    var views;',
'    views = [];',
'    _.each(view.tileModels, function(tileModel) {',
'      var tileView;',
'      tileView = TileView.create(tileModel, img);',
'      tileView.el.x = tileModel.x * config.tileWidth;',
'      tileView.el.y = tileModel.y * config.tileHeight;',
'      return views.push(tileView);',
'    });',
'    return views;',
'  }',
'}, {',
'  drawMap: function() {',
'    var tileMapData, tileModel, x, y, _i, _ref, _results;',
'    tileMapData = this.tileMapModel.getArea(this.model.width, this.model.height, this.model.x, this.model.y);',
'    _results = [];',
'    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      _results.push((function() {',
'        var _j, _ref1, _results1;',
'        _results1 = [];',
'        for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'          tileModel = this.tileModels[x + tileMapData[y].length * y];',
'          _results1.push(tileModel.setIndex(tileMapData[y][x]));',
'        }',
'        return _results1;',
'      }).call(this));',
'    }',
'    return _results;',
'  },',
'  onMouseDown: function(_event, args) {',
'    var direction, dx, dy, halfHeight, halfWidth, keyCode;',
'    halfWidth = Math.floor(this.model.width / 2) * config.tileWidth;',
'    halfHeight = Math.floor(this.model.height / 2) * config.tileHeight;',
'    dx = args.stageX - halfWidth;',
'    dy = args.stageY - halfHeight;',
'    direction = Math.abs((Math.atan2(dx, dy) / Math.PI * 180) - 180);',
'    keyCode = 37;',
'    if (315 < direction || direction < 45) {',
'      keyCode = 38;',
'    } else if ((45 < direction && direction < 135)) {',
'      keyCode = 39;',
'    } else if ((135 < direction && direction < 225)) {',
'      keyCode = 40;',
'    } else if ((225 < direction && direction < 315)) {',
'      keyCode = 37;',
'    }',
'    return EventBus.dispatch("!key:down", this, {',
'      keyCode: keyCode',
'    });',
'  },',
'  onKeyDown: function(_event, args) {',
'    var x, y;',
'    x = this.model.x;',
'    y = this.model.y;',
'    switch (args.keyCode) {',
'      case 37:',
'        x = this.model.x - 1;',
'        x = utils.clamp(x, config.worldTileWidth);',
'        break;',
'      case 38:',
'        y = this.model.y - 1;',
'        y = utils.clamp(y, config.worldTileHeight);',
'        break;',
'      case 39:',
'        x = this.model.x + 1;',
'        x = utils.clamp(x, config.worldTileWidth);',
'        break;',
'      case 40:',
'        y = this.model.y + 1;',
'        y = utils.clamp(y, config.worldTileHeight);',
'    }',
'    return this.model.setPosition(x, y);',
'  },',
'  dispose: function() {',
'    _.each(this.tileModels, function(tileModel) {',
'      return tileModel.dispose();',
'    });',
'    _.each(this.tileViews, function(tileView) {',
'      return tileView.dispose();',
'    });',
'    EventBus.removeEventListener("!move:" + this.model.uniqueId, this.drawMap, this);',
'    EventBus.removeEventListener("!key:down", this.onKeyDown, this);',
'    EventBus.removeEventListener("!mouse:down", this.onMouseDown, this);',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/views/Viewport.js'][67]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][1]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][71]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][1]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][64]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][5]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][3]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][63]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][9]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][7]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][77]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][16]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][13]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][11]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][15]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][79]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][19]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][17]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][18]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][81]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][25]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][21]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][23]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][20]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][22]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][24]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][87]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][29]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][27]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][28]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][91]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][40]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][33]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][30]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][34]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][35]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][39]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][36]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][38]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][37]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][93]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][44]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][41]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][98]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][60]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][48]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][47]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][56]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][49]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][54]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][53]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][50]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][52]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][51]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][107]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][65]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][61]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][62]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][109]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][78]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][68]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][66]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][69]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][74]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][113]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][83]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][82]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][80]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][116]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][88]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][84]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][86]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][85]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][118]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][89]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][122]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][105]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][100]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][104]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][103]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][90]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][99]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][101]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][127]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][108]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][111]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][112]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][115]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][121]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][124]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][125]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][128]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][129]=0;
_$jscoverage['public/javascripts/views/Viewport.js'][130]=0;
}_$jscoverage['public/javascripts/views/Viewport.js'][1]++;
window.require.register("views/Viewport", function(require, module) {_$jscoverage['public/javascripts/views/Viewport.js'][1]++;
var TileModel, TileView, View, config, utils;

_$jscoverage['public/javascripts/views/Viewport.js'][3]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/views/Viewport.js'][5]++;
TileModel = require("models/Tile");

_$jscoverage['public/javascripts/views/Viewport.js'][7]++;
TileView = require("views/Tile");

_$jscoverage['public/javascripts/views/Viewport.js'][9]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/views/Viewport.js'][11]++;
config = require("config");

_$jscoverage['public/javascripts/views/Viewport.js'][13]++;
module.exports = View.extend("ViewportView", {
  create: function(viewportModel, tileMapModel) {
    _$jscoverage['public/javascripts/views/Viewport.js'][15]++;
var tileView, view, _i, _len, _ref;
    _$jscoverage['public/javascripts/views/Viewport.js'][16]++;
view = this._super();
    _$jscoverage['public/javascripts/views/Viewport.js'][17]++;
view.model = viewportModel;
    _$jscoverage['public/javascripts/views/Viewport.js'][18]++;
view.el = new createjs.Container;
    _$jscoverage['public/javascripts/views/Viewport.js'][19]++;
view.tileMapModel = tileMapModel;
    _$jscoverage['public/javascripts/views/Viewport.js'][20]++;
view.tileModels = this.buildTileModels(view);
    _$jscoverage['public/javascripts/views/Viewport.js'][21]++;
view.tileViews = this.buildTileViews(view);
    _$jscoverage['public/javascripts/views/Viewport.js'][22]++;
_ref = view.tileViews;
    _$jscoverage['public/javascripts/views/Viewport.js'][23]++;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _$jscoverage['public/javascripts/views/Viewport.js'][24]++;
tileView = _ref[_i];
      _$jscoverage['public/javascripts/views/Viewport.js'][25]++;
view.el.addChild(tileView.el);
    }
    _$jscoverage['public/javascripts/views/Viewport.js'][27]++;
EventBus.addEventListener("!key:down", view.onKeyDown, view);
    _$jscoverage['public/javascripts/views/Viewport.js'][28]++;
EventBus.addEventListener("!mouse:down", view.onMouseDown, view);
    _$jscoverage['public/javascripts/views/Viewport.js'][29]++;
EventBus.addEventListener("!move:" + view.model.uniqueId, view.drawMap, view);
    _$jscoverage['public/javascripts/views/Viewport.js'][30]++;
return view;
  },
  buildTileModels: function(view) {
    _$jscoverage['public/javascripts/views/Viewport.js'][33]++;
var model, tileMapData, tileMapModel, tileModel, tiles, x, y, _i, _j, _ref, _ref1;
    _$jscoverage['public/javascripts/views/Viewport.js'][34]++;
tileMapModel = view.tileMapModel;
    _$jscoverage['public/javascripts/views/Viewport.js'][35]++;
model = view.model;
    _$jscoverage['public/javascripts/views/Viewport.js'][36]++;
tileMapData = tileMapModel.getArea(model.width, model.height, model.x, model.y);
    _$jscoverage['public/javascripts/views/Viewport.js'][37]++;
tiles = [];
    _$jscoverage['public/javascripts/views/Viewport.js'][38]++;
for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/views/Viewport.js'][39]++;
for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        _$jscoverage['public/javascripts/views/Viewport.js'][40]++;
tileModel = TileModel.create(tileMapData[y][x], x, y);
        _$jscoverage['public/javascripts/views/Viewport.js'][41]++;
tiles.push(tileModel);
      }
    }
    _$jscoverage['public/javascripts/views/Viewport.js'][44]++;
return tiles;
  },
  buildTileViews: function(view, img) {
    _$jscoverage['public/javascripts/views/Viewport.js'][47]++;
var views;
    _$jscoverage['public/javascripts/views/Viewport.js'][48]++;
views = [];
    _$jscoverage['public/javascripts/views/Viewport.js'][49]++;
_.each(view.tileModels, function(tileModel) {
      _$jscoverage['public/javascripts/views/Viewport.js'][50]++;
var tileView;
      _$jscoverage['public/javascripts/views/Viewport.js'][51]++;
tileView = TileView.create(tileModel, img);
      _$jscoverage['public/javascripts/views/Viewport.js'][52]++;
tileView.el.x = tileModel.x * config.tileWidth;
      _$jscoverage['public/javascripts/views/Viewport.js'][53]++;
tileView.el.y = tileModel.y * config.tileHeight;
      _$jscoverage['public/javascripts/views/Viewport.js'][54]++;
return views.push(tileView);
    });
    _$jscoverage['public/javascripts/views/Viewport.js'][56]++;
return views;
  }
}, {
  drawMap: function() {
    _$jscoverage['public/javascripts/views/Viewport.js'][60]++;
var tileMapData, tileModel, x, y, _i, _ref, _results;
    _$jscoverage['public/javascripts/views/Viewport.js'][61]++;
tileMapData = this.tileMapModel.getArea(this.model.width, this.model.height, this.model.x, this.model.y);
    _$jscoverage['public/javascripts/views/Viewport.js'][62]++;
_results = [];
    _$jscoverage['public/javascripts/views/Viewport.js'][63]++;
for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/views/Viewport.js'][64]++;
_results.push((function() {
        _$jscoverage['public/javascripts/views/Viewport.js'][65]++;
var _j, _ref1, _results1;
        _$jscoverage['public/javascripts/views/Viewport.js'][66]++;
_results1 = [];
        _$jscoverage['public/javascripts/views/Viewport.js'][67]++;
for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          _$jscoverage['public/javascripts/views/Viewport.js'][68]++;
tileModel = this.tileModels[x + tileMapData[y].length * y];
          _$jscoverage['public/javascripts/views/Viewport.js'][69]++;
_results1.push(tileModel.setIndex(tileMapData[y][x]));
        }
        _$jscoverage['public/javascripts/views/Viewport.js'][71]++;
return _results1;
      }).call(this));
    }
    _$jscoverage['public/javascripts/views/Viewport.js'][74]++;
return _results;
  },
  onMouseDown: function(_event, args) {
    _$jscoverage['public/javascripts/views/Viewport.js'][77]++;
var direction, dx, dy, halfHeight, halfWidth, keyCode;
    _$jscoverage['public/javascripts/views/Viewport.js'][78]++;
halfWidth = Math.floor(this.model.width / 2) * config.tileWidth;
    _$jscoverage['public/javascripts/views/Viewport.js'][79]++;
halfHeight = Math.floor(this.model.height / 2) * config.tileHeight;
    _$jscoverage['public/javascripts/views/Viewport.js'][80]++;
dx = args.stageX - halfWidth;
    _$jscoverage['public/javascripts/views/Viewport.js'][81]++;
dy = args.stageY - halfHeight;
    _$jscoverage['public/javascripts/views/Viewport.js'][82]++;
direction = Math.abs((Math.atan2(dx, dy) / Math.PI * 180) - 180);
    _$jscoverage['public/javascripts/views/Viewport.js'][83]++;
keyCode = 37;
    _$jscoverage['public/javascripts/views/Viewport.js'][84]++;
if (315 < direction || direction < 45) {
      _$jscoverage['public/javascripts/views/Viewport.js'][85]++;
keyCode = 38;
    } else {
_$jscoverage['public/javascripts/views/Viewport.js'][86]++;
if ((45 < direction && direction < 135)) {
      _$jscoverage['public/javascripts/views/Viewport.js'][87]++;
keyCode = 39;
    } else {
_$jscoverage['public/javascripts/views/Viewport.js'][88]++;
if ((135 < direction && direction < 225)) {
      _$jscoverage['public/javascripts/views/Viewport.js'][89]++;
keyCode = 40;
    } else {
_$jscoverage['public/javascripts/views/Viewport.js'][90]++;
if ((225 < direction && direction < 315)) {
      _$jscoverage['public/javascripts/views/Viewport.js'][91]++;
keyCode = 37;
    }}
}
}

    _$jscoverage['public/javascripts/views/Viewport.js'][93]++;
return EventBus.dispatch("!key:down", this, {
      keyCode: keyCode
    });
  },
  onKeyDown: function(_event, args) {
    _$jscoverage['public/javascripts/views/Viewport.js'][98]++;
var x, y;
    _$jscoverage['public/javascripts/views/Viewport.js'][99]++;
x = this.model.x;
    _$jscoverage['public/javascripts/views/Viewport.js'][100]++;
y = this.model.y;
    _$jscoverage['public/javascripts/views/Viewport.js'][101]++;
switch (args.keyCode) {
      case 37:
        _$jscoverage['public/javascripts/views/Viewport.js'][103]++;
x = this.model.x - 1;
        _$jscoverage['public/javascripts/views/Viewport.js'][104]++;
x = utils.clamp(x, config.worldTileWidth);
        _$jscoverage['public/javascripts/views/Viewport.js'][105]++;
break;
      case 38:
        _$jscoverage['public/javascripts/views/Viewport.js'][107]++;
y = this.model.y - 1;
        _$jscoverage['public/javascripts/views/Viewport.js'][108]++;
y = utils.clamp(y, config.worldTileHeight);
        _$jscoverage['public/javascripts/views/Viewport.js'][109]++;
break;
      case 39:
        _$jscoverage['public/javascripts/views/Viewport.js'][111]++;
x = this.model.x + 1;
        _$jscoverage['public/javascripts/views/Viewport.js'][112]++;
x = utils.clamp(x, config.worldTileWidth);
        _$jscoverage['public/javascripts/views/Viewport.js'][113]++;
break;
      case 40:
        _$jscoverage['public/javascripts/views/Viewport.js'][115]++;
y = this.model.y + 1;
        _$jscoverage['public/javascripts/views/Viewport.js'][116]++;
y = utils.clamp(y, config.worldTileHeight);
    }
    _$jscoverage['public/javascripts/views/Viewport.js'][118]++;
return this.model.setPosition(x, y);
  },
  dispose: function() {
    _$jscoverage['public/javascripts/views/Viewport.js'][121]++;
_.each(this.tileModels, function(tileModel) {
      _$jscoverage['public/javascripts/views/Viewport.js'][122]++;
return tileModel.dispose();
    });
    _$jscoverage['public/javascripts/views/Viewport.js'][124]++;
_.each(this.tileViews, function(tileView) {
      _$jscoverage['public/javascripts/views/Viewport.js'][125]++;
return tileView.dispose();
    });
    _$jscoverage['public/javascripts/views/Viewport.js'][127]++;
EventBus.removeEventListener("!move:" + this.model.uniqueId, this.drawMap, this);
    _$jscoverage['public/javascripts/views/Viewport.js'][128]++;
EventBus.removeEventListener("!key:down", this.onKeyDown, this);
    _$jscoverage['public/javascripts/views/Viewport.js'][129]++;
EventBus.removeEventListener("!mouse:down", this.onMouseDown, this);
    _$jscoverage['public/javascripts/views/Viewport.js'][130]++;
return this._super();
  }
});
});
