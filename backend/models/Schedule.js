const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    teacher: {
      type: String,
      required: true
    },
    classroom: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);