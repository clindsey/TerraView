tests = [
  "test/utils"
  "test/config"
  "test/models/heightmapChunk"
  "test/models/heightmap"
  "test/models/tileMap"
  "test/models/tile"
  "test/models/viewport"
  "test/models/creature"
  "test/views/tile"
  "test/views/viewport"
  "test/views/entityManager"
  "test/views/creature"
  "test/views/stage"
  "test/index"
]

for test in tests
  require test

if window.mochaPhantomJS
  mochaPhantomJS.run()
else
  runner = mocha.run()

  runner.on "end", ->
    new MochaCov
