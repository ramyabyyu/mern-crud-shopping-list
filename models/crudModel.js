const mongoose = require("mongoose");

/* 
    Crud Schema
*/

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  majorField: {
    type: String,
    required: true,
  },

  isGraduate: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Crud", crudSchema);
