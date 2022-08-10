const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");

afterAll(() => {
  mongoose.connection.close();
});

describe("Tree endpoints", () => {
  test("Responds with all the trees", () => {
    return request(app)
      .get("/api/all-trees")
      .expect(200)
      .then(({ body }) => {
        body.forEach((tree) => {
          expect(tree).toHaveProperty("_id");
          expect(tree).toHaveProperty("name");
          expect(tree).toHaveProperty("family");
          expect(tree).toHaveProperty("longitude");
          expect(tree).toHaveProperty("latitude");
          expect(tree).toHaveProperty("createdAt");
          expect(tree).toHaveProperty("updatedAt");
        });
      });
  });
  test("Responds with a single tree selected by it's id", () => {
    const tree_id = "62f247e8652482c6df2f3742";
    return request(app)
      .get(`/api/trees/${tree_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("family");
        expect(body).toHaveProperty("longitude");
        expect(body).toHaveProperty("latitude");
        expect(body).toHaveProperty("createdAt");
        expect(body).toHaveProperty("updatedAt");

        expect(Array.isArray(body)).toBe(false);
        expect(body._id).toBe(tree_id);
      });
  });
  test("Adds a new tree", () => {
    const new_tree = {
      name: "Maple",
      family: "Sapindaceae",
      latitude: `13°28'12.9"N`,
      longitude: `3°44'13.6"W`,
    };
    return request(app)
      .post(`/api/add-tree`)
      .send(new_tree)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("family");
        expect(body).toHaveProperty("longitude");
        expect(body).toHaveProperty("latitude");
        expect(body).toHaveProperty("createdAt");
        expect(body).toHaveProperty("updatedAt");
      });
  });
});
