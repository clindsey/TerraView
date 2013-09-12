if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/EntityManager.js'] === 'undefined'){_$jscoverage['public/javascripts/views/EntityManager.js']=[];
_$jscoverage['public/javascripts/views/EntityManager.js'].source=['window.require.register("views/EntityManager", function(require, module) {var CreatureModel, CreatureView, View, config, utils;',
'',
'View = require("views/base/View");',
'',
'CreatureModel = require("models/Creature");',
'',
'CreatureView = require("views/Creature");',
'',
'config = require("config");',
'',
'utils = require("lib/utils");',
'',
'module.exports = View.extend("EntityManagerView", {',
'  create: function(viewportModel) {',
'    var entityManagerView;',
'    entityManagerView = this._super();',
'    entityManagerView.el = new createjs.Container;',
'    entityManagerView.creatureViews = [];',
'    entityManagerView.viewportModel = viewportModel;',
'    return entityManagerView;',
'  }',
'}, {',
'  onTick: function() {',
'    return _.each(this.creatureViews, function(creatureView) {',
'      return creatureView.model.tick();',
'    });',
'  },',
'  addCreatures: function(populationSize, tileMapModel) {',
'    var creatureCount, creatureModel, creatureView, s, tile, x, y, _results;',
'    creatureCount = 0;',
'    s = config.seed;',
'    _results = [];',
'    while (creatureCount < populationSize) {',
'      s += 1;',
'      x = Math.floor(utils.random(s) * config.worldTileWidth);',
'      y = Math.floor(utils.random(s + 1) * config.worldTileHeight);',
'      tile = tileMapModel.getCell(x, y);',
'      if (tile === 1) {',
'        creatureCount += 1;',
'        creatureModel = CreatureModel.create(x, y, tileMapModel);',
'        creatureView = CreatureView.create(creatureModel, this.viewportModel);',
'        this.el.addChild(creatureView.el);',
'        _results.push(this.creatureViews.push(creatureView));',
'      } else {',
'        _results.push(void 0);',
'      }',
'    }',
'    return _results;',
'  },',
'  dispose: function() {',
'    _.each(this.creatureViews, function(creatureView) {',
'      creatureView.model.dispose();',
'      return creatureView.dispose();',
'    });',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/views/EntityManager.js'][34]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][1]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][35]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][1]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][36]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][5]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][3]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][39]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][9]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][7]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][40]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][16]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][13]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][11]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][15]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][43]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][19]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][17]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][18]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][38]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][29]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][25]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][24]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][20]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][48]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][30]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][52]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][31]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][32]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][33]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][37]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][41]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][42]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][45]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][51]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][53]=0;
_$jscoverage['public/javascripts/views/EntityManager.js'][55]=0;
}_$jscoverage['public/javascripts/views/EntityManager.js'][1]++;
window.require.register("views/EntityManager", function(require, module) {_$jscoverage['public/javascripts/views/EntityManager.js'][1]++;
var CreatureModel, CreatureView, View, config, utils;

_$jscoverage['public/javascripts/views/EntityManager.js'][3]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/views/EntityManager.js'][5]++;
CreatureModel = require("models/Creature");

_$jscoverage['public/javascripts/views/EntityManager.js'][7]++;
CreatureView = require("views/Creature");

_$jscoverage['public/javascripts/views/EntityManager.js'][9]++;
config = require("config");

_$jscoverage['public/javascripts/views/EntityManager.js'][11]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/views/EntityManager.js'][13]++;
module.exports = View.extend("EntityManagerView", {
  create: function(viewportModel) {
    _$jscoverage['public/javascripts/views/EntityManager.js'][15]++;
var entityManagerView;
    _$jscoverage['public/javascripts/views/EntityManager.js'][16]++;
entityManagerView = this._super();
    _$jscoverage['public/javascripts/views/EntityManager.js'][17]++;
entityManagerView.el = new createjs.Container;
    _$jscoverage['public/javascripts/views/EntityManager.js'][18]++;
entityManagerView.creatureViews = [];
    _$jscoverage['public/javascripts/views/EntityManager.js'][19]++;
entityManagerView.viewportModel = viewportModel;
    _$jscoverage['public/javascripts/views/EntityManager.js'][20]++;
return entityManagerView;
  }
}, {
  onTick: function() {
    _$jscoverage['public/javascripts/views/EntityManager.js'][24]++;
return _.each(this.creatureViews, function(creatureView) {
      _$jscoverage['public/javascripts/views/EntityManager.js'][25]++;
return creatureView.model.tick();
    });
  },
  addCreatures: function(populationSize, tileMapModel) {
    _$jscoverage['public/javascripts/views/EntityManager.js'][29]++;
var creatureCount, creatureModel, creatureView, s, tile, x, y, _results;
    _$jscoverage['public/javascripts/views/EntityManager.js'][30]++;
creatureCount = 0;
    _$jscoverage['public/javascripts/views/EntityManager.js'][31]++;
s = config.seed;
    _$jscoverage['public/javascripts/views/EntityManager.js'][32]++;
_results = [];
    _$jscoverage['public/javascripts/views/EntityManager.js'][33]++;
while (creatureCount < populationSize) {
      _$jscoverage['public/javascripts/views/EntityManager.js'][34]++;
s += 1;
      _$jscoverage['public/javascripts/views/EntityManager.js'][35]++;
x = Math.floor(utils.random(s) * config.worldTileWidth);
      _$jscoverage['public/javascripts/views/EntityManager.js'][36]++;
y = Math.floor(utils.random(s + 1) * config.worldTileHeight);
      _$jscoverage['public/javascripts/views/EntityManager.js'][37]++;
tile = tileMapModel.getCell(x, y);
      _$jscoverage['public/javascripts/views/EntityManager.js'][38]++;
if (tile === 1) {
        _$jscoverage['public/javascripts/views/EntityManager.js'][39]++;
creatureCount += 1;
        _$jscoverage['public/javascripts/views/EntityManager.js'][40]++;
creatureModel = CreatureModel.create(x, y, tileMapModel);
        _$jscoverage['public/javascripts/views/EntityManager.js'][41]++;
creatureView = CreatureView.create(creatureModel, this.viewportModel);
        _$jscoverage['public/javascripts/views/EntityManager.js'][42]++;
this.el.addChild(creatureView.el);
        _$jscoverage['public/javascripts/views/EntityManager.js'][43]++;
_results.push(this.creatureViews.push(creatureView));
      } else {
        _$jscoverage['public/javascripts/views/EntityManager.js'][45]++;
_results.push(void 0);
      }
    }
    _$jscoverage['public/javascripts/views/EntityManager.js'][48]++;
return _results;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/views/EntityManager.js'][51]++;
_.each(this.creatureViews, function(creatureView) {
      _$jscoverage['public/javascripts/views/EntityManager.js'][52]++;
creatureView.model.dispose();
      _$jscoverage['public/javascripts/views/EntityManager.js'][53]++;
return creatureView.dispose();
    });
    _$jscoverage['public/javascripts/views/EntityManager.js'][55]++;
return this._super();
  }
});
});
