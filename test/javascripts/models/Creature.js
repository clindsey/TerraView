if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/Creature.js'] === 'undefined'){_$jscoverage['public/javascripts/models/Creature.js']=[];
_$jscoverage['public/javascripts/models/Creature.js'].source=['window.require.register("models/Creature", function(require, module) {var Model, config, utils;',
'',
'Model = require("models/base/Model");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = Model.extend("CreatureModel", {',
'  create: function(x, y, tileMapModel) {',
'    var creatureModel;',
'    creatureModel = this._super();',
'    creatureModel.x = x;',
'    creatureModel.y = y;',
'    creatureModel.direction = "South";',
'    creatureModel.tileMapModel = tileMapModel;',
'    return creatureModel;',
'  }',
'}, {',
'  setPosition: function(x, y) {',
'    if (y !== this.y || x !== this.x) {',
'      this.x = x;',
'      this.y = y;',
'      return EventBus.dispatch("!move:" + this.uniqueId);',
'    }',
'  },',
'  tick: function() {',
'    var dX, dY, foundSpot, giveUpCounter, newDirection, newX, newY, runOrRise, tile, _results;',
'    foundSpot = false;',
'    giveUpCounter = 6;',
'    _results = [];',
'    while (!foundSpot && giveUpCounter) {',
'      dX = 0;',
'      dY = 0;',
'      runOrRise = Math.floor(utils.sessionRandom() * 2) % 2;',
'      if (runOrRise) {',
'        dX = Math.floor(utils.sessionRandom() * 3) - 1;',
'      } else {',
'        dY = Math.floor(utils.sessionRandom() * 3) - 1;',
'      }',
'      newX = utils.clamp(this.x + dX, config.worldTileWidth);',
'      newY = utils.clamp(this.y + dY, config.worldTileHeight);',
'      tile = this.tileMapModel.getCell(newX, newY);',
'      newDirection = "South";',
'      if (dX > 0) {',
'        this.direction = "East";',
'      }',
'      if (dX < 0) {',
'        this.direction = "West";',
'      }',
'      if (dY > 0) {',
'        this.direction = "South";',
'      }',
'      if (dY < 0) {',
'        this.direction = "North";',
'      }',
'      if (tile === 1 && (newX !== this.x || newY !== this.y)) {',
'        this.setPosition(newX, newY);',
'        _results.push(foundSpot = true);',
'      } else {',
'        _results.push(giveUpCounter -= 1);',
'      }',
'    }',
'    return _results;',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/Creature.js'][37]=0;
_$jscoverage['public/javascripts/models/Creature.js'][1]=0;
_$jscoverage['public/javascripts/models/Creature.js'][39]=0;
_$jscoverage['public/javascripts/models/Creature.js'][1]=0;
_$jscoverage['public/javascripts/models/Creature.js'][36]=0;
_$jscoverage['public/javascripts/models/Creature.js'][5]=0;
_$jscoverage['public/javascripts/models/Creature.js'][3]=0;
_$jscoverage['public/javascripts/models/Creature.js'][42]=0;
_$jscoverage['public/javascripts/models/Creature.js'][11]=0;
_$jscoverage['public/javascripts/models/Creature.js'][9]=0;
_$jscoverage['public/javascripts/models/Creature.js'][7]=0;
_$jscoverage['public/javascripts/models/Creature.js'][44]=0;
_$jscoverage['public/javascripts/models/Creature.js'][14]=0;
_$jscoverage['public/javascripts/models/Creature.js'][12]=0;
_$jscoverage['public/javascripts/models/Creature.js'][13]=0;
_$jscoverage['public/javascripts/models/Creature.js'][45]=0;
_$jscoverage['public/javascripts/models/Creature.js'][22]=0;
_$jscoverage['public/javascripts/models/Creature.js'][16]=0;
_$jscoverage['public/javascripts/models/Creature.js'][15]=0;
_$jscoverage['public/javascripts/models/Creature.js'][17]=0;
_$jscoverage['public/javascripts/models/Creature.js'][21]=0;
_$jscoverage['public/javascripts/models/Creature.js'][52]=0;
_$jscoverage['public/javascripts/models/Creature.js'][28]=0;
_$jscoverage['public/javascripts/models/Creature.js'][23]=0;
_$jscoverage['public/javascripts/models/Creature.js'][24]=0;
_$jscoverage['public/javascripts/models/Creature.js'][55]=0;
_$jscoverage['public/javascripts/models/Creature.js'][35]=0;
_$jscoverage['public/javascripts/models/Creature.js'][30]=0;
_$jscoverage['public/javascripts/models/Creature.js'][33]=0;
_$jscoverage['public/javascripts/models/Creature.js'][32]=0;
_$jscoverage['public/javascripts/models/Creature.js'][29]=0;
_$jscoverage['public/javascripts/models/Creature.js'][31]=0;
_$jscoverage['public/javascripts/models/Creature.js'][34]=0;
_$jscoverage['public/javascripts/models/Creature.js'][61]=0;
_$jscoverage['public/javascripts/models/Creature.js'][41]=0;
_$jscoverage['public/javascripts/models/Creature.js'][43]=0;
_$jscoverage['public/javascripts/models/Creature.js'][46]=0;
_$jscoverage['public/javascripts/models/Creature.js'][48]=0;
_$jscoverage['public/javascripts/models/Creature.js'][49]=0;
_$jscoverage['public/javascripts/models/Creature.js'][51]=0;
_$jscoverage['public/javascripts/models/Creature.js'][54]=0;
_$jscoverage['public/javascripts/models/Creature.js'][57]=0;
_$jscoverage['public/javascripts/models/Creature.js'][58]=0;
_$jscoverage['public/javascripts/models/Creature.js'][59]=0;
_$jscoverage['public/javascripts/models/Creature.js'][64]=0;
}_$jscoverage['public/javascripts/models/Creature.js'][1]++;
window.require.register("models/Creature", function(require, module) {_$jscoverage['public/javascripts/models/Creature.js'][1]++;
var Model, config, utils;

_$jscoverage['public/javascripts/models/Creature.js'][3]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/Creature.js'][5]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/models/Creature.js'][7]++;
config = require("config");

_$jscoverage['public/javascripts/models/Creature.js'][9]++;
module.exports = Model.extend("CreatureModel", {
  create: function(x, y, tileMapModel) {
    _$jscoverage['public/javascripts/models/Creature.js'][11]++;
var creatureModel;
    _$jscoverage['public/javascripts/models/Creature.js'][12]++;
creatureModel = this._super();
    _$jscoverage['public/javascripts/models/Creature.js'][13]++;
creatureModel.x = x;
    _$jscoverage['public/javascripts/models/Creature.js'][14]++;
creatureModel.y = y;
    _$jscoverage['public/javascripts/models/Creature.js'][15]++;
creatureModel.direction = "South";
    _$jscoverage['public/javascripts/models/Creature.js'][16]++;
creatureModel.tileMapModel = tileMapModel;
    _$jscoverage['public/javascripts/models/Creature.js'][17]++;
return creatureModel;
  }
}, {
  setPosition: function(x, y) {
    _$jscoverage['public/javascripts/models/Creature.js'][21]++;
if (y !== this.y || x !== this.x) {
      _$jscoverage['public/javascripts/models/Creature.js'][22]++;
this.x = x;
      _$jscoverage['public/javascripts/models/Creature.js'][23]++;
this.y = y;
      _$jscoverage['public/javascripts/models/Creature.js'][24]++;
return EventBus.dispatch("!move:" + this.uniqueId);
    }
  },
  tick: function() {
    _$jscoverage['public/javascripts/models/Creature.js'][28]++;
var dX, dY, foundSpot, giveUpCounter, newDirection, newX, newY, runOrRise, tile, _results;
    _$jscoverage['public/javascripts/models/Creature.js'][29]++;
foundSpot = false;
    _$jscoverage['public/javascripts/models/Creature.js'][30]++;
giveUpCounter = 6;
    _$jscoverage['public/javascripts/models/Creature.js'][31]++;
_results = [];
    _$jscoverage['public/javascripts/models/Creature.js'][32]++;
while (!foundSpot && giveUpCounter) {
      _$jscoverage['public/javascripts/models/Creature.js'][33]++;
dX = 0;
      _$jscoverage['public/javascripts/models/Creature.js'][34]++;
dY = 0;
      _$jscoverage['public/javascripts/models/Creature.js'][35]++;
runOrRise = Math.floor(utils.sessionRandom() * 2) % 2;
      _$jscoverage['public/javascripts/models/Creature.js'][36]++;
if (runOrRise) {
        _$jscoverage['public/javascripts/models/Creature.js'][37]++;
dX = Math.floor(utils.sessionRandom() * 3) - 1;
      } else {
        _$jscoverage['public/javascripts/models/Creature.js'][39]++;
dY = Math.floor(utils.sessionRandom() * 3) - 1;
      }
      _$jscoverage['public/javascripts/models/Creature.js'][41]++;
newX = utils.clamp(this.x + dX, config.worldTileWidth);
      _$jscoverage['public/javascripts/models/Creature.js'][42]++;
newY = utils.clamp(this.y + dY, config.worldTileHeight);
      _$jscoverage['public/javascripts/models/Creature.js'][43]++;
tile = this.tileMapModel.getCell(newX, newY);
      _$jscoverage['public/javascripts/models/Creature.js'][44]++;
newDirection = "South";
      _$jscoverage['public/javascripts/models/Creature.js'][45]++;
if (dX > 0) {
        _$jscoverage['public/javascripts/models/Creature.js'][46]++;
this.direction = "East";
      }
      _$jscoverage['public/javascripts/models/Creature.js'][48]++;
if (dX < 0) {
        _$jscoverage['public/javascripts/models/Creature.js'][49]++;
this.direction = "West";
      }
      _$jscoverage['public/javascripts/models/Creature.js'][51]++;
if (dY > 0) {
        _$jscoverage['public/javascripts/models/Creature.js'][52]++;
this.direction = "South";
      }
      _$jscoverage['public/javascripts/models/Creature.js'][54]++;
if (dY < 0) {
        _$jscoverage['public/javascripts/models/Creature.js'][55]++;
this.direction = "North";
      }
      _$jscoverage['public/javascripts/models/Creature.js'][57]++;
if (tile === 1 && (newX !== this.x || newY !== this.y)) {
        _$jscoverage['public/javascripts/models/Creature.js'][58]++;
this.setPosition(newX, newY);
        _$jscoverage['public/javascripts/models/Creature.js'][59]++;
_results.push(foundSpot = true);
      } else {
        _$jscoverage['public/javascripts/models/Creature.js'][61]++;
_results.push(giveUpCounter -= 1);
      }
    }
    _$jscoverage['public/javascripts/models/Creature.js'][64]++;
return _results;
  }
});
});
