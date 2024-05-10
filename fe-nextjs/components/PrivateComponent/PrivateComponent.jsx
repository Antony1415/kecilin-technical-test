'use client'
import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const UserContext = createContext()

const PrivateComponent = ({ children }) => {
    const router = useRouter();
    const pathName = usePathname();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const cookie = ('; ' + document.cookie).split(`; user=`).pop().split(';')[0];
        if (!cookie) {
            return router.push("/")
        }
        setUser(JSON.parse(cookie))
    }, [pathName])

    if (!user && pathName !== '/') {
        return
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default PrivateComponent