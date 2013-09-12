window.require.register("views/Stage", function(require, module) {var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;

View = require("views/base/View");

ViewportModel = require("models/Viewport");

ViewportView = require("views/Viewport");

EntityManagerView = require("views/EntityManager");

TileMapModel = require("models/TileMap");

utils = require("lib/utils");

config = require("config");

module.exports = View.extend("StageView", {
  create: function(canvasEl) {
    var stageView;
    stageView = this._super();
    stageView.el = new createjs.Stage(canvasEl);
    stageView.lastUpdate = 0;
    stageView.tileMapModel = TileMapModel.create('models/Heightmap');
    stageView.viewportModel = ViewportModel.create(0, 0, 30, 20);
    stageView.viewportView = ViewportView.create(stageView.viewportModel, stageView.tileMapModel);
    stageView.el.addChild(stageView.viewportView.el);
    stageView.entityManagerView = EntityManagerView.create(stageView.viewportModel);
    stageView.el.addChild(stageView.entityManagerView.el);
    stageView.entityManagerView.addCreatures(100, stageView.tileMapModel);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    _.bindAll(stageView, "onTick");
    createjs.Ticker.addEventListener("tick", stageView.onTick);
    createjs.Touch.enable(stageView.el);
    stageView.el.update();
    return stageView;
  }
}, {
  onTick: function(event) {
    var timeDelta;
    this.el.update();
    timeDelta = event.time - this.lastUpdate;
    if (Math.floor(timeDelta / 500) >= 1) {
      this.entityManagerView.onTick();
      return this.lastUpdate = event.time;
    }
  },
  dispose: function() {
    createjs.Ticker.removeEventListener("tick", this.onTick);
    createjs.Touch.disable(this.el);
    this.tileMapModel.dispose();
    this.viewportView.dispose();
    this.viewportModel.dispose();
    this.entityManagerView.dispose();
    return this._super();
  }
});
});
