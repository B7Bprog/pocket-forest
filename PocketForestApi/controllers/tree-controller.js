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

exports.updateUser = async (req, res, next) => {
  const opts = { new: true, upsert: true };
  const { username } = req.params;
  const query = { username: username };
  const result = await User.findOneAndUpdate(query, req.body, opts);
  res.status(200).send(result);
};
