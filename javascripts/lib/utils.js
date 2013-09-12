window.require.register("lib/utils", function(require, module) {var config, utils;

config = require("config");

module.exports = utils = {
  clamp: function(index, size) {
    return (index + size) % size;
  },
  random: function(seed) {
    return new RNG(seed).uniform();
  },
  sessionRandom: function() {
    var randomVal;
    randomVal = new RNG(config.sessionSeed).uniform();
    config.sessionSeed += 1;
    return randomVal;
  },
  tileHeightToType: function(height, maxElevation) {
    var type;
    if (height / maxElevation >= 0.5) {
      type = 1;
    } else {
      type = 0;
    }
    return type;
  },
  loadImages: function(callback) {
    this.tilesetImg = new Image();
    this.tilesetImg.onload = callback;
    return this.tilesetImg.src = config.spriteSheetSource;
  }
};
});
