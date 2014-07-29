$(function () {

  var canvas = new Canvas('#js-canvas');
  canvas.onThumbnail.addListener(function (imageData) {
    console.log(imageData);
  });

});