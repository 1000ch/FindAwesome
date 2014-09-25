var path = require('path');

var express = require('express');
var application = express();

application.set('view engine', 'jade');
application.set('views', __dirname + '/views');
application.use(express.static(__dirname + '/public'));

application.get('/', require('./routes/index'));
application.get('/API/fonts', require('./routes/API/fonts'));

application.listen(process.env.PORT || 3000, function () {
  console.log('Express server listening on port ' + (process.env.PORT || 3000));
});