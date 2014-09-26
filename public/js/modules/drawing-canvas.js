(function (global) {

  function DrawingCanvas(canvas) {
  
    this.isTouchDevice = 'touchstart' in window;
    this.canvas = canvas;
    this.thumbnail = document.createElement('canvas');
    this.thumbnail.width = 32;
    this.thumbnail.height = 32;

    this.context = this.canvas.getContext('2d');
    this.ctx = this.thumbnail.getContext('2d');
  
    this.onPaint = false;
    this.lastPoint = null;
    this.offset = {
      x: this.canvas.offsetLeft,
      y: this.canvas.offsetTop
    };

    // initialize canvas context
    this.initializeContext();
  
    // initialize canvas event
    this.initializeEvent();
  }

  DrawingCanvas.prototype.initializeContext = function () {
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.lineWidth = 20;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';
  };
  
  DrawingCanvas.prototype.initializeEvent = function () {

    var that = this;

    this.canvas.addEventListener(that.isTouchDevice ? 'touchstart' : 'mousedown', function downEventHandler(e) {
      if (e.button === 0) {
        that.onPaint = true;
  
        if (that.lastPoint === null) {
          that.lastPoint = {
            x: e.pageX - that.offset.x,
            y: e.pageY - that.offset.y
          };
        }
      }
    });

    this.canvas.addEventListener(that.isTouchDevice ? 'touchmove' : 'mousemove', function moveEventHandler(e) {
      if (that.onPaint) {
        var point = {
          x: e.pageX - that.offset.x,
          y: e.pageY - that.offset.y
        };

        that.context.beginPath();
        that.context.moveTo(that.lastPoint.x, that.lastPoint.y);
        that.context.lineTo(point.x, point.y);
        that.context.stroke();
  
        that.lastPoint = point;
      }
    });

    this.canvas.addEventListener(that.isTouchDevice ? 'touchend' : 'mouseup', function upEventHandler(e) {
      that.onPaint = false;
      that.lastPoint = null;
  
      that.ctx.drawImage(that.canvas, 0, 0, that.thumbnail.width, that.thumbnail.height);
      var imageData = that.ctx.getImageData(0, 0, that.thumbnail.width, that.thumbnail.height);
      that.onThumbnail.callbacks.forEach(function (callback) {
        callback(imageData);
      });
    });
  };

  DrawingCanvas.prototype.onThumbnail = {
    callbacks: [],
    addListener: function (callback) {
      if (this.callbacks.indexOf(callback) === -1) {
        this.callbacks.push(callback);
      }
    },
    removeListener: function (callback) {
      var index = this.callbacks.indexOf(callback);
      if (index !== -1) {
        this.callbacks.splice(index, 1);
      }
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = DrawingCanvas;
    }
  } else {
    global.DrawingCanvas = DrawingCanvas;
  }

})(this);