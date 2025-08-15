import { Navigate, Outlet } from "react-router";
import { AuthLoader } from "../ui/auth-loader";
import { useAuth } from "./auth-context";

export default function AuthenticatedRoute() {
    const { loading, user, setUser } = useAuth();

    if (loading) {
        return <AuthLoader />
    }

    if(user){
        return <Outlet />
    } else {
        setUser(null)
        return <Navigate to="/login" replace/>
    }
};