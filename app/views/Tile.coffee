View = require "views/base/View"
utils = require "lib/utils"
config = require "config"

module.exports = View.extend "TileView",
    create: (tileModel) ->
      view = @_super()

      view.model = tileModel

      view.el = new createjs.Bitmap utils.tilesetImg

      view.model.setIndexCallback ->
        # Keeps the model's index seperate from view's spritesheet position
        view.setSpritePosition()

      view.setSpritePosition()

      view
  ,
    setSpritePosition: ->
      index = @model.index
      x = (index % config.tileWidth)
      y = Math.floor index / config.tileHeight

      @el.sourceRect = new createjs.Rectangle x * config.tileWidth, y * config.tileHeight, config.tileWidth, config.tileHeight
