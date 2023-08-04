const Posts = require("../models/posts.model");

const addPostsService = async (post) => {
  const newPost = await Posts.create(post);
  return newPost;
};
const getPostsService = async () => {
  const posts = await Posts.find().sort({ date: -1 });
  return posts;
};

module.exports = {
  addPostsService,
  getPostsService,
};
