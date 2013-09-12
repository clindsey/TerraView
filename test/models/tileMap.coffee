TileMapModel = require "models/TileMap"
HeightmapModel = require "models/Heightmap"
config = require "config"

describe "Model TileMap", ->
  beforeEach ->
    config.worldChunkWidth = 3
    config.worldChunkHeight = 3
    config.chunkWidth = 4
    config.chunkHeight = 3
    config.worldTileWidth = 12
    config.worldTileHeight = 9
    config.maxElevation = 5

    seed = 19870910

    @tileMapModel = TileMapModel.create "models/Heightmap"

  afterEach ->
    @tileMapModel.dispose()

    expect(TileMapModel.getUsedLength()).to.equal 0
    expect(HeightmapModel.getUsedLength()).to.equal 0

  it "should get a tile based on world x, y", ->
    tile = @tileMapModel.getTile 0, 0

    expect(tile).to.equal 255

  it "should find neighbors by tile x and y", ->
    neighbors = @tileMapModel.collectNeighbors 0, 0

    expect(neighbors).to.deep.equal [1, 1, 1, 1, 1, 1, 1, 1]

  it "should convert neighbor count to spritesheet index", ->
    expect(@tileMapModel.getIndexByNeighbors(0, [0, 0, 0, 0, 0, 0, 0, 0])).to.equal 0
    expect(@tileMapModel.getIndexByNeighbors(1, [0, 0, 0, 0, 0, 0, 1, 0])).to.equal 4

  it "should get an area", ->
    area = @tileMapModel.getArea 10, 10, 0, 0

    expect(area.length).to.equal 10
    expect(area[0].length).to.equal 10

    expect(area[0][0]).to.equal 213
    expect(area[9][0]).to.equal 213
    expect(area[9][9]).to.equal 0
    expect(area[0][9]).to.equal 0

  it "should process tiles to spritesheet indicies", ->
    data = @tileMapModel.getArea 8, 8, 4, 4

    expect(data[0][0]).to.equal 255
    expect(data[5][0]).to.equal 0
    expect(data[5][7]).to.equal 222
    expect(data[0][7]).to.equal 0
