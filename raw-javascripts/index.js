var Index, StageView;

StageView = require("views/Stage");

module.exports = Index = (function() {
  function Index() {
    this.canvasEl = document.createElement("canvas");
    this.canvasEl.width = 480;
    this.canvasEl.height = 320;
    document.body.appendChild(this.canvasEl);
    this.stageView = StageView.create(this.canvasEl);
    this.canvasEl.id = "stage-view-" + this.stageView.objectId;
    document.onkeydown = this.onKeyDown;
    _.bindAll(this, "onElMouseDown");
    this.stageView.el.addEventListener("mousedown", this.onElMouseDown);
  }

  Index.prototype.onElMouseDown = function(event) {
    return EventBus.dispatch("!mouse:down", this, event);
  };

  Index.prototype.onKeyDown = function(event) {
    return EventBus.dispatch("!key:down", this, event);
  };

  Index.prototype.dispose = function() {
    document.onkeydown = void 0;
    document.body.removeChild(this.canvasEl);
    this.stageView.el.removeEventListener("mousedown", this.onElMouseDown);
    return this.stageView.dispose();
  };

  return Index;

})();
