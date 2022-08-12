const express = require("express");
const cors = require("cors");
const { PORT = 9090 } = process.env;
const monggose = require("mongoose");
const Tree = require("./models/tree");
const {
  getAllTrees,
  getTreeByID,
  addTree,
  addUser,
  getAllUsers,
  updateUser,
} = require("./controllers/tree-controller");
const app = express();

//connect to mongodb

const dbURI =
  "mongodb+srv://ProjectTeam:pocketforest321@project.6lqupvd.mongodb.net/pocket-forest?retryWrites=true&w=majority";

monggose
  .connect(dbURI)
  .then((response) => {
    console.log("Connected to the database");
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Listening on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());

app.get("/api/all-trees", getAllTrees);
app.get("/api/trees/:tree_id", getTreeByID);
app.post("/api/add-tree", addTree);

app.post("/api/add-user", addUser);
app.get("/api/all-users", getAllUsers);
app.patch("/api/users/:username", updateUser);

module.exports = app;
