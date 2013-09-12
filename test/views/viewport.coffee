ViewportView = require "views/Viewport"
ViewportModel = require "models/Viewport"
TileMapModel = require "models/TileMap"
TileModel = require "models/Tile"
TileView = require "views/Tile"
config = require "config"

describe "View Viewport", ->
  beforeEach ->
    config.seed = 19870910

    @tileMapModel = TileMapModel.create 'models/Heightmap'
    @viewportModel = ViewportModel.create 1, 2, 5, 6
    @viewportView = ViewportView.create @viewportModel, @tileMapModel

  afterEach ->
    @viewportView.dispose()
    @viewportModel.dispose()
    @tileMapModel.dispose()

    expect(ViewportView.getUsedLength()).to.equal 0
    expect(ViewportModel.getUsedLength()).to.equal 0
    expect(TileModel.getUsedLength()).to.equal 0
    expect(TileView.getUsedLength()).to.equal 0
    expect(TileMapModel.getUsedLength()).to.equal 0

  it "should have a model", ->
    expect(@viewportView.model).to.not.equal undefined

  it "should have an el", ->
    expect(@viewportView.el).to.not.equal undefined

  it "should have a tileMap", ->
    expect(@viewportView.tileMapModel).to.not.equal undefined

  it "should update viewport model with keyboard movement", ->
    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2

    EventBus.dispatch "!key:down", {}, { keyCode: 37 }

    expect(@viewportModel.x).to.equal 0
    expect(@viewportModel.y).to.equal 2

    EventBus.dispatch "!key:down", {}, { keyCode: 38 }

    expect(@viewportModel.x).to.equal 0
    expect(@viewportModel.y).to.equal 1

    EventBus.dispatch "!key:down", {}, { keyCode: 39 }

    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 1

  it "should update viewport model with mouse movement", ->
    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2

    stageX = (@viewportModel.width / 2) * config.tileWidth
    stageY = (@viewportModel.height) * config.tileHeight

    EventBus.dispatch "!mouse:down", {}, {stageX, stageY}

    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 3

    stageX = (@viewportModel.width / 2) * config.tileWidth
    stageY = 0

    EventBus.dispatch "!mouse:down", {}, {stageX, stageY}

    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2

    stageX = 0
    stageY = (@viewportModel.height / 2) * config.tileHeight

    EventBus.dispatch "!mouse:down", {}, {stageX, stageY}

    expect(@viewportModel.x).to.equal 0
    expect(@viewportModel.y).to.equal 2

    stageX = (@viewportModel.width) * config.tileWidth
    stageY = (@viewportModel.height / 2) * config.tileHeight

    EventBus.dispatch "!mouse:down", {}, {stageX, stageY}

    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2

  it "should add tile views to container", ->
    expect(@viewportView.el.children.length).to.equal 30

  it "should redraw when key down event is fired by viewport", ->
    tileModels = @viewportView.tileModels

    expect(tileModels[0].index).to.equal 185

    @viewportModel.setPosition 12, @viewportModel.y

    expect(tileModels[0].index).to.equal 255
