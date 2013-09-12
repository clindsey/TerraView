# Various shared utility methods, such as random number generation.

# The config contains the seed values for the PRNG.
config = require "config"

module.exports = utils =
  # Useful for wraping around an array. Index 14 would wrap to 4 for a size of 10.
  clamp: (index, size) ->
    (index + size) % size

  # Generates a random number based on a seed, used to generate the same pattern.
  # ```
  #   utils.random(5) # 0.32
  #   utils.random(5) # 0.32
  # ```
  random: (seed) ->
    new RNG(seed).uniform()

  # Generates the same sequence of random numbers every session, used to cause the same sequence of events.
  # ```
  #   utils.sessionRandom() # 0.24
  #   utils.sessionRandom() # 0.75
  # ```
  sessionRandom: ->
    randomVal = new RNG(config.sessionSeed).uniform()

    config.sessionSeed += 1

    randomVal

  tileHeightToType: (height, maxElevation) ->
    if height / maxElevation >= 0.5
      type = 1
    else
      type = 0

    type

  # Caches the spritesheet image used throughout the app and saves it as `utils.tilesetImg`.
  loadImages: (callback) ->
    @tilesetImg = new Image()

    @tilesetImg.onload = callback

    @tilesetImg.src = config.spriteSheetSource
