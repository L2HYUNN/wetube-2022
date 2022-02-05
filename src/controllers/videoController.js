import Video from "../models/Video";

export const handleHome = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "Home", videos});
};

export const handleSearch = (req, res) => {
    return res.send("Search");
};

export const handleWatch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    
    if( video === null) {
        return res.render("404", { pageTitle: "Video not found."});
    } else {
        return res.render("watch", { pageTitle: `Watching ${video.title}`, video});
    }
};
    

export const handleEdit = async(req, res) => {
    const { id } = req.params; 
    const video = await Video.findById(id);
    // need Regexp only letter and number? 
    
    if (!video) {
        return res.render("404", { pageTitle: "Video not found."});
    } else {
        return res.render("edit", { pageTitle: `Editing: ${video.title}`, video});
    }
};

export const handlePostEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.render("404", { pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags,
    });
    return res.redirect(`/videos/${id}`);
};

export const handleDelete = (req, res) => {
    console.log(req.params);
    return res.send("Delete");
};

export const handleUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload New Video!"});
};

export const handlePostUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags,
        });
        console.log("Hello");
        return res.redirect("/");
    } catch(e) {
        return res.render("upload", 
            { 
                pageTitle: "Upload New Video!", 
                error: e._message, 
            }
        );
    }
};


