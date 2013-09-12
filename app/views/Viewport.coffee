View = require "views/base/View"
TileModel = require "models/Tile"
TileView = require "views/Tile"
utils = require "lib/utils"
config = require "config"

# Responds to keyboard and mouse navigation
# Adds and manages tiles
# Uses an external source for tile data
# Tiles are not created and destroyed every time the viewport moves, instead the existing tile views are updated.

module.exports = View.extend "ViewportView",
    create: (viewportModel, tileMapModel) ->
      view = @_super()

      view.model = viewportModel

      view.el = new createjs.Container

      view.tileMapModel = tileMapModel

      view.tileModels = @buildTileModels view
      view.tileViews = @buildTileViews view
      view.el.addChild(tileView.el) for tileView in view.tileViews

      EventBus.addEventListener "!key:down", view.onKeyDown, view
      EventBus.addEventListener "!mouse:down", view.onMouseDown, view

      EventBus.addEventListener "!move:#{view.model.uniqueId}", view.drawMap, view

      view

    buildTileModels: (view) ->
      tileMapModel = view.tileMapModel
      model = view.model
      tileMapData = tileMapModel.getArea model.width, model.height, model.x, model.y

      tiles = []

      for y in [0..tileMapData.length - 1]
        for x in [0..tileMapData[y].length - 1]
          tileModel = TileModel.create tileMapData[y][x], x, y

          tiles.push tileModel

      tiles

    buildTileViews: (view, img) ->
      views = []

      _.each view.tileModels, (tileModel) ->
        tileView = TileView.create tileModel, img

        tileView.el.x = tileModel.x * config.tileWidth
        tileView.el.y = tileModel.y * config.tileHeight

        views.push tileView

      views
  ,
    drawMap: ->
      tileMapData = @tileMapModel.getArea @model.width, @model.height, @model.x, @model.y

      for y in [0..tileMapData.length - 1]
        for x in [0..tileMapData[y].length - 1]
          tileModel = @tileModels[x + tileMapData[y].length * y]

          tileModel.setIndex tileMapData[y][x]

    # Splits the canvas quadrants for clicks.
    onMouseDown: (_event, args) ->
      halfWidth = Math.floor(@model.width / 2) * config.tileWidth
      halfHeight = Math.floor(@model.height / 2) * config.tileHeight

      dx = args.stageX - halfWidth
      dy = args.stageY - halfHeight

      direction = Math.abs (Math.atan2(dx, dy) / Math.PI * 180) - 180

      keyCode = 37

      # North, east, south, west
      if 315 < direction or direction < 45
        keyCode = 38
      else if 45 < direction < 135
        keyCode = 39
      else if 135 < direction < 225
        keyCode = 40
      else if 225 < direction < 315
        keyCode = 37

      EventBus.dispatch "!key:down", @, {keyCode}

    onKeyDown: (_event, args) ->
      x = @model.x
      y = @model.y

      switch args.keyCode
        when 37
          x = @model.x - 1
          x = utils.clamp x, config.worldTileWidth
        when 38
          y = @model.y - 1
          y = utils.clamp y, config.worldTileHeight
        when 39
          x = @model.x + 1
          x = utils.clamp x, config.worldTileWidth
        when 40
          y = @model.y + 1
          y = utils.clamp y, config.worldTileHeight

      @model.setPosition x, y

    dispose: ->
      _.each @tileModels, (tileModel) ->
        tileModel.dispose()

      _.each @tileViews, (tileView) ->
        tileView.dispose()

      EventBus.removeEventListener "!move:#{@model.uniqueId}", @drawMap, @

      EventBus.removeEventListener "!key:down", @onKeyDown, @
      EventBus.removeEventListener "!mouse:down", @onMouseDown, @

      @_super()
