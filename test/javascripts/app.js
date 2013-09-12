if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/app.js'] === 'undefined'){_$jscoverage['public/javascripts/app.js']=[];
_$jscoverage['public/javascripts/app.js'].source=['window.require.register(\'config\', function(require, module) {',
'var config;',
'',
'module.exports = config = {',
'  seed: +(new Date),',
'  sessionSeed: +(new Date),',
'  spriteSheetSource: "images/tileset_terra.png",',
'  tileWidth: 16,',
'  tileHeight: 16,',
'  worldChunkWidth: 8,',
'  worldChunkHeight: 8,',
'  chunkWidth: 10,',
'  chunkHeight: 10,',
'  maxElevation: 10',
'};',
'',
'config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;',
'',
'config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;',
'',
'});',
'',
'window.require.register(\'index\', function(require, module) {',
'var Index, StageView;',
'',
'StageView = require("views/Stage");',
'',
'module.exports = Index = (function() {',
'',
'  function Index() {',
'    this.canvasEl = document.createElement("canvas");',
'    this.canvasEl.width = 480;',
'    this.canvasEl.height = 320;',
'    document.body.appendChild(this.canvasEl);',
'    this.stageView = StageView.create(this.canvasEl);',
'    this.canvasEl.id = "stage-view-" + this.stageView.objectId;',
'    document.onkeydown = this.onKeyDown;',
'    _.bindAll(this, "onElMouseDown");',
'    this.stageView.el.addEventListener("mousedown", this.onElMouseDown);',
'  }',
'',
'  Index.prototype.onElMouseDown = function(event) {',
'    return EventBus.dispatch("!mouse:down", this, event);',
'  };',
'',
'  Index.prototype.onKeyDown = function(event) {',
'    return EventBus.dispatch("!key:down", this, event);',
'  };',
'',
'  Index.prototype.dispose = function() {',
'    document.onkeydown = void 0;',
'    document.body.removeChild(this.canvasEl);',
'    this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);',
'    return this.stageView.dispose();',
'  };',
'',
'  return Index;',
'',
'})();',
'',
'});',
'',
'window.require.register(\'lib/utils\', function(require, module) {',
'var config, utils;',
'',
'config = require("config");',
'',
'module.exports = utils = {',
'  clamp: function(index, size) {',
'    return (index + size) % size;',
'  },',
'  random: function(seed) {',
'    return new RNG(seed).uniform();',
'  },',
'  sessionRandom: function() {',
'    var randomVal;',
'    randomVal = new RNG(config.sessionSeed).uniform();',
'    config.sessionSeed += 1;',
'    return randomVal;',
'  },',
'  tileHeightToType: function(height, maxElevation) {',
'    var type;',
'    if (height / maxElevation >= 0.5) {',
'      type = 1;',
'    } else {',
'      type = 0;',
'    }',
'    return type;',
'  },',
'  loadImages: function(callback) {',
'    this.tilesetImg = new Image();',
'    this.tilesetImg.onload = callback;',
'    return this.tilesetImg.src = config.spriteSheetSource;',
'  }',
'};',
'',
'});',
'',
'window.require.register(\'models/Creature\', function(require, module) {',
'var Model, config, utils;',
'',
'Model = require("models/base/Model");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = Model.extend("CreatureModel", {',
'  create: function(x, y, tileMapModel) {',
'    var creatureModel;',
'    creatureModel = this._super();',
'    creatureModel.x = x;',
'    creatureModel.y = y;',
'    creatureModel.direction = "South";',
'    creatureModel.tileMapModel = tileMapModel;',
'    return creatureModel;',
'  }',
'}, {',
'  setPosition: function(x, y) {',
'    if (y !== this.y || x !== this.x) {',
'      this.x = x;',
'      this.y = y;',
'      return EventBus.dispatch("!move:" + this.uniqueId);',
'    }',
'  },',
'  tick: function() {',
'    var dX, dY, foundSpot, giveUpCounter, newDirection, newX, newY, runOrRise, tile, _results;',
'    foundSpot = false;',
'    giveUpCounter = 6;',
'    _results = [];',
'    while (!foundSpot && giveUpCounter) {',
'      dX = 0;',
'      dY = 0;',
'      runOrRise = Math.floor(utils.sessionRandom() * 2) % 2;',
'      if (runOrRise) {',
'        dX = Math.floor(utils.sessionRandom() * 3) - 1;',
'      } else {',
'        dY = Math.floor(utils.sessionRandom() * 3) - 1;',
'      }',
'      newX = utils.clamp(this.x + dX, config.worldTileWidth);',
'      newY = utils.clamp(this.y + dY, config.worldTileHeight);',
'      tile = this.tileMapModel.getCell(newX, newY);',
'      newDirection = "South";',
'      if (dX > 0) {',
'        this.direction = "East";',
'      }',
'      if (dX < 0) {',
'        this.direction = "West";',
'      }',
'      if (dY > 0) {',
'        this.direction = "South";',
'      }',
'      if (dY < 0) {',
'        this.direction = "North";',
'      }',
'      if (tile === 1 && (newX !== this.x || newY !== this.y)) {',
'        this.setPosition(newX, newY);',
'        _results.push(foundSpot = true);',
'      } else {',
'        _results.push(giveUpCounter -= 1);',
'      }',
'    }',
'    return _results;',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'models/Heightmap\', function(require, module) {',
'var HeightmapChunkModel, Model, config, utils;',
'',
'Model = require("models/base/Model");',
'',
'utils = require("lib/utils");',
'',
'HeightmapChunkModel = require("models/HeightmapChunk");',
'',
'config = require("config");',
'',
'module.exports = Model.extend("HeightmapModel", {',
'  create: function(seed) {',
'    var heightmapModel;',
'    heightmapModel = this._super();',
'    heightmapModel.seed = seed;',
'    heightmapModel.chunkCache = [];',
'    return heightmapModel;',
'  }',
'}, {',
'  getCell: function(worldX, worldY) {',
'    var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;',
'    worldChunkX = Math.floor(worldX / config.chunkWidth);',
'    worldChunkY = Math.floor(worldY / config.chunkHeight);',
'    chunkX = worldX % config.chunkWidth;',
'    chunkY = worldY % config.chunkHeight;',
'    chunk = this.getChunk(worldChunkX, worldChunkY);',
'    heightmap = [];',
'    heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);',
'    return heightmapData[chunkY][chunkX];',
'  },',
'  getChunk: function(worldChunkX, worldChunkY) {',
'    var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base, _ref;',
'    if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {',
'      return this.chunkCache[worldChunkY][worldChunkX];',
'    }',
'    worldTileWidth = config.worldTileWidth;',
'    worldTileHeight = config.worldTileHeight;',
'    worldChunkWidth = config.worldChunkWidth;',
'    worldChunkHeight = config.worldChunkHeight;',
'    chunkWidth = config.chunkWidth;',
'    chunkHeight = config.chunkHeight;',
'    maxElevation = config.maxElevation;',
'    seed = this.seed;',
'    nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;',
'    if (worldChunkX + 1 === worldChunkWidth) {',
'      ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;',
'    } else {',
'      ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;',
'    }',
'    if (worldChunkY + 1 === worldChunkWidth) {',
'      sw = utils.random(worldChunkX + seed) * maxElevation;',
'      if (worldChunkX + 1 === worldChunkHeight) {',
'        se = utils.random(seed) * maxElevation;',
'      } else {',
'        se = utils.random(worldChunkX + 1 + seed) * maxElevation;',
'      }',
'    } else {',
'      sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;',
'      if (worldChunkX + 1 === worldChunkWidth) {',
'        se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;',
'      } else {',
'        se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;',
'      }',
'    }',
'    if ((_ref = (_base = this.chunkCache)[worldChunkY]) == null) {',
'      _base[worldChunkY] = [];',
'    }',
'    return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);',
'  },',
'  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {',
'    var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;',
'    maxElevation = config.maxElevation;',
'    _results = [];',
'    for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {',
'      cellRow = cells[cy];',
'      _results.push((function() {',
'        var _j, _len1, _results1;',
'        _results1 = [];',
'        for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {',
'          cell = cellRow[cx];',
'          yIndex = cy + (worldChunkY * cells.length);',
'          xIndex = cx + (worldChunkX * cellRow.length);',
'          if (heightmap[yIndex] == null) {',
'            heightmap[yIndex] = [];',
'          }',
'          _results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));',
'        }',
'        return _results1;',
'      })());',
'    }',
'    return _results;',
'  },',
'  dispose: function() {',
'    _.each(this.chunkCache, function(chunkCacheRow) {',
'      return _.each(chunkCacheRow, function(chunkModel) {',
'        if (chunkModel != null) {',
'          return chunkModel.dispose();',
'        }',
'      });',
'    });',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'models/HeightmapChunk\', function(require, module) {',
'var Model,',
'  __slice = [].slice;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("HeightmapChunkModel", {',
'  create: function() {',
'    var args, model;',
'    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];',
'    model = this._super();',
'    model.cells = this.bilinearInterpolate.apply(this, args);',
'    return model;',
'  },',
'  bilinearInterpolate: function(nw, ne, se, sw, width, height) {',
'    var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;',
'    xLookup = [];',
'    cells = [];',
'    for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      cells[y] = [];',
'      yStep = y / (height - 1);',
'      for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'        if (xLookup[x] != null) {',
'          xStep = xLookup[x];',
'        } else {',
'          xStep = xLookup[x] = x / (width - 1);',
'        }',
'        topHeight = nw + xStep * (ne - nw);',
'        bottomHeight = sw + xStep * (se - sw);',
'        cellHeight = topHeight + yStep * (bottomHeight - topHeight);',
'        cells[y][x] = Math.floor(cellHeight);',
'      }',
'    }',
'    return cells;',
'  }',
'}, {',
'  dispose: function() {',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'models/Tile\', function(require, module) {',
'var Model;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("TileModel", {',
'  create: function(index, x, y) {',
'    var model;',
'    model = this._super();',
'    model.index = index;',
'    model.x = x;',
'    model.y = y;',
'    return model;',
'  }',
'}, {',
'  setIndex: function(index) {',
'    if (this.index !== index) {',
'      this.index = index;',
'      return this.onChangeIndex();',
'    }',
'  },',
'  setIndexCallback: function(callback) {',
'    return this.onChangeIndex = callback;',
'  },',
'  onChangeIndex: function() {}',
'});',
'',
'});',
'',
'window.require.register(\'models/TileMap\', function(require, module) {',
'var HeightmapModel, Model, config, utils,',
'  __slice = [].slice;',
'',
'Model = require("models/base/Model");',
'',
'HeightmapModel = require("models/Heightmap");',
'',
'config = require("config");',
'',
'utils = require("lib/utils");',
'',
'module.exports = Model.extend("TileMapModel", {',
'  create: function(tileSourceModelName) {',
'    var tileMapModel;',
'    tileMapModel = this._super();',
'    tileMapModel.tileCache = [];',
'    tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);',
'    return tileMapModel;',
'  }',
'}, {',
'  collectNeighbors: function(worldX, worldY) {',
'    var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;',
'    xl = config.worldTileWidth;',
'    yl = config.worldTileHeight;',
'    cx = function(ox) {',
'      return utils.clamp(ox, xl);',
'    };',
'    cy = function(oy) {',
'      return utils.clamp(oy, yl);',
'    };',
'    n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));',
'    e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);',
'    s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));',
'    w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);',
'    ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));',
'    se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));',
'    sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));',
'    nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));',
'    return [n, e, s, w, ne, se, sw, nw];',
'  },',
'  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {',
'    var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;',
'    data = [];',
'    xOffset = Math.floor(sliceWidth / 2);',
'    yOffset = Math.floor(sliceHeight / 2);',
'    _results = [];',
'    for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      data[y] = [];',
'      _results.push((function() {',
'        var _j, _ref1, _results1;',
'        _results1 = [];',
'        for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'          worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);',
'          worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);',
'          _results1.push(data[y][x] = this.getTile(worldX, worldY));',
'        }',
'        return _results1;',
'      }).call(this));',
'    }',
'    return _results;',
'  },',
'  getCell: function() {',
'    var args, _ref;',
'    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];',
'    return (_ref = this.tileSourceModel).getCell.apply(_ref, args);',
'  },',
'  getTile: function(worldX, worldY) {',
'    var cell, index, neighbors, _base, _ref;',
'    if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {',
'      return this.tileCache[worldY][worldX];',
'    }',
'    cell = this.tileSourceModel.getCell(worldX, worldY);',
'    neighbors = this.collectNeighbors(worldX, worldY);',
'    index = this.getIndexByNeighbors(cell, neighbors);',
'    if ((_ref = (_base = this.tileCache)[worldY]) == null) {',
'      _base[worldY] = [];',
'    }',
'    return this.tileCache[worldY][worldX] = index;',
'  },',
'  getIndexByNeighbors: function(tileValue, neighbors) {',
'    var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;',
'    index = 0;',
'    n = neighbors[0];',
'    e = neighbors[1];',
'    s = neighbors[2];',
'    w = neighbors[3];',
'    ne = neighbors[4];',
'    se = neighbors[5];',
'    sw = neighbors[6];',
'    nw = neighbors[7];',
'    if (tileValue) {',
'      a = n << n * 4;',
'      b = e << e * 5;',
'      c = s << s * 6;',
'      d = w << w * 7;',
'      e = ne << ne * 0;',
'      f = se << se * 1;',
'      g = nw << nw * 3;',
'      h = sw << sw * 2;',
'      index = a + b + c + d + e + f + g + h;',
'    }',
'    return index;',
'  },',
'  dispose: function() {',
'    this.tileSourceModel.dispose();',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'models/Viewport\', function(require, module) {',
'var Model;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("ViewportModel", {',
'  create: function(x, y, width, height) {',
'    var model;',
'    model = this._super();',
'    model.x = x;',
'    model.y = y;',
'    model.width = width;',
'    model.height = height;',
'    return model;',
'  }',
'}, {',
'  setPosition: function(x, y) {',
'    if (y !== this.y || x !== this.x) {',
'      this.x = x;',
'      this.y = y;',
'      return EventBus.dispatch("!move:" + this.uniqueId, this);',
'    }',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'models/base/Model\', function(require, module) {',
'',
'module.exports = gamecore.DualPooled.extend("Model", {',
'  getUsedLength: function() {',
'    return this.getPool().usedList.length();',
'  }',
'}, {',
'  dispose: function() {',
'    return this.release();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'views/Creature\', function(require, module) {',
'var View, config, utils;',
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
'',
'});',
'',
'window.require.register(\'views/EntityManager\', function(require, module) {',
'var CreatureModel, CreatureView, View, config, utils;',
'',
'View = require("views/base/View");',
'',
'CreatureModel = require("models/Creature");',
'',
'CreatureView = require("views/Creature");',
'',
'config = require("config");',
'',
'utils = require("lib/utils");',
'',
'module.exports = View.extend("EntityManagerView", {',
'  create: function(viewportModel) {',
'    var entityManagerView;',
'    entityManagerView = this._super();',
'    entityManagerView.el = new createjs.Container;',
'    entityManagerView.creatureViews = [];',
'    entityManagerView.viewportModel = viewportModel;',
'    return entityManagerView;',
'  }',
'}, {',
'  onTick: function() {',
'    return _.each(this.creatureViews, function(creatureView) {',
'      return creatureView.model.tick();',
'    });',
'  },',
'  addCreatures: function(populationSize, tileMapModel) {',
'    var creatureCount, creatureModel, creatureView, s, tile, x, y, _results;',
'    creatureCount = 0;',
'    s = config.seed;',
'    _results = [];',
'    while (creatureCount < populationSize) {',
'      s += 1;',
'      x = Math.floor(utils.random(s) * config.worldTileWidth);',
'      y = Math.floor(utils.random(s + 1) * config.worldTileHeight);',
'      tile = tileMapModel.getCell(x, y);',
'      if (tile === 1) {',
'        creatureCount += 1;',
'        creatureModel = CreatureModel.create(x, y, tileMapModel);',
'        creatureView = CreatureView.create(creatureModel, this.viewportModel);',
'        this.el.addChild(creatureView.el);',
'        _results.push(this.creatureViews.push(creatureView));',
'      } else {',
'        _results.push(void 0);',
'      }',
'    }',
'    return _results;',
'  },',
'  dispose: function() {',
'    _.each(this.creatureViews, function(creatureView) {',
'      creatureView.model.dispose();',
'      return creatureView.dispose();',
'    });',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'views/Stage\', function(require, module) {',
'var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;',
'',
'View = require("views/base/View");',
'',
'ViewportModel = require("models/Viewport");',
'',
'ViewportView = require("views/Viewport");',
'',
'EntityManagerView = require("views/EntityManager");',
'',
'TileMapModel = require("models/TileMap");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("StageView", {',
'  create: function(canvasEl) {',
'    var stageView;',
'    stageView = this._super();',
'    stageView.el = new createjs.Stage(canvasEl);',
'    stageView.lastUpdate = 0;',
'    stageView.tileMapModel = TileMapModel.create(\'models/Heightmap\');',
'    stageView.viewportModel = ViewportModel.create(0, 0, 30, 20);',
'    stageView.viewportView = ViewportView.create(stageView.viewportModel, stageView.tileMapModel);',
'    stageView.el.addChild(stageView.viewportView.el);',
'    stageView.entityManagerView = EntityManagerView.create(stageView.viewportModel);',
'    stageView.el.addChild(stageView.entityManagerView.el);',
'    stageView.entityManagerView.addCreatures(100, stageView.tileMapModel);',
'    createjs.Ticker.setFPS(60);',
'    createjs.Ticker.useRAF = true;',
'    _.bindAll(stageView, "onTick");',
'    createjs.Ticker.addEventListener("tick", stageView.onTick);',
'    createjs.Touch.enable(stageView.el);',
'    stageView.el.update();',
'    return stageView;',
'  }',
'}, {',
'  onTick: function(event) {',
'    var timeDelta;',
'    this.el.update();',
'    timeDelta = event.time - this.lastUpdate;',
'    if (Math.floor(timeDelta / 500) >= 1) {',
'      this.entityManagerView.onTick();',
'      return this.lastUpdate = event.time;',
'    }',
'  },',
'  dispose: function() {',
'    createjs.Ticker.removeEventListener("tick", this.onTick);',
'    createjs.Touch.disable(this.el);',
'    this.tileMapModel.dispose();',
'    this.viewportView.dispose();',
'    this.viewportModel.dispose();',
'    this.entityManagerView.dispose();',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'views/Tile\', function(require, module) {',
'var View, config, utils;',
'',
'View = require("views/base/View");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("TileView", {',
'  create: function(tileModel) {',
'    var view;',
'    view = this._super();',
'    view.model = tileModel;',
'    view.el = new createjs.Bitmap(utils.tilesetImg);',
'    view.model.setIndexCallback(function() {',
'      return view.setSpritePosition();',
'    });',
'    view.setSpritePosition();',
'    return view;',
'  }',
'}, {',
'  setSpritePosition: function() {',
'    var index, x, y;',
'    index = this.model.index;',
'    x = index % config.tileWidth;',
'    y = Math.floor(index / config.tileHeight);',
'    return this.el.sourceRect = new createjs.Rectangle(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'views/Viewport\', function(require, module) {',
'var TileModel, TileView, View, config, utils;',
'',
'View = require("views/base/View");',
'',
'TileModel = require("models/Tile");',
'',
'TileView = require("views/Tile");',
'',
'utils = require("lib/utils");',
'',
'config = require("config");',
'',
'module.exports = View.extend("ViewportView", {',
'  create: function(viewportModel, tileMapModel) {',
'    var tileView, view, _i, _len, _ref;',
'    view = this._super();',
'    view.model = viewportModel;',
'    view.el = new createjs.Container;',
'    view.tileMapModel = tileMapModel;',
'    view.tileModels = this.buildTileModels(view);',
'    view.tileViews = this.buildTileViews(view);',
'    _ref = view.tileViews;',
'    for (_i = 0, _len = _ref.length; _i < _len; _i++) {',
'      tileView = _ref[_i];',
'      view.el.addChild(tileView.el);',
'    }',
'    EventBus.addEventListener("!key:down", view.onKeyDown, view);',
'    EventBus.addEventListener("!mouse:down", view.onMouseDown, view);',
'    EventBus.addEventListener("!move:" + view.model.uniqueId, view.drawMap, view);',
'    return view;',
'  },',
'  buildTileModels: function(view) {',
'    var model, tileMapData, tileMapModel, tileModel, tiles, x, y, _i, _j, _ref, _ref1;',
'    tileMapModel = view.tileMapModel;',
'    model = view.model;',
'    tileMapData = tileMapModel.getArea(model.width, model.height, model.x, model.y);',
'    tiles = [];',
'    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'        tileModel = TileModel.create(tileMapData[y][x], x, y);',
'        tiles.push(tileModel);',
'      }',
'    }',
'    return tiles;',
'  },',
'  buildTileViews: function(view, img) {',
'    var views;',
'    views = [];',
'    _.each(view.tileModels, function(tileModel) {',
'      var tileView;',
'      tileView = TileView.create(tileModel, img);',
'      tileView.el.x = tileModel.x * config.tileWidth;',
'      tileView.el.y = tileModel.y * config.tileHeight;',
'      return views.push(tileView);',
'    });',
'    return views;',
'  }',
'}, {',
'  drawMap: function() {',
'    var tileMapData, tileModel, x, y, _i, _ref, _results;',
'    tileMapData = this.tileMapModel.getArea(this.model.width, this.model.height, this.model.x, this.model.y);',
'    _results = [];',
'    for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {',
'      _results.push((function() {',
'        var _j, _ref1, _results1;',
'        _results1 = [];',
'        for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {',
'          tileModel = this.tileModels[x + tileMapData[y].length * y];',
'          _results1.push(tileModel.setIndex(tileMapData[y][x]));',
'        }',
'        return _results1;',
'      }).call(this));',
'    }',
'    return _results;',
'  },',
'  onMouseDown: function(_event, args) {',
'    var direction, dx, dy, halfHeight, halfWidth, keyCode;',
'    halfWidth = Math.floor(this.model.width / 2) * config.tileWidth;',
'    halfHeight = Math.floor(this.model.height / 2) * config.tileHeight;',
'    dx = args.stageX - halfWidth;',
'    dy = args.stageY - halfHeight;',
'    direction = Math.abs((Math.atan2(dx, dy) / Math.PI * 180) - 180);',
'    keyCode = 37;',
'    if (315 < direction || direction < 45) {',
'      keyCode = 38;',
'    } else if ((45 < direction && direction < 135)) {',
'      keyCode = 39;',
'    } else if ((135 < direction && direction < 225)) {',
'      keyCode = 40;',
'    } else if ((225 < direction && direction < 315)) {',
'      keyCode = 37;',
'    }',
'    return EventBus.dispatch("!key:down", this, {',
'      keyCode: keyCode',
'    });',
'  },',
'  onKeyDown: function(_event, args) {',
'    var x, y;',
'    x = this.model.x;',
'    y = this.model.y;',
'    switch (args.keyCode) {',
'      case 37:',
'        x = this.model.x - 1;',
'        x = utils.clamp(x, config.worldTileWidth);',
'        break;',
'      case 38:',
'        y = this.model.y - 1;',
'        y = utils.clamp(y, config.worldTileHeight);',
'        break;',
'      case 39:',
'        x = this.model.x + 1;',
'        x = utils.clamp(x, config.worldTileWidth);',
'        break;',
'      case 40:',
'        y = this.model.y + 1;',
'        y = utils.clamp(y, config.worldTileHeight);',
'    }',
'    return this.model.setPosition(x, y);',
'  },',
'  dispose: function() {',
'    _.each(this.tileModels, function(tileModel) {',
'      return tileModel.dispose();',
'    });',
'    _.each(this.tileViews, function(tileView) {',
'      return tileView.dispose();',
'    });',
'    EventBus.removeEventListener("!move:" + this.model.uniqueId, this.drawMap, this);',
'    EventBus.removeEventListener("!key:down", this.onKeyDown, this);',
'    EventBus.removeEventListener("!mouse:down", this.onMouseDown, this);',
'    return this._super();',
'  }',
'});',
'',
'});',
'',
'window.require.register(\'views/base/View\', function(require, module) {',
'',
'module.exports = gamecore.DualPooled.extend("View", {',
'  getUsedLength: function() {',
'    return this.getPool().usedList.length();',
'  }',
'}, {',
'  dispose: function() {',
'    return this.release();',
'  }',
'});',
'',
'});',
''];
_$jscoverage['public/javascripts/app.js'][468]=0;
_$jscoverage['public/javascripts/app.js'][2]=0;
_$jscoverage['public/javascripts/app.js'][1]=0;
_$jscoverage['public/javascripts/app.js'][470]=0;
_$jscoverage['public/javascripts/app.js'][19]=0;
_$jscoverage['public/javascripts/app.js'][17]=0;
_$jscoverage['public/javascripts/app.js'][4]=0;
_$jscoverage['public/javascripts/app.js'][472]=0;
_$jscoverage['public/javascripts/app.js'][31]=0;
_$jscoverage['public/javascripts/app.js'][24]=0;
_$jscoverage['public/javascripts/app.js'][26]=0;
_$jscoverage['public/javascripts/app.js'][23]=0;
_$jscoverage['public/javascripts/app.js'][28]=0;
_$jscoverage['public/javascripts/app.js'][30]=0;
_$jscoverage['public/javascripts/app.js'][479]=0;
_$jscoverage['public/javascripts/app.js'][38]=0;
_$jscoverage['public/javascripts/app.js'][37]=0;
_$jscoverage['public/javascripts/app.js'][32]=0;
_$jscoverage['public/javascripts/app.js'][33]=0;
_$jscoverage['public/javascripts/app.js'][34]=0;
_$jscoverage['public/javascripts/app.js'][35]=0;
_$jscoverage['public/javascripts/app.js'][36]=0;
_$jscoverage['public/javascripts/app.js'][460]=0;
_$jscoverage['public/javascripts/app.js'][52]=0;
_$jscoverage['public/javascripts/app.js'][39]=0;
_$jscoverage['public/javascripts/app.js'][50]=0;
_$jscoverage['public/javascripts/app.js'][43]=0;
_$jscoverage['public/javascripts/app.js'][51]=0;
_$jscoverage['public/javascripts/app.js'][46]=0;
_$jscoverage['public/javascripts/app.js'][42]=0;
_$jscoverage['public/javascripts/app.js'][47]=0;
_$jscoverage['public/javascripts/app.js'][502]=0;
_$jscoverage['public/javascripts/app.js'][70]=0;
_$jscoverage['public/javascripts/app.js'][53]=0;
_$jscoverage['public/javascripts/app.js'][54]=0;
_$jscoverage['public/javascripts/app.js'][57]=0;
_$jscoverage['public/javascripts/app.js'][64]=0;
_$jscoverage['public/javascripts/app.js'][66]=0;
_$jscoverage['public/javascripts/app.js'][63]=0;
_$jscoverage['public/javascripts/app.js'][68]=0;
_$jscoverage['public/javascripts/app.js'][512]=0;
_$jscoverage['public/javascripts/app.js'][83]=0;
_$jscoverage['public/javascripts/app.js'][73]=0;
_$jscoverage['public/javascripts/app.js'][76]=0;
_$jscoverage['public/javascripts/app.js'][77]=0;
_$jscoverage['public/javascripts/app.js'][78]=0;
_$jscoverage['public/javascripts/app.js'][79]=0;
_$jscoverage['public/javascripts/app.js'][82]=0;
_$jscoverage['public/javascripts/app.js'][516]=0;
_$jscoverage['public/javascripts/app.js'][102]=0;
_$jscoverage['public/javascripts/app.js'][88]=0;
_$jscoverage['public/javascripts/app.js'][91]=0;
_$jscoverage['public/javascripts/app.js'][92]=0;
_$jscoverage['public/javascripts/app.js'][93]=0;
_$jscoverage['public/javascripts/app.js'][86]=0;
_$jscoverage['public/javascripts/app.js'][84]=0;
_$jscoverage['public/javascripts/app.js'][100]=0;
_$jscoverage['public/javascripts/app.js'][99]=0;
_$jscoverage['public/javascripts/app.js'][521]=0;
_$jscoverage['public/javascripts/app.js'][121]=0;
_$jscoverage['public/javascripts/app.js'][104]=0;
_$jscoverage['public/javascripts/app.js'][120]=0;
_$jscoverage['public/javascripts/app.js'][106]=0;
_$jscoverage['public/javascripts/app.js'][110]=0;
_$jscoverage['public/javascripts/app.js'][111]=0;
_$jscoverage['public/javascripts/app.js'][112]=0;
_$jscoverage['public/javascripts/app.js'][113]=0;
_$jscoverage['public/javascripts/app.js'][114]=0;
_$jscoverage['public/javascripts/app.js'][115]=0;
_$jscoverage['public/javascripts/app.js'][116]=0;
_$jscoverage['public/javascripts/app.js'][108]=0;
_$jscoverage['public/javascripts/app.js'][572]=0;
_$jscoverage['public/javascripts/app.js'][135]=0;
_$jscoverage['public/javascripts/app.js'][122]=0;
_$jscoverage['public/javascripts/app.js'][123]=0;
_$jscoverage['public/javascripts/app.js'][127]=0;
_$jscoverage['public/javascripts/app.js'][128]=0;
_$jscoverage['public/javascripts/app.js'][129]=0;
_$jscoverage['public/javascripts/app.js'][130]=0;
_$jscoverage['public/javascripts/app.js'][132]=0;
_$jscoverage['public/javascripts/app.js'][133]=0;
_$jscoverage['public/javascripts/app.js'][134]=0;
_$jscoverage['public/javascripts/app.js'][131]=0;
_$jscoverage['public/javascripts/app.js'][582]=0;
_$jscoverage['public/javascripts/app.js'][153]=0;
_$jscoverage['public/javascripts/app.js'][140]=0;
_$jscoverage['public/javascripts/app.js'][141]=0;
_$jscoverage['public/javascripts/app.js'][142]=0;
_$jscoverage['public/javascripts/app.js'][143]=0;
_$jscoverage['public/javascripts/app.js'][145]=0;
_$jscoverage['public/javascripts/app.js'][138]=0;
_$jscoverage['public/javascripts/app.js'][136]=0;
_$jscoverage['public/javascripts/app.js'][144]=0;
_$jscoverage['public/javascripts/app.js'][148]=0;
_$jscoverage['public/javascripts/app.js'][147]=0;
_$jscoverage['public/javascripts/app.js'][151]=0;
_$jscoverage['public/javascripts/app.js'][150]=0;
_$jscoverage['public/javascripts/app.js'][593]=0;
_$jscoverage['public/javascripts/app.js'][182]=0;
_$jscoverage['public/javascripts/app.js'][157]=0;
_$jscoverage['public/javascripts/app.js'][158]=0;
_$jscoverage['public/javascripts/app.js'][160]=0;
_$jscoverage['public/javascripts/app.js'][156]=0;
_$jscoverage['public/javascripts/app.js'][154]=0;
_$jscoverage['public/javascripts/app.js'][163]=0;
_$jscoverage['public/javascripts/app.js'][170]=0;
_$jscoverage['public/javascripts/app.js'][172]=0;
_$jscoverage['public/javascripts/app.js'][174]=0;
_$jscoverage['public/javascripts/app.js'][176]=0;
_$jscoverage['public/javascripts/app.js'][178]=0;
_$jscoverage['public/javascripts/app.js'][169]=0;
_$jscoverage['public/javascripts/app.js'][180]=0;
_$jscoverage['public/javascripts/app.js'][603]=0;
_$jscoverage['public/javascripts/app.js'][203]=0;
_$jscoverage['public/javascripts/app.js'][202]=0;
_$jscoverage['public/javascripts/app.js'][183]=0;
_$jscoverage['public/javascripts/app.js'][184]=0;
_$jscoverage['public/javascripts/app.js'][185]=0;
_$jscoverage['public/javascripts/app.js'][186]=0;
_$jscoverage['public/javascripts/app.js'][190]=0;
_$jscoverage['public/javascripts/app.js'][191]=0;
_$jscoverage['public/javascripts/app.js'][192]=0;
_$jscoverage['public/javascripts/app.js'][193]=0;
_$jscoverage['public/javascripts/app.js'][194]=0;
_$jscoverage['public/javascripts/app.js'][195]=0;
_$jscoverage['public/javascripts/app.js'][196]=0;
_$jscoverage['public/javascripts/app.js'][197]=0;
_$jscoverage['public/javascripts/app.js'][198]=0;
_$jscoverage['public/javascripts/app.js'][201]=0;
_$jscoverage['public/javascripts/app.js'][612]=0;
_$jscoverage['public/javascripts/app.js'][221]=0;
_$jscoverage['public/javascripts/app.js'][205]=0;
_$jscoverage['public/javascripts/app.js'][206]=0;
_$jscoverage['public/javascripts/app.js'][207]=0;
_$jscoverage['public/javascripts/app.js'][219]=0;
_$jscoverage['public/javascripts/app.js'][208]=0;
_$jscoverage['public/javascripts/app.js'][209]=0;
_$jscoverage['public/javascripts/app.js'][210]=0;
_$jscoverage['public/javascripts/app.js'][211]=0;
_$jscoverage['public/javascripts/app.js'][212]=0;
_$jscoverage['public/javascripts/app.js'][213]=0;
_$jscoverage['public/javascripts/app.js'][215]=0;
_$jscoverage['public/javascripts/app.js'][217]=0;
_$jscoverage['public/javascripts/app.js'][214]=0;
_$jscoverage['public/javascripts/app.js'][220]=0;
_$jscoverage['public/javascripts/app.js'][621]=0;
_$jscoverage['public/javascripts/app.js'][250]=0;
_$jscoverage['public/javascripts/app.js'][227]=0;
_$jscoverage['public/javascripts/app.js'][229]=0;
_$jscoverage['public/javascripts/app.js'][231]=0;
_$jscoverage['public/javascripts/app.js'][248]=0;
_$jscoverage['public/javascripts/app.js'][228]=0;
_$jscoverage['public/javascripts/app.js'][245]=0;
_$jscoverage['public/javascripts/app.js'][243]=0;
_$jscoverage['public/javascripts/app.js'][235]=0;
_$jscoverage['public/javascripts/app.js'][234]=0;
_$jscoverage['public/javascripts/app.js'][237]=0;
_$jscoverage['public/javascripts/app.js'][240]=0;
_$jscoverage['public/javascripts/app.js'][241]=0;
_$jscoverage['public/javascripts/app.js'][242]=0;
_$jscoverage['public/javascripts/app.js'][224]=0;
_$jscoverage['public/javascripts/app.js'][222]=0;
_$jscoverage['public/javascripts/app.js'][244]=0;
_$jscoverage['public/javascripts/app.js'][246]=0;
_$jscoverage['public/javascripts/app.js'][247]=0;
_$jscoverage['public/javascripts/app.js'][249]=0;
_$jscoverage['public/javascripts/app.js'][636]=0;
_$jscoverage['public/javascripts/app.js'][286]=0;
_$jscoverage['public/javascripts/app.js'][251]=0;
_$jscoverage['public/javascripts/app.js'][253]=0;
_$jscoverage['public/javascripts/app.js'][252]=0;
_$jscoverage['public/javascripts/app.js'][255]=0;
_$jscoverage['public/javascripts/app.js'][257]=0;
_$jscoverage['public/javascripts/app.js'][260]=0;
_$jscoverage['public/javascripts/app.js'][266]=0;
_$jscoverage['public/javascripts/app.js'][265]=0;
_$jscoverage['public/javascripts/app.js'][264]=0;
_$jscoverage['public/javascripts/app.js'][263]=0;
_$jscoverage['public/javascripts/app.js'][270]=0;
_$jscoverage['public/javascripts/app.js'][277]=0;
_$jscoverage['public/javascripts/app.js'][280]=0;
_$jscoverage['public/javascripts/app.js'][284]=0;
_$jscoverage['public/javascripts/app.js'][285]=0;
_$jscoverage['public/javascripts/app.js'][276]=0;
_$jscoverage['public/javascripts/app.js'][282]=0;
_$jscoverage['public/javascripts/app.js'][656]=0;
_$jscoverage['public/javascripts/app.js'][313]=0;
_$jscoverage['public/javascripts/app.js'][309]=0;
_$jscoverage['public/javascripts/app.js'][287]=0;
_$jscoverage['public/javascripts/app.js'][288]=0;
_$jscoverage['public/javascripts/app.js'][291]=0;
_$jscoverage['public/javascripts/app.js'][292]=0;
_$jscoverage['public/javascripts/app.js'][293]=0;
_$jscoverage['public/javascripts/app.js'][295]=0;
_$jscoverage['public/javascripts/app.js'][296]=0;
_$jscoverage['public/javascripts/app.js'][299]=0;
_$jscoverage['public/javascripts/app.js'][301]=0;
_$jscoverage['public/javascripts/app.js'][298]=0;
_$jscoverage['public/javascripts/app.js'][303]=0;
_$jscoverage['public/javascripts/app.js'][304]=0;
_$jscoverage['public/javascripts/app.js'][305]=0;
_$jscoverage['public/javascripts/app.js'][306]=0;
_$jscoverage['public/javascripts/app.js'][297]=0;
_$jscoverage['public/javascripts/app.js'][294]=0;
_$jscoverage['public/javascripts/app.js'][671]=0;
_$jscoverage['public/javascripts/app.js'][356]=0;
_$jscoverage['public/javascripts/app.js'][320]=0;
_$jscoverage['public/javascripts/app.js'][322]=0;
_$jscoverage['public/javascripts/app.js'][326]=0;
_$jscoverage['public/javascripts/app.js'][327]=0;
_$jscoverage['public/javascripts/app.js'][328]=0;
_$jscoverage['public/javascripts/app.js'][329]=0;
_$jscoverage['public/javascripts/app.js'][330]=0;
_$jscoverage['public/javascripts/app.js'][331]=0;
_$jscoverage['public/javascripts/app.js'][336]=0;
_$jscoverage['public/javascripts/app.js'][337]=0;
_$jscoverage['public/javascripts/app.js'][335]=0;
_$jscoverage['public/javascripts/app.js'][341]=0;
_$jscoverage['public/javascripts/app.js'][324]=0;
_$jscoverage['public/javascripts/app.js'][319]=0;
_$jscoverage['public/javascripts/app.js'][349]=0;
_$jscoverage['public/javascripts/app.js'][352]=0;
_$jscoverage['public/javascripts/app.js'][354]=0;
_$jscoverage['public/javascripts/app.js'][348]=0;
_$jscoverage['public/javascripts/app.js'][687]=0;
_$jscoverage['public/javascripts/app.js'][385]=0;
_$jscoverage['public/javascripts/app.js'][358]=0;
_$jscoverage['public/javascripts/app.js'][362]=0;
_$jscoverage['public/javascripts/app.js'][363]=0;
_$jscoverage['public/javascripts/app.js'][364]=0;
_$jscoverage['public/javascripts/app.js'][365]=0;
_$jscoverage['public/javascripts/app.js'][366]=0;
_$jscoverage['public/javascripts/app.js'][370]=0;
_$jscoverage['public/javascripts/app.js'][371]=0;
_$jscoverage['public/javascripts/app.js'][372]=0;
_$jscoverage['public/javascripts/app.js'][374]=0;
_$jscoverage['public/javascripts/app.js'][373]=0;
_$jscoverage['public/javascripts/app.js'][377]=0;
_$jscoverage['public/javascripts/app.js'][376]=0;
_$jscoverage['public/javascripts/app.js'][379]=0;
_$jscoverage['public/javascripts/app.js'][380]=0;
_$jscoverage['public/javascripts/app.js'][381]=0;
_$jscoverage['public/javascripts/app.js'][382]=0;
_$jscoverage['public/javascripts/app.js'][383]=0;
_$jscoverage['public/javascripts/app.js'][384]=0;
_$jscoverage['public/javascripts/app.js'][360]=0;
_$jscoverage['public/javascripts/app.js'][702]=0;
_$jscoverage['public/javascripts/app.js'][416]=0;
_$jscoverage['public/javascripts/app.js'][386]=0;
_$jscoverage['public/javascripts/app.js'][387]=0;
_$jscoverage['public/javascripts/app.js'][390]=0;
_$jscoverage['public/javascripts/app.js'][391]=0;
_$jscoverage['public/javascripts/app.js'][392]=0;
_$jscoverage['public/javascripts/app.js'][393]=0;
_$jscoverage['public/javascripts/app.js'][394]=0;
_$jscoverage['public/javascripts/app.js'][396]=0;
_$jscoverage['public/javascripts/app.js'][398]=0;
_$jscoverage['public/javascripts/app.js'][399]=0;
_$jscoverage['public/javascripts/app.js'][401]=0;
_$jscoverage['public/javascripts/app.js'][402]=0;
_$jscoverage['public/javascripts/app.js'][403]=0;
_$jscoverage['public/javascripts/app.js'][400]=0;
_$jscoverage['public/javascripts/app.js'][405]=0;
_$jscoverage['public/javascripts/app.js'][397]=0;
_$jscoverage['public/javascripts/app.js'][395]=0;
_$jscoverage['public/javascripts/app.js'][408]=0;
_$jscoverage['public/javascripts/app.js'][411]=0;
_$jscoverage['public/javascripts/app.js'][412]=0;
_$jscoverage['public/javascripts/app.js'][413]=0;
_$jscoverage['public/javascripts/app.js'][728]=0;
_$jscoverage['public/javascripts/app.js'][444]=0;
_$jscoverage['public/javascripts/app.js'][418]=0;
_$jscoverage['public/javascripts/app.js'][417]=0;
_$jscoverage['public/javascripts/app.js'][420]=0;
_$jscoverage['public/javascripts/app.js'][439]=0;
_$jscoverage['public/javascripts/app.js'][421]=0;
_$jscoverage['public/javascripts/app.js'][422]=0;
_$jscoverage['public/javascripts/app.js'][424]=0;
_$jscoverage['public/javascripts/app.js'][443]=0;
_$jscoverage['public/javascripts/app.js'][442]=0;
_$jscoverage['public/javascripts/app.js'][423]=0;
_$jscoverage['public/javascripts/app.js'][426]=0;
_$jscoverage['public/javascripts/app.js'][429]=0;
_$jscoverage['public/javascripts/app.js'][441]=0;
_$jscoverage['public/javascripts/app.js'][430]=0;
_$jscoverage['public/javascripts/app.js'][440]=0;
_$jscoverage['public/javascripts/app.js'][431]=0;
_$jscoverage['public/javascripts/app.js'][438]=0;
_$jscoverage['public/javascripts/app.js'][432]=0;
_$jscoverage['public/javascripts/app.js'][433]=0;
_$jscoverage['public/javascripts/app.js'][437]=0;
_$jscoverage['public/javascripts/app.js'][434]=0;
_$jscoverage['public/javascripts/app.js'][435]=0;
_$jscoverage['public/javascripts/app.js'][436]=0;
_$jscoverage['public/javascripts/app.js'][740]=0;
_$jscoverage['public/javascripts/app.js'][465]=0;
_$jscoverage['public/javascripts/app.js'][445]=0;
_$jscoverage['public/javascripts/app.js'][446]=0;
_$jscoverage['public/javascripts/app.js'][447]=0;
_$jscoverage['public/javascripts/app.js'][448]=0;
_$jscoverage['public/javascripts/app.js'][450]=0;
_$jscoverage['public/javascripts/app.js'][453]=0;
_$jscoverage['public/javascripts/app.js'][454]=0;
_$jscoverage['public/javascripts/app.js'][461]=0;
_$jscoverage['public/javascripts/app.js'][463]=0;
_$jscoverage['public/javascripts/app.js'][749]=0;
_$jscoverage['public/javascripts/app.js'][514]=0;
_$jscoverage['public/javascripts/app.js'][478]=0;
_$jscoverage['public/javascripts/app.js'][491]=0;
_$jscoverage['public/javascripts/app.js'][495]=0;
_$jscoverage['public/javascripts/app.js'][489]=0;
_$jscoverage['public/javascripts/app.js'][487]=0;
_$jscoverage['public/javascripts/app.js'][473]=0;
_$jscoverage['public/javascripts/app.js'][477]=0;
_$jscoverage['public/javascripts/app.js'][504]=0;
_$jscoverage['public/javascripts/app.js'][501]=0;
_$jscoverage['public/javascripts/app.js'][510]=0;
_$jscoverage['public/javascripts/app.js'][506]=0;
_$jscoverage['public/javascripts/app.js'][508]=0;
_$jscoverage['public/javascripts/app.js'][471]=0;
_$jscoverage['public/javascripts/app.js'][480]=0;
_$jscoverage['public/javascripts/app.js'][513]=0;
_$jscoverage['public/javascripts/app.js'][467]=0;
_$jscoverage['public/javascripts/app.js'][469]=0;
_$jscoverage['public/javascripts/app.js'][761]=0;
_$jscoverage['public/javascripts/app.js'][580]=0;
_$jscoverage['public/javascripts/app.js'][579]=0;
_$jscoverage['public/javascripts/app.js'][515]=0;
_$jscoverage['public/javascripts/app.js'][574]=0;
_$jscoverage['public/javascripts/app.js'][517]=0;
_$jscoverage['public/javascripts/app.js'][518]=0;
_$jscoverage['public/javascripts/app.js'][519]=0;
_$jscoverage['public/javascripts/app.js'][577]=0;
_$jscoverage['public/javascripts/app.js'][520]=0;
_$jscoverage['public/javascripts/app.js'][522]=0;
_$jscoverage['public/javascripts/app.js'][523]=0;
_$jscoverage['public/javascripts/app.js'][524]=0;
_$jscoverage['public/javascripts/app.js'][525]=0;
_$jscoverage['public/javascripts/app.js'][526]=0;
_$jscoverage['public/javascripts/app.js'][576]=0;
_$jscoverage['public/javascripts/app.js'][571]=0;
_$jscoverage['public/javascripts/app.js'][573]=0;
_$jscoverage['public/javascripts/app.js'][780]=0;
_$jscoverage['public/javascripts/app.js'][606]=0;
_$jscoverage['public/javascripts/app.js'][583]=0;
_$jscoverage['public/javascripts/app.js'][585]=0;
_$jscoverage['public/javascripts/app.js'][587]=0;
_$jscoverage['public/javascripts/app.js'][588]=0;
_$jscoverage['public/javascripts/app.js'][605]=0;
_$jscoverage['public/javascripts/app.js'][589]=0;
_$jscoverage['public/javascripts/app.js'][596]=0;
_$jscoverage['public/javascripts/app.js'][597]=0;
_$jscoverage['public/javascripts/app.js'][599]=0;
_$jscoverage['public/javascripts/app.js'][598]=0;
_$jscoverage['public/javascripts/app.js'][601]=0;
_$jscoverage['public/javascripts/app.js'][602]=0;
_$jscoverage['public/javascripts/app.js'][604]=0;
_$jscoverage['public/javascripts/app.js'][792]=0;
_$jscoverage['public/javascripts/app.js'][625]=0;
_$jscoverage['public/javascripts/app.js'][624]=0;
_$jscoverage['public/javascripts/app.js'][607]=0;
_$jscoverage['public/javascripts/app.js'][608]=0;
_$jscoverage['public/javascripts/app.js'][609]=0;
_$jscoverage['public/javascripts/app.js'][610]=0;
_$jscoverage['public/javascripts/app.js'][611]=0;
_$jscoverage['public/javascripts/app.js'][613]=0;
_$jscoverage['public/javascripts/app.js'][622]=0;
_$jscoverage['public/javascripts/app.js'][614]=0;
_$jscoverage['public/javascripts/app.js'][616]=0;
_$jscoverage['public/javascripts/app.js'][615]=0;
_$jscoverage['public/javascripts/app.js'][618]=0;
_$jscoverage['public/javascripts/app.js'][619]=0;
_$jscoverage['public/javascripts/app.js'][803]=0;
_$jscoverage['public/javascripts/app.js'][648]=0;
_$jscoverage['public/javascripts/app.js'][627]=0;
_$jscoverage['public/javascripts/app.js'][628]=0;
_$jscoverage['public/javascripts/app.js'][641]=0;
_$jscoverage['public/javascripts/app.js'][629]=0;
_$jscoverage['public/javascripts/app.js'][630]=0;
_$jscoverage['public/javascripts/app.js'][631]=0;
_$jscoverage['public/javascripts/app.js'][632]=0;
_$jscoverage['public/javascripts/app.js'][647]=0;
_$jscoverage['public/javascripts/app.js'][635]=0;
_$jscoverage['public/javascripts/app.js'][639]=0;
_$jscoverage['public/javascripts/app.js'][640]=0;
_$jscoverage['public/javascripts/app.js'][818]=0;
_$jscoverage['public/javascripts/app.js'][672]=0;
_$jscoverage['public/javascripts/app.js'][650]=0;
_$jscoverage['public/javascripts/app.js'][652]=0;
_$jscoverage['public/javascripts/app.js'][654]=0;
_$jscoverage['public/javascripts/app.js'][658]=0;
_$jscoverage['public/javascripts/app.js'][662]=0;
_$jscoverage['public/javascripts/app.js'][663]=0;
_$jscoverage['public/javascripts/app.js'][664]=0;
_$jscoverage['public/javascripts/app.js'][665]=0;
_$jscoverage['public/javascripts/app.js'][667]=0;
_$jscoverage['public/javascripts/app.js'][660]=0;
_$jscoverage['public/javascripts/app.js'][666]=0;
_$jscoverage['public/javascripts/app.js'][824]=0;
_$jscoverage['public/javascripts/app.js'][690]=0;
_$jscoverage['public/javascripts/app.js'][685]=0;
_$jscoverage['public/javascripts/app.js'][680]=0;
_$jscoverage['public/javascripts/app.js'][676]=0;
_$jscoverage['public/javascripts/app.js'][677]=0;
_$jscoverage['public/javascripts/app.js'][678]=0;
_$jscoverage['public/javascripts/app.js'][679]=0;
_$jscoverage['public/javascripts/app.js'][689]=0;
_$jscoverage['public/javascripts/app.js'][688]=0;
_$jscoverage['public/javascripts/app.js'][686]=0;
_$jscoverage['public/javascripts/app.js'][681]=0;
_$jscoverage['public/javascripts/app.js'][682]=0;
_$jscoverage['public/javascripts/app.js'][683]=0;
_$jscoverage['public/javascripts/app.js'][684]=0;
_$jscoverage['public/javascripts/app.js'][835]=0;
_$jscoverage['public/javascripts/app.js'][717]=0;
_$jscoverage['public/javascripts/app.js'][692]=0;
_$jscoverage['public/javascripts/app.js'][695]=0;
_$jscoverage['public/javascripts/app.js'][699]=0;
_$jscoverage['public/javascripts/app.js'][715]=0;
_$jscoverage['public/javascripts/app.js'][700]=0;
_$jscoverage['public/javascripts/app.js'][698]=0;
_$jscoverage['public/javascripts/app.js'][708]=0;
_$jscoverage['public/javascripts/app.js'][709]=0;
_$jscoverage['public/javascripts/app.js'][711]=0;
_$jscoverage['public/javascripts/app.js'][713]=0;
_$jscoverage['public/javascripts/app.js'][843]=0;
_$jscoverage['public/javascripts/app.js'][735]=0;
_$jscoverage['public/javascripts/app.js'][719]=0;
_$jscoverage['public/javascripts/app.js'][721]=0;
_$jscoverage['public/javascripts/app.js'][723]=0;
_$jscoverage['public/javascripts/app.js'][734]=0;
_$jscoverage['public/javascripts/app.js'][727]=0;
_$jscoverage['public/javascripts/app.js'][729]=0;
_$jscoverage['public/javascripts/app.js'][730]=0;
_$jscoverage['public/javascripts/app.js'][731]=0;
_$jscoverage['public/javascripts/app.js'][725]=0;
_$jscoverage['public/javascripts/app.js'][733]=0;
_$jscoverage['public/javascripts/app.js'][732]=0;
_$jscoverage['public/javascripts/app.js'][852]=0;
_$jscoverage['public/javascripts/app.js'][752]=0;
_$jscoverage['public/javascripts/app.js'][751]=0;
_$jscoverage['public/javascripts/app.js'][736]=0;
_$jscoverage['public/javascripts/app.js'][737]=0;
_$jscoverage['public/javascripts/app.js'][738]=0;
_$jscoverage['public/javascripts/app.js'][739]=0;
_$jscoverage['public/javascripts/app.js'][750]=0;
_$jscoverage['public/javascripts/app.js'][741]=0;
_$jscoverage['public/javascripts/app.js'][742]=0;
_$jscoverage['public/javascripts/app.js'][748]=0;
_$jscoverage['public/javascripts/app.js'][744]=0;
_$jscoverage['public/javascripts/app.js'][743]=0;
_$jscoverage['public/javascripts/app.js'][862]=0;
_$jscoverage['public/javascripts/app.js'][772]=0;
_$jscoverage['public/javascripts/app.js'][753]=0;
_$jscoverage['public/javascripts/app.js'][770]=0;
_$jscoverage['public/javascripts/app.js'][757]=0;
_$jscoverage['public/javascripts/app.js'][758]=0;
_$jscoverage['public/javascripts/app.js'][759]=0;
_$jscoverage['public/javascripts/app.js'][760]=0;
_$jscoverage['public/javascripts/app.js'][762]=0;
_$jscoverage['public/javascripts/app.js'][769]=0;
_$jscoverage['public/javascripts/app.js'][763]=0;
_$jscoverage['public/javascripts/app.js'][870]=0;
_$jscoverage['public/javascripts/app.js'][788]=0;
_$jscoverage['public/javascripts/app.js'][774]=0;
_$jscoverage['public/javascripts/app.js'][776]=0;
_$jscoverage['public/javascripts/app.js'][781]=0;
_$jscoverage['public/javascripts/app.js'][778]=0;
_$jscoverage['public/javascripts/app.js'][787]=0;
_$jscoverage['public/javascripts/app.js'][784]=0;
_$jscoverage['public/javascripts/app.js'][782]=0;
_$jscoverage['public/javascripts/app.js'][783]=0;
_$jscoverage['public/javascripts/app.js'][785]=0;
_$jscoverage['public/javascripts/app.js'][876]=0;
_$jscoverage['public/javascripts/app.js'][811]=0;
_$jscoverage['public/javascripts/app.js'][802]=0;
_$jscoverage['public/javascripts/app.js'][809]=0;
_$jscoverage['public/javascripts/app.js'][793]=0;
_$jscoverage['public/javascripts/app.js'][794]=0;
_$jscoverage['public/javascripts/app.js'][795]=0;
_$jscoverage['public/javascripts/app.js'][796]=0;
_$jscoverage['public/javascripts/app.js'][805]=0;
_$jscoverage['public/javascripts/app.js'][807]=0;
_$jscoverage['public/javascripts/app.js'][883]=0;
_$jscoverage['public/javascripts/app.js'][826]=0;
_$jscoverage['public/javascripts/app.js'][825]=0;
_$jscoverage['public/javascripts/app.js'][817]=0;
_$jscoverage['public/javascripts/app.js'][815]=0;
_$jscoverage['public/javascripts/app.js'][813]=0;
_$jscoverage['public/javascripts/app.js'][819]=0;
_$jscoverage['public/javascripts/app.js'][823]=0;
_$jscoverage['public/javascripts/app.js'][820]=0;
_$jscoverage['public/javascripts/app.js'][821]=0;
_$jscoverage['public/javascripts/app.js'][822]=0;
_$jscoverage['public/javascripts/app.js'][891]=0;
_$jscoverage['public/javascripts/app.js'][839]=0;
_$jscoverage['public/javascripts/app.js'][838]=0;
_$jscoverage['public/javascripts/app.js'][829]=0;
_$jscoverage['public/javascripts/app.js'][830]=0;
_$jscoverage['public/javascripts/app.js'][827]=0;
_$jscoverage['public/javascripts/app.js'][831]=0;
_$jscoverage['public/javascripts/app.js'][832]=0;
_$jscoverage['public/javascripts/app.js'][837]=0;
_$jscoverage['public/javascripts/app.js'][836]=0;
_$jscoverage['public/javascripts/app.js'][886]=0;
_$jscoverage['public/javascripts/app.js'][854]=0;
_$jscoverage['public/javascripts/app.js'][841]=0;
_$jscoverage['public/javascripts/app.js'][851]=0;
_$jscoverage['public/javascripts/app.js'][840]=0;
_$jscoverage['public/javascripts/app.js'][853]=0;
_$jscoverage['public/javascripts/app.js'][842]=0;
_$jscoverage['public/javascripts/app.js'][846]=0;
_$jscoverage['public/javascripts/app.js'][849]=0;
_$jscoverage['public/javascripts/app.js'][850]=0;
_$jscoverage['public/javascripts/app.js'][905]=0;
_$jscoverage['public/javascripts/app.js'][868]=0;
_$jscoverage['public/javascripts/app.js'][856]=0;
_$jscoverage['public/javascripts/app.js'][858]=0;
_$jscoverage['public/javascripts/app.js'][866]=0;
_$jscoverage['public/javascripts/app.js'][865]=0;
_$jscoverage['public/javascripts/app.js'][867]=0;
_$jscoverage['public/javascripts/app.js'][855]=0;
_$jscoverage['public/javascripts/app.js'][863]=0;
_$jscoverage['public/javascripts/app.js'][864]=0;
_$jscoverage['public/javascripts/app.js'][911]=0;
_$jscoverage['public/javascripts/app.js'][882]=0;
_$jscoverage['public/javascripts/app.js'][869]=0;
_$jscoverage['public/javascripts/app.js'][873]=0;
_$jscoverage['public/javascripts/app.js'][881]=0;
_$jscoverage['public/javascripts/app.js'][871]=0;
_$jscoverage['public/javascripts/app.js'][880]=0;
_$jscoverage['public/javascripts/app.js'][879]=0;
_$jscoverage['public/javascripts/app.js'][917]=0;
_$jscoverage['public/javascripts/app.js'][892]=0;
_$jscoverage['public/javascripts/app.js'][888]=0;
_$jscoverage['public/javascripts/app.js'][884]=0;
_$jscoverage['public/javascripts/app.js'][885]=0;
_$jscoverage['public/javascripts/app.js'][890]=0;
_$jscoverage['public/javascripts/app.js'][887]=0;
_$jscoverage['public/javascripts/app.js'][889]=0;
_$jscoverage['public/javascripts/app.js'][924]=0;
_$jscoverage['public/javascripts/app.js'][902]=0;
_$jscoverage['public/javascripts/app.js'][893]=0;
_$jscoverage['public/javascripts/app.js'][895]=0;
_$jscoverage['public/javascripts/app.js'][900]=0;
_$jscoverage['public/javascripts/app.js'][901]=0;
_$jscoverage['public/javascripts/app.js'][926]=0;
_$jscoverage['public/javascripts/app.js'][913]=0;
_$jscoverage['public/javascripts/app.js'][907]=0;
_$jscoverage['public/javascripts/app.js'][910]=0;
_$jscoverage['public/javascripts/app.js'][909]=0;
_$jscoverage['public/javascripts/app.js'][903]=0;
_$jscoverage['public/javascripts/app.js'][906]=0;
_$jscoverage['public/javascripts/app.js'][932]=0;
_$jscoverage['public/javascripts/app.js'][920]=0;
_$jscoverage['public/javascripts/app.js'][915]=0;
_$jscoverage['public/javascripts/app.js'][914]=0;
_$jscoverage['public/javascripts/app.js'][918]=0;
_$jscoverage['public/javascripts/app.js'][923]=0;
_$jscoverage['public/javascripts/app.js'][927]=0;
_$jscoverage['public/javascripts/app.js'][929]=0;
_$jscoverage['public/javascripts/app.js'][930]=0;
_$jscoverage['public/javascripts/app.js'][931]=0;
_$jscoverage['public/javascripts/app.js'][938]=0;
_$jscoverage['public/javascripts/app.js'][940]=0;
_$jscoverage['public/javascripts/app.js'][942]=0;
_$jscoverage['public/javascripts/app.js'][946]=0;
}_$jscoverage['public/javascripts/app.js'][1]++;
window.require.register('config', function(require, module) {
_$jscoverage['public/javascripts/app.js'][2]++;
var config;

_$jscoverage['public/javascripts/app.js'][4]++;
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

_$jscoverage['public/javascripts/app.js'][17]++;
config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;

_$jscoverage['public/javascripts/app.js'][19]++;
config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;

});

