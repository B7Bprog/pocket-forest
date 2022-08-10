const { TopologyDescription } = require("mongodb");
const Tree = require("../models/tree");

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
