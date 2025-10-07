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

    if (!user) return <p className="text-center text-gray-500">Login to create posts</p>;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow mb-4 border"
        >
            <textarea
                className="w-full border p-2 rounded mb-2"
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
            >
                Post
            </button>
        </form>
    );
}
