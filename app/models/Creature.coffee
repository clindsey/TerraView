Model = require "models/base/Model"
utils = require "lib/utils"
config = require "config"

module.exports = Model.extend "CreatureModel",
    create: (x, y, tileMapModel) ->
      creatureModel = @_super()

      creatureModel.x = x
      creatureModel.y = y
      creatureModel.direction = "South"
      creatureModel.tileMapModel = tileMapModel

      creatureModel
  ,
    setPosition: (x, y) ->
      if y isnt @y or x isnt @x
        @x = x
        @y = y

        EventBus.dispatch "!move:#{@uniqueId}"

    tick: ->
      foundSpot = false
      giveUpCounter = 6

      while !foundSpot and giveUpCounter
        dX = 0
        dY = 0

        runOrRise = Math.floor(utils.sessionRandom() * 2) % 2

        if runOrRise
          dX = Math.floor(utils.sessionRandom() * 3) - 1
        else
          dY = Math.floor(utils.sessionRandom() * 3) - 1

        # Prevents walking off the edge of the world, wraps to the other side.
        newX = utils.clamp @x + dX, config.worldTileWidth
        newY = utils.clamp @y + dY, config.worldTileHeight

        tile = @tileMapModel.getCell newX, newY

        newDirection = "South"

        if dX > 0
          @direction = "East"
        if dX < 0
          @direction = "West"

        if dY > 0
          @direction = "South"
        if dY < 0
          @direction = "North"

        if tile is 1 and (newX isnt @x or newY isnt @y)
          @setPosition newX, newY

          foundSpot = true
        else
          giveUpCounter -= 1
