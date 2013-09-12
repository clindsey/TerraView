if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['public/javascripts/index.js'] === 'undefined'){_$jscoverage['public/javascripts/index.js']=[];
_$jscoverage['public/javascripts/index.js'].source=['window.require.register("index", function(require, module) {var Index, StageView;',
'',
'StageView = require("views/Stage");',
'',
'module.exports = Index = (function() {',
'  function Index() {',
'    this.canvasEl = document.createElement("canvas");',
'    this.canvasEl.width = 480;',
'    this.canvasEl.height = 320;',
'    document.body.appendChild(this.canvasEl);',
'    this.stageView = StageView.create(this.canvasEl);',
'    this.canvasEl.id = "stage-view-" + this.stageView.objectId;',
'    document.onkeydown = this.onKeyDown;',
'    _.bindAll(this, "onElMouseDown");',
'    this.stageView.el.addEventListener("mousedown", this.onElMouseDown);',
'  }',
'',
'  Index.prototype.onElMouseDown = function(event) {',
'    return EventBus.dispatch("!mouse:down", this, event);',
'  };',
'',
'  Index.prototype.onKeyDown = function(event) {',
'    return EventBus.dispatch("!key:down", this, event);',
'  };',
'',
'  Index.prototype.dispose = function() {',
'    document.onkeydown = void 0;',
'    document.body.removeChild(this.canvasEl);',
'    this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);',
'    return this.stageView.dispose();',
'  };',
'',
'  return Index;',
'',
'})();',
'});',
''];
_$jscoverage['public/javascripts/index.js'][19]=0;
_$jscoverage['public/javascripts/index.js'][1]=0;
_$jscoverage['public/javascripts/index.js'][18]=0;
_$jscoverage['public/javascripts/index.js'][1]=0;
_$jscoverage['public/javascripts/index.js'][23]=0;
_$jscoverage['public/javascripts/index.js'][7]=0;
_$jscoverage['public/javascripts/index.js'][5]=0;
_$jscoverage['public/javascripts/index.js'][3]=0;
_$jscoverage['public/javascripts/index.js'][6]=0;
_$jscoverage['public/javascripts/index.js'][27]=0;
_$jscoverage['public/javascripts/index.js'][9]=0;
_$jscoverage['public/javascripts/index.js'][8]=0;
_$jscoverage['public/javascripts/index.js'][29]=0;
_$jscoverage['public/javascripts/index.js'][12]=0;
_$jscoverage['public/javascripts/index.js'][10]=0;
_$jscoverage['public/javascripts/index.js'][11]=0;
_$jscoverage['public/javascripts/index.js'][13]=0;
_$jscoverage['public/javascripts/index.js'][14]=0;
_$jscoverage['public/javascripts/index.js'][15]=0;
_$jscoverage['public/javascripts/index.js'][22]=0;
_$jscoverage['public/javascripts/index.js'][26]=0;
_$jscoverage['public/javascripts/index.js'][28]=0;
_$jscoverage['public/javascripts/index.js'][30]=0;
_$jscoverage['public/javascripts/index.js'][33]=0;
}_$jscoverage['public/javascripts/index.js'][1]++;
window.require.register("index", function(require, module) {_$jscoverage['public/javascripts/index.js'][1]++;
var Index, StageView;

_$jscoverage['public/javascripts/index.js'][3]++;
StageView = require("views/Stage");

_$jscoverage['public/javascripts/index.js'][5]++;
module.exports = Index = (function() {
  _$jscoverage['public/javascripts/index.js'][6]++;
function Index() {
    _$jscoverage['public/javascripts/index.js'][7]++;
this.canvasEl = document.createElement("canvas");
    _$jscoverage['public/javascripts/index.js'][8]++;
this.canvasEl.width = 480;
    _$jscoverage['public/javascripts/index.js'][9]++;
this.canvasEl.height = 320;
    _$jscoverage['public/javascripts/index.js'][10]++;
document.body.appendChild(this.canvasEl);
    _$jscoverage['public/javascripts/index.js'][11]++;
this.stageView = StageView.create(this.canvasEl);
    _$jscoverage['public/javascripts/index.js'][12]++;
this.canvasEl.id = "stage-view-" + this.stageView.objectId;
    _$jscoverage['public/javascripts/index.js'][13]++;
document.onkeydown = this.onKeyDown;
    _$jscoverage['public/javascripts/index.js'][14]++;
_.bindAll(this, "onElMouseDown");
    _$jscoverage['public/javascripts/index.js'][15]++;
this.stageView.el.addEventListener("mousedown", this.onElMouseDown);
  }

  _$jscoverage['public/javascripts/index.js'][18]++;
Index.prototype.onElMouseDown = function(event) {
    _$jscoverage['public/javascripts/index.js'][19]++;
return EventBus.dispatch("!mouse:down", this, event);
  };

  _$jscoverage['public/javascripts/index.js'][22]++;
Index.prototype.onKeyDown = function(event) {
    _$jscoverage['public/javascripts/index.js'][23]++;
return EventBus.dispatch("!key:down", this, event);
  };

  _$jscoverage['public/javascripts/index.js'][26]++;
Index.prototype.dispose = function() {
    _$jscoverage['public/javascripts/index.js'][27]++;
document.onkeydown = void 0;
    _$jscoverage['public/javascripts/index.js'][28]++;
document.body.removeChild(this.canvasEl);
    _$jscoverage['public/javascripts/index.js'][29]++;
this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);
    _$jscoverage['public/javascripts/index.js'][30]++;
return this.stageView.dispose();
  };

  _$jscoverage['public/javascripts/index.js'][33]++;
return Index;

})();
});
