(function (global) {

  function FontCanvas(canvas) {

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000';
    this.context.font = '48px FontAwesome';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
  }

  FontCanvas.prototype.renderText = function (text) {
    this.context.fillText(
      String.fromCharCode(text),
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  };

  FontCanvas.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = FontCanvas;
    }
  } else {
    global.FontCanvas = FontCanvas;
  }

})(this);