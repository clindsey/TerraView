Model = require "models/base/Model"

module.exports = Model.extend "TileModel",
    create: (index, x, y) ->
      model = @_super()

      model.index = index
      model.x = x
      model.y = y

      model
  ,
    # Changes the spritesheet tile.
    setIndex: (index) ->
      if @index isnt index
        @index = index

        @onChangeIndex()

    # This lets us keep track of index in model and update view.
    setIndexCallback: (callback) ->
      @onChangeIndex = callback

    # Meant to be overridden.
    onChangeIndex: ->
