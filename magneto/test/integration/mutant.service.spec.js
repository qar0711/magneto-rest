"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../services/mutant.service");
const HelperService = require("../../services/helper.service");

describe("Test 'mutant' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({ logger: false });
		const service = broker.createService(TestService);
		service.seedDB = null; // Disable seeding

        const mockSend = jest.fn(() => Promise.resolve(true));

		HelperService.actions.validMatrix = mockSend;

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		
        const recordMatrix = {
            dna : [  ["ATGCGA"],["JAGGYC"],["YCAYPT"],["QADAGG"],["CACCTG"],["JCACTG"],["TCGQGG"]]
        };
            
        it("should create", async () => {
            let result = await broker.call("mutant.create", recordMatrix);
            expect(result).toEqual(undefined);
        });

    });

});

