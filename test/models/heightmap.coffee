HeightmapModel = require "models/Heightmap"
HeightmapChunkModel = require "models/HeightmapChunk"
config = require "config"

describe "Model Heightmap", ->
  beforeEach ->
    config.worldChunkWidth = 3
    config.worldChunkHeight = 3
    config.chunkWidth = 4
    config.chunkHeight = 3
    config.worldTileWidth = 12
    config.worldTileHeight = 9
    config.maxElevation = 5

    seed = 19870910

    @heightmapModel = HeightmapModel.create seed

  afterEach ->
    @heightmapModel.dispose()

    expect(HeightmapModel.getUsedLength()).to.equal 0
    expect(HeightmapChunkModel.getUsedLength()).to.equal 0

  it "should get a chunk by x, y", ->
    chunk = @heightmapModel.getChunk 0, 0

    expect(chunk.cells.length).to.deep.equal 3
    expect(chunk.cells[0].length).to.deep.equal 4

  it "should get a cell", ->
    cell = @heightmapModel.getCell 0, 0

    expect(cell).to.equal 0

  it "should collect heightmap data for chunk", ->
    chunk = @heightmapModel.getChunk 0, 0

    heightmap = []

    heightmapData = @heightmapModel.collectHeightmapDataForChunk 0, 0, chunk.cells, heightmap

    expect(heightmap.length).to.equal 3
    expect(heightmap[0].length).to.equal 4
