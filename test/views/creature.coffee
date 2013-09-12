CreatureView = require "views/Creature"
CreatureModel = require "models/Creature"
ViewportModel = require "models/Viewport"
config = require "config"

describe "View Creature", ->
  beforeEach ->
    config.chunkWidth = 8
    config.chunkHeight = 8
    config.worldChunkWidth = 3
    config.worldChunkHeight = 3
    config.worldTileWidth = 24
    config.worldTileHeight = 24
    @viewportModel = ViewportModel.create 0, 0, 30, 20
    @creatureModel = CreatureModel.create 0, 0
    @creatureView = CreatureView.create @creatureModel, @viewportModel

  afterEach ->
    @creatureView.dispose()
    @creatureModel.dispose()
    @viewportModel.dispose()

    expect(CreatureView.getUsedLength()).to.equal 0
    expect(CreatureModel.getUsedLength()).to.equal 0
    expect(ViewportModel.getUsedLength()).to.equal 0

  it "should have a model", ->
    expect(@creatureView.model).not.to.equal undefined

  it "should have a spriteSheet", ->
    expect(@creatureView.spriteSheet).not.to.equal undefined

  it "should have an el", ->
    expect(@creatureView.el).not.to.equal undefined

  it "should be correctly positioned", ->
    expect(@creatureView.el.x).to.equal 240
    expect(@creatureView.el.y).to.equal 160

  it "should move when model x/y changes", ->
    @creatureModel.setPosition 1, 1

    @creatureView.el.x = @creatureView.intendedX
    @creatureView.el.y = @creatureView.intendedY

    expect(@creatureView.el.x).to.equal 256
    expect(@creatureView.el.y).to.equal 176

  it "should wrap around viewport", ->
    @creatureModel.setPosition config.worldTileWidth - 1, config.worldTileHeight - 1

    @creatureView.el.x = @creatureView.intendedX
    @creatureView.el.y = @creatureView.intendedY

    expect(@creatureView.el.x).to.equal 224
    expect(@creatureView.el.y).to.equal 144

  it "should stay in tile position when viewport moves", ->
    @viewportModel.setPosition 1, ~~(config.worldTileHeight / 2) + 1

    @creatureView.el.x = @creatureView.intendedX
    @creatureView.el.y = @creatureView.intendedY

    expect(@creatureView.el.x).to.equal 224
    expect(@creatureView.el.y).to.equal 336

  it "should change sprite animation on direction change", ->
    @creatureModel.direction = "North"
    @creatureView.onModelMove()

    expect(@creatureView.el.currentAnimation).to.equal "walkNorth"

    @creatureModel.direction = "East"
    @creatureView.onModelMove()

    expect(@creatureView.el.currentAnimation).to.equal "walkEast"

    @creatureModel.direction = "West"
    @creatureView.onModelMove()

    expect(@creatureView.el.currentAnimation).to.equal "walkWest"

  it "should set correct position on tick", ->
    expect(@creatureView.el.x).to.equal 240

    @creatureView.intendedX = 240
    @creatureView.offsetX = 10

    @creatureView.onTick()

    expect(@creatureView.el.x).to.equal 250
