window.require.register("views/Tile", function(require, module) {var View, config, utils;

View = require("views/base/View");

utils = require("lib/utils");

config = require("config");

module.exports = View.extend("TileView", {
  create: function(tileModel) {
    var view;
    view = this._super();
    view.model = tileModel;
    view.el = new createjs.Bitmap(utils.tilesetImg);
    view.model.setIndexCallback(function() {
      return view.setSpritePosition();
    });
    view.setSpritePosition();
    return view;
  }
}, {
  setSpritePosition: function() {
    var index, x, y;
    index = this.model.index;
    x = index % config.tileWidth;
    y = Math.floor(index / config.tileHeight);
    return this.el.sourceRect = new createjs.Rectangle(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
  }
});
});
