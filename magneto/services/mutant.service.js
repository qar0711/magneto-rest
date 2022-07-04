"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "mutant",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("people")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: [
			"dna"
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			dna: "string[]",
		}
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			create(ctx) {
			}
		}
	},

	/**
	 * Actions
	 */
	actions: {
		create: {
			rest: {
				method: "POST",
				path: "/",
				params: {
					dna: "string[]"
				},
			},
			
			async handler(ctx) {
				global.valuesDiagonals = [[-1,-1],[-1,1],[1,-1],[1,1]];
				global.valuesQuadrants = [[-1,0],[1,0],[0,-1],[0,1]];
				global.searchedBefore = [];

				var flagTitan = await ctx.call("helper.valid", ctx.params.dna);

				var dna = ctx.params.dna.map(x=> { var a = x.join(""); return a}).join("");

				const doc = await this.adapter.findOne({dna: dna});

				!doc && await this.adapter.insert({ dna: dna, isHuman: !flagTitan});

				if (!flagTitan)
				throw new ForbiddenError();
			}
		},

	},

	/**
	 * Methods
	 */
	methods: {
		async seedDB() {
		}
	},

	async afterConnected() {
	}
};
