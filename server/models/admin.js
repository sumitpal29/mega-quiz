const mongoose = require("mongoose");
const _toLower = require("lodash/toLower");
const _includes = require("lodash/includes");
const JWT = require('jsonwebtoken');

const OptionsSchema = new mongoose.Schema({
  label: { type: String },
  value: { type: String },
}, {
  timestamps: true,
});

const QuestionsSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  audioLink: { type: String },
  videoLink: { type: String },
  imageLink: { type: String },
  options: [OptionsSchema],
  question: { type: String, required: true },
}, {
  timestamps: true,
});

const GameRounds = new mongoose.Schema({
  answeredBy: { type: String },
  score: { type: Number },
  bonus: { type: Number },
  negetive: { type: Number },
  onAnswerSubmit: { type: String },
  onTimeOut: { type: String },
  questionAsked: { type: String },
  questionOccurance: { type: String },
  roundDirection: { type: Boolean },
  timeLimit: { type: Number },
  eliminationControl: { type: Boolean },
  eliminationCount: { type: Number },
  roundtype: { type: String },
  questions: [QuestionsSchema],
  roundname: { type: String }
}, {
  timestamps: true,
});

const GameParticipents = new mongoose.Schema({
  teamName: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true,
});

const GameSchema = new mongoose.Schema({
  gameId: { type: String, unique: true, required: true },
  gameName: { type: String, required: true, trim: true, minlength: 4, },
  gameRounds: [GameRounds],
  gameParticipents: [GameParticipents]
}, {
  timestamps: true,
});

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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    games: [GameSchema]
  },
  {
    collection: "admins",
    timestamps: true,
  }
);

AdminSchema.methods.generateAuthToken = async function () {
  const user = this;
  // data and secret key -> returns token
  const token = JWT.sign({ _id: user._id.toString(), username: user.username }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

AdminSchema.pre("save", async function (next) {
  // this should be a normal function thus we get access of the data is going to get saved
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  // next tells mongoose that this middleware is done doing tasks, go ahead
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;