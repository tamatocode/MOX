"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ShoppingBag, UserPlus, ExternalLink, HelpCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleRole = (role) => {
    if (role === "user") {
      Cookies.set("role", JSON.stringify("user"), { expires: 2 });
      return;
    }
  };

  useEffect(() => {
    setMounted(true);
    const ref = searchParams.get("ref");
    if (ref) {
      Cookies.set("ref", JSON.stringify(ref), { expires: 7 });
    }
  }, [router.query]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-white/30 to-purple-200/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_70%)]" />
        <div className="relative z-10 max-w-xl text-center md:text-left px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700">
              MAUX
            </span>
            <br />
            <span className="text-gray-700">
              Decentralized Payment Solution
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Secure, fast, and transparent payments on the Monad network.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border border-purple-200 bg-white">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-50 p-2 rounded-full border border-purple-200">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">
              MAUX Sign In
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access your merchant Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {error === "OAuthAccountNotLinked" && (
              <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                This Google account is not linked to a MAUX account. Please
                use a different account or contact support.
              </p>
            )}
           
            <Button
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/dashboard",
                });
              }}
              className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all duration-200 hover:border-purple-300"
              variant="outline"
            >
              <Image
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Sign in as a Merchant
            </Button>
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                className="text-purple-600 cursor-pointer hover:text-purple-700 hover:underline inline-flex items-center gap-1 transition-colors duration-200"
                onClick={() => router.push("/signup")}
              >
                <UserPlus size={14} />
                Sign up
              </span>
            </div>
          </CardContent>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-center text-gray-500">
            By signing in, you agree to our
            <a
              href="/termsofservice"
              className="text-purple-600 hover:text-purple-700 hover:underline mx-1 inline-flex items-center transition-colors duration-200"
            >
              Terms of Service <ExternalLink size={10} className="ml-1" />
            </a>
            and
            <a
              href="/privacy-policy"
              className="text-purple-600 hover:text-purple-700 hover:underline mx-1 inline-flex items-center transition-colors duration-200"
            >
              Privacy Policy <ExternalLink size={10} className="ml-1" />
            </a>
          </div>
          <p className="mt-4 text-sm text-center text-gray-500 px-6 pb-6">
            Need help?{" "}
            <a
              href="/contact"
              className="text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center transition-colors duration-200"
            >
              Contact support <HelpCircle size={12} className="ml-1" />
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}