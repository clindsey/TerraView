window.require.register("models/Tile", function(require, module) {var Model;

Model = require("models/base/Model");

module.exports = Model.extend("TileModel", {
  create: function(index, x, y) {
    var model;
    model = this._super();
    model.index = index;
    model.x = x;
    model.y = y;
    return model;
  }
}, {
  setIndex: function(index) {
    if (this.index !== index) {
      this.index = index;
      return this.onChangeIndex();
    }
  },
  setIndexCallback: function(callback) {
    return this.onChangeIndex = callback;
  },
  onChangeIndex: function() {}
});
});
