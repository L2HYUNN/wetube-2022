import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => hashtags.split(",").map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}` );


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },

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