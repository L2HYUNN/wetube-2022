const fakeUser = {
    userName: "Nicolas",
    loggedIn: true,
};

let videos = [
    {
        title: "videos #1",
        rating: 5,
        comments:2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1 
    },
    {
        title: "videos #2",
        rating: 4,
        comments:5,
        createdAt: "23 minutes ago",
        views: 99,
        id: 2
    },
    {
        title: "videos #3",
        rating: 1,
        comments:0,
        createdAt: "4 minutes ago",
        views: 29,
        id: 3
    }
];


export const handleHome = (req, res) => {
    return res.render("home", {pageTitle: "Home", fakeUser, videos});
};

export const handleSearch = (req, res) => {
    return res.send("Search");
};

export const handleWatch = (req, res) => {
    const { id } = req.params; 
    const video = videos[id - 1];
    
    if ( isNaN(+id) === false && video !== undefined ) {
        return res.render("watch", {pageTitle: `Watching ${video.title}`, video, fakeUser});
    } else {
        console.log("Wrong Address: Please check right number");
        return res.redirect("/");
    }
    
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
    return res.send("Upload");
};


