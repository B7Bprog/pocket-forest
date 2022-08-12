const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
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
    image_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    point_value: {
      type: Number,
      required: true,
    },
    edible_parts: {
      type: Array,
      required: true,
    },
    propagation_method: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const Tree = mongoose.model("Tree", treeSchema);

module.exports = Tree;