_$jscoverage['public/javascripts/app.js'][23]++;
window.require.register('index', function(require, module) {
_$jscoverage['public/javascripts/app.js'][24]++;
var Index, StageView;

_$jscoverage['public/javascripts/app.js'][26]++;
StageView = require("views/Stage");

_$jscoverage['public/javascripts/app.js'][28]++;
module.exports = Index = (function() {

  _$jscoverage['public/javascripts/app.js'][30]++;
function Index() {
    _$jscoverage['public/javascripts/app.js'][31]++;
this.canvasEl = document.createElement("canvas");
    _$jscoverage['public/javascripts/app.js'][32]++;
this.canvasEl.width = 480;
    _$jscoverage['public/javascripts/app.js'][33]++;
this.canvasEl.height = 320;
    _$jscoverage['public/javascripts/app.js'][34]++;
document.body.appendChild(this.canvasEl);
    _$jscoverage['public/javascripts/app.js'][35]++;
this.stageView = StageView.create(this.canvasEl);
    _$jscoverage['public/javascripts/app.js'][36]++;
this.canvasEl.id = "stage-view-" + this.stageView.objectId;
    _$jscoverage['public/javascripts/app.js'][37]++;
document.onkeydown = this.onKeyDown;
    _$jscoverage['public/javascripts/app.js'][38]++;
_.bindAll(this, "onElMouseDown");
    _$jscoverage['public/javascripts/app.js'][39]++;
this.stageView.el.addEventListener("mousedown", this.onElMouseDown);
  }

  _$jscoverage['public/javascripts/app.js'][42]++;
Index.prototype.onElMouseDown = function(event) {
    _$jscoverage['public/javascripts/app.js'][43]++;
return EventBus.dispatch("!mouse:down", this, event);
  };

  _$jscoverage['public/javascripts/app.js'][46]++;
Index.prototype.onKeyDown = function(event) {
    _$jscoverage['public/javascripts/app.js'][47]++;
return EventBus.dispatch("!key:down", this, event);
  };

  _$jscoverage['public/javascripts/app.js'][50]++;
Index.prototype.dispose = function() {
    _$jscoverage['public/javascripts/app.js'][51]++;
document.onkeydown = void 0;
    _$jscoverage['public/javascripts/app.js'][52]++;
document.body.removeChild(this.canvasEl);
    _$jscoverage['public/javascripts/app.js'][53]++;
this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);
    _$jscoverage['public/javascripts/app.js'][54]++;
return this.stageView.dispose();
  };

  _$jscoverage['public/javascripts/app.js'][57]++;
return Index;

})();

});

