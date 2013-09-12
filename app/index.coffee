StageView = require "views/Stage"

# The kick-off point to the entire simulation.

module.exports = class Index
  constructor: ->
    # For ludei's cocoonjs support, a canvas element apparently must be created in this way.
    @canvasEl = document.createElement "canvas"
    @canvasEl.width = 480
    @canvasEl.height = 320
    document.body.appendChild @canvasEl

    @stageView = StageView.create @canvasEl
    @canvasEl.id = "stage-view-#{@stageView.objectId}"

    document.onkeydown = @onKeyDown
    _.bindAll @, "onElMouseDown"
    @stageView.el.addEventListener "mousedown", @onElMouseDown

  onElMouseDown: (event) ->
    EventBus.dispatch "!mouse:down", @, event

  onKeyDown: (event) ->
    EventBus.dispatch "!key:down", @, event

  dispose: ->
    document.onkeydown = undefined

    document.body.removeChild @canvasEl

    @stageView.el.removeEventListener "mousedown", @onElMouseDown

    @stageView.dispose()
