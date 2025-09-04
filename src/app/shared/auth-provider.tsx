'use client';
import { routes } from "@/config/routes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}


export function AuthProvider({children} : 
    AuthProviderProps){
    const router = useRouter();
    const pathname = usePathname();    

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if(!userData){
            router.push(routes.auth.signIn);
        }else if(pathname == "/"){
            router.push(routes.dashboard)
        }
        
    },[router]);

    // const userData = typeof window !== undefined  ? localStorage.getItem('userData') : null;
    // if(!userData) return null;

    return (
        <>
            {children}
        </>
    );
}