config = require "config"

describe "Lib config", ->
  it "should have a seed", ->
    expect(config.seed).to.not.equal undefined

  it "should have a session seed", ->
    expect(config.sessionSeed).to.not.equal undefined

  it "should have a spriteSheetSource", ->
    expect(config.spriteSheetSource).to.not.equal undefined

  it "should have a tileWidth and tileHeight", ->
    expect(config.tileWidth).to.not.equal undefined
    expect(config.tileHeight).to.not.equal undefined

  it "should have a worldChunkWidth and worldChunkHeight", ->
    expect(config.worldChunkWidth).to.not.equal undefined
    expect(config.worldChunkHeight).to.not.equal undefined

  it "should have a chunkWidth and chunkHeight", ->
    expect(config.chunkWidth).to.not.equal undefined
    expect(config.chunkHeight).to.not.equal undefined

  it "should calculate worldTileWidth and worldTileHeight", ->
    expect(config.worldTileWidth).to.equal config.worldChunkWidth * config.chunkWidth
    expect(config.worldTileHeight).to.equal config.worldChunkHeight * config.chunkHeight
