const { TopologyDescription } = require("mongodb");
const Tree = require("../models/tree");
const User = require("../models/user");

exports.getAllTrees = (req, res, next) => {
  Tree.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {});
};

exports.getTreeByID = (req, res, next) => {
  const { tree_id } = req.params;

  Tree.findById(tree_id).then((result) => {
    res.send(result);
  });
};

exports.addTree = async (req, res, next) => {
  const new_tree = req.body;

  const result = await Tree.create(new_tree);

  res.status(201).send(result);
};

exports.addUser = async (req, res, next) => {
  const new_user = req.body;
  console.log(new_user, "<<<new user");
  const result = await User.create(new_user);

  res.status(201).send(result);
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {});
};

exports.updateUser = (req, res, next) => {
  const { username } = req.params;
  const query = { username: username };
  console.log(username, "<<< username");
  User.findOneAndUpdate(query, req.body, (result) => {
    console.log(result, "<<< result here");
    res.status(200).send(result);
  });
  /* .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {}); */
};
