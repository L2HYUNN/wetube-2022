export const handleHome = (req, res) => {
    return res.render("home");
};

export const handleSearch = (req, res) => {
    return res.send("Search");
};

export const handleWatch = (req, res) => {
    const id = req.params.id; 
    
    if ( isNaN(+id) === false ) {
        return res.render("watch");
    } else {
        console.log("Wrong Address: Please write right number");
        return res.redirect("/");
    }
    
};

export const handleEdit = (req, res) => {
    return res.render("edit");
};

export const handleDelete = (req, res) => {
    console.log(req.params);
    return res.send("Delete");
};

export const handleUpload = (req, res) => {
    return res.send("Upload");
};


