const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  amenities: [String],
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);