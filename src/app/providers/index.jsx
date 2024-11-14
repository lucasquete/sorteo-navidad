"use client"

import { useState, createContext, useEffect, useContext } from "react";


export const AdminContext = createContext(null);

export default function AdminProvider({children}) {
    const [admin, setAdmin] = useState("");

    useEffect(() => {
        const local = window.localStorage.getItem("admin");
        setAdmin(local ? local : "")
    }, []);

    return (
        <AdminContext.Provider value={{admin, setAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdminContext() {
    const context = useContext(AdminContext);

    if (!context) {
        throw new Error("Must be used inside Admin provider")
    }

    return context;
}