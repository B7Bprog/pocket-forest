const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    family: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Tree = mongoose.model("Tree", treeSchema);

module.exports = Tree;
