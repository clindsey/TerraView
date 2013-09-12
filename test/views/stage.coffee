StageView = require "views/Stage"
ViewportView = require "views/Viewport"
ViewportModel = require "models/Viewport"

describe "View Stage", ->
  beforeEach ->
    @stageView = StageView.create()

  afterEach ->
    @stageView.dispose()

    expect(StageView.getUsedLength()).to.equal 0
    expect(ViewportView.getUsedLength()).to.equal 0
    expect(ViewportModel.getUsedLength()).to.equal 0

  it "should clean up correctly", ->
    expect(true).to.equal true
