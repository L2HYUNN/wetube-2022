import User from "../models/User";
import bcrypt from "bcrypt";

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
    try {
        await User.create({
            name,
            email,
            username,
            password: password2,
            location
        });
        return res.redirect("/login")
    } catch(e) {
        return res.status(400).render("join", 
        { 
            pageTitle: "Join", 
            error: e._message, 
        }
    );
    }
    
}

export const handleLogin = (req, res) => {
    return res.render("login",  {pageTitle: "Login" });
};

export const handlePostLogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.find({ email });
    const exists = await User.exists({ email });
    const hashPassword = await bcrypt.hash(password, 5);

    if(!exists) {
        return res.status(400).render("login",  {pageTitle: "Login", errorMessage: "Not exists user" });
    }

    if( user.password !== hashPassword ) {
        return res.status(400).render("login",  {pageTitle: "Login", errorMessage: "Password is Wrong" });
    }
    
    console.log("Login Sucess ✅")
    return res.redirect("/")
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