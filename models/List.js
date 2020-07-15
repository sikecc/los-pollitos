const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = List = mongoose.model("lists", ListSchema);
