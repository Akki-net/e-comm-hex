"use client";
import React from 'react'
import { signIn, useSession } from "next-auth/react"

function Login() {
    const session = useSession();
    console.log(session);

    if(session.status == "loading")
        return <p>Loading...</p>

    if(session.status == "authenticated")
        return <p>user authenticated</p>

    if(session.status == "unauthenticated")
        return <p>user unauthenticated</p>

    return (
        <div>
            <button onClick={() => signIn("google")}>Login with google</button>
        </div>
    )
}

export default Login