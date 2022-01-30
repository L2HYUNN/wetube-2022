const fakeUser = {
    userName: "Nicolas",
    loggedIn: true,
};

export const handleHome = (req, res) => {
    const videos = [
        {
            title: "videos #1",
            rating: 5,
            comments:2,
            createdAt: "2 minutes ago",
            views: 59,
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
    return res.render("home", {pageTitle: "Home", fakeUser, videos});
};

export const handleSearch = (req, res) => {
    return res.send("Search");
};

export const handleWatch = (req, res) => {
    const id = req.params.id; 
    
    if ( isNaN(+id) === false ) {
        return res.render("watch", {pageTitle: "Watch"});
    } else {
        console.log("Wrong Address: Please write right number");
        return res.redirect("/");
    }
    
};

export const handleEdit = (req, res) => {
    return res.render("edit", {pageTitle: "Edit"});
};

export const handleDelete = (req, res) => {
    console.log(req.params);
    return res.send("Delete");
};

export const handleUpload = (req, res) => {
    return res.send("Upload");
};


