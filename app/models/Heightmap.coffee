Model = require "models/base/Model"
utils = require "lib/utils"
HeightmapChunkModel = require "models/HeightmapChunk"
config = require "config"

# The heightmap is responsible for creating the terrain data of the world.
# The world is only generated one small piece at a time to allow for lazy-loading, then cached.
# This algorithm is deterministic so a particular seed value will always generate the same output.

module.exports = Model.extend "HeightmapModel",
    create: (seed) ->
      heightmapModel = @_super()

      heightmapModel.seed = seed
      heightmapModel.chunkCache = []

      heightmapModel
  ,
    getCell: (worldX, worldY) ->
      worldChunkX = Math.floor worldX / config.chunkWidth
      worldChunkY = Math.floor worldY / config.chunkHeight
      chunkX = worldX % config.chunkWidth
      chunkY = worldY % config.chunkHeight

      chunk = @getChunk worldChunkX, worldChunkY

      heightmap = []

      heightmapData = @collectHeightmapDataForChunk worldChunkX, worldChunkY, chunk.cells, heightmap

      # Returned as `0` or `1`, the latter being walkable
      heightmapData[chunkY][chunkX]

    getChunk: (worldChunkX, worldChunkY) ->
      if @chunkCache[worldChunkY]? and @chunkCache[worldChunkY][worldChunkX]?
        return @chunkCache[worldChunkY][worldChunkX]

      worldTileWidth = config.worldTileWidth
      worldTileHeight = config.worldTileHeight
      worldChunkWidth = config.worldChunkWidth
      worldChunkHeight = config.worldChunkHeight
      chunkWidth = config.chunkWidth
      chunkHeight = config.chunkHeight
      maxElevation = config.maxElevation
      seed = @seed

      # Stitches clusters together into seamless pattern.
      nw = utils.random(worldChunkY * worldTileWidth + worldChunkX + seed) * maxElevation

      if worldChunkX + 1 is worldChunkWidth
        ne = utils.random(worldChunkY * worldTileWidth + seed) * maxElevation
      else
        ne = utils.random(worldChunkY * worldTileWidth + worldChunkX + 1 + seed) * maxElevation

      if worldChunkY + 1 is worldChunkWidth
        sw = utils.random(worldChunkX + seed) * maxElevation

        if worldChunkX + 1 is worldChunkHeight
          se = utils.random(seed) * maxElevation
        else
          se = utils.random(worldChunkX + 1 + seed) * maxElevation
      else
        sw = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation

        if worldChunkX + 1 is worldChunkWidth
          se = utils.random((worldChunkY + 1) * worldTileWidth + seed) * maxElevation
        else
          se = utils.random((worldChunkY + 1) * worldTileWidth + worldChunkX + 1 + seed) * maxElevation

      @chunkCache[worldChunkY] ?= []

      @chunkCache[worldChunkY][worldChunkX] = HeightmapChunkModel.create nw, ne, se, sw, chunkWidth, chunkHeight

    # Converts the cluster heights to binary walkable/nonwalkable bits.
    collectHeightmapDataForChunk: (worldChunkX, worldChunkY, cells, heightmap) ->
      maxElevation = config.maxElevation

      for cellRow, cy in cells
        for cell, cx in cellRow
          yIndex = cy + (worldChunkY * cells.length)
          xIndex = cx + (worldChunkX * cellRow.length)

          heightmap[yIndex] = [] unless heightmap[yIndex]?
          heightmap[yIndex][xIndex] = utils.tileHeightToType cell, maxElevation

    dispose: ->
      _.each @chunkCache, (chunkCacheRow) ->
        _.each chunkCacheRow, (chunkModel) ->
          chunkModel.dispose() if chunkModel?

      @_super()