_$jscoverage['public/javascripts/app.js'][63]++;
window.require.register('lib/utils', function(require, module) {
_$jscoverage['public/javascripts/app.js'][64]++;
var config, utils;

_$jscoverage['public/javascripts/app.js'][66]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][68]++;
module.exports = utils = {
  clamp: function(index, size) {
    _$jscoverage['public/javascripts/app.js'][70]++;
return (index + size) % size;
  },
  random: function(seed) {
    _$jscoverage['public/javascripts/app.js'][73]++;
return new RNG(seed).uniform();
  },
  sessionRandom: function() {
    _$jscoverage['public/javascripts/app.js'][76]++;
var randomVal;
    _$jscoverage['public/javascripts/app.js'][77]++;
randomVal = new RNG(config.sessionSeed).uniform();
    _$jscoverage['public/javascripts/app.js'][78]++;
config.sessionSeed += 1;
    _$jscoverage['public/javascripts/app.js'][79]++;
return randomVal;
  },
  tileHeightToType: function(height, maxElevation) {
    _$jscoverage['public/javascripts/app.js'][82]++;
var type;
    _$jscoverage['public/javascripts/app.js'][83]++;
if (height / maxElevation >= 0.5) {
      _$jscoverage['public/javascripts/app.js'][84]++;
type = 1;
    } else {
      _$jscoverage['public/javascripts/app.js'][86]++;
type = 0;
    }
    _$jscoverage['public/javascripts/app.js'][88]++;
return type;
  },
  loadImages: function(callback) {
    _$jscoverage['public/javascripts/app.js'][91]++;
this.tilesetImg = new Image();
    _$jscoverage['public/javascripts/app.js'][92]++;
this.tilesetImg.onload = callback;
    _$jscoverage['public/javascripts/app.js'][93]++;
return this.tilesetImg.src = config.spriteSheetSource;
  }
};

});

