(function (colony) {
  var eggs = 0,
    eggLayMultiplier = 1,
    listeners = [];

  colony.update = function (data) {
    if (data.type === 'heartbeat') {
      eggs += 1 * eggLayMultiplier;
    }

    colony.emit();
  };

  colony.register = function (callback) {
    listeners.push(callback);
  };

  colony.emit = function () {
    var data = {
      eggs: eggs
    };

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](data);
    }
  }

  app.dispatcher.register(colony.update);
})(window.app.stores.colony = {});
