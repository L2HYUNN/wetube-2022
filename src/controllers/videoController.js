import Video from "../models/Video";

export const handleHome = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    });
  }
  return res.render("videos/search", { pageTitle: "Search Video", videos });
};

export const handleWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (video === null) {
    return res.render("404", { pageTitle: "Video not found." });
  } else {
    return res.render("videos/watch", {
      pageTitle: `Watching ${video.title}`,
      video,
    });
  }
};

export const handleEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
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
  const video = await Video.exists({ _id: id });
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
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const handleUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload New Video!" });
};

export const handlePostUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    file: { path: videoUrl },
  } = req;
  console.log(path);
  try {
    await Video.create({
      videoUrl,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (e) {
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload New Video!",
      error: e._message,
    });
  }
};
