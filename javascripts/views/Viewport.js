window.require.register("views/Viewport", function(require, module) {var TileModel, TileView, View, config, utils;

View = require("views/base/View");

TileModel = require("models/Tile");

TileView = require("views/Tile");

utils = require("lib/utils");

config = require("config");

module.exports = View.extend("ViewportView", {
  create: function(viewportModel, tileMapModel) {
    var tileView, view, _i, _len, _ref;
    view = this._super();
    view.model = viewportModel;
    view.el = new createjs.Container;
    view.tileMapModel = tileMapModel;
    view.tileModels = this.buildTileModels(view);
    view.tileViews = this.buildTileViews(view);
    _ref = view.tileViews;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tileView = _ref[_i];
      view.el.addChild(tileView.el);
    }
    EventBus.addEventListener("!key:down", view.onKeyDown, view);
    EventBus.addEventListener("!mouse:down", view.onMouseDown, view);
    EventBus.addEventListener("!move:" + view.model.uniqueId, view.drawMap, view);
    return view;
  },
  buildTileModels: function(view) {
    var model, tileMapData, tileMapModel, tileModel, tiles, x, y, _i, _j, _ref, _ref1;
    tileMapModel = view.tileMapModel;
    model = view.model;
    tileMapData = tileMapModel.getArea(model.width, model.height, model.x, model.y);
    tiles = [];
    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        tileModel = TileModel.create(tileMapData[y][x], x, y);
        tiles.push(tileModel);
      }
    }
    return tiles;
  },
  buildTileViews: function(view, img) {
    var views;
    views = [];
    _.each(view.tileModels, function(tileModel) {
      var tileView;
      tileView = TileView.create(tileModel, img);
      tileView.el.x = tileModel.x * config.tileWidth;
      tileView.el.y = tileModel.y * config.tileHeight;
      return views.push(tileView);
    });
    return views;
  }
}, {
  drawMap: function() {
    var tileMapData, tileModel, x, y, _i, _ref, _results;
    tileMapData = this.tileMapModel.getArea(this.model.width, this.model.height, this.model.x, this.model.y);
    _results = [];
    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          tileModel = this.tileModels[x + tileMapData[y].length * y];
          _results1.push(tileModel.setIndex(tileMapData[y][x]));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  },
  onMouseDown: function(_event, args) {
    var direction, dx, dy, halfHeight, halfWidth, keyCode;
    halfWidth = Math.floor(this.model.width / 2) * config.tileWidth;
    halfHeight = Math.floor(this.model.height / 2) * config.tileHeight;
    dx = args.stageX - halfWidth;
    dy = args.stageY - halfHeight;
    direction = Math.abs((Math.atan2(dx, dy) / Math.PI * 180) - 180);
    keyCode = 37;
    if (315 < direction || direction < 45) {
      keyCode = 38;
    } else if ((45 < direction && direction < 135)) {
      keyCode = 39;
    } else if ((135 < direction && direction < 225)) {
      keyCode = 40;
    } else if ((225 < direction && direction < 315)) {
      keyCode = 37;
    }
    return EventBus.dispatch("!key:down", this, {
      keyCode: keyCode
    });
  },
  onKeyDown: function(_event, args) {
    var x, y;
    x = this.model.x;
    y = this.model.y;
    switch (args.keyCode) {
      case 37:
        x = this.model.x - 1;
        x = utils.clamp(x, config.worldTileWidth);
        break;
      case 38:
        y = this.model.y - 1;
        y = utils.clamp(y, config.worldTileHeight);
        break;
      case 39:
        x = this.model.x + 1;
        x = utils.clamp(x, config.worldTileWidth);
        break;
      case 40:
        y = this.model.y + 1;
        y = utils.clamp(y, config.worldTileHeight);
    }
    return this.model.setPosition(x, y);
  },
  dispose: function() {
    _.each(this.tileModels, function(tileModel) {
      return tileModel.dispose();
    });
    _.each(this.tileViews, function(tileView) {
      return tileView.dispose();
    });
    EventBus.removeEventListener("!move:" + this.model.uniqueId, this.drawMap, this);
    EventBus.removeEventListener("!key:down", this.onKeyDown, this);
    EventBus.removeEventListener("!mouse:down", this.onMouseDown, this);
    return this._super();
  }
});
});
