window.require.register('test/config', function(require, module) {
var config;

config = require("config");

describe("Lib config", function() {
  it("should have a seed", function() {
    return expect(config.seed).to.not.equal(void 0);
  });
  it("should have a session seed", function() {
    return expect(config.sessionSeed).to.not.equal(void 0);
  });
  it("should have a spriteSheetSource", function() {
    return expect(config.spriteSheetSource).to.not.equal(void 0);
  });
  it("should have a tileWidth and tileHeight", function() {
    expect(config.tileWidth).to.not.equal(void 0);
    return expect(config.tileHeight).to.not.equal(void 0);
  });
  it("should have a worldChunkWidth and worldChunkHeight", function() {
    expect(config.worldChunkWidth).to.not.equal(void 0);
    return expect(config.worldChunkHeight).to.not.equal(void 0);
  });
  it("should have a chunkWidth and chunkHeight", function() {
    expect(config.chunkWidth).to.not.equal(void 0);
    return expect(config.chunkHeight).to.not.equal(void 0);
  });
  return it("should calculate worldTileWidth and worldTileHeight", function() {
    expect(config.worldTileWidth).to.equal(config.worldChunkWidth * config.chunkWidth);
    return expect(config.worldTileHeight).to.equal(config.worldChunkHeight * config.chunkHeight);
  });
});

});

window.require.register('test/index', function(require, module) {
var ApplicationView, StageView;

StageView = require("views/Stage");

ApplicationView = require("index");

describe("View Index", function() {
  beforeEach(function() {
    return this.applicationView = new ApplicationView;
  });
  afterEach(function() {
    var canvasId;
    canvasId = "stage-view-" + this.applicationView.stageView.objectId;
    this.applicationView.dispose();
    expect(document.getElementById(canvasId)).to.equal(null);
    return expect(StageView.getUsedLength()).to.equal(0);
  });
  it("should create a canvas element", function() {
    var canvasId;
    canvasId = "stage-view-" + this.applicationView.stageView.objectId;
    return expect(document.getElementById(canvasId)).to.not.equal(null);
  });
  it("should trigger keyboard events", function() {
    var eventTriggered;
    eventTriggered = false;
    EventBus.addEventListener("!key:down", function() {
      return eventTriggered = true;
    });
    this.applicationView.onKeyDown({
      keyCode: 37
    });
    return expect(eventTriggered).to.equal(true);
  });
  return it("should trigger mouse events", function() {
    var eventTriggered;
    eventTriggered = false;
    EventBus.addEventListener("!mouse:down", function() {
      return eventTriggered = true;
    });
    this.applicationView.onElMouseDown({});
    return expect(eventTriggered).to.equal(true);
  });
});

});

window.require.register('test/initialize', function(require, module) {
var runner, test, tests, _i, _len;

tests = ["test/utils", "test/config", "test/models/heightmapChunk", "test/models/heightmap", "test/models/tileMap", "test/models/tile", "test/models/viewport", "test/models/creature", "test/views/tile", "test/views/viewport", "test/views/entityManager", "test/views/creature", "test/views/stage", "test/index"];

for (_i = 0, _len = tests.length; _i < _len; _i++) {
  test = tests[_i];
  require(test);
}

if (window.mochaPhantomJS) {
  mochaPhantomJS.run();
} else {
  runner = mocha.run();
  runner.on("end", function() {
    return new MochaCov;
  });
}

});

