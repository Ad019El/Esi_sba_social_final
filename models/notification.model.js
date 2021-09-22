const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSChema = new Schema(
  {
    user: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    isViewed: { type: String, required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSChema);

module.exports = Notification;
