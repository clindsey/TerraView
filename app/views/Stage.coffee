View = require "views/base/View"
ViewportModel = require "models/Viewport"
ViewportView = require "views/Viewport"
EntityManagerView = require "views/EntityManager"
TileMapModel = require "models/TileMap"
utils = require "lib/utils"
config = require "config"

# The Stage View is where everything ties together.

module.exports = View.extend "StageView",
    create: (canvasEl) ->
      stageView = @_super()

      stageView.el = new createjs.Stage canvasEl

      # Used for updating creatures.
      stageView.lastUpdate = 0

      stageView.tileMapModel = TileMapModel.create 'models/Heightmap'

      stageView.viewportModel = ViewportModel.create 0, 0, 30, 20
      stageView.viewportView = ViewportView.create stageView.viewportModel, stageView.tileMapModel
      stageView.el.addChild stageView.viewportView.el

      stageView.entityManagerView = EntityManagerView.create stageView.viewportModel
      stageView.el.addChild stageView.entityManagerView.el
      stageView.entityManagerView.addCreatures 100, stageView.tileMapModel


      createjs.Ticker.setFPS 60
      createjs.Ticker.useRAF = true

      _.bindAll stageView, "onTick"
      createjs.Ticker.addEventListener "tick", stageView.onTick

      createjs.Touch.enable stageView.el

      stageView.el.update()

      stageView
  ,
    onTick: (event) ->
      @el.update()

      timeDelta = event.time - @lastUpdate

      # Update the creatures at 2hz
      if Math.floor(timeDelta / 500) >= 1
        @entityManagerView.onTick()

        @lastUpdate = event.time


    dispose: ->
      createjs.Ticker.removeEventListener "tick", @onTick

      createjs.Touch.disable @el

      @tileMapModel.dispose()

      @viewportView.dispose()
      @viewportModel.dispose()

      @entityManagerView.dispose()

      @_super()
