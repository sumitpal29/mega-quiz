const mongoose = require("mongoose");
const _toLower = require("lodash/toLower");
const _includes = require("lodash/includes");

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true, minlength: 4,},
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(val) {
        if (_includes(_toLower(val), "password")) {
          throw new Error("Password must not contain 'password' string!!");
        }
      },
    },
  },
  {
    collection: "admins",
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
