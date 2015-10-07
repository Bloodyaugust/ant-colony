(function (ui) {
  var $body = $('body'),
    $controls = $body.find('.controls'),
    $spawnTab = $controls.find('.spawn-tabs'),
    $spawnTabs = $spawnTab.find('div');

  ui.render = function (data) {
    $controls.children('div').addClass('hide');
    $controls.find('.' + data.spawnTab).removeClass('hide');

    $spawnTabs.removeClass('active');
    $spawnTab.find('.' + data.spawnTab).addClass('active');
  };

  $spawnTab.find('div').on('click', function (e) {
    $el = $(e.currentTarget);

    app.actions.spawnTabSelect($el.data().tabUnit);
  });

  $controls.find('div>span').on('click', function (e) {
    $el = $(e.currentTarget);

    app.actions.spawnUnit($el.parent().data().unit, numeral().unformat($el.find('.amount').html()));
  });

  app.stores.ui.register(ui.render);
})(window.app.views.ui = {});
