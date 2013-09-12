if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/lib/utils.js'] === 'undefined'){_$jscoverage['public/javascripts/lib/utils.js']=[];
_$jscoverage['public/javascripts/lib/utils.js'].source=['window.require.register("lib/utils", function(require, module) {var config, utils;',
'',
'config = require("config");',
'',
'module.exports = utils = {',
'  clamp: function(index, size) {',
'    return (index + size) % size;',
'  },',
'  random: function(seed) {',
'    return new RNG(seed).uniform();',
'  },',
'  sessionRandom: function() {',
'    var randomVal;',
'    randomVal = new RNG(config.sessionSeed).uniform();',
'    config.sessionSeed += 1;',
'    return randomVal;',
'  },',
'  tileHeightToType: function(height, maxElevation) {',
'    var type;',
'    if (height / maxElevation >= 0.5) {',
'      type = 1;',
'    } else {',
'      type = 0;',
'    }',
'    return type;',
'  },',
'  loadImages: function(callback) {',
'    this.tilesetImg = new Image();',
'    this.tilesetImg.onload = callback;',
'    return this.tilesetImg.src = config.spriteSheetSource;',
'  }',
'};',
'});',
''];
_$jscoverage['public/javascripts/lib/utils.js'][21]=0;
_$jscoverage['public/javascripts/lib/utils.js'][1]=0;
_$jscoverage['public/javascripts/lib/utils.js'][23]=0;
_$jscoverage['public/javascripts/lib/utils.js'][1]=0;
_$jscoverage['public/javascripts/lib/utils.js'][20]=0;
_$jscoverage['public/javascripts/lib/utils.js'][7]=0;
_$jscoverage['public/javascripts/lib/utils.js'][5]=0;
_$jscoverage['public/javascripts/lib/utils.js'][3]=0;
_$jscoverage['public/javascripts/lib/utils.js'][10]=0;
_$jscoverage['public/javascripts/lib/utils.js'][13]=0;
_$jscoverage['public/javascripts/lib/utils.js'][14]=0;
_$jscoverage['public/javascripts/lib/utils.js'][15]=0;
_$jscoverage['public/javascripts/lib/utils.js'][16]=0;
_$jscoverage['public/javascripts/lib/utils.js'][19]=0;
_$jscoverage['public/javascripts/lib/utils.js'][25]=0;
_$jscoverage['public/javascripts/lib/utils.js'][28]=0;
_$jscoverage['public/javascripts/lib/utils.js'][29]=0;
_$jscoverage['public/javascripts/lib/utils.js'][30]=0;
}_$jscoverage['public/javascripts/lib/utils.js'][1]++;
window.require.register("lib/utils", function(require, module) {_$jscoverage['public/javascripts/lib/utils.js'][1]++;
var config, utils;

_$jscoverage['public/javascripts/lib/utils.js'][3]++;
config = require("config");

_$jscoverage['public/javascripts/lib/utils.js'][5]++;
module.exports = utils = {
  clamp: function(index, size) {
    _$jscoverage['public/javascripts/lib/utils.js'][7]++;
return (index + size) % size;
  },
  random: function(seed) {
    _$jscoverage['public/javascripts/lib/utils.js'][10]++;
return new RNG(seed).uniform();
  },
  sessionRandom: function() {
    _$jscoverage['public/javascripts/lib/utils.js'][13]++;
var randomVal;
    _$jscoverage['public/javascripts/lib/utils.js'][14]++;
randomVal = new RNG(config.sessionSeed).uniform();
    _$jscoverage['public/javascripts/lib/utils.js'][15]++;
config.sessionSeed += 1;
    _$jscoverage['public/javascripts/lib/utils.js'][16]++;
return randomVal;
  },
  tileHeightToType: function(height, maxElevation) {
    _$jscoverage['public/javascripts/lib/utils.js'][19]++;
var type;
    _$jscoverage['public/javascripts/lib/utils.js'][20]++;
if (height / maxElevation >= 0.5) {
      _$jscoverage['public/javascripts/lib/utils.js'][21]++;
type = 1;
    } else {
      _$jscoverage['public/javascripts/lib/utils.js'][23]++;
type = 0;
    }
    _$jscoverage['public/javascripts/lib/utils.js'][25]++;
return type;
  },
  loadImages: function(callback) {
    _$jscoverage['public/javascripts/lib/utils.js'][28]++;
this.tilesetImg = new Image();
    _$jscoverage['public/javascripts/lib/utils.js'][29]++;
this.tilesetImg.onload = callback;
    _$jscoverage['public/javascripts/lib/utils.js'][30]++;
return this.tilesetImg.src = config.spriteSheetSource;
  }
};
});
