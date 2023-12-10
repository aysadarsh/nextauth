"use client";

import { signIn } from "next-auth/react"

export default function Login() {

    async function register(e) {
        e.preventDefault();

        const formData = Object.fromEntries(await new FormData(e.currentTarget));

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" }
        })

        if (res.ok && user) {
            redirect('/dashboard');
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-lg p-4 px-6">
                <div className="text-2xl text-semibold mb-4">Register</div>
                <form onSubmit={register} method="POST">
                    <label className="block mb-1">Name</label>
                    <div className="mb-4">
                        <input type="text" className="border border-gray-200 rounded-md p-1" name="name" />
                    </div>
                    <label className="block mb-1">Email</label>
                    <div className="mb-4">
                        <input type="email" className="border border-gray-200 rounded-md p-1" name="email" />
                    </div>
                    <label className="block mb-1">Password</label>
                    <div className="mb-6">
                        <input type="text" name="password" className="border border-gray-200 rounded-md p-1" />
                    </div>
                    <button className="bg-blue-500 p-3 px-5 w-full mb-4 text-white rounded-md">Register</button>
                </form>
            </div>
        </div>
    );
} 