const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
    },
    favorite_tree: {
      type: String,
      required: false,
    },
    num_of_trees_collected: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
