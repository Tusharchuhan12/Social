import React, { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function PostCard({ post, refresh }) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await api.post(`/api/posts/${post._id}/like`);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Error liking post");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api.post(`/api/posts/${post._id}/comment`, { text: comment });
      setComment("");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 mb-6 p-5 max-w-lg mx-auto">
      {/* Author Info */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white font-semibold">
          {post.author?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-800">
            {post.author?.username || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Text */}
      <p className="text-gray-800 mb-3 text-sm leading-relaxed">{post.text}</p>

      {/* Image */}
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-3">
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover max-h-[400px] hover:opacity-95 transition"
          />
        </div>
      )}

      {/* Likes & Comments */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
        <button
          onClick={handleLike}
          disabled={!user}
          className={`flex items-center gap-1 font-medium hover:text-blue-600 transition ${!user && "opacity-50 cursor-not-allowed"
            }`}
        >
          👍 <span>{post.likes?.length || 0}</span>
        </button>
        <span className="font-medium">
          💬 {post.comments?.length || 0} Comments
        </span>
      </div>

      {/* Add Comment */}
      {user && (
        <form
          onSubmit={handleComment}
          className="flex items-center gap-2 mt-2 border-t border-gray-200 pt-3"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      )}

      {/* Comments List */}
      <div className="mt-3 space-y-2">
        {post.comments?.map((c) => (
          <div
            key={c._id}
            className="bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-800"
          >
            <b className="text-gray-900">{c.user?.username || "User"}:</b>{" "}
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}
