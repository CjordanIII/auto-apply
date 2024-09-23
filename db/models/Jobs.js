// models/User.js

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobname: String,
  link: String,
});

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
