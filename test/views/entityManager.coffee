EntityManagerView = require "views/EntityManager"
ViewportModel = require "models/Viewport"
CreatureView = require "views/Creature"
CreatureModel = require "models/Creature"
HeightmapModel = require "models/Heightmap"
config = require "config"

describe "View EntityManager", ->
  beforeEach ->
    @viewportModel = ViewportModel.create 1, 2, 5, 6, 5, 6, 7, 8, 9
    @entityManagerView = EntityManagerView.create @viewportModel
    @heightmapModel = HeightmapModel.create config.seed

  afterEach ->
    @entityManagerView.dispose()
    @heightmapModel.dispose()
    @viewportModel.dispose()

    expect(EntityManagerView.getUsedLength()).to.equal 0
    expect(CreatureView.getUsedLength()).to.equal 0
    expect(CreatureModel.getUsedLength()).to.equal 0
    expect(HeightmapModel.getUsedLength()).to.equal 0
    expect(ViewportModel.getUsedLength()).to.equal 0

  it "should add creatures", ->
    populationSize = 20

    @entityManagerView.addCreatures populationSize, @heightmapModel

    expect(@entityManagerView.creatureViews.length).to.equal populationSize
