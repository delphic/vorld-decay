
let TeleporterVisuals = module.exports = (function() {
  let exports = {};
  let prototype = {};

  exports.create = (params) => {
    let visuals = Object.create(prototype);

    visuals.teleporter = params.teleporter;
    // TODO: Based on number of controls probably want
    // set up differently

    visuals.onmessage = (message) => {
      switch (message) {
        case "powered":
          // Trigger powered visuals
          break;
      }
    };

    return visuals;
  };

  return exports;
})();
