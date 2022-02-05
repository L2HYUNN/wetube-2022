import User from "../models/User"

export const handleJoin = (req, res) => {
    return res.render("join", {pageTitle: "Join" });
};

export const handlePostJoin = async(req, res) => {
    const { name, email, username, password, location } = req.body;
    await User.create({
        name,
        email,
        username,
        password,
        location
    });

    return res.redirect("/login")
}

export const handleLogin = (req, res) => {
    return res.send("Login");
};

export const handleLogout = (req, res) => {
    return res.send("Logout");
};

export const handleEdit = (req, res) => { 
    return res.send("Edit");
};

export const handleDelete = (req, res) => { 
    return res.send("Delete");
};

export const handleId = (req, res) => {
    return res.send("Id");
};