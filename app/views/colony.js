(function (colony) {
  var $body = $('body'),
    $eggs = $body.find('.resources .eggs'),
    $food = $body.find('.resources .food'),
    $water = $body.find('.resources .water');

  colony.render = function (data) {
    $eggs.html(data.eggs);
    $food.html(data.food);
    $water.html(data.water);
  };

  app.stores.colony.register(colony.render);
})(window.app.views.colony = {});