window.require.register('test/models/creature', function(require, module) {
var CreatureModel, TileMapModel, config;

CreatureModel = require("models/Creature");

TileMapModel = require("models/TileMap");

config = require("config");

describe("Model Creature", function() {
  beforeEach(function() {
    config.seed = 20130813;
    this.tileMapModel = TileMapModel.create('models/Heightmap');
    sinon.stub(this.tileMapModel, "getTile", function() {
      return 1;
    });
    return this.creatureModel = CreatureModel.create(3, 5, this.tileMapModel);
  });
  afterEach(function() {
    this.tileMapModel.getTile.restore();
    this.creatureModel.dispose();
    this.tileMapModel.dispose();
    expect(CreatureModel.getUsedLength()).to.equal(0);
    return expect(TileMapModel.getUsedLength()).to.equal(0);
  });
  it("should have x and y", function() {
    expect(this.creatureModel.x).to.equal(3);
    return expect(this.creatureModel.y).to.equal(5);
  });
  it("should have a tileMapModel", function() {
    return expect(this.creatureModel.tileMapModel).to.not.equal(void 0);
  });
  it("should dispatch an event when x or y changes", function() {
    var xTriggered, yTriggered;
    expect(this.creatureModel.x).to.equal(3);
    expect(this.creatureModel.y).to.equal(5);
    xTriggered = false;
    yTriggered = false;
    EventBus.addEventListener("!move:" + this.creatureModel.uniqueId, function() {
      if (this.creatureModel.x === 4) {
        xTriggered = true;
      }
      if (this.creatureModel.y === 6) {
        return yTriggered = true;
      }
    }, this);
    this.creatureModel.setPosition(4, 6);
    expect(this.creatureModel.x).to.equal(4);
    expect(this.creatureModel.y).to.equal(6);
    expect(xTriggered).to.equal(true);
    return expect(yTriggered).to.equal(true);
  });
  return it("should wander around", function() {
    expect(this.creatureModel.x).to.equal(3);
    expect(this.creatureModel.y).to.equal(5);
    expect(this.creatureModel.direction).to.equal("South");
    this.creatureModel.tick();
    expect(this.creatureModel.x).to.equal(3);
    expect(this.creatureModel.y).to.equal(4);
    expect(this.creatureModel.direction).to.equal("North");
    this.creatureModel.tick();
    expect(this.creatureModel.x).to.equal(2);
    expect(this.creatureModel.y).to.equal(4);
    expect(this.creatureModel.direction).to.equal("West");
    this.creatureModel.tick();
    expect(this.creatureModel.x).to.equal(3);
    expect(this.creatureModel.y).to.equal(4);
    expect(this.creatureModel.direction).to.equal("East");
    config.sessionSeed = 20130815;
    this.creatureModel.tick();
    expect(this.creatureModel.x).to.equal(3);
    expect(this.creatureModel.y).to.equal(5);
    return expect(this.creatureModel.direction).to.equal("South");
  });
});

});

window.require.register('test/models/heightmap', function(require, module) {
var HeightmapChunkModel, HeightmapModel, config;

HeightmapModel = require("models/Heightmap");

HeightmapChunkModel = require("models/HeightmapChunk");

config = require("config");

describe("Model Heightmap", function() {
  beforeEach(function() {
    var seed;
    config.worldChunkWidth = 3;
    config.worldChunkHeight = 3;
    config.chunkWidth = 4;
    config.chunkHeight = 3;
    config.worldTileWidth = 12;
    config.worldTileHeight = 9;
    config.maxElevation = 5;
    seed = 19870910;
    return this.heightmapModel = HeightmapModel.create(seed);
  });
  afterEach(function() {
    this.heightmapModel.dispose();
    expect(HeightmapModel.getUsedLength()).to.equal(0);
    return expect(HeightmapChunkModel.getUsedLength()).to.equal(0);
  });
  it("should get a chunk by x, y", function() {
    var chunk;
    chunk = this.heightmapModel.getChunk(0, 0);
    expect(chunk.cells.length).to.deep.equal(3);
    return expect(chunk.cells[0].length).to.deep.equal(4);
  });
  it("should get a cell", function() {
    var cell;
    cell = this.heightmapModel.getCell(0, 0);
    return expect(cell).to.equal(0);
  });
  return it("should collect heightmap data for chunk", function() {
    var chunk, heightmap, heightmapData;
    chunk = this.heightmapModel.getChunk(0, 0);
    heightmap = [];
    heightmapData = this.heightmapModel.collectHeightmapDataForChunk(0, 0, chunk.cells, heightmap);
    expect(heightmap.length).to.equal(3);
    return expect(heightmap[0].length).to.equal(4);
  });
});

});

