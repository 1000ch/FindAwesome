var fs = require('fs');
var css = require('css');
var FONT_AWESOME_CSS = 'public/css/font-awesome.min.css';

module.exports = function (request, response) {

  var array = [];

  var fontAwesome = fs.readFileSync(FONT_AWESOME_CSS, {
    encoding: 'utf8',
    flag: 'r'
  });

  var object = css.parse(fontAwesome);
  object.stylesheet.rules.forEach(function (rule) {
    if (rule.type === 'rule' && rule.selectors.length === 1) {
      var selector = rule.selectors[0];
      if (selector.indexOf(':before') !== -1) {
        rule.declarations.forEach(function (declaration) {
          if (declaration.property === 'content') {
            array.push({
              selector: selector,
              content: declaration.value
            });
          }
        });
      }
    }
  });

  response.json({fonts: array});
};