_$jscoverage['public/javascripts/app.js'][99]++;
window.require.register('models/Creature', function(require, module) {
_$jscoverage['public/javascripts/app.js'][100]++;
var Model, config, utils;

_$jscoverage['public/javascripts/app.js'][102]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][104]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][106]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][108]++;
module.exports = Model.extend("CreatureModel", {
  create: function(x, y, tileMapModel) {
    _$jscoverage['public/javascripts/app.js'][110]++;
var creatureModel;
    _$jscoverage['public/javascripts/app.js'][111]++;
creatureModel = this._super();
    _$jscoverage['public/javascripts/app.js'][112]++;
creatureModel.x = x;
    _$jscoverage['public/javascripts/app.js'][113]++;
creatureModel.y = y;
    _$jscoverage['public/javascripts/app.js'][114]++;
creatureModel.direction = "South";
    _$jscoverage['public/javascripts/app.js'][115]++;
creatureModel.tileMapModel = tileMapModel;
    _$jscoverage['public/javascripts/app.js'][116]++;
return creatureModel;
  }
}, {
  setPosition: function(x, y) {
    _$jscoverage['public/javascripts/app.js'][120]++;
if (y !== this.y || x !== this.x) {
      _$jscoverage['public/javascripts/app.js'][121]++;
this.x = x;
      _$jscoverage['public/javascripts/app.js'][122]++;
this.y = y;
      _$jscoverage['public/javascripts/app.js'][123]++;
return EventBus.dispatch("!move:" + this.uniqueId);
    }
  },
  tick: function() {
    _$jscoverage['public/javascripts/app.js'][127]++;
var dX, dY, foundSpot, giveUpCounter, newDirection, newX, newY, runOrRise, tile, _results;
    _$jscoverage['public/javascripts/app.js'][128]++;
foundSpot = false;
    _$jscoverage['public/javascripts/app.js'][129]++;
giveUpCounter = 6;
    _$jscoverage['public/javascripts/app.js'][130]++;
_results = [];
    _$jscoverage['public/javascripts/app.js'][131]++;
while (!foundSpot && giveUpCounter) {
      _$jscoverage['public/javascripts/app.js'][132]++;
dX = 0;
      _$jscoverage['public/javascripts/app.js'][133]++;
dY = 0;
      _$jscoverage['public/javascripts/app.js'][134]++;
runOrRise = Math.floor(utils.sessionRandom() * 2) % 2;
      _$jscoverage['public/javascripts/app.js'][135]++;
if (runOrRise) {
        _$jscoverage['public/javascripts/app.js'][136]++;
dX = Math.floor(utils.sessionRandom() * 3) - 1;
      } else {
        _$jscoverage['public/javascripts/app.js'][138]++;
dY = Math.floor(utils.sessionRandom() * 3) - 1;
      }
      _$jscoverage['public/javascripts/app.js'][140]++;
newX = utils.clamp(this.x + dX, config.worldTileWidth);
      _$jscoverage['public/javascripts/app.js'][141]++;
newY = utils.clamp(this.y + dY, config.worldTileHeight);
      _$jscoverage['public/javascripts/app.js'][142]++;
tile = this.tileMapModel.getCell(newX, newY);
      _$jscoverage['public/javascripts/app.js'][143]++;
newDirection = "South";
      _$jscoverage['public/javascripts/app.js'][144]++;
if (dX > 0) {
        _$jscoverage['public/javascripts/app.js'][145]++;
this.direction = "East";
      }
      _$jscoverage['public/javascripts/app.js'][147]++;
if (dX < 0) {
        _$jscoverage['public/javascripts/app.js'][148]++;
this.direction = "West";
      }
      _$jscoverage['public/javascripts/app.js'][150]++;
if (dY > 0) {
        _$jscoverage['public/javascripts/app.js'][151]++;
this.direction = "South";
      }
      _$jscoverage['public/javascripts/app.js'][153]++;
if (dY < 0) {
        _$jscoverage['public/javascripts/app.js'][154]++;
this.direction = "North";
      }
      _$jscoverage['public/javascripts/app.js'][156]++;
if (tile === 1 && (newX !== this.x || newY !== this.y)) {
        _$jscoverage['public/javascripts/app.js'][157]++;
this.setPosition(newX, newY);
        _$jscoverage['public/javascripts/app.js'][158]++;
_results.push(foundSpot = true);
      } else {
        _$jscoverage['public/javascripts/app.js'][160]++;
_results.push(giveUpCounter -= 1);
      }
    }
    _$jscoverage['public/javascripts/app.js'][163]++;
return _results;
  }
});

});

