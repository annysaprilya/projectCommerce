import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const isAuthenticated = !!localStorage.getItem("accessToken")
    const storedUser = localStorage.getItem("user");
    const datauser = JSON.parse(storedUser);

    const path = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            // Jika tidak terautentikasi, alihkan ke halaman login, kecuali untuk halaman-halaman publik
            if (path.pathname !== "/login" &&
                path.pathname !== "/home" &&
                path.pathname !== "/register" &&
                path.pathname.indexOf("/detailproduk/") !== 0) {
                nav("/login");
            }
        } else if (datauser && datauser.role === "admin") {
            // Jika terautentikasi sebagai admin, periksa halaman yang diizinkan
            if (path.pathname !== "/admin" &&
                path.pathname !== "/admincategory" &&
                path.pathname !== "/admin/create" &&
                path.pathname !== "/admincategory/createcategory" &&
                path.pathname.indexOf("/admincategory/editcategory/") !== 0 &&
                path.pathname.indexOf("/admin/edit/") !== 0
            ) {
                nav("/admin"); // Alihkan ke /admin jika mencoba mengakses halaman lain
            }
        } else if (isAuthenticated && (!datauser || datauser.role !== "admin")){
            //jika terautentikasi dan bukan admin, alihkan ke home.
            if(path.pathname === "/admin" || path.pathname === "/edit" || path.pathname === "/create"){
                nav("/home")
            }
        }
    }, [path, isAuthenticated, datauser, nav]);

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

