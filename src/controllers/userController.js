import User from "../models/User"

export const handleJoin = (req, res) => {
    return res.render("join", {pageTitle: "Join" });
};

export const handlePostJoin = async(req, res) => {
    const { name, email, username, password1, password2, location } = req.body;
    // const exists = await User.exists({ $or: [{username}, {email}] });
    const userNameExists = await User.exists({username});
    if(userNameExists) {
        return res.status(400).render("join", {pageTitle: "Join", userNameErrorMessage: "This username is already taken." });
    }

    const emailNameExists = await User.exists({email});
    if(emailNameExists) {
        return res.status(400).render("join", {pageTitle: "Join", emailNameErrorMessage: "This email is already taken." });
    }
    if(password1 !== password2) {
        return res.status(400).render("join", {pageTitle: "Join", passwordErrorMessage: "Password does not match" });
    }
    await User.create({
        name,
        email,
        username,
        password2,
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