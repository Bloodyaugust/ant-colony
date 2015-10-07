(function (colony) {
  var $body = $('body');

  colony.render = function (data) {
    $body.html(data.eggs);
  };

  app.stores.colony.register(colony.render);
})(window.app.views.colony = {});
