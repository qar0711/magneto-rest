"use strict";

const DbMixin = require("../mixins/db.mixin");
const ApiGateway = require("moleculer-web");
const { ForbiddenError } = ApiGateway.Errors;
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "mutant",
	// version: 1

	mixins: [DbMixin("people")],

	settings: {
	},

	actions: {

		/**
		 * validation if it's mutant
		 *
		 * @returns
		 */
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

				let matrix = ctx.params.dna.map(x=>{return [...x.toString()]});

				var flagTitan = await ctx.call("helper.validMatrix", matrix);

				var dna = matrix.join("");

				const doc = await this.adapter.findOne({dna: dna});

				!doc && await this.adapter.insert({ dna: dna, isHuman: !flagTitan});

				if (!flagTitan)
					throw new ForbiddenError();
			}
		},

	},

	methods: {
	},

	async afterConnected() {
	}
};
