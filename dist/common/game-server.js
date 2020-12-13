// Game Server!
// Handles the greet / acknoledge
// informing the gameclient of their player id and any required on connection state
// as well as informing the other clients that someone connected
// Also handles everything else we want to be server authoritative, e.g. level generation
let MessageType = require('./message-types');
let World = require('./world');
let Bounds = require('../../Fury/src/bounds');
let Maths = require('../../Fury/src/maths');
let PuzzleGenerator = require("./puzzle-generator");

let GameServer = module.exports = (function() {
	let exports = {};

	// Format is (idToSendTo, objectToSend) for message
	// Format is (idToExclude, objectToSend) for distribute (-1 sends to all)
	// Updated Format is (playerId, idToExclude, objectToSend) for distribute (-1 sends to all in same world)
	let sendMessage, distributeMessage;

	let ServerWorldInstance = (function(){
		let exports = {};
		exports.create = function() {

			let instance = {};
			instance.connectionCount = 0;
			instance.isComplete = false;
			instance.globalState = {
				players: [],
				pickups: [],
				interactables: []  // network interactables power state
			};

			instance.world = World.create();

			let level = PuzzleGenerator.create();
			instance.globalState.level = level;
			instance.world.createLevel(level);

			return instance;
		};
		return exports;
	})();

	let worldInstances = [];
	let idToInstance = {};

	let assignToWorldInstance = (id) => {
		let instanceIndex = -1;
		let firstEmptyInstanceIndex = -1;
		for (let i = 0, l = worldInstances.length; i < l; i++) {
			if (firstEmptyInstanceIndex == -1 && (worldInstances[i] == null || worldInstances[i] == undefined)) {
				firstEmptyInstanceIndex = i;
			}
			if (worldInstances[i] && !worldInstances[i].isComplete) {
				instanceIndex = i;
				break;
			}
		}
		if (instanceIndex == -1) {
			// No instances create a new one!
			if (firstEmptyInstanceIndex != -1) {
				instanceIndex = firstEmptyInstanceIndex;
				worldInstances[firstEmptyInstanceIndex] = ServerWorldInstance.create();
			} else {
				instanceIndex = worldInstances.push(ServerWorldInstance.create()) - 1;
			}
		}
		idToInstance[id] = instanceIndex;
		worldInstances[instanceIndex].connectionCount += 1;
	};

	let getGlobalState = (id) => {
		return worldInstances[idToInstance[id]].globalState;
	};

	let getWorld = (id) => {
		return worldInstances[idToInstance[id]].world;
	};

	let getServerWorldInstance = (id) => {
		return worldInstances[idToInstance[id]];
	};

	exports.init = (sendDelegate, distributeDelegate) => {
		sendMessage = sendDelegate;
		// Own distribute - only send to players in same world
		distributeMessage = (playerId, excludeId, message) => {
			let players = getGlobalState(playerId).players;
			for (let i = 0, l = players.length; i < l; i++) {
				if (players[i] !== undefined && players[i] !== null && players[i].id != excludeId) {
					sendMessage(players[i].id, message);
					// On server this'll repeat stringify which isn't great, a send with predicate might be cute
					// or a send to array of ids, but it's fine for now
				}
			}
		};
	};

	exports.onclientconnect = (id) => {
		assignToWorldInstance(id);
		sendMessage(id, { type: MessageType.ACKNOWLEDGE, id: id, data: getGlobalState(id) });
	};

	let positionCache = [0,0,0];

	// Helpers for copying into DTOs
	// TODO: Move to common so we can reuse for client side DTOs
	// note + converts back from string to number, arguably should use round
	// https://stackoverflow.com/a/41716722
	let round = (num) => {
		return Math.round(num * 100 + Number.EPSILON) / 100;
	};

	let cloneArray3 = (array) => {
		return [ round(array[0]), round(array[1]), round(array[2]) ];
	};
	let copyArray3 = (out, array) => {
		out[0] = round(array[0]);
		out[1] = round(array[1]);
		out[2] = round(array[2]);
	};
	let cloneArray4 = (array) => {
		return [ round(array[0]), round(array[1]), round(array[2]), round(array[3]) ];
	};
	let copyArray4 = (out, array) => {
		out[0] = round(array[0]);
		out[1] = round(array[1]);
		out[2] = round(array[2]);
		out[3] = round(array[3]);
	};

	exports.onmessage = (id, message) => {
		// Adjust for instance
		let globalState = getGlobalState(id);
		let world = getWorld(id);

		switch(message.type) {
			case MessageType.GREET:
				let nick = message.nick;
				if (!nick) nick = "Player " + (id + 1);
				globalState.players[id] = { id: id, nick: nick, position: cloneArray3(world.initialSpawnPosition), rotation: [0,0,0,1] };
				distributeMessage(id, -1, { type: MessageType.CONNECTED, id: id, player: globalState.players[id] });
				break;
			case MessageType.PICKUP:
				// Expect position, run through pickups and try to pickup
				// Could in theory use last known position it's probably fine
				if (!isHoldingPickup(id)) {
					let closestPickup = null;
					let minSqrDistance = Number.MAX_VALUE;
					for (let i = 0, l = world.pickups.length; i < l; i++) {
						let pickup = world.pickups[i];
						if (pickup.canPickup(message.position)) {
							let sqrDistance = Maths.vec3.squaredDistance(message.position, pickup.position);
							if (sqrDistance < minSqrDistance) {
								closestPickup = pickup;
								minSqrDistance = sqrDistance;
							}
						}
					}

					if (closestPickup) {
						closestPickup.enabled = false;
						setPickupGlobalState(id, closestPickup.id, id);
						distributeMessage(id, -1, { id: id, type: MessageType.PICKUP, pickupId: closestPickup.id });
					}
				}
				break;
			case MessageType.DROP:
				// If we wanted to be super accurate we could expect position
				if (isHoldingPickup(id)) {
					dropPickups(id, message.position); // Currently just drops all pickups
					message.id = id;
					distributeMessage(id, -1, message);
				}
				break;
			case MessageType.INTERACT:
				// Call interact then update global state
				// and distribute
				let position = globalState.players[id].position;
				// Look for interactable at player position
				let closestInteractable = null;
				let minSqrDistance = Number.MAX_VALUE;
				for (let i = 0, l = world.interactables.length; i < l; i++) {
					let interactable = world.interactables[i];
					if (interactable.canInteract(position)) {
						let sqrDistance = Maths.vec3.squaredDistance(position, interactable.position);
						if (sqrDistance < minSqrDistance) {
							minSqrDistance = sqrDistance;
							closestInteractable = interactable;
						}
					}
				}

				if (closestInteractable != null) {
					let response = { type: MessageType.INTERACT, id: id };

					let interactable = closestInteractable;
					// Interact!
					let heldPickupState = getHeldPickup(id);
					let heldPickup = null;
					if (heldPickupState) {
						heldPickup = world.getPickup(heldPickupState.id);
					}
					let result = interactable.interact(heldPickup);
					if (result && result.length) {
						// Update world object (will want to do this on client too)
						heldPickup.enabled = false;
						Maths.vec3.copy(heldPickup.position, result);
						// Don't have server side player objects so don't need to explicitly
						// set player.heldItem to null, updating the heldPickupState does that

						// Update global state
						heldPickupState.owner = null;
						heldPickupState.position = cloneArray3(result);
						setInteractableGlobalState(id, interactable.id, interactable.power);

						// Set message pickup id
						response.pickupId = heldPickup.id
					} else if (result) {
						result.enabled = false;
						setPickupGlobalState(id, result.id, id);
						setInteractableGlobalState(id, interactable.id, interactable.power);
					}

					// If we expand what interactables can do, e.g. just switches
					// need to respond to state change here and put it in global state

					response.interactableId = interactable.id;
					distributeMessage(id, -1, response);
				}
				break;
			case MessageType.POSITION:  // This is more a player transform / input sync
				message.id = id;

				copyArray3(positionCache, message.position);
				let hasPositionChanged = !Maths.vec3.equals(positionCache, globalState.players[id].position);
				if (hasPositionChanged)
				copyArray3(globalState.players[id].position, message.position);
				copyArray4(globalState.players[id].rotation, message.rotation);

				// Check for teleporter collision
				let shouldTeleport = false;
				let teleporter = null;
				if (hasPositionChanged) {
					for (let i = 0, l = world.teleporters.length; i < l; i++) {
						teleporter = world.teleporters[i];
						// Ideally would have player concept on server now and could use it's AABB
						if (teleporter.enabled && Bounds.contains(message.position, teleporter.bounds)) {
							shouldTeleport = true;
							// TODO: Not instant teleport please - requires game loop server side or some way to defer
							Maths.vec3.copy(message.position, teleporter.targetPosition);
							Maths.quat.copy(message.rotation, teleporter.targetRotation);
							message.snapLook = true;
							message.win = teleporter.win;
							break;
						}
					}
				}

				// Message all others if no teleport, return message to sender as well as other players if teleporting
				if (shouldTeleport) {
					if (message.win) {
						// This world has been completed mark it as such so new players don't join
						getServerWorldInstance(id).isComplete = true;
					}
					/* TODO: Enable once we track progression and only set for *first* player to teleport not any player to teleport
					if (teleporter.isProgression && teleporter.target != undefined && telepoter.target != null) {
						// We've progressed the puzzle! change the initial spawn point
						// TODO: This isn't replicated on the client world structure, to do so we'd need to use a Teleport message instead
						// It's not essential that it's on the client, yet, but if we want to clean up old sections later we might need it then
						Maths.vec3.copy(world.initialSpawnPosition, teleporter.targetPosition);
					}*/
					// Distribute to everyone
					distributeMessage(id, -1, message); // TODO: Relevancy / Spacial Parititioning plz (players in target section + players in correct section + self)
				} else {
					// Distribute to other players
					distributeMessage(id, id, message); // TODO: Relevancy / Spacial Partitioning plz (players in same section only)
				}

				// Check for auto-pickups
				if (hasPositionChanged && !isHoldingPickup(id)) { // Q: Auto pickups probably shouldn't be held?
					for (let i = 0, l = world.pickups.length; i < l; i++) {
						let pickup = world.pickups[i];
						if (pickup.autoPickup && pickup.canPickup(message.position)) {
							// This player should pickup the object!
							pickup.enabled = false;
							setPickupGlobalState(id, pickup.id, id);
							distributeMessage(id, -1, { id: id, type: MessageType.PICKUP, pickupId: pickup.id });
						}
					}
				}
				break;
			default:
				message.id = id;
				distributeMessage(id, id, message);
				break;
		}
	};

	// Ideally we'd move these methods to server world instance but it's less typing
	// to just set a local variable based on playerId, and make sure we pass that

	let setPickupGlobalState = (playerId, id, owner, position) => {
		let globalState = getGlobalState(playerId);
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].id == id) {
				globalState.pickups[i].owner = owner;
				if (position) {
					if (globalState.pickups[i].position) {
						copyArray3(globalState.pickups[i].position, position);
					} else {
						globalState.pickups[i].position = cloneArray3(position);
					}
				} else {
					globalState.pickups[i].position = null;
				}
				return;
			}
		}
		globalState.pickups.push({
			id: id,
			owner: owner,
			position: position ? cloneArray3(position) : null
		});
	};

	let setInteractableGlobalState = (playerId, id, power) => {
		let globalState = getGlobalState(playerId);
		for (let i = 0, l = globalState.interactables.length; i < l; i++) {
			if (globalState.interactables[i].id == id) {
				globalState.interactables[i].power = power.slice();
				return;
			}
		}
		globalState.interactables.push({ id: id, power: power.slice() });
	};

	let isHoldingPickup = (playerId) => {
		let globalState = getGlobalState(playerId);
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == playerId) {
				return true;
			}
		}
		return false;
	};

	let getHeldPickup = (playerId) => {
		let globalState = getGlobalState(playerId);
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == playerId) {
				return globalState.pickups[i];
			}
		}
		return null;
	};

	let dropPickups = (playerId, dropPosition) => {
		let globalState = getGlobalState(playerId);
		let world = getWorld(playerId);
		for (let i = 0, l = globalState.pickups.length; i < l; i++) {
			if (globalState.pickups[i].owner == playerId) {
				if (!dropPosition) {
					// TODO: Calculate from player position and rotation and drop slightly in front
					dropPosition = globalState.players[playerId].position;
				}
				// re-enable world pickup
				let pickup = world.getPickup(globalState.pickups[i].id);
				if (pickup) {
					pickup.enabled = true;
					Maths.vec3.copy(pickup.position, dropPosition);
				}

				// update global state pickup
				globalState.pickups[i].owner = null;
				globalState.pickups[i].position = cloneArray3(dropPosition);  // Clone they might continue to move, lol
			}
		}
	};

	exports.onclientdisconnect = (id) => {
		let globalState = getGlobalState(id);
		// Only report disconnection of players which have sent greet
		if (globalState.players[id]) {
			dropPickups(id);  // Drop any owned pickups
			globalState.players[id] = null; // Remove from state
			distributeMessage(id, id, { type: MessageType.DISCONNECTED, id: id });
		}
		let worldInstanceIndex = idToInstance[id];
		let worldInstance = worldInstances[worldInstanceIndex];
		worldInstance.connectionCount -= 1;
		if (worldInstance.connectionCount <= 0) {
			// Everyone has left, kill it
			worldInstances[worldInstanceIndex] = null;
		}
	};

	return exports;

})();
