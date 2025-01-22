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
import { signIn } from "@/services/user.client";
import { Github } from "lucide-react";

export default function LoginPage() {
  // TODO ADD LOADING STATE
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Edmod</CardTitle>
          <CardDescription>
            Sign in to start your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              <Google />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("github")}
            >
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
