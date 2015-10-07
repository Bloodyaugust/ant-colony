(function (actions) {
  actions.heartbeat = function () {
    app.dispatcher.dispatch({
      type: 'heartbeat',
      amount: new Date
    });
  };

  actions.spawnTabSelect = function (unit) {
    app.dispatcher.dispatch({
      type: 'spawn-tab-select',
      unit: unit
    });
  };

  actions.spawnUnit = function (unit, amount) {
    app.dispatcher.dispatch({
      type: 'spawn-unit',
      unit: unit,
      amount: amount
    });
  };
})(window.app.actions = {});