window.require.register('test/models/heightmapChunk', function(require, module) {
var HeightmapChunkModel;

HeightmapChunkModel = require("models/HeightmapChunk");

describe("Model HeightmapChunk", function() {
  beforeEach(function() {
    return this.heightmapChunkModel = HeightmapChunkModel.create();
  });
  afterEach(function() {
    this.heightmapChunkModel.dispose();
    return expect(HeightmapChunkModel.getUsedLength()).to.equal(0);
  });
  it("should do bilinear interpolation", function() {
    var interpolation;
    interpolation = HeightmapChunkModel.bilinearInterpolate(0, 0, 10, 10, 5, 5);
    expect(interpolation.length).to.equal(5);
    expect(interpolation[0].length).to.equal(5);
    expect(interpolation[0][0]).to.equal(0);
    expect(interpolation[4][4]).to.equal(10);
    return expect(interpolation[2][2]).to.equal(5);
  });
  it("should have cells", function() {
    return expect(this.heightmapChunkModel.cells).to.not.equal(void 0);
  });
  return it("should do populate it's cells correctly", function() {
    var map;
    this.heightmapChunkModel.dispose();
    this.heightmapChunkModel = HeightmapChunkModel.create(0, 4, 0, 4, 5, 5);
    map = [[0, 1, 2, 3, 4], [1, 1, 2, 2, 3], [2, 2, 2, 2, 2], [3, 2, 2, 1, 1], [4, 3, 2, 1, 0]];
    return expect(this.heightmapChunkModel.cells).to.deep.equal(map);
  });
});

});

window.require.register('test/models/tile', function(require, module) {
var TileModel;

TileModel = require("models/Tile");

describe("Model Tile", function() {
  beforeEach(function() {
    return this.tileModel = TileModel.create(1, 2, 3);
  });
  afterEach(function() {
    this.tileModel.dispose();
    return expect(TileModel.getUsedLength()).to.equal(0);
  });
  it("should be valid", function() {
    expect(this.tileModel.index).to.equal(1);
    expect(this.tileModel.x).to.equal(2);
    return expect(this.tileModel.y).to.equal(3);
  });
  it("should set index", function() {
    expect(this.tileModel.index).to.equal(1);
    this.tileModel.setIndex(5);
    return expect(this.tileModel.index).to.equal(5);
  });
  return it("should fire a callback when index has changed", function() {
    var eventCallback, eventCalled;
    eventCalled = false;
    eventCallback = function() {
      return eventCalled = true;
    };
    this.tileModel.setIndexCallback(eventCallback);
    this.tileModel.setIndex(5);
    return expect(eventCalled).to.equal(true);
  });
});

});

window.require.register('test/models/tileMap', function(require, module) {
var HeightmapModel, TileMapModel, config;

TileMapModel = require("models/TileMap");

HeightmapModel = require("models/Heightmap");

config = require("config");

describe("Model TileMap", function() {
  beforeEach(function() {
    var seed;
    config.worldChunkWidth = 3;
    config.worldChunkHeight = 3;
    config.chunkWidth = 4;
    config.chunkHeight = 3;
    config.worldTileWidth = 12;
    config.worldTileHeight = 9;
    config.maxElevation = 5;
    seed = 19870910;
    return this.tileMapModel = TileMapModel.create("models/Heightmap");
  });
  afterEach(function() {
    this.tileMapModel.dispose();
    expect(TileMapModel.getUsedLength()).to.equal(0);
    return expect(HeightmapModel.getUsedLength()).to.equal(0);
  });
  it("should get a tile based on world x, y", function() {
    var tile;
    tile = this.tileMapModel.getTile(0, 0);
    return expect(tile).to.equal(255);
  });
  it("should find neighbors by tile x and y", function() {
    var neighbors;
    neighbors = this.tileMapModel.collectNeighbors(0, 0);
    return expect(neighbors).to.deep.equal([1, 1, 1, 1, 1, 1, 1, 1]);
  });
  it("should convert neighbor count to spritesheet index", function() {
    expect(this.tileMapModel.getIndexByNeighbors(0, [0, 0, 0, 0, 0, 0, 0, 0])).to.equal(0);
    return expect(this.tileMapModel.getIndexByNeighbors(1, [0, 0, 0, 0, 0, 0, 1, 0])).to.equal(4);
  });
  it("should get an area", function() {
    var area;
    area = this.tileMapModel.getArea(10, 10, 0, 0);
    expect(area.length).to.equal(10);
    expect(area[0].length).to.equal(10);
    expect(area[0][0]).to.equal(213);
    expect(area[9][0]).to.equal(213);
    expect(area[9][9]).to.equal(0);
    return expect(area[0][9]).to.equal(0);
  });
  return it("should process tiles to spritesheet indicies", function() {
    var data;
    data = this.tileMapModel.getArea(8, 8, 4, 4);
    expect(data[0][0]).to.equal(255);
    expect(data[5][0]).to.equal(0);
    expect(data[5][7]).to.equal(222);
    return expect(data[0][7]).to.equal(0);
  });
});

});

