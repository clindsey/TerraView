utils = require "lib/utils"
config = require "config"

config.seed = 20130813
config.sessionSeed = 19870910

describe "Lib Utils", ->
  it "should clamp", ->
    expect(utils.clamp 10, 20).to.equal 10
    expect(utils.clamp 21, 20).to.equal 1
    expect(utils.clamp -10, 20).to.equal 10

  it "should random", ->
    expect(utils.random 20).to.equal 0.9575093308120967

  it "should tileHeightToType", ->
    expect(utils.tileHeightToType 4, 10).to.equal 0
    expect(utils.tileHeightToType 6, 10).to.equal 1

  it "should have an incrementing session seed", ->
    expect(utils.sessionRandom()).to.equal 0.07641793277815007
    expect(utils.sessionRandom()).to.equal 0.5967972170491195
