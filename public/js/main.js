$(function () {

  var canvas = new Canvas('#js-canvas');
  canvas.onThumbnail.addListener(function (imageData) {
    console.log(imageData);
  });

  $.get('/fonts/FontAwesome.otf').done(function (data) {
    var jdataview = new jDataView(data);
    console.log(jdataview); 
  });
});