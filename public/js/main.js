$(function () {

  var canvas = new Canvas('#js-canvas');
  canvas.onThumbnail.addListener(function (imageData) {
    console.log(imageData);
  });

  var $fontawesome = $('#js-fontawesome');

  var xhr = new XMLHttpRequest();
  xhr.open('get', '/fonts/fontawesome-webfont.ttf', true);
  xhr.overrideMimeType('font/opentype');
  xhr.responseType = 'arraybuffer';
  
  xhr.onreadystatechange = function (e) {
    if (this.readyState === 4 && this.status === 200) {

      var fa = new ttfjs.TTF(e.target.response);
      var scale = 1000 / fa.head.unitsPerEm;

      var html = '';
      var path = '';
      var glyf = null;

      for (var i = 0, l = fa.glyf.length;i < l;i++) {
        glyf = fa.glyf[i];
        if (glyf.path !== '') {
          path = '<path d="' + glyf.path + '" transform="scale(' + scale + ', ' + scale + ')">' + '</path>';
          html += '<li><svg width="100" height="100" viewBox="-500 -500 2000 2000"><g>' + path + '</g></svg></li>'; 
        }
      }

      $fontawesome.append(html);
    }
  };
  
  xhr.send();
});