_$jscoverage['public/javascripts/app.js'][169]++;
window.require.register('models/Heightmap', function(require, module) {
_$jscoverage['public/javascripts/app.js'][170]++;
var HeightmapChunkModel, Model, config, utils;

_$jscoverage['public/javascripts/app.js'][172]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][174]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][176]++;
HeightmapChunkModel = require("models/HeightmapChunk");

_$jscoverage['public/javascripts/app.js'][178]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][180]++;
module.exports = Model.extend("HeightmapModel", {
  create: function(seed) {
    _$jscoverage['public/javascripts/app.js'][182]++;
var heightmapModel;
    _$jscoverage['public/javascripts/app.js'][183]++;
heightmapModel = this._super();
    _$jscoverage['public/javascripts/app.js'][184]++;
heightmapModel.seed = seed;
    _$jscoverage['public/javascripts/app.js'][185]++;
heightmapModel.chunkCache = [];
    _$jscoverage['public/javascripts/app.js'][186]++;
return heightmapModel;
  }
}, {
  getCell: function(worldX, worldY) {
    _$jscoverage['public/javascripts/app.js'][190]++;
var chunk, chunkX, chunkY, heightmap, heightmapData, worldChunkX, worldChunkY;
    _$jscoverage['public/javascripts/app.js'][191]++;
worldChunkX = Math.floor(worldX / config.chunkWidth);
    _$jscoverage['public/javascripts/app.js'][192]++;
worldChunkY = Math.floor(worldY / config.chunkHeight);
    _$jscoverage['public/javascripts/app.js'][193]++;
chunkX = worldX % config.chunkWidth;
    _$jscoverage['public/javascripts/app.js'][194]++;
chunkY = worldY % config.chunkHeight;
    _$jscoverage['public/javascripts/app.js'][195]++;
chunk = this.getChunk(worldChunkX, worldChunkY);
    _$jscoverage['public/javascripts/app.js'][196]++;
heightmap = [];
    _$jscoverage['public/javascripts/app.js'][197]++;
heightmapData = this.collectHeightmapDataForChunk(worldChunkX, worldChunkY, chunk.cells, heightmap);
    _$jscoverage['public/javascripts/app.js'][198]++;
return heightmapData[chunkY][chunkX];
  },
  getChunk: function(worldChunkX, worldChunkY) {
    _$jscoverage['public/javascripts/app.js'][201]++;
var chunkHeight, chunkWidth, maxElevation, ne, nw, se, seed, sw, worldChunkHeight, worldChunkWidth, worldTileHeight, worldTileWidth, _base, _ref;
    _$jscoverage['public/javascripts/app.js'][202]++;
if ((this.chunkCache[worldChunkY] != null) && (this.chunkCache[worldChunkY][worldChunkX] != null)) {
      _$jscoverage['public/javascripts/app.js'][203]++;
return this.chunkCache[worldChunkY][worldChunkX];
    }
    _$jscoverage['public/javascripts/app.js'][205]++;
worldTileWidth = config.worldTileWidth;
    _$jscoverage['public/javascripts/app.js'][206]++;
worldTileHeight = config.worldTileHeight;
    _$jscoverage['public/javascripts/app.js'][207]++;
worldChunkWidth = config.worldChunkWidth;
    _$jscoverage['public/javascripts/app.js'][208]++;
worldChunkHeight = config.worldChunkHeight;
    _$jscoverage['public/javascripts/app.js'][209]++;
chunkWidth = config.chunkWidth;
    _$jscoverage['public/javascripts/app.js'][210]++;
chunkHeight = config.chunkHeight;
    _$jscoverage['public/javascripts/app.js'][211]++;
maxElevation = config.maxElevation;
    _$jscoverage['public/javascripts/app.js'][212]++;
seed = this.seed;
    _$jscoverage['public/javascripts/app.js'][213]++;
nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation;
    _$jscoverage['public/javascripts/app.js'][214]++;
if (worldChunkX + 1 === worldChunkWidth) {
      _$jscoverage['public/javascripts/app.js'][215]++;
ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation;
    } else {
      _$jscoverage['public/javascripts/app.js'][217]++;
ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
    }
    _$jscoverage['public/javascripts/app.js'][219]++;
if (worldChunkY + 1 === worldChunkWidth) {
      _$jscoverage['public/javascripts/app.js'][220]++;
sw = utils.random(worldChunkX + seed) * maxElevation;
      _$jscoverage['public/javascripts/app.js'][221]++;
if (worldChunkX + 1 === worldChunkHeight) {
        _$jscoverage['public/javascripts/app.js'][222]++;
se = utils.random(seed) * maxElevation;
      } else {
        _$jscoverage['public/javascripts/app.js'][224]++;
se = utils.random(worldChunkX + 1 + seed) * maxElevation;
      }
    } else {
      _$jscoverage['public/javascripts/app.js'][227]++;
sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      _$jscoverage['public/javascripts/app.js'][228]++;
if (worldChunkX + 1 === worldChunkWidth) {
        _$jscoverage['public/javascripts/app.js'][229]++;
se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation;
      } else {
        _$jscoverage['public/javascripts/app.js'][231]++;
se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation;
      }
    }
    _$jscoverage['public/javascripts/app.js'][234]++;
if ((_ref = (_base = this.chunkCache)[worldChunkY]) == null) {
      _$jscoverage['public/javascripts/app.js'][235]++;
_base[worldChunkY] = [];
    }
    _$jscoverage['public/javascripts/app.js'][237]++;
return this.chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create(nw, ne, se, sw, chunkWidth, chunkHeight);
  },
  collectHeightmapDataForChunk: function(worldChunkX, worldChunkY, cells, heightmap) {
    _$jscoverage['public/javascripts/app.js'][240]++;
var cell, cellRow, cx, cy, maxElevation, xIndex, yIndex, _i, _len, _results;
    _$jscoverage['public/javascripts/app.js'][241]++;
maxElevation = config.maxElevation;
    _$jscoverage['public/javascripts/app.js'][242]++;
_results = [];
    _$jscoverage['public/javascripts/app.js'][243]++;
for (cy = _i = 0, _len = cells.length; _i < _len; cy = ++_i) {
      _$jscoverage['public/javascripts/app.js'][244]++;
cellRow = cells[cy];
      _$jscoverage['public/javascripts/app.js'][245]++;
_results.push((function() {
        _$jscoverage['public/javascripts/app.js'][246]++;
var _j, _len1, _results1;
        _$jscoverage['public/javascripts/app.js'][247]++;
_results1 = [];
        _$jscoverage['public/javascripts/app.js'][248]++;
for (cx = _j = 0, _len1 = cellRow.length; _j < _len1; cx = ++_j) {
          _$jscoverage['public/javascripts/app.js'][249]++;
cell = cellRow[cx];
          _$jscoverage['public/javascripts/app.js'][250]++;
yIndex = cy + (worldChunkY * cells.length);
          _$jscoverage['public/javascripts/app.js'][251]++;
xIndex = cx + (worldChunkX * cellRow.length);
          _$jscoverage['public/javascripts/app.js'][252]++;
if (heightmap[yIndex] == null) {
            _$jscoverage['public/javascripts/app.js'][253]++;
heightmap[yIndex] = [];
          }
          _$jscoverage['public/javascripts/app.js'][255]++;
_results1.push(heightmap[yIndex][xIndex] = utils.tileHeightToType(cell, maxElevation));
        }
        _$jscoverage['public/javascripts/app.js'][257]++;
return _results1;
      })());
    }
    _$jscoverage['public/javascripts/app.js'][260]++;
return _results;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][263]++;
_.each(this.chunkCache, function(chunkCacheRow) {
      _$jscoverage['public/javascripts/app.js'][264]++;
return _.each(chunkCacheRow, function(chunkModel) {
        _$jscoverage['public/javascripts/app.js'][265]++;
if (chunkModel != null) {
          _$jscoverage['public/javascripts/app.js'][266]++;
return chunkModel.dispose();
        }
      });
    });
    _$jscoverage['public/javascripts/app.js'][270]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][276]++;
window.require.register('models/HeightmapChunk', function(require, module) {
_$jscoverage['public/javascripts/app.js'][277]++;
var Model,
  __slice = [].slice;

_$jscoverage['public/javascripts/app.js'][280]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][282]++;
module.exports = Model.extend("HeightmapChunkModel", {
  create: function() {
    _$jscoverage['public/javascripts/app.js'][284]++;
var args, model;
    _$jscoverage['public/javascripts/app.js'][285]++;
args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _$jscoverage['public/javascripts/app.js'][286]++;
model = this._super();
    _$jscoverage['public/javascripts/app.js'][287]++;
model.cells = this.bilinearInterpolate.apply(this, args);
    _$jscoverage['public/javascripts/app.js'][288]++;
return model;
  },
  bilinearInterpolate: function(nw, ne, se, sw, width, height) {
    _$jscoverage['public/javascripts/app.js'][291]++;
var bottomHeight, cellHeight, cells, topHeight, x, xLookup, xStep, y, yStep, _i, _j, _ref, _ref1;
    _$jscoverage['public/javascripts/app.js'][292]++;
xLookup = [];
    _$jscoverage['public/javascripts/app.js'][293]++;
cells = [];
    _$jscoverage['public/javascripts/app.js'][294]++;
for (y = _i = 0, _ref = height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/app.js'][295]++;
cells[y] = [];
      _$jscoverage['public/javascripts/app.js'][296]++;
yStep = y / (height - 1);
      _$jscoverage['public/javascripts/app.js'][297]++;
for (x = _j = 0, _ref1 = width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        _$jscoverage['public/javascripts/app.js'][298]++;
if (xLookup[x] != null) {
          _$jscoverage['public/javascripts/app.js'][299]++;
xStep = xLookup[x];
        } else {
          _$jscoverage['public/javascripts/app.js'][301]++;
xStep = xLookup[x] = x / (width - 1);
        }
        _$jscoverage['public/javascripts/app.js'][303]++;
topHeight = nw + xStep * (ne - nw);
        _$jscoverage['public/javascripts/app.js'][304]++;
bottomHeight = sw + xStep * (se - sw);
        _$jscoverage['public/javascripts/app.js'][305]++;
cellHeight = topHeight + yStep * (bottomHeight - topHeight);
        _$jscoverage['public/javascripts/app.js'][306]++;
cells[y][x] = Math.floor(cellHeight);
      }
    }
    _$jscoverage['public/javascripts/app.js'][309]++;
return cells;
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][313]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][319]++;
window.require.register('models/Tile', function(require, module) {
_$jscoverage['public/javascripts/app.js'][320]++;
var Model;

_$jscoverage['public/javascripts/app.js'][322]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][324]++;
module.exports = Model.extend("TileModel", {
  create: function(index, x, y) {
    _$jscoverage['public/javascripts/app.js'][326]++;
var model;
    _$jscoverage['public/javascripts/app.js'][327]++;
model = this._super();
    _$jscoverage['public/javascripts/app.js'][328]++;
model.index = index;
    _$jscoverage['public/javascripts/app.js'][329]++;
model.x = x;
    _$jscoverage['public/javascripts/app.js'][330]++;
model.y = y;
    _$jscoverage['public/javascripts/app.js'][331]++;
return model;
  }
}, {
  setIndex: function(index) {
    _$jscoverage['public/javascripts/app.js'][335]++;
if (this.index !== index) {
      _$jscoverage['public/javascripts/app.js'][336]++;
this.index = index;
      _$jscoverage['public/javascripts/app.js'][337]++;
return this.onChangeIndex();
    }
  },
  setIndexCallback: function(callback) {
    _$jscoverage['public/javascripts/app.js'][341]++;
return this.onChangeIndex = callback;
  },
  onChangeIndex: function() {}
});

});

_$jscoverage['public/javascripts/app.js'][348]++;
window.require.register('models/TileMap', function(require, module) {
_$jscoverage['public/javascripts/app.js'][349]++;
var HeightmapModel, Model, config, utils,
  __slice = [].slice;

_$jscoverage['public/javascripts/app.js'][352]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][354]++;
HeightmapModel = require("models/Heightmap");

_$jscoverage['public/javascripts/app.js'][356]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][358]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][360]++;
module.exports = Model.extend("TileMapModel", {
  create: function(tileSourceModelName) {
    _$jscoverage['public/javascripts/app.js'][362]++;
var tileMapModel;
    _$jscoverage['public/javascripts/app.js'][363]++;
tileMapModel = this._super();
    _$jscoverage['public/javascripts/app.js'][364]++;
tileMapModel.tileCache = [];
    _$jscoverage['public/javascripts/app.js'][365]++;
tileMapModel.tileSourceModel = require(tileSourceModelName).create(config.seed);
    _$jscoverage['public/javascripts/app.js'][366]++;
return tileMapModel;
  }
}, {
  collectNeighbors: function(worldX, worldY) {
    _$jscoverage['public/javascripts/app.js'][370]++;
var cx, cy, e, n, ne, nw, s, se, sw, w, xl, yl;
    _$jscoverage['public/javascripts/app.js'][371]++;
xl = config.worldTileWidth;
    _$jscoverage['public/javascripts/app.js'][372]++;
yl = config.worldTileHeight;
    _$jscoverage['public/javascripts/app.js'][373]++;
cx = function(ox) {
      _$jscoverage['public/javascripts/app.js'][374]++;
return utils.clamp(ox, xl);
    };
    _$jscoverage['public/javascripts/app.js'][376]++;
cy = function(oy) {
      _$jscoverage['public/javascripts/app.js'][377]++;
return utils.clamp(oy, yl);
    };
    _$jscoverage['public/javascripts/app.js'][379]++;
n = this.tileSourceModel.getCell(worldX, cy(worldY - 1));
    _$jscoverage['public/javascripts/app.js'][380]++;
e = this.tileSourceModel.getCell(cx(worldX + 1), worldY);
    _$jscoverage['public/javascripts/app.js'][381]++;
s = this.tileSourceModel.getCell(worldX, cy(worldY + 1));
    _$jscoverage['public/javascripts/app.js'][382]++;
w = this.tileSourceModel.getCell(cx(worldX - 1), worldY);
    _$jscoverage['public/javascripts/app.js'][383]++;
ne = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY - 1));
    _$jscoverage['public/javascripts/app.js'][384]++;
se = this.tileSourceModel.getCell(cx(worldX + 1), cy(worldY + 1));
    _$jscoverage['public/javascripts/app.js'][385]++;
sw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY + 1));
    _$jscoverage['public/javascripts/app.js'][386]++;
