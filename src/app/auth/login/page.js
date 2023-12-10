"use client";

import { signIn } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const [error, setError] = useState(null);
    const router = useRouter();

    async function login(e) {
        e.preventDefault();

        const { email, password } = Object.fromEntries(await new FormData(e.currentTarget));

        const callbackurl = "/profile";

        const res = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            callbackurl,
        });

        setError(null);

        if(res.ok )
        {
            router.refresh();
            router.push("/dashboard")

        }
        
        
        if(res.error && res.ok === false)
        {
            setError(res.error);
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-lg p-4 px-6">
                <div className="text-2xl text-semibold mb-4">Login</div>
                {error !== null && <div className="text-red-500 p-2 px-0 rounded-md mb-4 text-sm">{error}</div>}
                <form onSubmit={login} method="POST">
                    <label>Email</label>
                    <div className="mb-4">
                        <input type="text" name="email" className="border border-gray-200 rounded-md p-1" />
                    </div>
                    <label>Password</label>
                    <div className="mb-4">
                        <input type="text" name="password" className="border border-gray-200 rounded-md p-1" />
                    </div>
                    <button className="bg-blue-500 p-3 px-5 w-full mb-4 text-white rounded-md">Login</button>
                </form>
            </div>
        </div>

    );
} 