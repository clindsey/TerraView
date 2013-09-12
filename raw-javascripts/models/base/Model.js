module.exports = gamecore.DualPooled.extend("Model", {
  getUsedLength: function() {
    return this.getPool().usedList.length();
  }
}, {
  dispose: function() {
    return this.release();
  }
});
