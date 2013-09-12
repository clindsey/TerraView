HeightmapChunkModel = require "models/HeightmapChunk"

describe "Model HeightmapChunk", ->
  beforeEach ->
    @heightmapChunkModel = HeightmapChunkModel.create()

  afterEach ->
    @heightmapChunkModel.dispose()

    expect(HeightmapChunkModel.getUsedLength()).to.equal 0

  it "should do bilinear interpolation", ->
    interpolation = HeightmapChunkModel.bilinearInterpolate 0, 0, 10, 10, 5, 5

    expect(interpolation.length).to.equal 5
    expect(interpolation[0].length).to.equal 5

    expect(interpolation[0][0]).to.equal 0
    expect(interpolation[4][4]).to.equal 10
    expect(interpolation[2][2]).to.equal 5

  it "should have cells", ->
    expect(@heightmapChunkModel.cells).to.not.equal undefined

  it "should do populate it's cells correctly", ->
    @heightmapChunkModel.dispose()

    @heightmapChunkModel = HeightmapChunkModel.create 0, 4, 0, 4, 5, 5

    map = [
      [ 0, 1, 2, 3, 4]
      [ 1, 1, 2, 2, 3]
      [ 2, 2, 2, 2, 2]
      [ 3, 2, 2, 1, 1]
      [ 4, 3, 2, 1, 0]
    ]

    expect(@heightmapChunkModel.cells).to.deep.equal map
