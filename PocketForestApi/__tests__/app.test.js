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
describe("User endpoints", () => {
  test("Adds a new user", () => {
    const new_user = {
      name: "Peter",
      username: "peter22",
      points: 15,
      favorite_tree: `Maple`,
    };
    return request(app)
      .post(`/api/add-user`)
      .send(new_user)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("username");
        expect(body).toHaveProperty("points");
        expect(body).toHaveProperty("favorite_tree");
      });
  });
  test("Responds with all the users", () => {
    return request(app)
      .get("/api/all-users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((user) => {
          expect(user).toHaveProperty("_id");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("points");
          expect(user).toHaveProperty("favorite_tree");
        });
      });
  });
  test("Finds and updates a user", () => {
    const username = "peter22";
    const update = {
      points: 16,
    };
    return request(app)
      .patch(`/api/users/${username}`)
      .send(update)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("username");
        expect(body).toHaveProperty("points");
        expect(body).toHaveProperty("favorite_tree");

        expect(body.points).toBe(16);
      });
  });
});
