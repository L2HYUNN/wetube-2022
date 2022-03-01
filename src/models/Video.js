import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => hashtags.split(",").map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((hash) =>
      hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}`
    );
});

// videoSchema.pre('save', async function(){
//     this.hashtags = this.hashtags[0]
//     .split(",")
//     .map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );
// });

const Video = mongoose.model("Video", videoSchema);

export default Video;
