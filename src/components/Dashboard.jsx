'use client';

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
    const [cookie, ] = useCookies(['userAuth'])
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!cookie.userAuth && session.status != "authenticated")
            router.push('/login')
    }, [])

    return (
        <div>Hello World</div>
    )
}

export default Dashboard