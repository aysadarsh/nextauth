"use client";

import { signIn } from "next-auth/react"

export default function Login(){

    async function login(e){
        e.preventDefault();

        const formData = new FormData(e.target);

        const callbackurl = "/profile"; 

        const res = await signIn("credentials",{
                redirect: false,
                username: formData.username,
                password: formData.password,
                callbackurl,
        });
    }

    return(
        <div>
            <form onSubmit={login} method="POST">
                <label>Username</label>
                <input type="text" name="username" />
                <label>Password</label>
                <input type="text" name="password" />
                <button>Login</button>
            </form>
        </div>
    );
} 