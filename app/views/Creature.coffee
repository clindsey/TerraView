View = require "views/base/View"
utils = require "lib/utils"
config = require "config"

module.exports = View.extend "CreatureView",
    create: (creatureModel, viewportModel) ->
      creatureView = @_super()

      creatureView.model = creatureModel
      creatureView.viewportModel = viewportModel

      creatureView.spriteSheet = new createjs.SpriteSheet @spriteSheetOptions

      creatureView.el = new createjs.BitmapAnimation creatureView.spriteSheet

      creatureView.el.gotoAndPlay "walkSouth"

      EventBus.addEventListener "!move:#{creatureModel.uniqueId}", creatureView.onModelMove, creatureView
      EventBus.addEventListener "!move:#{viewportModel.uniqueId}", creatureView.setPosition, creatureView

      creatureView.setPosition()

      _.bindAll creatureView, "onTick"

      creatureView.el.addEventListener "tick", creatureView.onTick

      # intended x/y are to help with smooth movement between tiles
      creatureView.el.x = creatureView.intendedX
      creatureView.el.y = creatureView.intendedY

      creatureView

    spriteSheetOptions:
      images: [utils.tilesetImg]
      frames:
        width: 16
        height: 16
      animations:
        walkEast:
          frames: [288, 289, 290, 291]
          frequency: 15
        walkNorth:
          frames: [292, 293, 294, 295]
          frequency: 15
        walkWest:
          frames: [296, 297, 298, 299]
          frequency: 15
        walkSouth:
          frames: [300, 301, 302, 303]
          frequency: 15
        idleEast:
          frames: [320, 321]
          frequency: 30
        idleNorth:
          frames: [322, 323]
          frequency: 30
        idleWest:
          frames: [324, 325]
          frequency: 30
        idleSouth:
          frames: [326, 327]
          frequency: 30
  ,
    onModelMove: ->
      deltaX = 0
      deltaY = 0

      switch @model.direction
        when "North"
          deltaY = config.tileHeight
        when "East"
          deltaX = 0 - config.tileWidth
        when "South"
          deltaY = 0 - config.tileHeight
        when "West"
          deltaX = config.tileWidth

      @offsetX = deltaX
      @offsetY = deltaY

      # Handle smooth movement between tiles.
      createjs.Tween.get(@).to {offsetX: 0, offsetY: 0}, 500

      @setPosition()

    setPosition: ->
      animation = "walk#{@model.direction}"

      @el.gotoAndPlay animation unless @el.currentAnimation is animation

      centerX = Math.floor @viewportModel.width / 2
      centerY = Math.floor @viewportModel.height / 2

      viewX = @viewportModel.x
      viewY = @viewportModel.y

      myX = @model.x
      myY = @model.y

      x = (myX - viewX) + centerX
      y = (myY - viewY) + centerY

      worldWidth = config.worldTileWidth
      halfWorldWidth = Math.floor worldWidth / 2

      worldHeight = config.worldTileHeight
      halfWorldHeight = Math.floor worldHeight / 2

      offsetX = 0
      offsetY = 0

      # Handle wrapping around the viewport.
      if myX > viewX + halfWorldWidth
        offsetX -= worldWidth

      if myX < viewX - halfWorldWidth
        offsetX += worldWidth

      if myY > viewY + halfWorldHeight
        offsetY -= worldHeight

      if myY < viewY - halfWorldHeight
        offsetY += worldHeight

      myNewX = (x + offsetX)
      myNewY = (y + offsetY)

      newX = myNewX * config.tileWidth
      newY = myNewY * config.tileHeight

      @intendedX = newX
      @intendedY = newY

    onTick: ->
      # Intended `x`/`y` are here to help with smooth movement between tiles.
      @el.x = @intendedX + @offsetX
      @el.y = @intendedY + @offsetY

    dispose: ->
      @el.removeEventListener "tick", @onTick

      EventBus.removeEventListener "!move:#{@model.uniqueId}", @setPosition, @

      @_super()