window.require.register('test/models/viewport', function(require, module) {
var ViewportModel, config;

ViewportModel = require("models/Viewport");

config = require("config");

describe("Model Viewport", function() {
  beforeEach(function() {
    config.worldChunkWidth = 5;
    config.worldChunkHeight = 6;
    config.chunkWidth = 7;
    config.chunkHeight = 8;
    config.maxElevation = 9;
    config.worldTileWidth = 35;
    config.worldTileHeight = 48;
    return this.viewportModel = ViewportModel.create(1, 2, 3, 4);
  });
  afterEach(function() {
    this.viewportModel.dispose();
    return expect(ViewportModel.getUsedLength()).to.equal(0);
  });
  it("should have valid properties", function() {
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(2);
    expect(this.viewportModel.width).to.equal(3);
    return expect(this.viewportModel.height).to.equal(4);
  });
  it("should set position", function() {
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(2);
    this.viewportModel.setPosition(3, 5);
    expect(this.viewportModel.x).to.equal(3);
    return expect(this.viewportModel.y).to.equal(5);
  });
  return it("should fire an event when x/y change", function() {
    var eventCallback, eventCalled;
    eventCalled = false;
    eventCallback = function() {
      return eventCalled = true;
    };
    EventBus.addEventListener("!move:" + this.viewportModel.uniqueId, eventCallback, this);
    this.viewportModel.setPosition(4, this.viewportModel.y);
    expect(eventCalled).to.equal(true);
    return EventBus.removeEventListener(eventCallback, this);
  });
});

});

window.require.register('test/utils', function(require, module) {
var config, utils;

utils = require("lib/utils");

config = require("config");

config.seed = 20130813;

config.sessionSeed = 19870910;

describe("Lib Utils", function() {
  it("should clamp", function() {
    expect(utils.clamp(10, 20)).to.equal(10);
    expect(utils.clamp(21, 20)).to.equal(1);
    return expect(utils.clamp(-10, 20)).to.equal(10);
  });
  it("should random", function() {
    return expect(utils.random(20)).to.equal(0.9575093308120967);
  });
  it("should tileHeightToType", function() {
    expect(utils.tileHeightToType(4, 10)).to.equal(0);
    return expect(utils.tileHeightToType(6, 10)).to.equal(1);
  });
  return it("should have an incrementing session seed", function() {
    expect(utils.sessionRandom()).to.equal(0.07641793277815007);
    return expect(utils.sessionRandom()).to.equal(0.5967972170491195);
  });
});

});

window.require.register('test/views/creature', function(require, module) {
var CreatureModel, CreatureView, ViewportModel, config;

CreatureView = require("views/Creature");

CreatureModel = require("models/Creature");

ViewportModel = require("models/Viewport");

config = require("config");

describe("View Creature", function() {
  beforeEach(function() {
    config.chunkWidth = 8;
    config.chunkHeight = 8;
    config.worldChunkWidth = 3;
    config.worldChunkHeight = 3;
    config.worldTileWidth = 24;
    config.worldTileHeight = 24;
    this.viewportModel = ViewportModel.create(0, 0, 30, 20);
    this.creatureModel = CreatureModel.create(0, 0);
    return this.creatureView = CreatureView.create(this.creatureModel, this.viewportModel);
  });
  afterEach(function() {
    this.creatureView.dispose();
    this.creatureModel.dispose();
    this.viewportModel.dispose();
    expect(CreatureView.getUsedLength()).to.equal(0);
    expect(CreatureModel.getUsedLength()).to.equal(0);
    return expect(ViewportModel.getUsedLength()).to.equal(0);
  });
  it("should have a model", function() {
    return expect(this.creatureView.model).not.to.equal(void 0);
  });
  it("should have a spriteSheet", function() {
    return expect(this.creatureView.spriteSheet).not.to.equal(void 0);
  });
  it("should have an el", function() {
    return expect(this.creatureView.el).not.to.equal(void 0);
  });
  it("should be correctly positioned", function() {
    expect(this.creatureView.el.x).to.equal(240);
    return expect(this.creatureView.el.y).to.equal(160);
  });
  it("should move when model x/y changes", function() {
    this.creatureModel.setPosition(1, 1);
    this.creatureView.el.x = this.creatureView.intendedX;
    this.creatureView.el.y = this.creatureView.intendedY;
    expect(this.creatureView.el.x).to.equal(256);
    return expect(this.creatureView.el.y).to.equal(176);
  });
  it("should wrap around viewport", function() {
    this.creatureModel.setPosition(config.worldTileWidth - 1, config.worldTileHeight - 1);
    this.creatureView.el.x = this.creatureView.intendedX;
    this.creatureView.el.y = this.creatureView.intendedY;
    expect(this.creatureView.el.x).to.equal(224);
    return expect(this.creatureView.el.y).to.equal(144);
  });
  it("should stay in tile position when viewport moves", function() {
    this.viewportModel.setPosition(1, ~~(config.worldTileHeight / 2) + 1);
    this.creatureView.el.x = this.creatureView.intendedX;
    this.creatureView.el.y = this.creatureView.intendedY;
    expect(this.creatureView.el.x).to.equal(224);
    return expect(this.creatureView.el.y).to.equal(336);
  });
  it("should change sprite animation on direction change", function() {
    this.creatureModel.direction = "North";
    this.creatureView.onModelMove();
    expect(this.creatureView.el.currentAnimation).to.equal("walkNorth");
    this.creatureModel.direction = "East";
    this.creatureView.onModelMove();
    expect(this.creatureView.el.currentAnimation).to.equal("walkEast");
    this.creatureModel.direction = "West";
    this.creatureView.onModelMove();
    return expect(this.creatureView.el.currentAnimation).to.equal("walkWest");
  });
  return it("should set correct position on tick", function() {
    expect(this.creatureView.el.x).to.equal(240);
    this.creatureView.intendedX = 240;
    this.creatureView.offsetX = 10;
    this.creatureView.onTick();
    return expect(this.creatureView.el.x).to.equal(250);
  });
});

});

