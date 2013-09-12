CreatureModel = require "models/Creature"
TileMapModel = require "models/TileMap"
config = require "config"

describe "Model Creature", ->
  beforeEach ->
    config.seed = 20130813

    @tileMapModel = TileMapModel.create 'models/Heightmap'

    sinon.stub @tileMapModel, "getTile", -> 1

    @creatureModel = CreatureModel.create 3, 5, @tileMapModel

  afterEach ->
    @tileMapModel.getTile.restore()

    @creatureModel.dispose()
    @tileMapModel.dispose()

    expect(CreatureModel.getUsedLength()).to.equal 0
    expect(TileMapModel.getUsedLength()).to.equal 0

  it "should have x and y", ->
    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 5

  it "should have a tileMapModel", ->
    expect(@creatureModel.tileMapModel).to.not.equal undefined

  it "should dispatch an event when x or y changes", ->
    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 5

    xTriggered = false
    yTriggered = false

    EventBus.addEventListener "!move:#{@creatureModel.uniqueId}", ->
      xTriggered = true if @creatureModel.x is 4
      yTriggered = true if @creatureModel.y is 6
    , @

    @creatureModel.setPosition 4, 6

    expect(@creatureModel.x).to.equal 4
    expect(@creatureModel.y).to.equal 6

    expect(xTriggered).to.equal true
    expect(yTriggered).to.equal true

  it "should wander around", ->
    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 5
    expect(@creatureModel.direction).to.equal "South"

    @creatureModel.tick()

    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 4
    expect(@creatureModel.direction).to.equal "North"

    @creatureModel.tick()

    expect(@creatureModel.x).to.equal 2
    expect(@creatureModel.y).to.equal 4
    expect(@creatureModel.direction).to.equal "West"

    @creatureModel.tick()

    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 4
    expect(@creatureModel.direction).to.equal "East"

    config.sessionSeed = 20130815

    @creatureModel.tick()

    expect(@creatureModel.x).to.equal 3
    expect(@creatureModel.y).to.equal 5
    expect(@creatureModel.direction).to.equal "South"
