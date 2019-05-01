process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakedb");

let item = { name: "pencil", price: 0.50 }

beforeEach(function() {
    items.push(item)
});

afterEach(function() {
    items = []
});

describe("GET /items", function() {
    test("Get a list of items", async function() {
        const response = await request(app).get("/items");
        const { items } = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1)
    })
})

describe(" /items", function() {
    test("Get a list of items", async function() {
        const response = await request(app).get("/items");
        const { items } = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1)
    })
})

