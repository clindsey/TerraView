window.require.register('config', function(require, module) {
var config;

module.exports = config = {
  seed: +(new Date),
  sessionSeed: +(new Date),
  spriteSheetSource: "images/tileset_terra.png",
  tileWidth: 16,
  tileHeight: 16,
  worldChunkWidth: 8,
  worldChunkHeight: 8,
  chunkWidth: 10,
  chunkHeight: 10,
  maxElevation: 10
};

config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;

config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;

});

window.require.register('index', function(require, module) {
var Index, StageView;

StageView = require("views/Stage");

module.exports = Index = (function() {

  function Index() {
    this.canvasEl = document.createElement("canvas");
    this.canvasEl.width = 480;
    this.canvasEl.height = 320;
    document.body.appendChild(this.canvasEl);
    this.stageView = StageView.create(this.canvasEl);
    this.canvasEl.id = "stage-view-" + this.stageView.objectId;
    document.onkeydown = this.onKeyDown;
    _.bindAll(this, "onElMouseDown");
    this.stageView.el.addEventListener("mousedown", this.onElMouseDown);
  }

  Index.prototype.onElMouseDown = function(event) {
    return EventBus.dispatch("!mouse:down", this, event);
  };

  Index.prototype.onKeyDown = function(event) {
    return EventBus.dispatch("!key:down", this, event);
  };

  Index.prototype.dispose = function() {
    document.onkeydown = void 0;
    document.body.removeChild(this.canvasEl);
    this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);
    return this.stageView.dispose();
  };

  return Index;

})();

});

window.require.register('lib/utils', function(require, module) {
var config, utils;

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

window.require.register('models/Creature', function(require, module) {
var Model, config, utils;

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

window.require.register('models/Heightmap', function(require, module) {
var HeightmapChunkModel, Model, config, utils;

Model = require("models/base/Model");

utils = require("lib/utils");

HeightmapChunkModel = require("models/HeightmapChunk");

config = require("config");

module.exports = Model.extend("HeightmapModel", {
  create: function(seed) {
    var heightmapModel;
    heightmapModel = this._super();
    heightmapModel.seed = seed;
    heightmapModel.chunkCache = [];
    return heightmapModel;
  }
}, {
  getCell: function(worldX, worldY) {
    var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;
    worldChunkX = Math.floor(worldX / config.chunkWidth);
    worldChunkY = Math.floor(worldY / config.chunkHeight);
    chunkX = worldX % config.chunkWidth;
    chunkY = worldY % config.chunkHeight;
    chunk = this.getChunk(worldChunkX, worldChunkY);
    heightmap = [];
    heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);
    return heightmapData[chunkY][chunkX];
  },
  getChunk: function(worldChunkX, worldChunkY) {
    var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base, _ref;
    if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {
      return this.chunkCache[worldChunkY][worldChunkX];
    }
    worldTileWidth = config.worldTileWidth;
    worldTileHeight = config.worldTileHeight;
    worldChunkWidth = config.worldChunkWidth;
    worldChunkHeight = config.worldChunkHeight;
    chunkWidth = config.chunkWidth;
    chunkHeight = config.chunkHeight;
    maxElevation = config.maxElevation;
    seed = this.seed;
    nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;
    if (worldChunkX + 1 === worldChunkWidth) {
      ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;
    } else {
      ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
    }
    if (worldChunkY + 1 === worldChunkWidth) {
      sw = utils.random(worldChunkX + seed) * maxElevation;
      if (worldChunkX + 1 === worldChunkHeight) {
        se = utils.random(seed) * maxElevation;
      } else {
        se = utils.random(worldChunkX + 1 + seed) * maxElevation;
      }
    } else {
      sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      if (worldChunkX + 1 === worldChunkWidth) {
        se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      } else {
        se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
      }
    }
    if ((_ref = (_base = this.chunkCache)[worldChunkY]) == null) {
      _base[worldChunkY] = [];
    }
    return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);
  },
  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {
    var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;
    maxElevation = config.maxElevation;
    _results = [];
    for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {
      cellRow = cells[cy];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {
          cell = cellRow[cx];
          yIndex = cy + (worldChunkY * cells.length);
          xIndex = cx + (worldChunkX * cellRow.length);
          if (heightmap[yIndex] == null) {
            heightmap[yIndex] = [];
          }
          _results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));
        }
        return _results1;
      })());
    }
    return _results;
  },
  dispose: function() {
    _.each(this.chunkCache, function(chunkCacheRow) {
      return _.each(chunkCacheRow, function(chunkModel) {
        if (chunkModel != null) {
          return chunkModel.dispose();
        }
      });
    });
    return this._super();
  }
});

});

