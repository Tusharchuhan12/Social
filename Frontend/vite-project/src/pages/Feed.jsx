import React, { useEffect, useState } from "react";
import api from "../api/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/posts");
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-8 px-2">
            <CreatePost refresh={fetchPosts} />
            {loading ? (
                <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} refresh={fetchPosts} />
                ))
            )}
        </div>
    );
}