window.require.register('test/views/entityManager', function(require, module) {
var CreatureModel, CreatureView, EntityManagerView, HeightmapModel, ViewportModel, config;

EntityManagerView = require("views/EntityManager");

ViewportModel = require("models/Viewport");

CreatureView = require("views/Creature");

CreatureModel = require("models/Creature");

HeightmapModel = require("models/Heightmap");

config = require("config");

describe("View EntityManager", function() {
  beforeEach(function() {
    this.viewportModel = ViewportModel.create(1, 2, 5, 6, 5, 6, 7, 8, 9);
    this.entityManagerView = EntityManagerView.create(this.viewportModel);
    return this.heightmapModel = HeightmapModel.create(config.seed);
  });
  afterEach(function() {
    this.entityManagerView.dispose();
    this.heightmapModel.dispose();
    this.viewportModel.dispose();
    expect(EntityManagerView.getUsedLength()).to.equal(0);
    expect(CreatureView.getUsedLength()).to.equal(0);
    expect(CreatureModel.getUsedLength()).to.equal(0);
    expect(HeightmapModel.getUsedLength()).to.equal(0);
    return expect(ViewportModel.getUsedLength()).to.equal(0);
  });
  return it("should add creatures", function() {
    var populationSize;
    populationSize = 20;
    this.entityManagerView.addCreatures(populationSize, this.heightmapModel);
    return expect(this.entityManagerView.creatureViews.length).to.equal(populationSize);
  });
});

});

window.require.register('test/views/stage', function(require, module) {
var StageView, ViewportModel, ViewportView;

StageView = require("views/Stage");

ViewportView = require("views/Viewport");

ViewportModel = require("models/Viewport");

describe("View Stage", function() {
  beforeEach(function() {
    return this.stageView = StageView.create();
  });
  afterEach(function() {
    this.stageView.dispose();
    expect(StageView.getUsedLength()).to.equal(0);
    expect(ViewportView.getUsedLength()).to.equal(0);
    return expect(ViewportModel.getUsedLength()).to.equal(0);
  });
  return it("should clean up correctly", function() {
    return expect(true).to.equal(true);
  });
});

});

window.require.register('test/views/tile', function(require, module) {
var TileModel, TileView, config;

TileView = require("views/Tile");

TileModel = require("models/Tile");

config = require("config");

describe("View Tile", function() {
  beforeEach(function() {
    this.tileModel = TileModel.create(1, 2, 3);
    return this.tileView = TileView.create(this.tileModel);
  });
  afterEach(function() {
    this.tileView.dispose();
    this.tileModel.dispose();
    expect(TileView.getUsedLength()).to.equal(0);
    return expect(TileModel.getUsedLength()).to.equal(0);
  });
  it("should have an el", function() {
    return expect(this.tileView.el).to.not.equal(void 0);
  });
  it("should set sprite sheet position", function() {
    expect(this.tileView.el.sourceRect.x).to.equal(config.tileWidth);
    return expect(this.tileView.el.sourceRect.y).to.equal(0);
  });
  return it("should set sprite position when model index changes", function() {
    expect(this.tileView.el.sourceRect.x).to.equal(config.tileWidth);
    expect(this.tileView.el.sourceRect.y).to.equal(0);
    this.tileModel.setIndex(3);
    expect(this.tileView.el.sourceRect.x).to.equal(48);
    return expect(this.tileView.el.sourceRect.y).to.equal(0);
  });
});

});

