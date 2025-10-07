import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/auth/login", form);
            login(res.data.user, res.data.token);
            alert("Login successful!");
            navigate("/Feed");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Login
                    </button>
                </form>
                <p className="text-sm mt-2 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

