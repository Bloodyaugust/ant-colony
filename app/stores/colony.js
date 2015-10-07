(function (colony) {
  var drones = 1,
    eggs = 0,
    food = 100,
    water = 100,
    workers = 1,
    warriors = 1,
    listeners = [];

  var constants = {
    eggRate: 1,
    foodRate: 2,
    waterRate: 1.5,
  };

  colony.update = function (data) {
    if (data.type === 'heartbeat') {
      eggs += constants.eggRate * drones;
      food += constants.foodRate * workers;
      water += constants.waterRate * workers;
    }

    colony.emit();
  };

  colony.register = function (callback) {
    listeners.push(callback);
  };

  colony.emit = function () {
    var data = {
      eggs: eggs,
      food: food,
      water: water,
    };

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](data);
    }
  }

  app.dispatcher.register(colony.update);
})(window.app.stores.colony = {});
