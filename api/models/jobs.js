const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  Comapanyname: {
    type: String,
    required: true,
  },
  JobDescription: {
    type: String,
    required: true,
  },
  JobName: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("jobs", jobsSchema);
module.exports = user;
