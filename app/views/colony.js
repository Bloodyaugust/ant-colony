(function (colony) {
  var $body = $('body'),
    $eggs = $body.find('.resources .eggs .amount'),
    $eggsRate = $body.find('.resources .eggs .rate'),
    $food = $body.find('.resources .food .amount'),
    $foodRate = $body.find('.resources .food .rate'),
    $water = $body.find('.resources .water .amount'),
    $waterRate = $body.find('.resources .water .rate'),
    $drones = $body.find('.units .drones .amount'),
    $dronesFoodUpkeep = $body.find('.units .drones .upkeep-food'),
    $dronesWaterUpkeep = $body.find('.units .drones .upkeep-water'),
    $spawnButtons = $body.find('.controls>div'),
    $workers = $body.find('.units .workers .amount'),
    $workersFoodUpkeep = $body.find('.units .workers .upkeep-food'),
    $workersWaterUpkeep = $body.find('.units .workers .upkeep-water'),
    $warriors = $body.find('.units .warriors .amount'),
    $warriorsFoodUpkeep = $body.find('.units .warriors .upkeep-food'),
    $warriorsWaterUpkeep = $body.find('.units .warriors .upkeep-water');

  colony.render = function (data) {
    $eggs.html(numeral(data.eggs).format('0a'));
    $eggsRate.html(numeral(data.eggsRate).format('0a'));
    $food.html(numeral(data.food).format('0a'));
    $foodRate.html(numeral(data.foodRate).format('0a'));
    $water.html(numeral(data.water).format('0a'));
    $waterRate.html(numeral(data.waterRate).format('0a'));
    $drones.html(numeral(data.drones).format('0a'));
    $dronesFoodUpkeep.html(numeral(data.dronesFoodUpkeep).format('0a'));
    $dronesWaterUpkeep.html(numeral(data.dronesWaterUpkeep).format('0a'));
    $workers.html(numeral(data.workers).format('0a'));
    $workersFoodUpkeep.html(numeral(data.workersFoodUpkeep).format('0a'));
    $workersWaterUpkeep.html(numeral(data.workersWaterUpkeep).format('0a'));
    $warriors.html(numeral(data.warriors).format('0a'));
    $warriorsFoodUpkeep.html(numeral(data.warriorsFoodUpkeep).format('0a'));
    $warriorsWaterUpkeep.html(numeral(data.warriorsWaterUpkeep).format('0a'));

    $spawnButtons.each(function(index, el) {
      var $el = $(el),
        $min = $el.find('.min'),
        $half = $el.find('.half'),
        $max = $el.find('.max'),
        unit = $el.data().unit;

      $min.find('.amount').html(numeral(data.spawnPotential[unit][0]).format('0a'));
      $min.find('.cost').html(numeral(data.spawnPotentialCosts[unit][0]).format('0a'));

      $half.find('.amount').html(numeral(data.spawnPotential[unit][1]).format('0a'));
      $half.find('.cost').html(numeral(data.spawnPotentialCosts[unit][1]).format('0a'));

      $max.find('.amount').html(numeral(data.spawnPotential[unit][2]).format('0a'));
      $max.find('.cost').html(numeral(data.spawnPotentialCosts[unit][2]).format('0a'));
    });
  };

  app.stores.colony.register(colony.render);
})(window.app.views.colony = {});
