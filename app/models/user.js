/* eslint max-len: ["error", { "ignoreRegExpLiterals": true,
"ignoreTemplateLiterals": true,
"ignoreStrings": true }]*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String, // Loại
    minlength: 1, // Số kí tự tối thiểu
    maxlength: [10, 'Trường "Tên" tối đa 10 kí tự'], // Số kí tự tối đa
    validate: {// Hàm xử lý lỗi tự chọn
      validator: function(v) {
        // Chỉ cho phép nhập chữ với quy luật chữ đầu Hoa các chữ sau thường
        // không được khoảng trắng
        return /^[A-Z][a-z]+$/.test(v);
      },
      // In tin nhắn nếu nhập sai yêu cầu trên
      message: (props) => `"${props.value}" không phải là tên(trường "Tên" phải được viết hoa chữ cái đầu)!`,
    },
    // In tin nhắn nếu không nhập vào Trường
    required: [true, 'Trường "Tên" không được để trống!'],
  },
  lastname: {
    type: String,
    minlength: 1,
    maxlength: [10, 'Trường "Họ" tối đa 10 kí tự'],
    validate: {
      validator: function(v) {
        return /^[A-Z][a-z]+$/.test(v);
      },
      message: (props) => `"${props.value}" không phải là họ(trường "Họ" phải được viết hoa chữ cái đầu)!`,
    },
    required: [true, 'Trường "Họ" không được để trống!'],
  },
  username: {
    type: String,
    minlength: [4, 'Trường "Tên tài khoản" phải có ít nhất 4 kí tự'],
    maxlength: [15, 'Trường "Tên tài khoản" tối đa 15 kí tự'],
    validate: {
      validator: function(v) {
        // Không được phép nhập tên là "admin" và các kí tự đặc biệt
        // Kí tự bắt đầu không được là số
        // không được khoảng trắng
        return !/^Admin|administrator|Administrator|admin|~|`|!|@|#|\$|%|\^|&|\*|\(|\)|-|\+|=|{|}|\[|\]|\||\\|:|"|'|;|<|>|,|\.|\/|\?|[0-9_][A-Za-z_]+$/.test(v);
      },
      message: (props) => `Không được đặt trường "Tên tài khoản" là
      "${props.value}"!`,
    },
    required: [true, 'Trường "Tên tài khoản" không được để trống!'],
  },
  password: {
    type: String,
    required: [true, 'Trường "Mật khẩu" không được để trống!'],
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: [50, 'Trường "Email" tối đa 50 kí tự'],
    validate: {
      validator: function(v) {
        // Kiểm tra email phải có @ và không được viết liền kề 2 dấu ".."
        // không được khoảng trắng
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `"${props.value}" không phải là một Email!`,
    },
    required: [true, 'Trường "Email" không được để trống!'],
  },
  numberphone: {
    type: Number,
    validate: {
      validator: function(v) {
        // Kiểm tra email phải có @ và không được viết liền kề 2 dấu ".."
        // không được khoảng trắng
        return /^\d{10}$/.test(v);
      },
      message: 'Trường "Số điện thoại" phải đủ 10 số',
    },
    required: [true, 'Trường "Số điện thoại" không được để trống!'],
  },
  address: {
    type: String,
    required: [true, 'Trường "Địa chỉ" không được để trống!'],
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
