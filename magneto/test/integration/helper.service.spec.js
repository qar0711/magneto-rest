"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../services/helper.service");

describe("Test 'helper' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({ logger: false });
		const service = broker.createService(TestService);
		service.seedDB = null; // Disable seeding

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		
        const recordMatrix = [["A","T","G","C","G","A"],
                ["J","A","G","G","Y","C"],
                ["Y","C","A","Y","P","T"],
                ["A","A","D","A","G","G"],
                ["C","A","C","C","T","A"],
                ["T","C","A","C","T","G"],
                ["T","C","G","G","G","G"]];
            
        

		it("should valid", async () => {
            global.valuesDiagonals = [[-1,-1],[-1,1],[1,-1],[1,1]];
			global.valuesQuadrants = [[-1,0],[1,0],[0,-1],[0,1]];
			global.searchedBefore = [];
			const res = await broker.call("helper.validMatrix", recordMatrix);
			expect(res).toEqual(true);
		});

        

    });

});