nw = this.tileSourceModel.getCell(cx(worldX - 1), cy(worldY - 1));
    _$jscoverage['public/javascripts/app.js'][387]++;
return [n, e, s, w, ne, se, sw, nw];
  },
  getArea: function(sliceWidth, sliceHeight, centerX, centerY) {
    _$jscoverage['public/javascripts/app.js'][390]++;
var data, worldX, worldY, x, xOffset, y, yOffset, _i, _ref, _results;
    _$jscoverage['public/javascripts/app.js'][391]++;
data = [];
    _$jscoverage['public/javascripts/app.js'][392]++;
xOffset = Math.floor(sliceWidth / 2);
    _$jscoverage['public/javascripts/app.js'][393]++;
yOffset = Math.floor(sliceHeight / 2);
    _$jscoverage['public/javascripts/app.js'][394]++;
_results = [];
    _$jscoverage['public/javascripts/app.js'][395]++;
for (y = _i = 0, _ref = sliceHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/app.js'][396]++;
data[y] = [];
      _$jscoverage['public/javascripts/app.js'][397]++;
_results.push((function() {
        _$jscoverage['public/javascripts/app.js'][398]++;
var _j, _ref1, _results1;
        _$jscoverage['public/javascripts/app.js'][399]++;
_results1 = [];
        _$jscoverage['public/javascripts/app.js'][400]++;
for (x = _j = 0, _ref1 = sliceWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          _$jscoverage['public/javascripts/app.js'][401]++;
worldX = utils.clamp(x - xOffset + centerX, config.worldTileWidth);
          _$jscoverage['public/javascripts/app.js'][402]++;
worldY = utils.clamp(y - yOffset + centerY, config.worldTileHeight);
          _$jscoverage['public/javascripts/app.js'][403]++;
_results1.push(data[y][x] = this.getTile(worldX, worldY));
        }
        _$jscoverage['public/javascripts/app.js'][405]++;
return _results1;
      }).call(this));
    }
    _$jscoverage['public/javascripts/app.js'][408]++;
return _results;
  },
  getCell: function() {
    _$jscoverage['public/javascripts/app.js'][411]++;
var args, _ref;
    _$jscoverage['public/javascripts/app.js'][412]++;
args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _$jscoverage['public/javascripts/app.js'][413]++;
return (_ref = this.tileSourceModel).getCell.apply(_ref, args);
  },
  getTile: function(worldX, worldY) {
    _$jscoverage['public/javascripts/app.js'][416]++;
var cell, index, neighbors, _base, _ref;
    _$jscoverage['public/javascripts/app.js'][417]++;
if ((this.tileCache[worldY] != null) && (this.tileCache[worldY][worldX] != null)) {
      _$jscoverage['public/javascripts/app.js'][418]++;
return this.tileCache[worldY][worldX];
    }
    _$jscoverage['public/javascripts/app.js'][420]++;
cell = this.tileSourceModel.getCell(worldX, worldY);
    _$jscoverage['public/javascripts/app.js'][421]++;
neighbors = this.collectNeighbors(worldX, worldY);
    _$jscoverage['public/javascripts/app.js'][422]++;
index = this.getIndexByNeighbors(cell, neighbors);
    _$jscoverage['public/javascripts/app.js'][423]++;
if ((_ref = (_base = this.tileCache)[worldY]) == null) {
      _$jscoverage['public/javascripts/app.js'][424]++;
_base[worldY] = [];
    }
    _$jscoverage['public/javascripts/app.js'][426]++;
return this.tileCache[worldY][worldX] = index;
  },
  getIndexByNeighbors: function(tileValue, neighbors) {
    _$jscoverage['public/javascripts/app.js'][429]++;
var a, b, c, d, e, f, g, h, index, n, ne, nw, s, se, sw, w;
    _$jscoverage['public/javascripts/app.js'][430]++;
index = 0;
    _$jscoverage['public/javascripts/app.js'][431]++;
n = neighbors[0];
    _$jscoverage['public/javascripts/app.js'][432]++;
e = neighbors[1];
    _$jscoverage['public/javascripts/app.js'][433]++;
s = neighbors[2];
    _$jscoverage['public/javascripts/app.js'][434]++;
w = neighbors[3];
    _$jscoverage['public/javascripts/app.js'][435]++;
ne = neighbors[4];
    _$jscoverage['public/javascripts/app.js'][436]++;
se = neighbors[5];
    _$jscoverage['public/javascripts/app.js'][437]++;
sw = neighbors[6];
    _$jscoverage['public/javascripts/app.js'][438]++;
nw = neighbors[7];
    _$jscoverage['public/javascripts/app.js'][439]++;
if (tileValue) {
      _$jscoverage['public/javascripts/app.js'][440]++;
a = n << n * 4;
      _$jscoverage['public/javascripts/app.js'][441]++;
b = e << e * 5;
      _$jscoverage['public/javascripts/app.js'][442]++;
c = s << s * 6;
      _$jscoverage['public/javascripts/app.js'][443]++;
d = w << w * 7;
      _$jscoverage['public/javascripts/app.js'][444]++;
e = ne << ne * 0;
      _$jscoverage['public/javascripts/app.js'][445]++;
f = se << se * 1;
      _$jscoverage['public/javascripts/app.js'][446]++;
g = nw << nw * 3;
      _$jscoverage['public/javascripts/app.js'][447]++;
h = sw << sw * 2;
      _$jscoverage['public/javascripts/app.js'][448]++;
index = a + b + c + d + e + f + g + h;
    }
    _$jscoverage['public/javascripts/app.js'][450]++;
return index;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][453]++;
this.tileSourceModel.dispose();
    _$jscoverage['public/javascripts/app.js'][454]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][460]++;
