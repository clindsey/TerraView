View = require "views/base/View"
CreatureModel = require "models/Creature"
CreatureView = require "views/Creature"
config = require "config"
utils = require "lib/utils"

module.exports = View.extend "EntityManagerView",
    create: (viewportModel) ->
      entityManagerView = @_super()

      entityManagerView.el = new createjs.Container

      entityManagerView.creatureViews = []

      entityManagerView.viewportModel = viewportModel

      entityManagerView
  ,
    onTick: ->
      _.each @creatureViews, (creatureView) ->
        creatureView.model.tick()

    addCreatures: (populationSize, tileMapModel) ->
      creatureCount = 0
      s = config.seed

      while creatureCount < populationSize
        s += 1
        x = Math.floor utils.random(s) * config.worldTileWidth
        y = Math.floor utils.random(s + 1) * config.worldTileHeight

        tile = tileMapModel.getCell x, y

        if tile is 1
          creatureCount += 1
          creatureModel = CreatureModel.create x, y, tileMapModel
          creatureView = CreatureView.create creatureModel, @viewportModel
          @el.addChild creatureView.el
          @creatureViews.push creatureView

    dispose: ->
      _.each @creatureViews, (creatureView) ->
        creatureView.model.dispose()
        creatureView.dispose()

      @_super()