window.require.register('test/views/viewport', function(require, module) {
var TileMapModel, TileModel, TileView, ViewportModel, ViewportView, config;

ViewportView = require("views/Viewport");

ViewportModel = require("models/Viewport");

TileMapModel = require("models/TileMap");

TileModel = require("models/Tile");

TileView = require("views/Tile");

config = require("config");

describe("View Viewport", function() {
  beforeEach(function() {
    config.seed = 19870910;
    this.tileMapModel = TileMapModel.create('models/Heightmap');
    this.viewportModel = ViewportModel.create(1, 2, 5, 6);
    return this.viewportView = ViewportView.create(this.viewportModel, this.tileMapModel);
  });
  afterEach(function() {
    this.viewportView.dispose();
    this.viewportModel.dispose();
    this.tileMapModel.dispose();
    expect(ViewportView.getUsedLength()).to.equal(0);
    expect(ViewportModel.getUsedLength()).to.equal(0);
    expect(TileModel.getUsedLength()).to.equal(0);
    expect(TileView.getUsedLength()).to.equal(0);
    return expect(TileMapModel.getUsedLength()).to.equal(0);
  });
  it("should have a model", function() {
    return expect(this.viewportView.model).to.not.equal(void 0);
  });
  it("should have an el", function() {
    return expect(this.viewportView.el).to.not.equal(void 0);
  });
  it("should have a tileMap", function() {
    return expect(this.viewportView.tileMapModel).to.not.equal(void 0);
  });
  it("should update viewport model with keyboard movement", function() {
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(2);
    EventBus.dispatch("!key:down", {}, {
      keyCode: 37
    });
    expect(this.viewportModel.x).to.equal(0);
    expect(this.viewportModel.y).to.equal(2);
    EventBus.dispatch("!key:down", {}, {
      keyCode: 38
    });
    expect(this.viewportModel.x).to.equal(0);
    expect(this.viewportModel.y).to.equal(1);
    EventBus.dispatch("!key:down", {}, {
      keyCode: 39
    });
    expect(this.viewportModel.x).to.equal(1);
    return expect(this.viewportModel.y).to.equal(1);
  });
  it("should update viewport model with mouse movement", function() {
    var stageX, stageY;
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(2);
    stageX = (this.viewportModel.width / 2) * config.tileWidth;
    stageY = this.viewportModel.height * config.tileHeight;
    EventBus.dispatch("!mouse:down", {}, {
      stageX: stageX,
      stageY: stageY
    });
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(3);
    stageX = (this.viewportModel.width / 2) * config.tileWidth;
    stageY = 0;
    EventBus.dispatch("!mouse:down", {}, {
      stageX: stageX,
      stageY: stageY
    });
    expect(this.viewportModel.x).to.equal(1);
    expect(this.viewportModel.y).to.equal(2);
    stageX = 0;
    stageY = (this.viewportModel.height / 2) * config.tileHeight;
    EventBus.dispatch("!mouse:down", {}, {
      stageX: stageX,
      stageY: stageY
    });
    expect(this.viewportModel.x).to.equal(0);
    expect(this.viewportModel.y).to.equal(2);
    stageX = this.viewportModel.width * config.tileWidth;
    stageY = (this.viewportModel.height / 2) * config.tileHeight;
    EventBus.dispatch("!mouse:down", {}, {
      stageX: stageX,
      stageY: stageY
    });
    expect(this.viewportModel.x).to.equal(1);
    return expect(this.viewportModel.y).to.equal(2);
  });
  it("should add tile views to container", function() {
    return expect(this.viewportView.el.children.length).to.equal(30);
  });
  return it("should redraw when key down event is fired by viewport", function() {
    var tileModels;
    tileModels = this.viewportView.tileModels;
    expect(tileModels[0].index).to.equal(185);
    this.viewportModel.setPosition(12, this.viewportModel.y);
    return expect(tileModels[0].index).to.equal(255);
  });
});

});
