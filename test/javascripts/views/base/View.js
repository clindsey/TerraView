if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/views/base/View.js'] === 'undefined'){_$jscoverage['public/javascripts/views/base/View.js']=[];
_$jscoverage['public/javascripts/views/base/View.js'].source=['window.require.register("views/base/View", function(require, module) {module.exports = gamecore.DualPooled.extend("View", {',
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
_$jscoverage['public/javascripts/views/base/View.js'][1]=0;
_$jscoverage['public/javascripts/views/base/View.js'][1]=0;
_$jscoverage['public/javascripts/views/base/View.js'][3]=0;
_$jscoverage['public/javascripts/views/base/View.js'][7]=0;
}_$jscoverage['public/javascripts/views/base/View.js'][1]++;
window.require.register("views/base/View", function(require, module) {_$jscoverage['public/javascripts/views/base/View.js'][1]++;
module.exports = gamecore.DualPooled.extend("View", {
  getUsedLength: function() {
    _$jscoverage['public/javascripts/views/base/View.js'][3]++;
return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    _$jscoverage['public/javascripts/views/base/View.js'][7]++;
return this.release();
  }
});
});
