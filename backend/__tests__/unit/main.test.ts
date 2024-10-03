import { describe, it, vi, expect, beforeAll, afterAll, Mock } from "vitest";
import { exampleUtilFunction } from "../../src/utils/exampleUtil.js";
import { exampleMiddleware } from "../../src/middlewares/exampleMiddleware.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {
	createExample,
	getExample,
	helloWorld,
} from "../../src/controllers/exampleController.js";
import { Request, Response } from "express";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe("Utility Function Tests", () => {
	it("should return the correct string from exampleUtilFunction", () => {
		const result = exampleUtilFunction();
		expect(result).toBe("This is a utility function");
	});
});

describe("Middleware Tests", () => {
	it("should call next function in exampleMiddleware", () => {
		const req = {} as Request;
		const res = {} as Response;
		const next = vi.fn();

		exampleMiddleware(req, res, next);

		expect(next).toHaveBeenCalled();
	});
});

describe("Controller Tests", () => {
	it("should create an example with status 200 in createExample", async () => {
		const req = {
			body: {
				name: "Test",
				value: 1,
			},
		} as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;

		try {
			await createExample(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "Test",
					value: 1,
				})
			);
		} catch (error) {
			// Ensure res.json is properly typed as a mock function
			const jsonResponse = (res.json as Mock).mock.calls[0][0];
			console.log("JSON Response:", jsonResponse);

			throw error;
		}
	});

	it("should return data with status 200 in getExample", async () => {
		const req = {} as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		} as unknown as Response;

		try {
			await getExample(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						name: "Test",
						value: 1,
					}),
				])
			);
		} catch (error) {
			const jsonResponse = (res.json as Mock).mock.calls[0][0];
			console.log("JSON Response:", jsonResponse);

			throw error;
		}
	});

	it('should return "Hello World" with status 200 in helloWorld', () => {
		const req = {} as Request;
		const res = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as Response;

		helloWorld(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith("Hello World");
	});
});
