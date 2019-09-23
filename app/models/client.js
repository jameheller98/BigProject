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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('postblog', postblog);
