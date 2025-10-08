import React, { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function CreatePost({ refresh }) {
    const { user } = useAuth();
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return alert("Text is required");

        try {
            await api.post("/api/posts", { text, image });
            setText("");
            setImage("");
            refresh();
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        }
    };

    if (!user)
        return (
            <p className="text-center text-gray-500 italic mt-10">
                Please <span className="text-blue-600 font-medium">login</span> to share your thoughts.
            </p>
        );

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 w-full max-w-lg mx-auto mb-6 transition-all hover:shadow-lg"
        >
            {/* User Info */}
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white font-semibold">
                    {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                <span className="ml-3 text-gray-800 font-semibold">{user?.username}</span>
            </div>

            {/* Post Text */}
            <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none mb-3"
                rows="3"
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* Image URL Input */}
            <input
                type="text"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none mb-3"
            />

            {/* Buttons */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform"
                >
                    Post
                </button>
            </div>
        </form>
    );
}
