const Post = require("../models/post-model");

exports.createPost = async (req) => {
  const post = new Post(req.body);
  await post.create();
  return { statusCode: 201, data: post };
};

exports.updatePost = async (req) => {
  const { postId } = req.params;
  const payload = req.body;
  await Post.update(postId, payload);
  const updatedPost = await Post.getById(postId);
  return { statusCode: 200, data: updatedPost };
};

exports.deletePost = async (req) => {
  const { postId } = req.params;
  await Post.destroy(postId);
  return { statusCode: 204, data: {} };
};

exports.getPosts = async () => {
  const posts = await Post.getAll();
  return { statusCode: 200, data: posts };
};

exports.getPost = async (req) => {
  const { postId } = req.params;
  const post = await Post.getById(postId);
  return { statusCode: 200, data: post };
};
