import bcrypt from "bcrypt";
import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => hashtags.split(",").map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: false },
  avatarUrl: { type: String, default: null },
  githubId: { type: Number },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: false },
  password: { type: String },
  name: { type: String, required: true, unique: false },
  location: String,
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// videoSchema.static('formatHashtags', function(hashtags) {
// return hashtags.split(",").map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );
// })

// videoSchema.pre('save', async function(){
//     this.hashtags = this.hashtags[0]
//     .split(",")
//     .map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );
// });

const User = mongoose.model("User", userSchema);

export default User;
