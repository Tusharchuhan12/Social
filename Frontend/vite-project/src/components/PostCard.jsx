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
    <div className="bg-white rounded shadow p-4 mb-4 border">
      <div className="font-semibold mb-1 text-gray-800">
        {post.author?.username || "Unknown User"}
      </div>
      <p className="mb-2 text-gray-700">{post.text}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full h-64 object-cover rounded mb-2"
        />
      )}

      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <button
          onClick={handleLike}
          disabled={!user}
          className={`text-blue-500 ${!user && "opacity-50 cursor-not-allowed"}`}
        >
          👍 {post.likes?.length || 0} Likes
        </button>
        <span>{post.comments?.length || 0} Comments</span>
      </div>

      {user && (
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      )}

      <div className="mt-3 space-y-1">
        {post.comments?.map((c) => (
          <div key={c._id} className="text-sm text-gray-700">
            <b>{c.user?.username || "User"}:</b> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}
