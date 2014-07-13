$(function () {

  var onPaint = false;
  var canvas = document.querySelector('#js-canvas');
  var thumbnail = document.querySelector('#js-thumbnail');
  var $canvas = $(canvas);

  var context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.lineWidth = 20;
  context.lineCap = 'round';
  context.strokeStyle = '#000';

  var ctx = thumbnail.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var canvasOffset = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  };

  var lastPoint = null;

  $canvas.on('mousedown', function (e) {
    if (e.button === 0) {
      onPaint = true;

      if (lastPoint === null) {
        lastPoint = {
          x: e.pageX - canvasOffset.x,
          y: e.pageY - canvasOffset.y
        };
      }
    }
  }).on('mousemove', function (e) {

    if (onPaint) {
      var point = {
        x: e.pageX - canvasOffset.x,
        y: e.pageY - canvasOffset.y
      };

      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(point.x, point.y);
      context.stroke();

      lastPoint = point;
    }

  }).on('mouseup', function (e) {

    onPaint = false;
    lastPoint = null;

    ctx.drawImage(canvas, 0, 0, thumbnail.width, thumbnail.height);
    var imageData = ctx.getImageData(0, 0, thumbnail.width, thumbnail.height);
    console.log(imageData);

  }).on('dblclick', function () {

    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  });

});