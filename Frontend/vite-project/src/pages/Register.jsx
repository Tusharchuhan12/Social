import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/register", form);
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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
                    <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Register
                    </button>
                </form>
                <p className="text-sm mt-2 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

