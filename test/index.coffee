StageView = require "views/Stage"
ApplicationView = require "index"

describe "View Index", ->
  beforeEach ->
    @applicationView = new ApplicationView

  afterEach ->
    canvasId = "stage-view-#{@applicationView.stageView.objectId}"

    @applicationView.dispose()

    expect(document.getElementById(canvasId)).to.equal null

    expect(StageView.getUsedLength()).to.equal 0

  it "should create a canvas element", ->
    canvasId = "stage-view-#{@applicationView.stageView.objectId}"

    expect(document.getElementById(canvasId)).to.not.equal null

  it "should trigger keyboard events", ->
    eventTriggered = false

    EventBus.addEventListener "!key:down", ->
      eventTriggered = true

    @applicationView.onKeyDown keyCode: 37

    expect(eventTriggered).to.equal true

  it "should trigger mouse events", ->
    eventTriggered = false

    EventBus.addEventListener "!mouse:down", ->
      eventTriggered = true

    @applicationView.onElMouseDown {}

    expect(eventTriggered).to.equal true
