const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = Schema.objectId;

const LineSchema = new Schema({
  uniqId: { type: Number, required: true, unique: true },
  Pickupline: { type: String, required: true },
  date: { type: Date },
});

const LinesDB = mongoose.model("LiesDB", LineSchema);

const IdgenSchema = new Schema({
  idname: { type: String },
  seq: { type: Number },
});
const IdgenDB = mongoose.model("IdgenDB", IdgenSchema);

module.exports = { LinesDB, IdgenDB };
