const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
