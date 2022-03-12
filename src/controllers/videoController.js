import User from "../models/User";
import Video from "../models/Video";

export const handleHome = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const handleSearch = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("videos/search", { pageTitle: "Search Video", videos });
};

export const handleWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");

  if (video === null) {
    return res.render("404", { pageTitle: "Video not found." });
  } else {
    return res.render("videos/watch", {
      pageTitle: video.title,
      video,
    });
  }
};

export const handleEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const {
    session: {
      user: { _id: sessionUserId },
    },
  } = req;

  if (String(video.owner) !== String(sessionUserId)) {
    return res.status(403).render("404", { pageTitle: "Wrong Excess." });
  }
  // need Regexp only letter and number?

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  } else {
    return res.render("videos/edit-video", {
      pageTitle: `Editing: ${video.title}`,
      video,
    });
  }
};

export const handlePostEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    session: {
      user: { _id: sessionUserId },
    },
  } = req;

  const video = await Video.findById(id);

  if (String(video.owner) !== String(sessionUserId)) {
    return res.status(403).render("404", { pageTitle: "Wrong Excess." });
  }

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const handleDelete = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id: sessionUserId },
    },
  } = req;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  if (String(video.owner) !== String(sessionUserId)) {
    return res.status(403).render("404", { pageTitle: "Wrong Excess." });
  }

  await Video.findByIdAndDelete(id);

  const user = await User.findById(sessionUserId);
  const newVideos = user.videos.filter((videoId) => {
    return String(videoId) !== String(id);
  });
  user.videos = newVideos;
  await user.save();

  return res.redirect("/");
};

export const handleUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload New Video!" });
};

export const handlePostUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file: { path: videoUrl },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const newVideo = await Video.create({
      videoUrl,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (e) {
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload New Video!",
      error: e._message,
    });
  }
};
