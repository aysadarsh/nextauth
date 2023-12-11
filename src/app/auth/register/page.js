"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const route = useRouter();

    const [error,setError] = useState(null);

    async function register(e) {
        e.preventDefault();

        setError(null);

        const formData = Object.fromEntries(await new FormData(e.currentTarget));

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" }
        })
        
        
        // console.log( await res.json(), 'response')

        if (res.ok) {

            let user = await res.json();
            
            route.refresh();
            route.push("/dashboard");
        }

        if(res.ok === false)
        {
            let err = await res.json();
            setError(err.error);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-lg p-4 px-6">
                <div className="text-2xl text-semibold mb-4">Register</div>
                {error !== null && <div className="text-red-500 p-2 px-0 rounded-md mb-4 text-sm">{error}</div>}
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