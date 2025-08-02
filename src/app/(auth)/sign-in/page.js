'use client'
import { signIn } from "next-auth/react";
import { Button } from "../../../components/ui/button";


export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}