if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/models/Viewport.js'] === 'undefined'){_$jscoverage['public/javascripts/models/Viewport.js']=[];
_$jscoverage['public/javascripts/models/Viewport.js'].source=['window.require.register("models/Viewport", function(require, module) {var Model;',
'',
'Model = require("models/base/Model");',
'',
'module.exports = Model.extend("ViewportModel", {',
'  create: function(x, y, width, height) {',
'    var model;',
'    model = this._super();',
'    model.x = x;',
'    model.y = y;',
'    model.width = width;',
'    model.height = height;',
'    return model;',
'  }',
'}, {',
'  setPosition: function(x, y) {',
'    if (y !== this.y || x !== this.x) {',
'      this.x = x;',
'      this.y = y;',
'      return EventBus.dispatch("!move:" + this.uniqueId, this);',
'    }',
'  }',
'});',
'});',
''];
_$jscoverage['public/javascripts/models/Viewport.js'][12]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][1]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][13]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][1]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][18]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][7]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][5]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][3]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][8]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][9]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][10]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][11]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][17]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][19]=0;
_$jscoverage['public/javascripts/models/Viewport.js'][20]=0;
}_$jscoverage['public/javascripts/models/Viewport.js'][1]++;
window.require.register("models/Viewport", function(require, module) {_$jscoverage['public/javascripts/models/Viewport.js'][1]++;
var Model;

_$jscoverage['public/javascripts/models/Viewport.js'][3]++;
Model = require("models/base/Model");

_$jscoverage['public/javascripts/models/Viewport.js'][5]++;
module.exports = Model.extend("ViewportModel", {
  create: function(x, y, width, height) {
    _$jscoverage['public/javascripts/models/Viewport.js'][7]++;
var model;
    _$jscoverage['public/javascripts/models/Viewport.js'][8]++;
model = this._super();
    _$jscoverage['public/javascripts/models/Viewport.js'][9]++;
model.x = x;
    _$jscoverage['public/javascripts/models/Viewport.js'][10]++;
model.y = y;
    _$jscoverage['public/javascripts/models/Viewport.js'][11]++;
model.width = width;
    _$jscoverage['public/javascripts/models/Viewport.js'][12]++;
model.height = height;
    _$jscoverage['public/javascripts/models/Viewport.js'][13]++;
return model;
  }
}, {
  setPosition: function(x, y) {
    _$jscoverage['public/javascripts/models/Viewport.js'][17]++;
if (y !== this.y || x !== this.x) {
      _$jscoverage['public/javascripts/models/Viewport.js'][18]++;
this.x = x;
      _$jscoverage['public/javascripts/models/Viewport.js'][19]++;
this.y = y;
      _$jscoverage['public/javascripts/models/Viewport.js'][20]++;
return EventBus.dispatch("!move:" + this.uniqueId, this);
    }
  }
});
});
