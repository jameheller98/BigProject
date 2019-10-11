const mongoose = require('mongoose');

const postblog = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Yêu cầu nhập nội dung!'],
  },
  price: {
    type: Number,
    required: [true, 'Yêu cầu nhập giá!'],
  },
  acreage: {
    type: Number,
    required: [true, 'Yêu cầu nhập diện tích!'],
  },
  address: {
    type: String,
    required: [true, 'Yêu cầu nhập địa chỉ!'],
  },
  upload: {
    type: String,
    required: [true, 'Yêu cầu nhập địa chỉ!'],
  },
  role: {
    type: String,
    enum: ['homeSell', 'homeRent', 'apartmentSell', 'apartmentRent',
      'groundSell', 'groundRent', 'landSell', 'landRent'],
    required: true,
  },
  city: {
    type: String,
    enum: ['HoChiMinh', 'DaLat', 'HaNoi'],
    required: true,
  },
  check: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('postblog', postblog);
