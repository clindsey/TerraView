window.require.register("views/EntityManager", function(require, module) {var CreatureModel, CreatureView, View, config, utils;

View = require("views/base/View");

CreatureModel = require("models/Creature");

CreatureView = require("views/Creature");

config = require("config");

utils = require("lib/utils");

module.exports = View.extend("EntityManagerView", {
  create: function(viewportModel) {
    var entityManagerView;
    entityManagerView = this._super();
    entityManagerView.el = new createjs.Container;
    entityManagerView.creatureViews = [];
    entityManagerView.viewportModel = viewportModel;
    return entityManagerView;
  }
}, {
  onTick: function() {
    return _.each(this.creatureViews, function(creatureView) {
      return creatureView.model.tick();
    });
  },
  addCreatures: function(populationSize, tileMapModel) {
    var creatureCount, creatureModel, creatureView, s, tile, x, y, _results;
    creatureCount = 0;
    s = config.seed;
    _results = [];
    while (creatureCount < populationSize) {
      s += 1;
      x = Math.floor(utils.random(s) * config.worldTileWidth);
      y = Math.floor(utils.random(s + 1) * config.worldTileHeight);
      tile = tileMapModel.getCell(x, y);
      if (tile === 1) {
        creatureCount += 1;
        creatureModel = CreatureModel.create(x, y, tileMapModel);
        creatureView = CreatureView.create(creatureModel, this.viewportModel);
        this.el.addChild(creatureView.el);
        _results.push(this.creatureViews.push(creatureView));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  dispose: function() {
    _.each(this.creatureViews, function(creatureView) {
      creatureView.model.dispose();
      return creatureView.dispose();
    });
    return this._super();
  }
});
});
