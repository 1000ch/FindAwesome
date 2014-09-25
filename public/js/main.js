var fonts = [];

$(function () {

  var canvas = new Canvas('#js-canvas');
  canvas.onThumbnail.addListener(function (imageData) {
    var font;
    var matches;
    var maxMatches = 0;
    var maxMatchesSelector = '';
    for (var i = 0, l = fonts.length;i < l;i++) {
      matches = 0;
      font = fonts[i];
      for (var j = 0; j < 4096;j++) {
        if (imageData.data[j] === font.imageData.data[j]) {
          matches++;
        }
      }
      if (maxMatches < matches) {
        maxMatchesSelector = font.selector;
      }
    }
    $('#js-fontawesome').find('li').each(function () {
      var $this = $(this);
      if ($this.find('.js-selector').text() === maxMatchesSelector) {
        $this.show();
      } else {
        $this.hide();
      }
    });
  });

});

$(window).on('load', function () {

  var $fontawesome = $('#js-fontawesome');

  document.fonts.ready().then(function (fontFaceSet) {

    if (fontFaceSet.check('24px "FontAwesome"')) {
      $.ajax({
        url: '/api/fonts',
        method: 'get'
      }).done(function (data) {

        var html = '';
        data.fonts.forEach(function (font) {
          html += '<li>';
          html += '<span class="js-selector">' + font.selector + '</span>';
          html += '<span style="display: none;" class="js-content">' + font.content.replace(/\"/g, '') + '</span>';
          html += '<canvas class="js-canvas" width="32" height="32"></canvas>';
          html += '</li>';
        });
        $fontawesome.html(html);

        $fontawesome.find('li').each(function () {
          var $this = $(this);
          var canvas = $this.find('.js-canvas').get(0);

          var selector = $this.find('.js-selector').text();
          var content = $this.find('.js-content').text().replace(/\\/, '0x');

          var ctx = canvas.getContext('2d');
          ctx.font = '24px FontAwesome';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String.fromCharCode(content), canvas.width / 2, canvas.height / 2);
          fonts.push({
            selector: selector,
            imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
          });
        });
      });
    }
  });
});