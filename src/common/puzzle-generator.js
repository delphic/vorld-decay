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
		let input = { start: 0, units: [ { exitPower: [1], exitLocations: [0], keyLocations: [0], keyLocationOffsets: [0], units: [] } ] };
		// TODO: ^^ good to have everything initially but should be able to omit keys and it still work (just assume 0)
		let roomUnits = [];
		let output = { start: 0, rooms: [] };

		// Determine which units are rooms
		for (let i = 0, l = input.units.length; i < l; i++) {
			if (!input.units[i].units || !input.units[i].length) {
				input.units[i].index = i;
				roomUnits.push(input.units[i]);
			}
		}

		for (let i = 0, l = roomUnits.length; i < l; i++) {
			let room = { teleporters: [], cores: [0,0,0,0] };

			// Just add the exit teleporter - either is progression or next room in parent loop
			let isProgression = input.start == roomUnits[i].index;
			let teleporter = { powerRequirements: roomUnits[i].exitPower.slice() };
			if (isProgression) {
				teleporter.isProgression = true;
				// Will eventually also need a target for when we chain puzzles together
			} else {
				teleporter.target = (i + 1) % l;	// Is this good? Depends on how we build this rooms array! should be the room index of the next room in this unit loop
			}
			room.teleporters.push(teleporter);
			// Just give it the power needed to get out
			for (let j = 0; j < 4; j++) {
				room.cores[j] = roomUnits[i].exitPower[j] | 0;
			}
			output.rooms.push(room);
		}

		// No nesting in current input so we're done for now
		return output;
	};

	return exports;
})();
