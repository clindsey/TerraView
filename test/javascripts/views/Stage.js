if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/Stage.js'] === 'undefined'){_$jscoverage['public/javascripts/views/Stage.js']=[];
_$jscoverage['public/javascripts/views/Stage.js'].source=['window.require.register("views/Stage", function(require, module) {var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;',
'',
'View = require("views/base/View");',
'',
'ViewportModel = require("models/Viewport");',
'',
'ViewportView = require("views/Viewport");',
'',
'EntityManagerView = require("views/EntityManager");',
'',
'TileMapModel = require("models/TileMap");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("StageView", {',
'  create: function(canvasEl) {',
'    var stageView;',
'    stageView = this._super();',
'    stageView.el = new createjs.Stage(canvasEl);',
'    stageView.lastUpdate = 0;',
'    stageView.tileMapModel = TileMapModel.create(\'models/Heightmap\');',
'    stageView.viewportModel = ViewportModel.create(0, 0, 30, 20);',
'    stageView.viewportView = ViewportView.create(stageView.viewportModel, stageView.tileMapModel);',
'    stageView.el.addChild(stageView.viewportView.el);',
'    stageView.entityManagerView = EntityManagerView.create(stageView.viewportModel);',
'    stageView.el.addChild(stageView.entityManagerView.el);',
'    stageView.entityManagerView.addCreatures(100, stageView.tileMapModel);',
'    createjs.Ticker.setFPS(60);',
'    createjs.Ticker.useRAF = true;',
'    _.bindAll(stageView, "onTick");',
'    createjs.Ticker.addEventListener("tick", stageView.onTick);',
'    createjs.Touch.enable(stageView.el);',
'    stageView.el.update();',
'    return stageView;',
'  }',
'}, {',
'  onTick: function(event) {',
'    var timeDelta;',
'    this.el.update();',
'    timeDelta = event.time - this.lastUpdate;',
'    if (Math.floor(timeDelta / 500) >= 1) {',
'      this.entityManagerView.onTick();',
'      return this.lastUpdate = event.time;',
'    }',
'  },',
'  dispose: function() {',
'    createjs.Ticker.removeEventListener("tick", this.onTick);',
'    createjs.Touch.disable(this.el);',
'    this.tileMapModel.dispose();',
'    this.viewportView.dispose();',
'    this.viewportModel.dispose();',
'    this.entityManagerView.dispose();',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/views/Stage.js'][31]=0;
_$jscoverage['public/javascripts/views/Stage.js'][1]=0;
_$jscoverage['public/javascripts/views/Stage.js'][32]=0;
_$jscoverage['public/javascripts/views/Stage.js'][1]=0;
_$jscoverage['public/javascripts/views/Stage.js'][33]=0;
_$jscoverage['public/javascripts/views/Stage.js'][5]=0;
_$jscoverage['public/javascripts/views/Stage.js'][3]=0;
_$jscoverage['public/javascripts/views/Stage.js'][35]=0;
_$jscoverage['public/javascripts/views/Stage.js'][9]=0;
_$jscoverage['public/javascripts/views/Stage.js'][7]=0;
_$jscoverage['public/javascripts/views/Stage.js'][36]=0;
_$jscoverage['public/javascripts/views/Stage.js'][15]=0;
_$jscoverage['public/javascripts/views/Stage.js'][11]=0;
_$jscoverage['public/javascripts/views/Stage.js'][13]=0;
_$jscoverage['public/javascripts/views/Stage.js'][41]=0;
_$jscoverage['public/javascripts/views/Stage.js'][21]=0;
_$jscoverage['public/javascripts/views/Stage.js'][17]=0;
_$jscoverage['public/javascripts/views/Stage.js'][19]=0;
_$jscoverage['public/javascripts/views/Stage.js'][20]=0;
_$jscoverage['public/javascripts/views/Stage.js'][45]=0;
_$jscoverage['public/javascripts/views/Stage.js'][25]=0;
_$jscoverage['public/javascripts/views/Stage.js'][24]=0;
_$jscoverage['public/javascripts/views/Stage.js'][23]=0;
_$jscoverage['public/javascripts/views/Stage.js'][22]=0;
_$jscoverage['public/javascripts/views/Stage.js'][49]=0;
_$jscoverage['public/javascripts/views/Stage.js'][28]=0;
_$jscoverage['public/javascripts/views/Stage.js'][27]=0;
_$jscoverage['public/javascripts/views/Stage.js'][26]=0;
_$jscoverage['public/javascripts/views/Stage.js'][51]=0;
_$jscoverage['public/javascripts/views/Stage.js'][30]=0;
_$jscoverage['public/javascripts/views/Stage.js'][29]=0;
_$jscoverage['public/javascripts/views/Stage.js'][34]=0;
_$jscoverage['public/javascripts/views/Stage.js'][40]=0;
_$jscoverage['public/javascripts/views/Stage.js'][42]=0;
_$jscoverage['public/javascripts/views/Stage.js'][43]=0;
_$jscoverage['public/javascripts/views/Stage.js'][44]=0;
_$jscoverage['public/javascripts/views/Stage.js'][50]=0;
_$jscoverage['public/javascripts/views/Stage.js'][52]=0;
_$jscoverage['public/javascripts/views/Stage.js'][53]=0;
_$jscoverage['public/javascripts/views/Stage.js'][54]=0;
_$jscoverage['public/javascripts/views/Stage.js'][55]=0;
}_$jscoverage['public/javascripts/views/Stage.js'][1]++;
window.require.register("views/Stage", function(require, module) {_$jscoverage['public/javascripts/views/Stage.js'][1]++;
var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;

_$jscoverage['public/javascripts/views/Stage.js'][3]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/views/Stage.js'][5]++;
ViewportModel = require("models/Viewport");

_$jscoverage['public/javascripts/views/Stage.js'][7]++;
ViewportView = require("views/Viewport");

_$jscoverage['public/javascripts/views/Stage.js'][9]++;
EntityManagerView = require("views/EntityManager");

_$jscoverage['public/javascripts/views/Stage.js'][11]++;
TileMapModel = require("models/TileMap");

_$jscoverage['public/javascripts/views/Stage.js'][13]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/views/Stage.js'][15]++;
config = require("config");

_$jscoverage['public/javascripts/views/Stage.js'][17]++;
module.exports = View.extend("StageView", {
  create: function(canvasEl) {
    _$jscoverage['public/javascripts/views/Stage.js'][19]++;
var stageView;
    _$jscoverage['public/javascripts/views/Stage.js'][20]++;
stageView = this._super();
    _$jscoverage['public/javascripts/views/Stage.js'][21]++;
stageView.el = new createjs.Stage(canvasEl);
    _$jscoverage['public/javascripts/views/Stage.js'][22]++;
stageView.lastUpdate = 0;
    _$jscoverage['public/javascripts/views/Stage.js'][23]++;
stageView.tileMapModel = TileMapModel.create('models/Heightmap');
    _$jscoverage['public/javascripts/views/Stage.js'][24]++;
stageView.viewportModel = ViewportModel.create(0, 0, 30, 20);
    _$jscoverage['public/javascripts/views/Stage.js'][25]++;
stageView.viewportView = ViewportView.create(stageView.viewportModel, stageView.tileMapModel);
    _$jscoverage['public/javascripts/views/Stage.js'][26]++;
stageView.el.addChild(stageView.viewportView.el);
    _$jscoverage['public/javascripts/views/Stage.js'][27]++;
stageView.entityManagerView = EntityManagerView.create(stageView.viewportModel);
    _$jscoverage['public/javascripts/views/Stage.js'][28]++;
stageView.el.addChild(stageView.entityManagerView.el);
    _$jscoverage['public/javascripts/views/Stage.js'][29]++;
stageView.entityManagerView.addCreatures(100, stageView.tileMapModel);
    _$jscoverage['public/javascripts/views/Stage.js'][30]++;
createjs.Ticker.setFPS(60);
    _$jscoverage['public/javascripts/views/Stage.js'][31]++;
createjs.Ticker.useRAF = true;
    _$jscoverage['public/javascripts/views/Stage.js'][32]++;
_.bindAll(stageView, "onTick");
    _$jscoverage['public/javascripts/views/Stage.js'][33]++;
createjs.Ticker.addEventListener("tick", stageView.onTick);
    _$jscoverage['public/javascripts/views/Stage.js'][34]++;
createjs.Touch.enable(stageView.el);
    _$jscoverage['public/javascripts/views/Stage.js'][35]++;
stageView.el.update();
    _$jscoverage['public/javascripts/views/Stage.js'][36]++;
return stageView;
  }
}, {
  onTick: function(event) {
    _$jscoverage['public/javascripts/views/Stage.js'][40]++;
var timeDelta;
    _$jscoverage['public/javascripts/views/Stage.js'][41]++;
this.el.update();
    _$jscoverage['public/javascripts/views/Stage.js'][42]++;
timeDelta = event.time - this.lastUpdate;
    _$jscoverage['public/javascripts/views/Stage.js'][43]++;
if (Math.floor(timeDelta / 500) >= 1) {
      _$jscoverage['public/javascripts/views/Stage.js'][44]++;
this.entityManagerView.onTick();
      _$jscoverage['public/javascripts/views/Stage.js'][45]++;
return this.lastUpdate = event.time;
    }
  },
  dispose: function() {
    _$jscoverage['public/javascripts/views/Stage.js'][49]++;
createjs.Ticker.removeEventListener("tick", this.onTick);
    _$jscoverage['public/javascripts/views/Stage.js'][50]++;
createjs.Touch.disable(this.el);
    _$jscoverage['public/javascripts/views/Stage.js'][51]++;
this.tileMapModel.dispose();
    _$jscoverage['public/javascripts/views/Stage.js'][52]++;
this.viewportView.dispose();
    _$jscoverage['public/javascripts/views/Stage.js'][53]++;
this.viewportModel.dispose();
    _$jscoverage['public/javascripts/views/Stage.js'][54]++;
this.entityManagerView.dispose();
    _$jscoverage['public/javascripts/views/Stage.js'][55]++;
return this._super();
  }
});
});
