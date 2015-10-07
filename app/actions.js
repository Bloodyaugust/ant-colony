(function (actions) {
  actions.heartbeat = function () {
    app.dispatcher.dispatch({
      type: 'heartbeat',
      amount: new Date
    });
  };
})(window.app.actions = {});
