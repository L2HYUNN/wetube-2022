import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const handleJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const handlePostJoin = async (req, res) => {
  const { name, email, username, password1, password2, location } = req.body;
  // const exists = await User.exists({ $or: [{username}, {email}] });
  const userNameExists = await User.exists({ username });
  if (userNameExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      userNameErrorMessage: "This username is already taken.",
    });
  }

  const emailNameExists = await User.exists({ email });
  if (emailNameExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      emailNameErrorMessage: "This email is already taken.",
    });
  }
  if (password1 !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      passwordErrorMessage: "Password does not match",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password: password2,
      location,
      githubId: "",
    });
    return res.redirect("/login");
  } catch (e) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      error: e._message,
    });
  }
};

export const handleLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const handlePostLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, socialOnly: false });

  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Not exists user",
    });
  }

  const passwordExists = await bcrypt.compare(password, user.password);

  if (!passwordExists) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Password is Wrong",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  console.log("Login Sucess ✅");
  return res.redirect("/");
};

export const handleStartGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const handleFinishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.login,
        email: emailObj.email,
        username: userData.login,
        password: "",
        location: userData.location,
        githubId: userData.id,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const handleLogout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const handleEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

const findExistingUser = async (condition) => {
  const exists = await User.exists(condition);
  if (exists) {
    const errorMessage = `Already Existing ${Object.keys(
      condition
    )[0].toUpperCase()}`;
    return errorMessage;
  }
};

export const handlePostEdit = async (req, res) => {
  const {
    body: { name, email, username, location },
    session: {
      user: {
        name: sessionName,
        email: sessionEmail,
        username: sessionUsername,
      },
    },
  } = req;

  let errorMessage = null;

  if (name !== sessionName) {
    errorMessage = await findExistingUser({ name });
  }
  if (email !== sessionEmail) {
    errorMessage = await findExistingUser({ email });
  }
  if (username !== sessionUsername) {
    errorMessage = await findExistingUser({ username });
  }

  if (errorMessage) {
    return res.render("users/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage,
    });
  } else {
    const updateUser = await User.findOneAndUpdate(
      email,
      {
        name,
        email,
        username,
        location,
      },
      { new: true }
    );

    req.session.user = updateUser;
    return res.redirect("/users/edit-profile");
  }

  // req.session.user = {
  //   ...req.session.user,
  //   name,
  //   email,
  //   username,
  //   location,
  // };
};

export const handleChangePassword = (req, res) => {
  const {
    session: {
      user: { socialOnly },
    },
  } = req;
  if (socialOnly) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const handlePostChangePassword = (req, res) => {
  return res.redirect("/users/my-profile");
};

export const handleId = (req, res) => {
  return res.send("Id");
};

export const handleDelete = (req, res) => {
  return res.send("Delete");
};
