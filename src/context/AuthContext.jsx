import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const isAuthenticated = !!localStorage.getItem("accessToken")

    const path = useLocation()
    const nav = useNavigate()

    useEffect(()=>{
        if(path.pathname != "/login" && path.pathname !== "/home" && path.pathname.indexOf("/detailproduk/") !== 0 && !isAuthenticated){
            nav("/login")
        }
    },[path])

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}