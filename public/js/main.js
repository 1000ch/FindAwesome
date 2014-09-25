$(function () {

  var canvas = new Canvas('#js-canvas');
  canvas.onThumbnail.addListener(function (imageData) {
    console.log(imageData);
  });

  var $fontawesome = $('#js-fontawesome');
  $.ajax({
    url: '/api/fonts',
    method: 'get'
  }).done(function (data) {
    
    var html = '';
    data.fonts.forEach(function (font) {
      html += '<li>';
      html += '<span class="js-selector">' + font.selector + '</span>';
      html += '<span class="js-content">' + font.content.replace(/\"/g, '') + '</span>';
      html += '<canvas class="js-canvas" width="50" height="50"></canvas>';
      html += '</li>';
    });
    $fontawesome.html(html);

    $fontawesome.find('li').each(function () {
      var $this = $(this);
      var canvas = $this.find('.js-canvas').get(0);
      var content = $this.find('.js-content').text().replace(/\\/, '0x');
      var ctx = canvas.getContext('2d');
      ctx.font = '24px FontAwesome';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String.fromCharCode(content), 0, 0);
    });
  });
});