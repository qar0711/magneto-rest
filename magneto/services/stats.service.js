"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "stats",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("people")],

	/**
	 * Settings
	 */
	settings: {
	},

	/**
	 * Actions
	 */
	actions: {
		list: {
			rest: "/",
			params: {
			},
			async handler(ctx) {
				const humans = (await this.adapter.count({ query: { isHuman: true }}));
				const titans = (await this.adapter.count({ query: { isHuman: false }}));
				const ratioTitans = titans / humans;
				const json = await this.transformDocuments(ctx, ctx.params, {
					count_mutant_dna : titans,
					count_human_dna: humans,
					ratio: ratioTitans
				});

				return json;
			}
		},

	},

	/**
	 * Methods
	 */
	methods: {
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
	}
};
