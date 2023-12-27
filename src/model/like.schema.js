const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const likeSchema = new Schema(
  {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    onModel: {
      type: String,
      enum: ["Tweet", "Retweet"],
      required: true,
    },
    model: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
      required: true,
      unique: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
