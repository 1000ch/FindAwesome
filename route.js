var route = {};

route.index = function (request, response) {
  response.render('index', {});
};

module.exports = route;