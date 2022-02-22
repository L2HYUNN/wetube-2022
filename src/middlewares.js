import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  if (res.locals.loggedIn) {
    res.locals.loggedInUser = req.session.user || {};
  }
  next();
};

export const protectorMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (!loggedIn) {
    return res.redirect("/login");
  }
  next();
};

export const publicOnlyMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    return res.redirect("/");
  }
  next();
};

export const protectorSocialLogin = (req, res, next) => {
  const {
    session: {
      user: { socialOnly },
    },
  } = req;
  if (socialOnly) {
    return res.redirect("/");
  }
  next();
};

export const uploadFiles = multer({
  dest: "uploads/",
});
