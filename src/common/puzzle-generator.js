// Right terms!
// A 'teleporters' transports you from one room to another in one direction, may require a colored 'core' to power
// A 'core' is an item you can pick up in world (or is powering a teleporter) and take through powered teleporters
// A 'room' is an area has at least one teleporter, and enough cores to power at least one teleporter
//  A room is a subset of 'unit' of loop length 0
// A 'unit' is a loop of 1 or more sub-units and it has an exit teleporter (which may or may not trigger progression)
// (NOTE: There needn't be enough cores to power all teleporters, just enough to either power the exit _or_ the 'loop' this follows from room definition)
// - Units don't need to use the same core type for a given 'level' of nesting, but it'll be easier to reason about if they do.
// Units overlap when they share rooms in their loops.
// - Overlapping units implicitly have 'shared' cores when the exit teleporter from one unit needs the same color as is needed to leave one overlapping unit into the other.
// -- If shared core is used this breaks one of the loops traversal to exit the other, this is desirable.
// When progression is triggered, the spawn position of new players should be set to the target room
// A certain number of progressions should cause the player(s) to win and reset the server.

let PuzzleGenerator = module.exports = (function() {
	let exports = {};

	// This outputs a unit with an exit teleporter
	exports.create = function() {
		// Note: color indices: [ red, blue, yellow, green ]
		// Input # 1:
		// { units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] units: [] } ],
		// start: 0 }
		// is a single room with a red teleporter and red power core (no keyLocation or exitColor => no power requirements)
		// exiting this room increases progression

		// Input #2
		// { units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] },
		// 	{ exitPower: [0, 1, 1], exitLocations: [1], keyLocations: [2], keyLocationOffsets[1,0], units: [0,0,0] } ],
		// start: 1}
		// is 3 rooms in a loop using red to tranverse, second room contains a blue/yellow teleporter, third room contains a blue core and first a yellow
		// exiting the second room via the blue/yellow teleporter increases progression

		// In order to nest units further, need to improve key and exitLocation specification (have to pick a room location ultimately not a unit location)
			// Can we just use an array? and it uses the nesting depth % units.length
		// In order to support multiple power cores need we to improve exitPower - can use an array
			// Also effects keyLocations - we could just do (nesting depth + keyLocationOffsets[colorIndex]) % units.length
		// In order to share room instances need something more than definition indices, as each implies a new room atm.
			// Would adding "overlap: unitIndex, unitOverlaps: [0]"	- Work?
				// Well for this depth yes, but for more nesting no, and it doesn't help us put the keyLocation into the other unit
					// If we index into room instead of unit, and then build rooms of the overlap... maybe we could place the key in the overlap?

		// NOTE: Logic for when unlock key matches core already in the room from a lower layer, don't need to add it elsewere
		// E.g. if exitPower for units[1] in Input #2, was [1,1]  we won't need to add the first core (0) anywhere because units[1].units[units[1].exitlocations[0]].exitPower[0] >= units[1].exitPower[0]
		// where units[1].exitLocations[0] is the room with the exit teleporter, if it was nested we'd need to drill down till we knew the room index
		// where we're checking [...]exitPower[0] >= units[1].exitPower[0] could swap those 0s as colorIndex and perform the check for all

		// Output #1
		// rooms: [ { telporters: [{ powerRequirements: [1], isProgression: true }], cores: [ 1 ]  }]
		// Output #2
		// rooms: [ { teleporters: [{ powerRequirements: [1], target: 1 }], cores: [ 1, 0, 1 ] },
	 	//	{ teleporters: [{ powerRequirements: [1], target: 2 }, { powerRequirements: [0, 1, 1], isProgression: true }], cores: [ 1 ] },
		// { teleporters: [{ powerRequirements: [1], target: 0 }], cores: [ 1, 1 ] }]

		// Enough theory crafting, lets ignore more than one level of nesting code for now
		// First Test - nesting level 0, length 1
		// let input = { start: 0, units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0], units: [] } ] };
		let input = { start: 1, units: [
			{ exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0] },
		 	{ exitPower: [0, 1, 1], exitLocations: [1], keyLocations: [2], keyLocationOffsets: [1,0], units: [0,0,0] } ],
		};

		let startUnit = input.units[input.start];

		let createRoom = function(roomUnit, isProgression, target) {
			let room = { teleporters: [], cores: [0,0,0,0] };

			// Create Exit Teleporter
			room.teleporters.push(createTeleporter(roomUnit.exitPower, isProgression, target));

			// It's room level exit so just give it the power needed to get out
			// technically should be using exitLocation / keyLocation
			for (let i = 0; i < 4; i++) {
				room.cores[i] = roomUnit.exitPower[i] | 0;
			}
			return room;
		};

		let createTeleporter = function(exitPower, isProgression, target) {
			let teleporter = { powerRequirements: exitPower.slice() };
			if (isProgression) {
				teleporter.isProgression = isProgression;
			} else {
				teleporter.target = target;
			}
			return teleporter
		};

		// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		let shuffleArray = function(array) {
			let currentIndex = array.length, temp, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temp = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temp;
			}
			return array;
		};

		let output = { start: 0, rooms: [] };
		if (!startUnit.units || !startUnit.units.length) {
			// Single length just create a room
			output.rooms.push(createRoom(startUnit, true));
		} else {
			// Recurve into units
			let unitRooms = output.rooms;
			let nestingLevel = 1;	// TODO: Support more than one please!

			// NOTE: using output.rooms to mean rooms for this unit, which would not be true with further nesting
			// Also some of the maths likely wouldn't work
			for (let i = 0, l = startUnit.units.length; i < l; i++) {
				// NOTE: Assuming these units are rooms, which is not valid but one step at a time kay
				unitRooms.push(createRoom(input.units[startUnit.units[i]], false, (i + 1) % l));
			}
			let exitRoomIndex = startUnit.exitLocations[0] % unitRooms.length;	// Additional array entries would be used for further nesting

			// Add exit teleporter
			unitRooms[exitRoomIndex].teleporters.push(createTeleporter(startUnit.exitPower, true));

			// Distribute cores to solve across rooms
			for (let colorIndex = 0; colorIndex < startUnit.exitPower.length; colorIndex++) {
				let requiredPower = startUnit.exitPower[colorIndex] | 0;

				// Account for shared power needs - don't spawn cores which have to be available for the room because of the lower loop teleporters
				let minPowerRequirement = 0;
				for (let i = 0; i < nestingLevel; i++) {
					let teleporter = unitRooms[exitRoomIndex].teleporters[i];
					if (colorIndex < teleporter.powerRequirements.length) {
						minPowerRequirement += teleporter.powerRequirements[colorIndex] | 0;
					}
				}
				requiredPower -= minPowerRequirement;

				if (requiredPower > 0) {
					let offsetIndex = colorIndex % startUnit.keyLocationOffsets.length;
					// key location offsets is used for multiple color keys - this does mean the pattern would be cyclically the same for additional nesting but :shrug:
					let coreRoomIndex = (startUnit.keyLocations[0] + startUnit.keyLocationOffsets[offsetIndex]) % unitRooms.length; // Additional array entries would be used for further nesting
					unitRooms[coreRoomIndex].cores[colorIndex] += requiredPower;
				}
			}

			// Now shuffle swap teleporter positions extra random!
			shuffleArray(unitRooms[exitRoomIndex].teleporters);
		}

		return output;
	};

	return exports;
})();
