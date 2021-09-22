const mongoose = require("mongoose");

const MeetingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  detailles: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("meeting", MeetingSchema);
