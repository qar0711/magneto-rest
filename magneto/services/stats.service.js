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
		// Available fields in the responses
		fields: [
			"count_mutant_dna",
			"count_human_dna",
			"ratio"
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
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
		list: {
			rest: {
				method: "GET",
				path: "/",
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
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
		}
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
