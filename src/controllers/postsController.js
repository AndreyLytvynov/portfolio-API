const {
  getPostsService,
  addPostsService,
} = require("../services/postsService");

const addPosts = async (req, res) => {
  const data = await addPostsService(req.body);
  res.status(200).json({ status: `Successfully!`, data });
};

const getPosts = async (req, res) => {
  const data = await getPostsService();
  res.status(200).send({ status: `Successfully!`, data });
};

module.exports = {
  addPosts,
  getPosts,
};
