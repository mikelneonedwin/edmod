"use client";

import { Google } from "@/components/svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLogin from "@/hooks/useLogin";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

export default function LoginPage() {
  // FIXME ADD A PLACE TO SHOW ERRORS TO THE USER
  const { error, isLoading, isSuccess, login } = useLogin();
  const disabled = isLoading || isSuccess;
  const idle = !disabled && !error;
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Edmod</CardTitle>
          <CardDescription className={cn(error && "text-red-500")}>
            {isLoading && "Please wait..."}
            {error}
            {isSuccess && "Welcome"}
            {idle && "Sign in to start your learning journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              disabled={disabled}
              aria-disabled={disabled}
              variant="outline"
              className="w-full"
              onClick={() => login("google")}
            >
              <Google />
              Continue with Google
            </Button>
            <Button
              disabled={disabled}
              aria-disabled={disabled}
              variant="outline"
              className="w-full"
              onClick={() => login("github")}
            >
              <Github />
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
