const mongoose = require("mongoose");

/* 
    Crud Schema
*/

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  isComplete: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Crud", crudSchema);
