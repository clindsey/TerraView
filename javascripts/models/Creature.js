window.require.register("models/Creature", function(require, module) {var Model, config, utils;

Model = require("models/base/Model");

utils = require("lib/utils");

config = require("config");

module.exports = Model.extend("CreatureModel", {
  create: function(x, y, tileMapModel) {
    var creatureModel;
    creatureModel = this._super();
    creatureModel.x = x;
    creatureModel.y = y;
    creatureModel.direction = "South";
    creatureModel.tileMapModel = tileMapModel;
    return creatureModel;
  }
}, {
  setPosition: function(x, y) {
    if (y !== this.y || x !== this.x) {
      this.x = x;
      this.y = y;
      return EventBus.dispatch("!move:" + this.uniqueId);
    }
  },
  tick: function() {
    var dX, dY, foundSpot, giveUpCounter, newDirection, newX, newY, runOrRise, tile, _results;
    foundSpot = false;
    giveUpCounter = 6;
    _results = [];
    while (!foundSpot && giveUpCounter) {
      dX = 0;
      dY = 0;
      runOrRise = Math.floor(utils.sessionRandom() * 2) % 2;
      if (runOrRise) {
        dX = Math.floor(utils.sessionRandom() * 3) - 1;
      } else {
        dY = Math.floor(utils.sessionRandom() * 3) - 1;
      }
      newX = utils.clamp(this.x + dX, config.worldTileWidth);
      newY = utils.clamp(this.y + dY, config.worldTileHeight);
      tile = this.tileMapModel.getCell(newX, newY);
      newDirection = "South";
      if (dX > 0) {
        this.direction = "East";
      }
      if (dX < 0) {
        this.direction = "West";
      }
      if (dY > 0) {
        this.direction = "South";
      }
      if (dY < 0) {
        this.direction = "North";
      }
      if (tile === 1 && (newX !== this.x || newY !== this.y)) {
        this.setPosition(newX, newY);
        _results.push(foundSpot = true);
      } else {
        _results.push(giveUpCounter -= 1);
      }
    }
    return _results;
  }
});
});
