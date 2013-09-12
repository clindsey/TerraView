window.require.register("models/Viewport", function(require, module) {var Model;

Model = require("models/base/Model");

module.exports = Model.extend("ViewportModel", {
  create: function(x, y, width, height) {
    var model;
    model = this._super();
    model.x = x;
    model.y = y;
    model.width = width;
    model.height = height;
    return model;
  }
}, {
  setPosition: function(x, y) {
    if (y !== this.y || x !== this.x) {
      this.x = x;
      this.y = y;
      return EventBus.dispatch("!move:" + this.uniqueId, this);
    }
  }
});
});
