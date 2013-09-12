if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/base/Model.js'] === 'undefined'){_$jscoverage['public/javascripts/models/base/Model.js']=[];
_$jscoverage['public/javascripts/models/base/Model.js'].source=['window.require.register("models/base/Model", function(require, module) {module.exports = gamecore.DualPooled.extend("Model", {',
'  getUsedLength: function() {',
'    return this.getPool().usedList.length();',
'  }',
'}, {',
'  dispose: function() {',
'    return this.release();',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/base/Model.js'][1]=0;
_$jscoverage['public/javascripts/models/base/Model.js'][1]=0;
_$jscoverage['public/javascripts/models/base/Model.js'][3]=0;
_$jscoverage['public/javascripts/models/base/Model.js'][7]=0;
}_$jscoverage['public/javascripts/models/base/Model.js'][1]++;
window.require.register("models/base/Model", function(require, module) {_$jscoverage['public/javascripts/models/base/Model.js'][1]++;
module.exports = gamecore.DualPooled.extend("Model", {
  getUsedLength: function() {
    _$jscoverage['public/javascripts/models/base/Model.js'][3]++;
return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/models/base/Model.js'][7]++;
return this.release();
  }
});
});