window.require.register('models/Viewport', function(require, module) {
_$jscoverage['public/javascripts/app.js'][461]++;
var Model;

_$jscoverage['public/javascripts/app.js'][463]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/app.js'][465]++;
module.exports = Model.extend("ViewportModel", {
  create: function(x, y, width, height) {
    _$jscoverage['public/javascripts/app.js'][467]++;
var model;
    _$jscoverage['public/javascripts/app.js'][468]++;
model = this._super();
    _$jscoverage['public/javascripts/app.js'][469]++;
model.x = x;
    _$jscoverage['public/javascripts/app.js'][470]++;
model.y = y;
    _$jscoverage['public/javascripts/app.js'][471]++;
model.width = width;
    _$jscoverage['public/javascripts/app.js'][472]++;
model.height = height;
    _$jscoverage['public/javascripts/app.js'][473]++;
return model;
  }
}, {
  setPosition: function(x, y) {
    _$jscoverage['public/javascripts/app.js'][477]++;
if (y !== this.y || x !== this.x) {
      _$jscoverage['public/javascripts/app.js'][478]++;
this.x = x;
      _$jscoverage['public/javascripts/app.js'][479]++;
this.y = y;
      _$jscoverage['public/javascripts/app.js'][480]++;
return EventBus.dispatch("!move:" + this.uniqueId, this);
    }
  }
});

});

_$jscoverage['public/javascripts/app.js'][487]++;
window.require.register('models/base/Model', function(require, module) {

_$jscoverage['public/javascripts/app.js'][489]++;
module.exports = gamecore.DualPooled.extend("Model", {
  getUsedLength: function() {
    _$jscoverage['public/javascripts/app.js'][491]++;
return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][495]++;
return this.release();
  }
});

});

