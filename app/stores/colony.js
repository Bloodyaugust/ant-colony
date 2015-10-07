(function (colony) {
  var drones = 1,
    dronesFoodUpkeep = 1,
    dronesWaterUpkeep = 1,
    eggs = 5,
    eggsRate = 1,
    food = 100,
    foodRate = 1,
    units = {
      drones: 10,
      warriors: 0,
      workers: 1,
    },
    water = 100,
    waterRate = 1,
    workers = 1,
    workersFoodUpkeep = 1,
    workersWaterUpkeep = 1,
    warriors = 1,
    warriorsFoodUpkeep = 1,
    warriorsWaterUpkeep = 1,
    listeners = [];

  var constants = {
    eggCosts: {
      drone: 1,
      warrior: 2,
      worker: 1,
    },
    eggsRate: 0.1,
    foodRate: 2,
    waterRate: 1.5,
    dronesFoodUpkeep: 2,
    dronesWaterUpkeep: 1,
    workersFoodUpkeep: 1,
    workersWaterUpkeep: 1,
    warriorsFoodUpkeep: 5,
    warriorsWaterUpkeep: 3,
  };

  colony.update = function (data) {
    var pluralUnitName = data.unit + 's' || '';

    if (data.type === 'heartbeat') {
      eggs += constants.eggsRate * units.drones;
      eggsRate = constants.eggsRate * units.drones;
      food += constants.foodRate * units.workers;
      foodRate = constants.foodRate * units.workers;
      water += constants.waterRate * units.workers;
      waterRate = constants.waterRate * units.workers;

      dronesFoodUpkeep = constants.dronesFoodUpkeep * units.drones;
      dronesWaterUpkeep = constants.dronesWaterUpkeep * units.drones;
      workersFoodUpkeep = constants.workersFoodUpkeep * units.workers;
      workersWaterUpkeep = constants.workersWaterUpkeep * units.workers;
      warriorsFoodUpkeep = constants.warriorsFoodUpkeep * units.warriors;
      warriorsWaterUpkeep = constants.warriorsWaterUpkeep * units.warriors;

      colony.emit();
    }

    if (data.type === 'spawn-unit') {
      if (eggs >= constants.eggCosts[data.unit] * data.amount) {
        eggs -= constants.eggCosts[data.unit] * data.amount;
        units[pluralUnitName] += data.amount;
        colony.emit();
      }
    }
  };

  colony.register = function (callback) {
    listeners.push(callback);
  };

  colony.emit = function () {
    var data = {
      eggs: eggs,
      eggsRate: eggsRate,
      food: food,
      foodRate: foodRate,
      water: water,
      waterRate: waterRate,
      drones: units.drones,
      dronesFoodUpkeep: dronesFoodUpkeep,
      dronesWaterUpkeep: dronesWaterUpkeep,
      spawnPotential: {
        drone: [eggs >= constants.eggCosts.drone ? 1 : 0, (eggs / 2) / constants.eggCosts.drone, eggs / constants.eggCosts.drone],
        warrior: [eggs >= constants.eggCosts.warrior ? 1 : 0, (eggs / 2) / constants.eggCosts.warrior, eggs / constants.eggCosts.warrior],
        worker: [eggs >= constants.eggCosts.worker ? 1 : 0, (eggs / 2) / constants.eggCosts.worker, eggs / constants.eggCosts.worker],
      },
      spawnPotentialCosts: {
        drone: [(eggs >= constants.eggCosts.drone ? 1 : 0) * constants.eggCosts.drone, ((eggs / 2) / constants.eggCosts.drone) * constants.eggCosts.drone, (eggs / constants.eggCosts.drone) * constants.eggCosts.drone],
        warrior: [(eggs >= constants.eggCosts.warrior ? 1 : 0) * constants.eggCosts.warrior, ((eggs / 2) / constants.eggCosts.warrior) * constants.eggCosts.warrior, (eggs / constants.eggCosts.warrior) * constants.eggCosts.warrior],
        worker: [(eggs >= constants.eggCosts.worker ? 1 : 0) * constants.eggCosts.worker, ((eggs / 2) / constants.eggCosts.worker) * constants.eggCosts.worker, (eggs / constants.eggCosts.worker) * constants.eggCosts.worker],
      },
      workers: units.workers,
      workersFoodUpkeep: workersFoodUpkeep,
      workersWaterUpkeep: workersWaterUpkeep,
      warriors: units.warriors,
      warriorsFoodUpkeep: warriorsFoodUpkeep,
      warriorsWaterUpkeep: warriorsWaterUpkeep,
    };

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](data);
    }
  }

  app.dispatcher.register(colony.update);
})(window.app.stores.colony = {});
