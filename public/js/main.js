var FontCanvas    = require('./modules/font-canvas');
var DrawingCanvas = require('./modules/drawing-canvas');

$(function () {

  var fontDataMap = [];
  var $clear = $('#js-clear');
  var $fontawesome = $('#js-fontawesome');
  var drawingCanvas = new DrawingCanvas(document.querySelector('#js-canvas'));

  $clear.on('click', function () {
    drawingCanvas.initializeContext();
    $fontawesome.find('li').show();
  });

  drawingCanvas.onThumbnail.addListener(function (imageData) {

    var matchCount;
    var notWhiteCount;
    var maxMatchesPercent = 0;
    var maxMatchesSelector = '';
    for (var i = 0, l = fontDataMap.length;i < l;i++) {
      matchCount = 0;
      notWhiteCount = 0;
      for (var j = 0; j < 4096;j++) {
        if (fontDataMap[i].imageData.data[j]) {
          notWhiteCount++;
        }
        if (imageData.data[j] && fontDataMap[i].imageData.data[j]) {
          matchCount++;
        }
      }
      var percent = matchCount / notWhiteCount;
      if (maxMatchesPercent < percent) {
        maxMatchesPercent = percent;
        maxMatchesSelector = fontDataMap[i].selector;
      }
    }
    $fontawesome.find('li').each(function () {
      var $this = $(this);
      if (this.getAttribute('data-selector') === maxMatchesSelector) {
        $this.show();
      } else {
        $this.hide();
      }
    });
  });

  document.fonts.ready().then(function (fontFaceSet) {

    if (fontFaceSet.check('24px FontAwesome')) {

      $.ajax({
        url: '/api/fonts',
        method: 'get'
      }).done(function (data) {

        // render html
        var html = '';
        var template = document.querySelector('#js-fontawesome-item-template').innerHTML;
        data.fonts.forEach(function (font) {
          html += Mustache.render(template, {
            selector: font.selector,
            content: font.content.replace(/\"/g, '').replace(/\\/, '0x')
          });
        });
        $fontawesome.html(html);

        $fontawesome.find('li').each(function () {

          var canvas = this.querySelector('canvas');
          var selector = this.getAttribute('data-selector');
          var content = this.getAttribute('data-content');

          // render font in canvas
          var fontCanvas = new FontCanvas(canvas);
          fontCanvas.renderText(content);
          
          // cache selector & imageData
          fontDataMap.push({
            selector: selector,
            imageData: fontCanvas.getImageData()
          });
        });
      });
    }
  });
});