_$jscoverage['public/javascripts/app.js'][501]++;
window.require.register('views/Creature', function(require, module) {
_$jscoverage['public/javascripts/app.js'][502]++;
var View, config, utils;

_$jscoverage['public/javascripts/app.js'][504]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/app.js'][506]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][508]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][510]++;
module.exports = View.extend("CreatureView", {
  create: function(creatureModel, viewportModel) {
    _$jscoverage['public/javascripts/app.js'][512]++;
var creatureView;
    _$jscoverage['public/javascripts/app.js'][513]++;
creatureView = this._super();
    _$jscoverage['public/javascripts/app.js'][514]++;
creatureView.model = creatureModel;
    _$jscoverage['public/javascripts/app.js'][515]++;
creatureView.viewportModel = viewportModel;
    _$jscoverage['public/javascripts/app.js'][516]++;
creatureView.spriteSheet = new createjs.SpriteSheet(this.spriteSheetOptions);
    _$jscoverage['public/javascripts/app.js'][517]++;
creatureView.el = new createjs.BitmapAnimation(creatureView.spriteSheet);
    _$jscoverage['public/javascripts/app.js'][518]++;
creatureView.el.gotoAndPlay("walkSouth");
    _$jscoverage['public/javascripts/app.js'][519]++;
EventBus.addEventListener("!move:" + creatureModel.uniqueId, creatureView.onModelMove, creatureView);
    _$jscoverage['public/javascripts/app.js'][520]++;
EventBus.addEventListener("!move:" + viewportModel.uniqueId, creatureView.setPosition, creatureView);
    _$jscoverage['public/javascripts/app.js'][521]++;
creatureView.setPosition();
    _$jscoverage['public/javascripts/app.js'][522]++;
_.bindAll(creatureView, "onTick");
    _$jscoverage['public/javascripts/app.js'][523]++;
creatureView.el.addEventListener("tick", creatureView.onTick);
    _$jscoverage['public/javascripts/app.js'][524]++;
creatureView.el.x = creatureView.intendedX;
    _$jscoverage['public/javascripts/app.js'][525]++;
creatureView.el.y = creatureView.intendedY;
    _$jscoverage['public/javascripts/app.js'][526]++;
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
    _$jscoverage['public/javascripts/app.js'][571]++;
var deltaX, deltaY;
    _$jscoverage['public/javascripts/app.js'][572]++;
deltaX = 0;
    _$jscoverage['public/javascripts/app.js'][573]++;
deltaY = 0;
    _$jscoverage['public/javascripts/app.js'][574]++;
switch (this.model.direction) {
      case "North":
        _$jscoverage['public/javascripts/app.js'][576]++;
deltaY = config.tileHeight;
        _$jscoverage['public/javascripts/app.js'][577]++;
break;
      case "East":
        _$jscoverage['public/javascripts/app.js'][579]++;
deltaX = 0 - config.tileWidth;
        _$jscoverage['public/javascripts/app.js'][580]++;
break;
      case "South":
        _$jscoverage['public/javascripts/app.js'][582]++;
deltaY = 0 - config.tileHeight;
        _$jscoverage['public/javascripts/app.js'][583]++;
break;
      case "West":
        _$jscoverage['public/javascripts/app.js'][585]++;
deltaX = config.tileWidth;
    }
    _$jscoverage['public/javascripts/app.js'][587]++;
this.offsetX = deltaX;
    _$jscoverage['public/javascripts/app.js'][588]++;
this.offsetY = deltaY;
    _$jscoverage['public/javascripts/app.js'][589]++;
createjs.Tween.get(this).to({
      offsetX: 0,
      offsetY: 0
    }, 500);
    _$jscoverage['public/javascripts/app.js'][593]++;
return this.setPosition();
  },
  setPosition: function() {
    _$jscoverage['public/javascripts/app.js'][596]++;
var animation, centerX, centerY, halfWorldHeight, halfWorldWidth, myNewX, myNewY, myX, myY, newX, newY, offsetX, offsetY, viewX, viewY, worldHeight, worldWidth, x, y;
    _$jscoverage['public/javascripts/app.js'][597]++;
animation = "walk" + this.model.direction;
    _$jscoverage['public/javascripts/app.js'][598]++;
if (this.el.currentAnimation !== animation) {
      _$jscoverage['public/javascripts/app.js'][599]++;
this.el.gotoAndPlay(animation);
    }
    _$jscoverage['public/javascripts/app.js'][601]++;
centerX = Math.floor(this.viewportModel.width / 2);
    _$jscoverage['public/javascripts/app.js'][602]++;
centerY = Math.floor(this.viewportModel.height / 2);
    _$jscoverage['public/javascripts/app.js'][603]++;
viewX = this.viewportModel.x;
    _$jscoverage['public/javascripts/app.js'][604]++;
viewY = this.viewportModel.y;
    _$jscoverage['public/javascripts/app.js'][605]++;
myX = this.model.x;
    _$jscoverage['public/javascripts/app.js'][606]++;
myY = this.model.y;
    _$jscoverage['public/javascripts/app.js'][607]++;
x = (myX - viewX) + centerX;
    _$jscoverage['public/javascripts/app.js'][608]++;
y = (myY - viewY) + centerY;
    _$jscoverage['public/javascripts/app.js'][609]++;
worldWidth = config.worldTileWidth;
    _$jscoverage['public/javascripts/app.js'][610]++;
halfWorldWidth = Math.floor(worldWidth / 2);
    _$jscoverage['public/javascripts/app.js'][611]++;
worldHeight = config.worldTileHeight;
    _$jscoverage['public/javascripts/app.js'][612]++;
halfWorldHeight = Math.floor(worldHeight / 2);
    _$jscoverage['public/javascripts/app.js'][613]++;
offsetX = 0;
    _$jscoverage['public/javascripts/app.js'][614]++;
offsetY = 0;
    _$jscoverage['public/javascripts/app.js'][615]++;
if (myX > viewX + halfWorldWidth) {
      _$jscoverage['public/javascripts/app.js'][616]++;
offsetX -= worldWidth;
    }
    _$jscoverage['public/javascripts/app.js'][618]++;
if (myX < viewX - halfWorldWidth) {
      _$jscoverage['public/javascripts/app.js'][619]++;
offsetX += worldWidth;
    }
    _$jscoverage['public/javascripts/app.js'][621]++;
if (myY > viewY + halfWorldHeight) {
      _$jscoverage['public/javascripts/app.js'][622]++;
offsetY -= worldHeight;
    }
    _$jscoverage['public/javascripts/app.js'][624]++;
if (myY < viewY - halfWorldHeight) {
      _$jscoverage['public/javascripts/app.js'][625]++;
offsetY += worldHeight;
    }
    _$jscoverage['public/javascripts/app.js'][627]++;
myNewX = x + offsetX;
    _$jscoverage['public/javascripts/app.js'][628]++;
myNewY = y + offsetY;
    _$jscoverage['public/javascripts/app.js'][629]++;
newX = myNewX * config.tileWidth;
    _$jscoverage['public/javascripts/app.js'][630]++;
newY = myNewY * config.tileHeight;
    _$jscoverage['public/javascripts/app.js'][631]++;
this.intendedX = newX;
    _$jscoverage['public/javascripts/app.js'][632]++;
return this.intendedY = newY;
  },
  onTick: function() {
    _$jscoverage['public/javascripts/app.js'][635]++;
this.el.x = this.intendedX + this.offsetX;
    _$jscoverage['public/javascripts/app.js'][636]++;
return this.el.y = this.intendedY + this.offsetY;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][639]++;
this.el.removeEventListener("tick", this.onTick);
    _$jscoverage['public/javascripts/app.js'][640]++;
EventBus.removeEventListener("!move:" + this.model.uniqueId, this.setPosition, this);
    _$jscoverage['public/javascripts/app.js'][641]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][647]++;
window.require.register('views/EntityManager', function(require, module) {
_$jscoverage['public/javascripts/app.js'][648]++;
var CreatureModel, CreatureView, View, config, utils;

_$jscoverage['public/javascripts/app.js'][650]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/app.js'][652]++;
CreatureModel = require("models/Creature");

_$jscoverage['public/javascripts/app.js'][654]++;
CreatureView = require("views/Creature");

_$jscoverage['public/javascripts/app.js'][656]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][658]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][660]++;
module.exports = View.extend("EntityManagerView", {
  create: function(viewportModel) {
    _$jscoverage['public/javascripts/app.js'][662]++;
var entityManagerView;
    _$jscoverage['public/javascripts/app.js'][663]++;
entityManagerView = this._super();
    _$jscoverage['public/javascripts/app.js'][664]++;
entityManagerView.el = new createjs.Container;
    _$jscoverage['public/javascripts/app.js'][665]++;
entityManagerView.creatureViews = [];
    _$jscoverage['public/javascripts/app.js'][666]++;
entityManagerView.viewportModel = viewportModel;
    _$jscoverage['public/javascripts/app.js'][667]++;
return entityManagerView;
  }
}, {
  onTick: function() {
    _$jscoverage['public/javascripts/app.js'][671]++;
return _.each(this.creatureViews, function(creatureView) {
      _$jscoverage['public/javascripts/app.js'][672]++;
return creatureView.model.tick();
    });
  },
  addCreatures: function(populationSize, tileMapModel) {
    _$jscoverage['public/javascripts/app.js'][676]++;
var creatureCount, creatureModel, creatureView, s, tile, x, y, _results;
    _$jscoverage['public/javascripts/app.js'][677]++;
creatureCount = 0;
    _$jscoverage['public/javascripts/app.js'][678]++;
s = config.seed;
    _$jscoverage['public/javascripts/app.js'][679]++;
_results = [];
    _$jscoverage['public/javascripts/app.js'][680]++;
while (creatureCount < populationSize) {
      _$jscoverage['public/javascripts/app.js'][681]++;
s += 1;
      _$jscoverage['public/javascripts/app.js'][682]++;
x = Math.floor(utils.random(s) * config.worldTileWidth);
      _$jscoverage['public/javascripts/app.js'][683]++;
y = Math.floor(utils.random(s + 1) * config.worldTileHeight);
      _$jscoverage['public/javascripts/app.js'][684]++;
tile = tileMapModel.getCell(x, y);
      _$jscoverage['public/javascripts/app.js'][685]++;
if (tile === 1) {
        _$jscoverage['public/javascripts/app.js'][686]++;
creatureCount += 1;
        _$jscoverage['public/javascripts/app.js'][687]++;
creatureModel = CreatureModel.create(x, y, tileMapModel);
        _$jscoverage['public/javascripts/app.js'][688]++;
creatureView = CreatureView.create(creatureModel, this.viewportModel);
        _$jscoverage['public/javascripts/app.js'][689]++;
this.el.addChild(creatureView.el);
        _$jscoverage['public/javascripts/app.js'][690]++;
_results.push(this.creatureViews.push(creatureView));
      } else {
        _$jscoverage['public/javascripts/app.js'][692]++;
_results.push(void 0);
      }
    }
    _$jscoverage['public/javascripts/app.js'][695]++;
return _results;
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][698]++;
_.each(this.creatureViews, function(creatureView) {
      _$jscoverage['public/javascripts/app.js'][699]++;
creatureView.model.dispose();
      _$jscoverage['public/javascripts/app.js'][700]++;
return creatureView.dispose();
    });
    _$jscoverage['public/javascripts/app.js'][702]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][708]++;
window.require.register('views/Stage', function(require, module) {
_$jscoverage['public/javascripts/app.js'][709]++;
var EntityManagerView, TileMapModel, View, ViewportModel, ViewportView, config, utils;

_$jscoverage['public/javascripts/app.js'][711]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/app.js'][713]++;
ViewportModel = require("models/Viewport");

_$jscoverage['public/javascripts/app.js'][715]++;
ViewportView = require("views/Viewport");

_$jscoverage['public/javascripts/app.js'][717]++;
EntityManagerView = require("views/EntityManager");

_$jscoverage['public/javascripts/app.js'][719]++;
TileMapModel = require("models/TileMap");

_$jscoverage['public/javascripts/app.js'][721]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][723]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][725]++;
module.exports = View.extend("StageView", {
  create: function(canvasEl) {
    _$jscoverage['public/javascripts/app.js'][727]++;
var stageView;
    _$jscoverage['public/javascripts/app.js'][728]++;
stageView = this._super();
    _$jscoverage['public/javascripts/app.js'][729]++;
stageView.el = new createjs.Stage(canvasEl);
    _$jscoverage['public/javascripts/app.js'][730]++;
stageView.lastUpdate = 0;
    _$jscoverage['public/javascripts/app.js'][731]++;
stageView.tileMapModel = TileMapModel.create('models/Heightmap');
    _$jscoverage['public/javascripts/app.js'][732]++;
stageView.viewportModel = ViewportModel.create(0, 0, 30, 20);
    _$jscoverage['public/javascripts/app.js'][733]++;
stageView.viewportView = ViewportView.create(stageView.viewportModel, stageView.tileMapModel);
    _$jscoverage['public/javascripts/app.js'][734]++;
stageView.el.addChild(stageView.viewportView.el);
    _$jscoverage['public/javascripts/app.js'][735]++;
stageView.entityManagerView = EntityManagerView.create(stageView.viewportModel);
    _$jscoverage['public/javascripts/app.js'][736]++;
stageView.el.addChild(stageView.entityManagerView.el);
    _$jscoverage['public/javascripts/app.js'][737]++;
stageView.entityManagerView.addCreatures(100, stageView.tileMapModel);
    _$jscoverage['public/javascripts/app.js'][738]++;
createjs.Ticker.setFPS(60);
    _$jscoverage['public/javascripts/app.js'][739]++;
createjs.Ticker.useRAF = true;
    _$jscoverage['public/javascripts/app.js'][740]++;
_.bindAll(stageView, "onTick");
    _$jscoverage['public/javascripts/app.js'][741]++;
createjs.Ticker.addEventListener("tick", stageView.onTick);
    _$jscoverage['public/javascripts/app.js'][742]++;
createjs.Touch.enable(stageView.el);
    _$jscoverage['public/javascripts/app.js'][743]++;
stageView.el.update();
    _$jscoverage['public/javascripts/app.js'][744]++;
return stageView;
  }
}, {
  onTick: function(event) {
    _$jscoverage['public/javascripts/app.js'][748]++;
var timeDelta;
    _$jscoverage['public/javascripts/app.js'][749]++;
this.el.update();
    _$jscoverage['public/javascripts/app.js'][750]++;
timeDelta = event.time - this.lastUpdate;
    _$jscoverage['public/javascripts/app.js'][751]++;
if (Math.floor(timeDelta / 500) >= 1) {
      _$jscoverage['public/javascripts/app.js'][752]++;
this.entityManagerView.onTick();
      _$jscoverage['public/javascripts/app.js'][753]++;
return this.lastUpdate = event.time;
    }
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][757]++;
createjs.Ticker.removeEventListener("tick", this.onTick);
    _$jscoverage['public/javascripts/app.js'][758]++;
createjs.Touch.disable(this.el);
    _$jscoverage['public/javascripts/app.js'][759]++;
this.tileMapModel.dispose();
    _$jscoverage['public/javascripts/app.js'][760]++;
this.viewportView.dispose();
    _$jscoverage['public/javascripts/app.js'][761]++;
this.viewportModel.dispose();
    _$jscoverage['public/javascripts/app.js'][762]++;
this.entityManagerView.dispose();
    _$jscoverage['public/javascripts/app.js'][763]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][769]++;
window.require.register('views/Tile', function(require, module) {
_$jscoverage['public/javascripts/app.js'][770]++;
var View, config, utils;

_$jscoverage['public/javascripts/app.js'][772]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/app.js'][774]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][776]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][778]++;
module.exports = View.extend("TileView", {
  create: function(tileModel) {
    _$jscoverage['public/javascripts/app.js'][780]++;
var view;
    _$jscoverage['public/javascripts/app.js'][781]++;
view = this._super();
    _$jscoverage['public/javascripts/app.js'][782]++;
view.model = tileModel;
    _$jscoverage['public/javascripts/app.js'][783]++;
view.el = new createjs.Bitmap(utils.tilesetImg);
    _$jscoverage['public/javascripts/app.js'][784]++;
view.model.setIndexCallback(function() {
      _$jscoverage['public/javascripts/app.js'][785]++;
return view.setSpritePosition();
    });
    _$jscoverage['public/javascripts/app.js'][787]++;
view.setSpritePosition();
    _$jscoverage['public/javascripts/app.js'][788]++;
return view;
  }
}, {
  setSpritePosition: function() {
    _$jscoverage['public/javascripts/app.js'][792]++;
var index, x, y;
    _$jscoverage['public/javascripts/app.js'][793]++;
index = this.model.index;
    _$jscoverage['public/javascripts/app.js'][794]++;
x = index % config.tileWidth;
    _$jscoverage['public/javascripts/app.js'][795]++;
y = Math.floor(index / config.tileHeight);
    _$jscoverage['public/javascripts/app.js'][796]++;
return this.el.sourceRect = new createjs.Rectangle(x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight);
  }
});

});

_$jscoverage['public/javascripts/app.js'][802]++;
window.require.register('views/Viewport', function(require, module) {
_$jscoverage['public/javascripts/app.js'][803]++;
var TileModel, TileView, View, config, utils;

_$jscoverage['public/javascripts/app.js'][805]++;
View = require("views/base/View");

_$jscoverage['public/javascripts/app.js'][807]++;
TileModel = require("models/Tile");

_$jscoverage['public/javascripts/app.js'][809]++;
TileView = require("views/Tile");

_$jscoverage['public/javascripts/app.js'][811]++;
utils = require("lib/utils");

_$jscoverage['public/javascripts/app.js'][813]++;
config = require("config");

_$jscoverage['public/javascripts/app.js'][815]++;
module.exports = View.extend("ViewportView", {
  create: function(viewportModel, tileMapModel) {
    _$jscoverage['public/javascripts/app.js'][817]++;
var tileView, view, _i, _len, _ref;
    _$jscoverage['public/javascripts/app.js'][818]++;
view = this._super();
    _$jscoverage['public/javascripts/app.js'][819]++;
view.model = viewportModel;
    _$jscoverage['public/javascripts/app.js'][820]++;
view.el = new createjs.Container;
    _$jscoverage['public/javascripts/app.js'][821]++;
view.tileMapModel = tileMapModel;
    _$jscoverage['public/javascripts/app.js'][822]++;
view.tileModels = this.buildTileModels(view);
    _$jscoverage['public/javascripts/app.js'][823]++;
view.tileViews = this.buildTileViews(view);
    _$jscoverage['public/javascripts/app.js'][824]++;
_ref = view.tileViews;
    _$jscoverage['public/javascripts/app.js'][825]++;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _$jscoverage['public/javascripts/app.js'][826]++;
tileView = _ref[_i];
      _$jscoverage['public/javascripts/app.js'][827]++;
view.el.addChild(tileView.el);
    }
    _$jscoverage['public/javascripts/app.js'][829]++;
EventBus.addEventListener("!key:down", view.onKeyDown, view);
    _$jscoverage['public/javascripts/app.js'][830]++;
EventBus.addEventListener("!mouse:down", view.onMouseDown, view);
    _$jscoverage['public/javascripts/app.js'][831]++;
EventBus.addEventListener("!move:" + view.model.uniqueId, view.drawMap, view);
    _$jscoverage['public/javascripts/app.js'][832]++;
return view;
  },
  buildTileModels: function(view) {
    _$jscoverage['public/javascripts/app.js'][835]++;
var model, tileMapData, tileMapModel, tileModel, tiles, x, y, _i, _j, _ref, _ref1;
    _$jscoverage['public/javascripts/app.js'][836]++;
tileMapModel = view.tileMapModel;
    _$jscoverage['public/javascripts/app.js'][837]++;
model = view.model;
    _$jscoverage['public/javascripts/app.js'][838]++;
tileMapData = tileMapModel.getArea(model.width, model.height, model.x, model.y);
    _$jscoverage['public/javascripts/app.js'][839]++;
tiles = [];
    _$jscoverage['public/javascripts/app.js'][840]++;
for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/app.js'][841]++;
for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        _$jscoverage['public/javascripts/app.js'][842]++;
tileModel = TileModel.create(tileMapData[y][x], x, y);
        _$jscoverage['public/javascripts/app.js'][843]++;
tiles.push(tileModel);
      }
    }
    _$jscoverage['public/javascripts/app.js'][846]++;
return tiles;
  },
  buildTileViews: function(view, img) {
    _$jscoverage['public/javascripts/app.js'][849]++;
var views;
    _$jscoverage['public/javascripts/app.js'][850]++;
views = [];
    _$jscoverage['public/javascripts/app.js'][851]++;
_.each(view.tileModels, function(tileModel) {
      _$jscoverage['public/javascripts/app.js'][852]++;
var tileView;
      _$jscoverage['public/javascripts/app.js'][853]++;
tileView = TileView.create(tileModel, img);
      _$jscoverage['public/javascripts/app.js'][854]++;
tileView.el.x = tileModel.x * config.tileWidth;
      _$jscoverage['public/javascripts/app.js'][855]++;
tileView.el.y = tileModel.y * config.tileHeight;
      _$jscoverage['public/javascripts/app.js'][856]++;
return views.push(tileView);
    });
    _$jscoverage['public/javascripts/app.js'][858]++;
return views;
  }
}, {
  drawMap: function() {
    _$jscoverage['public/javascripts/app.js'][862]++;
var tileMapData, tileModel, x, y, _i, _ref, _results;
    _$jscoverage['public/javascripts/app.js'][863]++;
tileMapData = this.tileMapModel.getArea(this.model.width, this.model.height, this.model.x, this.model.y);
    _$jscoverage['public/javascripts/app.js'][864]++;
_results = [];
    _$jscoverage['public/javascripts/app.js'][865]++;
for (y = _i = 0, _ref = tileMapData.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      _$jscoverage['public/javascripts/app.js'][866]++;
_results.push((function() {
        _$jscoverage['public/javascripts/app.js'][867]++;
var _j, _ref1, _results1;
        _$jscoverage['public/javascripts/app.js'][868]++;
_results1 = [];
        _$jscoverage['public/javascripts/app.js'][869]++;
for (x = _j = 0, _ref1 = tileMapData[y].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          _$jscoverage['public/javascripts/app.js'][870]++;
tileModel = this.tileModels[x + tileMapData[y].length * y];
          _$jscoverage['public/javascripts/app.js'][871]++;
_results1.push(tileModel.setIndex(tileMapData[y][x]));
        }
        _$jscoverage['public/javascripts/app.js'][873]++;
return _results1;
      }).call(this));
    }
    _$jscoverage['public/javascripts/app.js'][876]++;
return _results;
  },
  onMouseDown: function(_event, args) {
    _$jscoverage['public/javascripts/app.js'][879]++;
var direction, dx, dy, halfHeight, halfWidth, keyCode;
    _$jscoverage['public/javascripts/app.js'][880]++;
halfWidth = Math.floor(this.model.width / 2) * config.tileWidth;
    _$jscoverage['public/javascripts/app.js'][881]++;
halfHeight = Math.floor(this.model.height / 2) * config.tileHeight;
    _$jscoverage['public/javascripts/app.js'][882]++;
dx = args.stageX - halfWidth;
    _$jscoverage['public/javascripts/app.js'][883]++;
dy = args.stageY - halfHeight;
    _$jscoverage['public/javascripts/app.js'][884]++;
direction = Math.abs((Math.atan2(dx, dy) / Math.PI * 180) - 180);
    _$jscoverage['public/javascripts/app.js'][885]++;
keyCode = 37;
    _$jscoverage['public/javascripts/app.js'][886]++;
if (315 < direction || direction < 45) {
      _$jscoverage['public/javascripts/app.js'][887]++;
keyCode = 38;
    } else {
_$jscoverage['public/javascripts/app.js'][888]++;
if ((45 < direction && direction < 135)) {
      _$jscoverage['public/javascripts/app.js'][889]++;
keyCode = 39;
    } else {
_$jscoverage['public/javascripts/app.js'][890]++;
if ((135 < direction && direction < 225)) {
      _$jscoverage['public/javascripts/app.js'][891]++;
keyCode = 40;
    } else {
_$jscoverage['public/javascripts/app.js'][892]++;
if ((225 < direction && direction < 315)) {
      _$jscoverage['public/javascripts/app.js'][893]++;
keyCode = 37;
    }}
}
}

    _$jscoverage['public/javascripts/app.js'][895]++;
return EventBus.dispatch("!key:down", this, {
      keyCode: keyCode
    });
  },
  onKeyDown: function(_event, args) {
    _$jscoverage['public/javascripts/app.js'][900]++;
var x, y;
    _$jscoverage['public/javascripts/app.js'][901]++;
x = this.model.x;
    _$jscoverage['public/javascripts/app.js'][902]++;
y = this.model.y;
    _$jscoverage['public/javascripts/app.js'][903]++;
switch (args.keyCode) {
      case 37:
        _$jscoverage['public/javascripts/app.js'][905]++;
x = this.model.x - 1;
        _$jscoverage['public/javascripts/app.js'][906]++;
x = utils.clamp(x, config.worldTileWidth);
        _$jscoverage['public/javascripts/app.js'][907]++;
break;
      case 38:
        _$jscoverage['public/javascripts/app.js'][909]++;
y = this.model.y - 1;
        _$jscoverage['public/javascripts/app.js'][910]++;
y = utils.clamp(y, config.worldTileHeight);
        _$jscoverage['public/javascripts/app.js'][911]++;
break;
      case 39:
        _$jscoverage['public/javascripts/app.js'][913]++;
x = this.model.x + 1;
        _$jscoverage['public/javascripts/app.js'][914]++;
x = utils.clamp(x, config.worldTileWidth);
        _$jscoverage['public/javascripts/app.js'][915]++;
break;
      case 40:
        _$jscoverage['public/javascripts/app.js'][917]++;
y = this.model.y + 1;
        _$jscoverage['public/javascripts/app.js'][918]++;
y = utils.clamp(y, config.worldTileHeight);
    }
    _$jscoverage['public/javascripts/app.js'][920]++;
return this.model.setPosition(x, y);
  },
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][923]++;
_.each(this.tileModels, function(tileModel) {
      _$jscoverage['public/javascripts/app.js'][924]++;
return tileModel.dispose();
    });
    _$jscoverage['public/javascripts/app.js'][926]++;
_.each(this.tileViews, function(tileView) {
      _$jscoverage['public/javascripts/app.js'][927]++;
return tileView.dispose();
    });
    _$jscoverage['public/javascripts/app.js'][929]++;
EventBus.removeEventListener("!move:" + this.model.uniqueId, this.drawMap, this);
    _$jscoverage['public/javascripts/app.js'][930]++;
EventBus.removeEventListener("!key:down", this.onKeyDown, this);
    _$jscoverage['public/javascripts/app.js'][931]++;
EventBus.removeEventListener("!mouse:down", this.onMouseDown, this);
    _$jscoverage['public/javascripts/app.js'][932]++;
return this._super();
  }
});

});

_$jscoverage['public/javascripts/app.js'][938]++;
window.require.register('views/base/View', function(require, module) {

_$jscoverage['public/javascripts/app.js'][940]++;
module.exports = gamecore.DualPooled.extend("View", {
  getUsedLength: function() {
    _$jscoverage['public/javascripts/app.js'][942]++;
return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/app.js'][946]++;
return this.release();
  }
});

});
