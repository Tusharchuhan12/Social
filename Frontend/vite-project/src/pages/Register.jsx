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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="border border-gray-300 bg-white p-10 w-96 rounded-lg shadow-sm">
                {/* Instagram style title */}
                <h1 className="text-4xl font-bold text-center mb-6 font-sans text-gray-800">
                    Postify
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-400 text-sm font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

              
            </div>

            <div className="border border-gray-300 bg-white mt-4 p-4 w-96 rounded-lg text-center text-sm">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-blue-500 font-medium cursor-pointer hover:underline"
                >
                    Log in
                </span>
            </div>

            <p className="text-xs text-gray-400 mt-5">© 2025 InstaClone from Tushar</p>
        </div>
    );
}