window.require.register('models/HeightmapChunk', function(require, module) {
var Model,
  __slice = [].slice;

Model = require("models/base/Model");

module.exports = Model.extend("HeightmapChunkModel", {
  create: function() {
    var args, model;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    model = this._super();
    model.cells = this.bilinearInterpolate.apply(this, args);
    return model;
  },
  bilinearInterpolate: function(nw, ne, se, sw, width, height) {
    var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;
    xLookup = [];
    cells = [];
    for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      cells[y] = [];
      yStep = y / (height - 1);
      for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        if (xLookup[x] != null) {
          xStep = xLookup[x];
        } else {
          xStep = xLookup[x] = x / (width - 1);
        }
        topHeight = nw + xStep * (ne - nw);
        bottomHeight = sw + xStep * (se - sw);
        cellHeight = topHeight + yStep * (bottomHeight - topHeight);
        cells[y][x] = Math.floor(cellHeight);
      }
    }
    return cells;
  }
}, {
  dispose: function() {
    return this._super();
  }
});

});

window.require.register('models/Tile', function(require, module) {
var Model;

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

window.require.register('models/TileMap', function(require, module) {
var HeightmapModel, Model, config, utils,
  __slice = [].slice;

Model = require("models/base/Model");

HeightmapModel = require("models/Heightmap");

config = require("config");

utils = require("lib/utils");

module.exports = Model.extend("TileMapModel", {
  create: function(tileSourceModelName) {
    var tileMapModel;
    tileMapModel = this._super();
    tileMapModel.tileCache = [];
    tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);
    return tileMapModel;
  }
}, {
  collectNeighbors: function(worldX, worldY) {
    var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;
    xl = config.worldTileWidth;
    yl = config.worldTileHeight;
    cx = function(ox) {
      return utils.clamp(ox, xl);
    };
    cy = function(oy) {
      return utils.clamp(oy, yl);
    };
    n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));
    e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);
    s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));
    w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);
    ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));
    se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));
    sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));
    nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));
    return [n, e, s, w, ne, se, sw, nw];
  },
  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {
    var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;
    data = [];
    xOffset = Math.floor(sliceWidth / 2);
    yOffset = Math.floor(sliceHeight / 2);
    _results = [];
    for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      data[y] = [];
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);
          worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);
          _results1.push(data[y][x] = this.getTile(worldX, worldY));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  },
  getCell: function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = this.tileSourceModel).getCell.apply(_ref, args);
  },
  getTile: function(worldX, worldY) {
    var cell, index, neighbors, _base, _ref;
    if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {
      return this.tileCache[worldY][worldX];
    }
    cell = this.tileSourceModel.getCell(worldX, worldY);
    neighbors = this.collectNeighbors(worldX, worldY);
    index = this.getIndexByNeighbors(cell, neighbors);
    if ((_ref = (_base = this.tileCache)[worldY]) == null) {
      _base[worldY] = [];
    }
    return this.tileCache[worldY][worldX] = index;
  },
  getIndexByNeighbors: function(tileValue, neighbors) {
    var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;
    index = 0;
    n = neighbors[0];
    e = neighbors[1];
    s = neighbors[2];
    w = neighbors[3];
    ne = neighbors[4];
    se = neighbors[5];
    sw = neighbors[6];
    nw = neighbors[7];
    if (tileValue) {
      a = n << n * 4;
      b = e << e * 5;
      c = s << s * 6;
      d = w << w * 7;
      e = ne << ne * 0;
      f = se << se * 1;
      g = nw << nw * 3;
      h = sw << sw * 2;
      index = a + b + c + d + e + f + g + h;
    }
    return index;
  },
  dispose: function() {
    this.tileSourceModel.dispose();
    return this._super();
  }
});

});

window.require.register('models/Viewport', function(require, module) {
var Model;

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

window.require.register('models/base/Model', function(require, module) {

module.exports = gamecore.DualPooled.extend("Model", {
  getUsedLength: function() {
    return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    return this.release();
  }
});

});

window.require.register('views/Creature', function(require, module) {
var View, config, utils;

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

window.require.register('views/EntityManager', function(require, module) {
var CreatureModel, CreatureView, View, config, utils;

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

window.require.register('views/Stage', function(require, module) {
var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;

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

window.require.register('views/Tile', function(require, module) {
var View, config, utils;

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

window.require.register('views/Viewport', function(require, module) {
var TileModel, TileView, View, config, utils;

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

window.require.register('views/base/View', function(require, module) {

module.exports = gamecore.DualPooled.extend("View", {
  getUsedLength: function() {
    return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    return this.release();
  }
});

});
