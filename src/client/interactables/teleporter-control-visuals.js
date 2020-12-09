
let TeleporterControlVisuals = module.exports = (function() {
  let exports = {};
  let prototype =  {};

  exports.create = (params) => {
    // expected: interactable (of type teleporter control)
    let visuals = Object.create(prototype);

    visuals.interactable = params.interactable;

    visuals.onmessage = (message) => {
        switch(message) {
          case "init":  // Valid for all interactable visuals
            // State was non-standard on connect, update for teleporter state
            console.log("Init called on control visuals");
            // TODO: notify interactable.teleporter as to powered state
            break;
          case "powered":
            // Was not powered has become powered
            console.log("Control is now powered");
            break;
          case "took_core":
            // Took core but still needs more
            console.log("Thank you for your donation");
            break;
          case "invalid_core":
            // Tried to give the control a core it didn't need
            console.log("I don't want that one");
            break;
          case "unpowered":
            // Tried to interact with control with no core
            console.log("I need more power cores");
            break;
          case "already_powered":
            // Tried to interacted with control when already powered
            console.log("I'm all good thanks!");
            break;
        }
    }

    return visuals;
  };

  return exports;
})();
