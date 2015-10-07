(function (ui) {
  var state = {
    spawnTab: 'drones'
  },
  listeners = [];

  ui.update = function (data) {
    if (data.type === 'spawn-tab-select') {
      state.spawnTab = data.unit;
      ui.emit();
    }
  };

  ui.register = function (callback) {
    listeners.push(callback);
  };

  ui.emit = function () {
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](state);
    }
  };

  app.dispatcher.register(ui.update);
})(window.app.stores.ui = {});
