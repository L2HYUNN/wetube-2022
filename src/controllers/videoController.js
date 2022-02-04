import Video from "../models/Video";

export const handleHome = async(req, res) => {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", {pageTitle: "Home", videos});
};

export const handleSearch = (req, res) => {
    return res.send("Search");
};

export const handleWatch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video});
};
    

export const handleEdit = (req, res) => {
    const { id } = req.params; 
    const video = videos[id - 1];
    
    if ( isNaN(+id) === false && video !== undefined ) {
        return res.render("edit", {pageTitle: `Editing: ${video.title}`, video, fakeUser});
    } else {
        console.log("Wrong Address: Please check right number");
        return res.redirect("/");
    }
};

export const handlePostEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id -1].title = title;
    return res.redirect(`/videos/${id}`);
}

export const handleDelete = (req, res) => {
    console.log(req.params);
    return res.send("Delete");
};

export const handleUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload New Video!"});
};

export const handlepostUpload = async(req, res) => {
    const { title, description, rating, hashtags } = req.body;
    const arrayHashtags = hashtags.split(",");
    const hashtagsRe = arrayHashtags.map( (hash) => hash.trim().startsWith("#") ? hash.trim() : `#${hash.trim()}`);
    try {
        await Video.create({
            title,
            description,
            hashtags: hashtagsRe,
        });
    } catch(e) {
        return res.render("upload", 
            { 
                pageTitle: "Upload New Video!", 
                error: e._message, 
            }
        );
    }
    return res.redirect(`/`);
}


