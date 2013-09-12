Model = require "models/base/Model"
HeightmapModel = require "models/Heightmap"
config = require "config"
utils = require "lib/utils"

# TileMap uses a binary data source to generate spritesheet tile data.

module.exports = Model.extend "TileMapModel",
    create: (tileSourceModelName) ->
      tileMapModel = @_super()

      tileMapModel.tileCache = []
      tileMapModel.tileSourceModel = require(tileSourceModelName).create config.seed

      tileMapModel
  ,
    collectNeighbors: (worldX, worldY) ->
      xl = config.worldTileWidth
      yl = config.worldTileHeight

      cx = (ox) -> utils.clamp ox, xl
      cy = (oy) -> utils.clamp oy, yl

      n = @tileSourceModel.getCell worldX, cy(worldY - 1)
      e = @tileSourceModel.getCell cx(worldX + 1), worldY
      s = @tileSourceModel.getCell worldX, cy(worldY + 1)
      w = @tileSourceModel.getCell cx(worldX - 1), worldY
      ne = @tileSourceModel.getCell cx(worldX + 1), cy(worldY - 1)
      se = @tileSourceModel.getCell cx(worldX + 1), cy(worldY + 1)
      sw = @tileSourceModel.getCell cx(worldX - 1), cy(worldY + 1)
      nw = @tileSourceModel.getCell cx(worldX - 1), cy(worldY - 1)

      [n, e, s, w, ne, se, sw, nw]

    getArea: (sliceWidth, sliceHeight, centerX, centerY) ->
      data = []

      xOffset = Math.floor sliceWidth / 2
      yOffset = Math.floor sliceHeight / 2

      for y in [0..sliceHeight - 1]
        data[y] = []

        for x in [0..sliceWidth - 1]
          worldX = utils.clamp x - xOffset + centerX, config.worldTileWidth
          worldY = utils.clamp y - yOffset + centerY, config.worldTileHeight

          data[y][x] = @getTile worldX, worldY

    # Binary `1`/`0` return.
    getCell: (args...) ->
      @tileSourceModel.getCell args...

    # Returns the spritesheet index of a tile based on it's absolute world position.
    getTile: (worldX, worldY) ->
      if @tileCache[worldY]? and @tileCache[worldY][worldX]?
        return @tileCache[worldY][worldX]

      cell = @tileSourceModel.getCell worldX, worldY
      neighbors = @collectNeighbors worldX, worldY
      index = @getIndexByNeighbors cell, neighbors

      @tileCache[worldY] ?= []
      @tileCache[worldY][worldX] = index

    # Determines the spritesheet index using a bitmasking
    # [Here's a great article about it](http://www.angryfishstudios.com/2011/04/adventures-in-bitmasking/).
    getIndexByNeighbors: (tileValue, neighbors) ->
      index = 0

      n = neighbors[0]
      e = neighbors[1]
      s = neighbors[2]
      w = neighbors[3]
      ne = neighbors[4]
      se = neighbors[5]
      sw = neighbors[6]
      nw = neighbors[7]

      if tileValue
        a = n << n * 4
        b = e << e * 5
        c = s << s * 6
        d = w << w * 7
        e = ne << ne * 0
        f = se << se * 1
        g = nw << nw * 3
        h = sw << sw * 2

        index = a + b + c + d + e + f + g + h

      index

    dispose: ->
      @tileSourceModel.dispose()

      @_super()
