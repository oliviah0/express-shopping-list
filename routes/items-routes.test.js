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

describe("POST /items", function() {
    test("Post a new item to the list", async function() {
        const response = await request(app)
        .post("/items")
        .send({ name: "gum",
                price: 8.88
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.item).toHaveProperty("name")
        expect(response.body.item.name).toEqual("gum");
    })
})

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const response = await request(app)
            .patch(`/items/${item.name}`)
            .send({
                name: "pencil",
                price: 0.50
            })
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({name: "pencil", price: 0.50})
    })

    test("Responds with 404 if id invalid", async function() {
        const response = await request(app).patch("/items/banana");
        expect(response.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
  });


