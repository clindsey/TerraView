if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/config.js'] === 'undefined'){_$jscoverage['public/javascripts/config.js']=[];
_$jscoverage['public/javascripts/config.js'].source=['window.require.register("config", function(require, module) {var config;',
'',
'module.exports = config = {',
'  seed: +(new Date),',
'  sessionSeed: +(new Date),',
'  spriteSheetSource: "images/tileset_terra.png",',
'  tileWidth: 16,',
'  tileHeight: 16,',
'  worldChunkWidth: 8,',
'  worldChunkHeight: 8,',
'  chunkWidth: 10,',
'  chunkHeight: 10,',
'  maxElevation: 10',
'};',
'',
'config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;',
'',
'config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;',
'});',
''];
_$jscoverage['public/javascripts/config.js'][1]=0;
_$jscoverage['public/javascripts/config.js'][1]=0;
_$jscoverage['public/javascripts/config.js'][3]=0;
_$jscoverage['public/javascripts/config.js'][16]=0;
_$jscoverage['public/javascripts/config.js'][18]=0;
}_$jscoverage['public/javascripts/config.js'][1]++;
window.require.register("config", function(require, module) {_$jscoverage['public/javascripts/config.js'][1]++;
var config;

_$jscoverage['public/javascripts/config.js'][3]++;
module.exports = config = {
  seed: +(new Date),
  sessionSeed: +(new Date),
  spriteSheetSource: "images/tileset_terra.png",
  tileWidth: 16,
  tileHeight: 16,
  worldChunkWidth: 8,
  worldChunkHeight: 8,
  chunkWidth: 10,
  chunkHeight: 10,
  maxElevation: 10
};

_$jscoverage['public/javascripts/config.js'][16]++;
config.worldTileWidth = config.worldChunkWidth * config.chunkWidth;

_$jscoverage['public/javascripts/config.js'][18]++;
config.worldTileHeight = config.worldChunkHeight * config.chunkHeight;
});
