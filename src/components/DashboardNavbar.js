"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardNavbar() {
  const { data: session } = useSession();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-transparent   shadow-sm sticky top-0 z-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-6 py-4 flex justify-between items-center max-w-[calc(100vw-16rem)] lg:max-w-full">
        <h1 className="text-lg sm:text-xl font-semibold text-white">RecurX Dashboard</h1>
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  className="flex items-center bg-gray-200 space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-white hidden sm:inline">{session.user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem className="hover:bg-gray-700">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.header>
  );
}