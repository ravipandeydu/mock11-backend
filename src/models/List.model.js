const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, require: true },
    quantity: { type: Number, require: true },
    priority: { type: Number, require: true },
    desc: { type: String, require: true },
    bookmark: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ListModel = mongoose.model("list", listSchema);

module.exports = {
  ListModel,
};
