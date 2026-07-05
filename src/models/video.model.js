import mongoose, { Schema } from "mongoose";
import mongooseAgrregatePaginate from "mongoose-paginate-v2";
const videoSchema = new Schema(
  {
    VideoFile: {
      type: string,
      required: true,
    },
    thumbnail: {
      type: string,
      required: true,
    },
    title: {
      type: string,
      required: true,
    },
    description: {
      type: string,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
videoSchema.plugin(mongooseAgrregatePaginate);
export const Video = mongoose.model("video", videoSchema);
