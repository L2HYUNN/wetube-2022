import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImangeUploader = multerS3({
  s3: s3,
  bucket: "wetube-reloded-2022/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "wetube-reloded-2022/videos",
  acl: "public-read",
});

const isHeroku = process.env.NODE_ENV === "production";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  if (res.locals.loggedIn) {
    res.locals.loggedInUser = req.session.user || {};
  }
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (!loggedIn) {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
  next();
};

export const publicOnlyMiddleware = (req, res, next) => {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    req.flash("error", "Not authorized");
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

export const avatarUploadFiles = multer({
  dest: "uploads/avatars",
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3ImangeUploader : undefined,
});

export const videoUploadFiles = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 10000000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});

// export const s3DeleteAvatarMiddleware = (req, res, next) => {
//   if(!req.file) {
//     return next();
//   }
//   s3.deleteObject({
//     Bucket: "wetube-reloded-2022",

//   })
// }
