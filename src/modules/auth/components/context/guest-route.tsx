"use client";

import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth-context";
import { AuthLoader } from "../ui/auth-loader";

export default function GuestRoute() {
    const { loading, user } = useAuth();
    if (loading) {
        return <AuthLoader />
    }
    return user != null ? <Navigate to="/" replace /> : <Outlet />;
}