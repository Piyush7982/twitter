const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hashtagSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    onModel: {
      type: String,
      enum: ["Tweet", "Retweet"],
      required: true,
    },
    Model: [
      {
        type: Schema.Types.ObjectId,
        refPath: "onModel",
        required: true,
      },
    ],

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const Hashtag = mongoose.model("Hashtag", hashtagSchema);
module.exports = Hashtag;
