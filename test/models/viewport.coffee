ViewportModel = require "models/Viewport"
config = require "config"

describe "Model Viewport", ->
  beforeEach ->
    config.worldChunkWidth = 5
    config.worldChunkHeight = 6
    config.chunkWidth = 7
    config.chunkHeight = 8
    config.maxElevation = 9
    config.worldTileWidth = 35
    config.worldTileHeight = 48

    @viewportModel = ViewportModel.create 1, 2, 3, 4

  afterEach ->
    @viewportModel.dispose()

    expect(ViewportModel.getUsedLength()).to.equal 0

  it "should have valid properties", ->
    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2
    expect(@viewportModel.width).to.equal 3
    expect(@viewportModel.height).to.equal 4

  it "should set position", ->
    expect(@viewportModel.x).to.equal 1
    expect(@viewportModel.y).to.equal 2

    @viewportModel.setPosition 3, 5

    expect(@viewportModel.x).to.equal 3
    expect(@viewportModel.y).to.equal 5

  it "should fire an event when x/y change", ->
    eventCalled = false

    eventCallback = ->
      eventCalled = true

    EventBus.addEventListener "!move:#{@viewportModel.uniqueId}", eventCallback, @

    @viewportModel.setPosition 4, @viewportModel.y

    expect(eventCalled).to.equal true

    EventBus.removeEventListener eventCallback, @
