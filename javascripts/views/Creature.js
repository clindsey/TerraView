window.require.register("views/Creature", function(require, module) {var View, config, utils;

View = require("views/base/View");

utils = require("lib/utils");

config = require("config");

module.exports = View.extend("CreatureView", {
  create: function(creatureModel, viewportModel) {
    var creatureView;
    creatureView = this._super();
    creatureView.model = creatureModel;
    creatureView.viewportModel = viewportModel;
    creatureView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    creatureView.el = new createjs.BitmapAnimation(creatureView.spriteSheet);
    creatureView.el.gotoAndPlay("walkSouth");
    EventBus.addEventListener("!move:" + creatureModel.uniqueId, creatureView.onModelMove, creatureView);
    EventBus.addEventListener("!move:" + viewportModel.uniqueId, creatureView.setPosition, creatureView);
    creatureView.setPosition();
    _.bindAll(creatureView, "onTick");
    creatureView.el.addEventListener("tick", creatureView.onTick);
    creatureView.el.x = creatureView.intendedX;
    creatureView.el.y = creatureView.intendedY;
    return creatureView;
  },
  spriteSheetOptions: {
    images: [utils.tilesetImg],
    frames: {
      width: 16,
      height: 16
    },
    animations: {
      walkEast: {
        frames: [288, 289, 290, 291],
        frequency: 15
      },
      walkNorth: {
        frames: [292, 293, 294, 295],
        frequency: 15
      },
      walkWest: {
        frames: [296, 297, 298, 299],
        frequency: 15
      },
      walkSouth: {
        frames: [300, 301, 302, 303],
        frequency: 15
      },
      idleEast: {
        frames: [320, 321],
        frequency: 30
      },
      idleNorth: {
        frames: [322, 323],
        frequency: 30
      },
      idleWest: {
        frames: [324, 325],
        frequency: 30
      },
      idleSouth: {
        frames: [326, 327],
        frequency: 30
      }
    }
  }
}, {
  onModelMove: function() {
    var deltaX, deltaY;
    deltaX = 0;
    deltaY = 0;
    switch (this.model.direction) {
      case "North":
        deltaY = config.tileHeight;
        break;
      case "East":
        deltaX = 0 - config.tileWidth;
        break;
      case "South":
        deltaY = 0 - config.tileHeight;
        break;
      case "West":
        deltaX = config.tileWidth;
    }
    this.offsetX = deltaX;
    this.offsetY = deltaY;
    createjs.Tween.get(this).to({
      offsetX: 0,
      offsetY: 0
    }, 500);
    return this.setPosition();
  },
  setPosition: function() {
    var animation, centerX, centerY, halfWorldHeight, halfWorldWidth, myNewX, myNewY, myX, myY, newX, newY, offsetX, offsetY, viewX, viewY, worldHeight, worldWidth, x, y;
    animation = "walk" + this.model.direction;
    if (this.el.currentAnimation !== animation) {
      this.el.gotoAndPlay(animation);
    }
    centerX = Math.floor(this.viewportModel.width / 2);
    centerY = Math.floor(this.viewportModel.height / 2);
    viewX = this.viewportModel.x;
    viewY = this.viewportModel.y;
    myX = this.model.x;
    myY = this.model.y;
    x = (myX - viewX) + centerX;
    y = (myY - viewY) + centerY;
    worldWidth = config.worldTileWidth;
    halfWorldWidth = Math.floor(worldWidth / 2);
    worldHeight = config.worldTileHeight;
    halfWorldHeight = Math.floor(worldHeight / 2);
    offsetX = 0;
    offsetY = 0;
    if (myX > viewX + halfWorldWidth) {
      offsetX -= worldWidth;
    }
    if (myX < viewX - halfWorldWidth) {
      offsetX += worldWidth;
    }
    if (myY > viewY + halfWorldHeight) {
      offsetY -= worldHeight;
    }
    if (myY < viewY - halfWorldHeight) {
      offsetY += worldHeight;
    }
    myNewX = x + offsetX;
    myNewY = y + offsetY;
    newX = myNewX * config.tileWidth;
    newY = myNewY * config.tileHeight;
    this.intendedX = newX;
    return this.intendedY = newY;
  },
  onTick: function() {
    this.el.x = this.intendedX + this.offsetX;
    return this.el.y = this.intendedY + this.offsetY;
  },
  dispose: function() {
    this.el.removeEventListener("tick", this.onTick);
    EventBus.removeEventListener("!move:" + this.model.uniqueId, this.setPosition, this);
    return this._super();
  }
});
});
