import { lazy } from "react";
import { Route, Routes } from "react-router"
import { ErrorPage } from "./components/commons/error-page.tsx";
import AuthenticatedRoute from './modules/auth/components/context/authenticated-route.tsx'
import GuestRoute from "./modules/auth/components/context/guest-route.tsx";
import UserManagement from "./modules/users-management/pages/users-management-page.tsx";
import EmployeeData from "./modules/employee-data/pages/employee-data-pages.tsx";

const AuthLayout = lazy(() => import('./components/layouts/auth/auth-layout.tsx'));
const PanelLayout = lazy(() => import('./components/layouts/panel/panel-layout.tsx'));
const LoginPage = lazy(() => import('./modules/auth/pages/login-page.tsx'));
const RegisterPage = lazy(() => import('./modules/auth/pages/register-page.tsx'));
const ForgotPasswordPage = lazy(() => import('./modules/auth/pages/forgot-password-page.tsx'));
const ResetPasswordPage = lazy(() => import('./modules/auth/pages/reset-password-page.tsx'));
const AuthProfilePage = lazy(() => import('./modules/auth/pages/auth-profile-page.tsx'));
const DashboardPage = lazy(() => import('./modules/dashboard/pages/dashboard-page.tsx'));
const UserIndexPage = lazy(() => import('./modules/users/pages/user-index-page.tsx'));
const UserCreatePage = lazy(() => import('./modules/users/pages/user-create-page.tsx'));
const UserEditPage = lazy(() => import('./modules/users/pages/user-edit-page.tsx'));

export default function AppRoutes() {
    return <>
        <Routes>
            <Route element={<GuestRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                </Route>
            </Route>
            <Route element={<AuthenticatedRoute />}>
                <Route element={<PanelLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="employee" element={<EmployeeData />} />
                    <Route path="me" element={<AuthProfilePage />} />
                    <Route path="settings">
                        <Route path="users" element={<UserIndexPage />} />
                        <Route path="users/create" element={<UserCreatePage />} />
                        <Route path="users/:userId/edit" element={<UserEditPage />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Route>
        </Routes>
    </>
}