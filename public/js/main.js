$(function () {

  var fontDataMap = [];
  var $fontawesome = $('#js-fontawesome');
  var canvas = new Canvas('#js-canvas');

  canvas.onThumbnail.addListener(function (imageData) {
    var font;
    var matchCount;
    var maxMatchesCount = 0;
    var maxMatchesSelector = '';
    for (var i = 0, l = fontDataMap.length;i < l;i++) {
      matchCount = 0;
      font = fontDataMap[i];
      for (var j = 0; j < 4096;j++) {
        if (imageData.data[j] === font.imageData.data[j]) {
          matchCount++;
        }
      }
      if (maxMatchesCount < matchCount) {
        maxMatchesCount = matchCount;
        maxMatchesSelector = font.selector;
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
        var template = document.querySelector('#js-fontawesome-item-template');
        data.fonts.forEach(function (font) {
          html += Mustache.render(template.innerHTML, {
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
          var ctx = canvas.getContext('2d');
          ctx.font = '24px FontAwesome';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String.fromCharCode(content), canvas.width / 2, canvas.height / 2);
          
          // cache selector & imageData
          fontDataMap.push({
            selector: selector,
            imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
          });
        });
      });
    }
  });
});