"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoginForm } from "../ui/login-form";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginCardWidget({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <Card className={cn("")} {...props}>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center space-x-3 mb-4">
            <img src="../icons.svg" alt="Logo" className="w-6 h-6" />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              RS. PAMULANG
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
          <CardDescription className="text-muted-foreground text-sm text-balance">
            Log into an existing account.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm gap-2 flex flex-col">
            <Button className="w-full text-center shadow-sm bg-white hover:bg-gray-100 text-blue-500 font-medium">
              <FcGoogle className="me-2" /> Log in with Google
            </Button>
            <Button className="w-full text-center shadow-sm bg-white hover:bg-gray-100 text-blue-500 font-medium">
              <FaFacebook className="me-2" /> Log in with Facebook
            </Button>
            <div className="flex items-center mt-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
          <LoginForm className={cn("w-full", className)} />
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Don't have an account?{" "}
            <NavLink to="/register" className="underline underline-offset-4">
              Sign Up
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
