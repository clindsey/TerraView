if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/Creature.js'] === 'undefined'){_$jscoverage['public/javascripts/views/Creature.js']=[];
_$jscoverage['public/javascripts/views/Creature.js'].source=['window.require.register("views/Creature", function(require, module) {var View, config, utils;',
'',
'View = require("views/base/View");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("CreatureView", {',
'  create: function(creatureModel, viewportModel) {',
'    var creatureView;',
'    creatureView = this._super();',
'    creatureView.model = creatureModel;',
'    creatureView.viewportModel = viewportModel;',
'    creatureView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);',
'    creatureView.el = new createjs.BitmapAnimation(creatureView.spriteSheet);',
'    creatureView.el.gotoAndPlay("walkSouth");',
'    EventBus.addEventListener("!move:" + creatureModel.uniqueId, creatureView.onModelMove, creatureView);',
'    EventBus.addEventListener("!move:" + viewportModel.uniqueId, creatureView.setPosition, creatureView);',
'    creatureView.setPosition();',
'    _.bindAll(creatureView, "onTick");',
'    creatureView.el.addEventListener("tick", creatureView.onTick);',
'    creatureView.el.x = creatureView.intendedX;',
'    creatureView.el.y = creatureView.intendedY;',
'    return creatureView;',
'  },',
'  spriteSheetOptions: {',
'    images: [utils.tilesetImg],',
'    frames: {',
'      width: 16,',
'      height: 16',
'    },',
'    animations: {',
'      walkEast: {',
'        frames: [288, 289, 290, 291],',
'        frequency: 15',
'      },',
'      walkNorth: {',
'        frames: [292, 293, 294, 295],',
'        frequency: 15',
'      },',
'      walkWest: {',
'        frames: [296, 297, 298, 299],',
'        frequency: 15',
'      },',
'      walkSouth: {',
'        frames: [300, 301, 302, 303],',
'        frequency: 15',
'      },',
'      idleEast: {',
'        frames: [320, 321],',
'        frequency: 30',
'      },',
'      idleNorth: {',
'        frames: [322, 323],',
'        frequency: 30',
'      },',
'      idleWest: {',
'        frames: [324, 325],',
'        frequency: 30',
'      },',
'      idleSouth: {',
'        frames: [326, 327],',
'        frequency: 30',
'      }',
'    }',
'  }',
'}, {',
'  onModelMove: function() {',
'    var deltaX, deltaY;',
'    deltaX = 0;',
'    deltaY = 0;',
'    switch (this.model.direction) {',
'      case "North":',
'        deltaY = config.tileHeight;',
'        break;',
'      case "East":',
'        deltaX = 0 - config.tileWidth;',
'        break;',
'      case "South":',
'        deltaY = 0 - config.tileHeight;',
'        break;',
'      case "West":',
'        deltaX = config.tileWidth;',
'    }',
'    this.offsetX = deltaX;',
'    this.offsetY = deltaY;',
'    createjs.Tween.get(this).to({',
'      offsetX: 0,',
'      offsetY: 0',
'    }, 500);',
'    return this.setPosition();',
'  },',
'  setPosition: function() {',
'    var animation, centerX, centerY, halfWorldHeight, halfWorldWidth, myNewX, myNewY, myX, myY, newX, newY, offsetX, offsetY, viewX, viewY, worldHeight, worldWidth, x, y;',
'    animation = "walk" + this.model.direction;',
'    if (this.el.currentAnimation !== animation) {',
'      this.el.gotoAndPlay(animation);',
'    }',
'    centerX = Math.floor(this.viewportModel.width / 2);',
'    centerY = Math.floor(this.viewportModel.height / 2);',
'    viewX = this.viewportModel.x;',
'    viewY = this.viewportModel.y;',
'    myX = this.model.x;',
'    myY = this.model.y;',
'    x = (myX - viewX) + centerX;',
'    y = (myY - viewY) + centerY;',
'    worldWidth = config.worldTileWidth;',
'    halfWorldWidth = Math.floor(worldWidth / 2);',
'    worldHeight = config.worldTileHeight;',
'    halfWorldHeight = Math.floor(worldHeight / 2);',
'    offsetX = 0;',
'    offsetY = 0;',
'    if (myX > viewX + halfWorldWidth) {',
'      offsetX -= worldWidth;',
'    }',
'    if (myX < viewX - halfWorldWidth) {',
'      offsetX += worldWidth;',
'    }',
'    if (myY > viewY + halfWorldHeight) {',
'      offsetY -= worldHeight;',
'    }',
'    if (myY < viewY - halfWorldHeight) {',
'      offsetY += worldHeight;',
'    }',
'    myNewX = x + offsetX;',
'    myNewY = y + offsetY;',
'    newX = myNewX * config.tileWidth;',
'    newY = myNewY * config.tileHeight;',
'    this.intendedX = newX;',
'    return this.intendedY = newY;',
'  },',
'  onTick: function() {',
'    this.el.x = this.intendedX + this.offsetX;',
'    return this.el.y = this.intendedY + this.offsetY;',
'  },',
'  dispose: function() {',
'    this.el.removeEventListener("tick", this.onTick);',
'    EventBus.removeEventListener("!move:" + this.model.uniqueId, this.setPosition, this);',
'    return this._super();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/views/Creature.js'][98]=0;
_$jscoverage['public/javascripts/views/Creature.js'][1]=0;
_$jscoverage['public/javascripts/views/Creature.js'][97]=0;
_$jscoverage['public/javascripts/views/Creature.js'][1]=0;
_$jscoverage['public/javascripts/views/Creature.js'][100]=0;
_$jscoverage['public/javascripts/views/Creature.js'][5]=0;
_$jscoverage['public/javascripts/views/Creature.js'][3]=0;
_$jscoverage['public/javascripts/views/Creature.js'][102]=0;
_$jscoverage['public/javascripts/views/Creature.js'][11]=0;
_$jscoverage['public/javascripts/views/Creature.js'][9]=0;
_$jscoverage['public/javascripts/views/Creature.js'][7]=0;
_$jscoverage['public/javascripts/views/Creature.js'][104]=0;
_$jscoverage['public/javascripts/views/Creature.js'][14]=0;
_$jscoverage['public/javascripts/views/Creature.js'][12]=0;
_$jscoverage['public/javascripts/views/Creature.js'][13]=0;
_$jscoverage['public/javascripts/views/Creature.js'][106]=0;
_$jscoverage['public/javascripts/views/Creature.js'][18]=0;
_$jscoverage['public/javascripts/views/Creature.js'][16]=0;
_$jscoverage['public/javascripts/views/Creature.js'][15]=0;
_$jscoverage['public/javascripts/views/Creature.js'][17]=0;
_$jscoverage['public/javascripts/views/Creature.js'][108]=0;
_$jscoverage['public/javascripts/views/Creature.js'][22]=0;
_$jscoverage['public/javascripts/views/Creature.js'][19]=0;
_$jscoverage['public/javascripts/views/Creature.js'][20]=0;
_$jscoverage['public/javascripts/views/Creature.js'][21]=0;
_$jscoverage['public/javascripts/views/Creature.js'][111]=0;
_$jscoverage['public/javascripts/views/Creature.js'][71]=0;
_$jscoverage['public/javascripts/views/Creature.js'][24]=0;
_$jscoverage['public/javascripts/views/Creature.js'][23]=0;
_$jscoverage['public/javascripts/views/Creature.js'][25]=0;
_$jscoverage['public/javascripts/views/Creature.js'][70]=0;
_$jscoverage['public/javascripts/views/Creature.js'][115]=0;
_$jscoverage['public/javascripts/views/Creature.js'][79]=0;
_$jscoverage['public/javascripts/views/Creature.js'][72]=0;
_$jscoverage['public/javascripts/views/Creature.js'][75]=0;
_$jscoverage['public/javascripts/views/Creature.js'][73]=0;
_$jscoverage['public/javascripts/views/Creature.js'][78]=0;
_$jscoverage['public/javascripts/views/Creature.js'][76]=0;
_$jscoverage['public/javascripts/views/Creature.js'][117]=0;
_$jscoverage['public/javascripts/views/Creature.js'][86]=0;
_$jscoverage['public/javascripts/views/Creature.js'][82]=0;
_$jscoverage['public/javascripts/views/Creature.js'][81]=0;
_$jscoverage['public/javascripts/views/Creature.js'][84]=0;
_$jscoverage['public/javascripts/views/Creature.js'][124]=0;
_$jscoverage['public/javascripts/views/Creature.js'][87]=0;
_$jscoverage['public/javascripts/views/Creature.js'][123]=0;
_$jscoverage['public/javascripts/views/Creature.js'][105]=0;
_$jscoverage['public/javascripts/views/Creature.js'][96]=0;
_$jscoverage['public/javascripts/views/Creature.js'][92]=0;
_$jscoverage['public/javascripts/views/Creature.js'][103]=0;
_$jscoverage['public/javascripts/views/Creature.js'][95]=0;
_$jscoverage['public/javascripts/views/Creature.js'][101]=0;
_$jscoverage['public/javascripts/views/Creature.js'][88]=0;
_$jscoverage['public/javascripts/views/Creature.js'][129]=0;
_$jscoverage['public/javascripts/views/Creature.js'][107]=0;
_$jscoverage['public/javascripts/views/Creature.js'][130]=0;
_$jscoverage['public/javascripts/views/Creature.js'][113]=0;
_$jscoverage['public/javascripts/views/Creature.js'][109]=0;
_$jscoverage['public/javascripts/views/Creature.js'][112]=0;
_$jscoverage['public/javascripts/views/Creature.js'][110]=0;
_$jscoverage['public/javascripts/views/Creature.js'][134]=0;
_$jscoverage['public/javascripts/views/Creature.js'][114]=0;
_$jscoverage['public/javascripts/views/Creature.js'][135]=0;
_$jscoverage['public/javascripts/views/Creature.js'][126]=0;
_$jscoverage['public/javascripts/views/Creature.js'][121]=0;
_$jscoverage['public/javascripts/views/Creature.js'][120]=0;
_$jscoverage['public/javascripts/views/Creature.js'][118]=0;
_$jscoverage['public/javascripts/views/Creature.js'][127]=0;
_$jscoverage['public/javascripts/views/Creature.js'][128]=0;
_$jscoverage['public/javascripts/views/Creature.js'][131]=0;
_$jscoverage['public/javascripts/views/Creature.js'][138]=0;
_$jscoverage['public/javascripts/views/Creature.js'][139]=0;
_$jscoverage['public/javascripts/views/Creature.js'][140]=0;
}_$jscoverage['public/javascripts/views/Creature.js'][1]++;
window.require.register("views/Creature", function(require, module) {_$jscoverage['public/javascripts/views/Creature.js'][1]++;
var View, config, utils;

_$jscoverage['public/javascripts/views/Creature.js'][3]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/views/Creature.js'][5]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/views/Creature.js'][7]++;
config = require("config");

_$jscoverage['public/javascripts/views/Creature.js'][9]++;
module.exports = View.extend("CreatureView", {
  create: function(creatureModel, viewportModel) {
    _$jscoverage['public/javascripts/views/Creature.js'][11]++;
var creatureView;
    _$jscoverage['public/javascripts/views/Creature.js'][12]++;
creatureView = this._super();
    _$jscoverage['public/javascripts/views/Creature.js'][13]++;
creatureView.model = creatureModel;
    _$jscoverage['public/javascripts/views/Creature.js'][14]++;
creatureView.viewportModel = viewportModel;
    _$jscoverage['public/javascripts/views/Creature.js'][15]++;
creatureView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    _$jscoverage['public/javascripts/views/Creature.js'][16]++;
creatureView.el = new createjs.BitmapAnimation(creatureView.spriteSheet);
    _$jscoverage['public/javascripts/views/Creature.js'][17]++;
creatureView.el.gotoAndPlay("walkSouth");
    _$jscoverage['public/javascripts/views/Creature.js'][18]++;
EventBus.addEventListener("!move:" + creatureModel.uniqueId, creatureView.onModelMove, creatureView);
    _$jscoverage['public/javascripts/views/Creature.js'][19]++;
EventBus.addEventListener("!move:" + viewportModel.uniqueId, creatureView.setPosition, creatureView);
    _$jscoverage['public/javascripts/views/Creature.js'][20]++;
creatureView.setPosition();
    _$jscoverage['public/javascripts/views/Creature.js'][21]++;
_.bindAll(creatureView, "onTick");
    _$jscoverage['public/javascripts/views/Creature.js'][22]++;
creatureView.el.addEventListener("tick", creatureView.onTick);
    _$jscoverage['public/javascripts/views/Creature.js'][23]++;
creatureView.el.x = creatureView.intendedX;
    _$jscoverage['public/javascripts/views/Creature.js'][24]++;
creatureView.el.y = creatureView.intendedY;
    _$jscoverage['public/javascripts/views/Creature.js'][25]++;
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
    _$jscoverage['public/javascripts/views/Creature.js'][70]++;
var deltaX, deltaY;
    _$jscoverage['public/javascripts/views/Creature.js'][71]++;
deltaX = 0;
    _$jscoverage['public/javascripts/views/Creature.js'][72]++;
deltaY = 0;
    _$jscoverage['public/javascripts/views/Creature.js'][73]++;
switch (this.model.direction) {
      case "North":
        _$jscoverage['public/javascripts/views/Creature.js'][75]++;
deltaY = config.tileHeight;
        _$jscoverage['public/javascripts/views/Creature.js'][76]++;
break;
      case "East":
        _$jscoverage['public/javascripts/views/Creature.js'][78]++;
deltaX = 0 - config.tileWidth;
        _$jscoverage['public/javascripts/views/Creature.js'][79]++;
break;
      case "South":
        _$jscoverage['public/javascripts/views/Creature.js'][81]++;
deltaY = 0 - config.tileHeight;
        _$jscoverage['public/javascripts/views/Creature.js'][82]++;
break;
      case "West":
        _$jscoverage['public/javascripts/views/Creature.js'][84]++;
deltaX = config.tileWidth;
    }
    _$jscoverage['public/javascripts/views/Creature.js'][86]++;
this.offsetX = deltaX;
    _$jscoverage['public/javascripts/views/Creature.js'][87]++;
this.offsetY = deltaY;
    _$jscoverage['public/javascripts/views/Creature.js'][88]++;
createjs.Tween.get(this).to({
      offsetX: 0,
      offsetY: 0
    }, 500);
    _$jscoverage['public/javascripts/views/Creature.js'][92]++;
return this.setPosition();
  },
  setPosition: function() {
    _$jscoverage['public/javascripts/views/Creature.js'][95]++;
var animation, centerX, centerY, halfWorldHeight, halfWorldWidth, myNewX, myNewY, myX, myY, newX, newY, offsetX, offsetY, viewX, viewY, worldHeight, worldWidth, x, y;
    _$jscoverage['public/javascripts/views/Creature.js'][96]++;
animation = "walk" + this.model.direction;
    _$jscoverage['public/javascripts/views/Creature.js'][97]++;
if (this.el.currentAnimation !== animation) {
      _$jscoverage['public/javascripts/views/Creature.js'][98]++;
this.el.gotoAndPlay(animation);
    }
    _$jscoverage['public/javascripts/views/Creature.js'][100]++;
centerX = Math.floor(this.viewportModel.width / 2);
    _$jscoverage['public/javascripts/views/Creature.js'][101]++;
centerY = Math.floor(this.viewportModel.height / 2);
    _$jscoverage['public/javascripts/views/Creature.js'][102]++;
viewX = this.viewportModel.x;
    _$jscoverage['public/javascripts/views/Creature.js'][103]++;
viewY = this.viewportModel.y;
    _$jscoverage['public/javascripts/views/Creature.js'][104]++;
myX = this.model.x;
    _$jscoverage['public/javascripts/views/Creature.js'][105]++;
myY = this.model.y;
    _$jscoverage['public/javascripts/views/Creature.js'][106]++;
x = (myX - viewX) + centerX;
    _$jscoverage['public/javascripts/views/Creature.js'][107]++;
y = (myY - viewY) + centerY;
    _$jscoverage['public/javascripts/views/Creature.js'][108]++;
worldWidth = config.worldTileWidth;
    _$jscoverage['public/javascripts/views/Creature.js'][109]++;
halfWorldWidth = Math.floor(worldWidth / 2);
    _$jscoverage['public/javascripts/views/Creature.js'][110]++;
worldHeight = config.worldTileHeight;
    _$jscoverage['public/javascripts/views/Creature.js'][111]++;
halfWorldHeight = Math.floor(worldHeight / 2);
    _$jscoverage['public/javascripts/views/Creature.js'][112]++;
offsetX = 0;
    _$jscoverage['public/javascripts/views/Creature.js'][113]++;
offsetY = 0;
    _$jscoverage['public/javascripts/views/Creature.js'][114]++;
if (myX > viewX + halfWorldWidth) {
      _$jscoverage['public/javascripts/views/Creature.js'][115]++;
offsetX -= worldWidth;
    }
    _$jscoverage['public/javascripts/views/Creature.js'][117]++;
if (myX < viewX - halfWorldWidth) {
      _$jscoverage['public/javascripts/views/Creature.js'][118]++;
offsetX += worldWidth;
    }
    _$jscoverage['public/javascripts/views/Creature.js'][120]++;
if (myY > viewY + halfWorldHeight) {
      _$jscoverage['public/javascripts/views/Creature.js'][121]++;
offsetY -= worldHeight;
    }
    _$jscoverage['public/javascripts/views/Creature.js'][123]++;
if (myY < viewY - halfWorldHeight) {
      _$jscoverage['public/javascripts/views/Creature.js'][124]++;
offsetY += worldHeight;
    }
    _$jscoverage['public/javascripts/views/Creature.js'][126]++;
myNewX = x + offsetX;
    _$jscoverage['public/javascripts/views/Creature.js'][127]++;
myNewY = y + offsetY;
    _$jscoverage['public/javascripts/views/Creature.js'][128]++;
newX = myNewX * config.tileWidth;
    _$jscoverage['public/javascripts/views/Creature.js'][129]++;
newY = myNewY * config.tileHeight;
    _$jscoverage['public/javascripts/views/Creature.js'][130]++;
this.intendedX = newX;
    _$jscoverage['public/javascripts/views/Creature.js'][131]++;
return this.intendedY = newY;
  },
  onTick: function() {
    _$jscoverage['public/javascripts/views/Creature.js'][134]++;
this.el.x = this.intendedX + this.offsetX;
    _$jscoverage['public/javascripts/views/Creature.js'][135]++;
return this.el.y = this.intendedY + this.offsetY;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/views/Creature.js'][138]++;
this.el.removeEventListener("tick", this.onTick);
    _$jscoverage['public/javascripts/views/Creature.js'][139]++;
EventBus.removeEventListener("!move:" + this.model.uniqueId, this.setPosition, this);
    _$jscoverage['public/javascripts/views/Creature.js'][140]++;
return this._super();
  }
});
});
