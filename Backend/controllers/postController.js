import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    const { text, image } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });
    const post = await Post.create({ author: req.user._id, text, image });
    res.status(201).json(post);
};

export const getPosts = async (req, res) => {
    const posts = await Post.find().populate("author", "username email").populate("comments.user", "username").sort({ createdAt: -1 });
    res.json(posts);
};

export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
};

export const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: "Not allowed" });

    const { text, image } = req.body;
    if (text) post.text = text;
    if (image) post.image = image;
    await post.save();
    res.json(post);
};

export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: "Not allowed" });
    await post.remove();
    res.json({ message: "Post deleted" });
};

export const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const already = post.likes.some(l => l.equals(req.user._id));
    if (already) post.likes = post.likes.filter(l => !l.equals(req.user._id));
    else post.likes.push(req.user._id);
    await post.save();
    res.json({ likesCount: post.likes.length, liked: !already });
};

export const addComment = async (req, res) => {
    const { text } = req.body;
    console.log(text)
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user._id, text });
    await post.save();

    const populated = await Post.findById(post._id)
        .populate("comments.user", "username")
        .select("comments");

    res.status(201).json(populated.comments);
};
