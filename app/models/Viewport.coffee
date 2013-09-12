Model = require "models/base/Model"

module.exports = Model.extend "ViewportModel",
    create: (x, y, width, height) ->
      model = @_super()

      model.x = x
      model.y = y
      model.width = width
      model.height = height

      model
  ,
    setPosition: (x, y) ->
      if y isnt @y or x isnt @x
        @x = x
        @y = y
        EventBus.dispatch "!move:#{@uniqueId}", @
