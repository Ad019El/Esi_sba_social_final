const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  
  request_accept: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model('request', RequestSchema);