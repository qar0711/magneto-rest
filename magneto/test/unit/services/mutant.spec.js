"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/mutant.service");
const HelperService = require("../../../services/helper.service");
describe("Test 'mutant' service", () => {
   
    describe("Test 'mutant.create' action", () => {

		let broker = new ServiceBroker({ logger: false });
		let mutantService = broker.createService(TestService);
	
		const recordMatrix = {
						dna : [    ["ATGCGA"],["JAGGYC"],["YCAYPT"],["AADAGG"],["CACCTA"],["TCACTG"],["TCGGGG"]]
					};
		const mockSend = jest.fn(() => Promise.resolve(true));
	
		HelperService.actions.validMatrix = mockSend;


		let mailService = broker.createService(HelperService);

		jest.spyOn(mutantService.adapter, "findOne");

	
		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			_id: "123",
			dna: [["ABC"],["ABC"], ["ABC"], ["ABC"]],isHuman: false
		};

        it("should create new user", async () => {
            // Replace adapter's insert with a mock

            // Call the action
			mutantService.adapter.findOne.mockImplementation(async () => record);

            let result = await broker.call("mutant.create", recordMatrix);
			expect(result).toEqual(undefined);
        });
    });
});
// describe("Test 'mutant' service", () => {

// 	describe("Test actions", () => {
// 		const broker = new ServiceBroker({ logger: false });
// 		const service = broker.createService(TestService);

// 		jest.spyOn(service.adapter, "updateById");
// 		jest.spyOn(service, "transformDocuments");
// 		jest.spyOn(service, "entityChanged");

// 		beforeAll(() => broker.start());
// 		afterAll(() => broker.stop());


// 		const record = {
// 			_id: "123",
// 			dna: "Awesome thing",
// 			isHuman: true
// 		};

// 		const recordMatrix = {
//             dna : [    ["ATGCGA"],             ["JAGGYC"],             ["YCAYPT"],             ["AADAGG"],             ["CACCTA"],             ["TCACTG"],             ["TCGGGG"]]         };

// 		describe("Test 'mutant.create'", () => {

// 			it("should call create mutant", async () => {
// 				service.adapter.findOne.mockImplementation(async () => record);

// 				const res = await broker.call("mutant.create", recordMatrix);

				
// 			});

// 		});

		

// 	});

	// describe("Test hooks", () => {
	// 	const broker = new ServiceBroker({ logger: false });
	// 	const createActionFn = jest.fn();
	// 	broker.createService(TestService, {
	// 		actions: {
	// 			create: {
	// 				handler: createActionFn
	// 			}
	// 		}
	// 	});

	// 	beforeAll(() => broker.start());
	// 	afterAll(() => broker.stop());

	// 	describe("Test before 'create' hook", () => {

	// 		it("should add quantity with zero", async () => {
	// 			await broker.call("mutant.create", true);

	// 			expect(createActionFn).toBeCalledTimes(1);
	// 			expect(createActionFn.mock.calls[0][0].params).toEqual({
	// 				id: "111",
	// 				name: "Test product",
	// 				price: 100,
	// 				quantity: 0
	// 			});
	// 		});

	// 	});

	// });



