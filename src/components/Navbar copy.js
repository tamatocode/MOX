"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 transition-all duration-300 w-full border-none ${
        isScrolled
          ? "bg-black/50 backdrop-blur-sm shadow-sm border-none"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20 sm:h-16 md:h-18 lg:h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-white object-contain"
              >
                <img src="./logo_hor_transparent.png" alt="recurx" className=" h-18" />
              </motion.span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center flex-1 mx-4 xl:mx-8">
            <div className="bg-[#1f1c2f] rounded-full px-4 xl:px-6 py-2 shadow-lg">
              <nav className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                {/* <NavLink href="/airdrop" className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 ">Airdrop</NavLink> */}
                <NavLink
                  href="/product"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Product
                </NavLink>
                <NavLink
                  href="/news"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  News
                </NavLink>
                <NavLink
                  href="/airdrop"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Airdrop
                </NavLink>
                <NavLink
                  href="/pricing"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Pricing
                </NavLink>
                <NavLink
                  href="/career"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Career
                </NavLink>
                <NavLink
                  href="/team"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  About us
                </NavLink>
                <NavLink
                  href="/contact-us"
                  className="text-white text-sm xl:text-base transition-transform duration-200 ease-in-out hover:scale-110 "
                >
                  Contact us
                </NavLink>
              </nav>
            </div>
          </div>

          {/* Medium screens navigation */}
          <div className="hidden md:flex lg:hidden md:items-center md:justify-center flex-1 mx-2">
            <div className="bg-[#1f1c2f] rounded-full px-3 py-2 shadow-lg">
              <nav className="flex items-center space-x-3">
                {/* <NavLink href="/airdrop" className="text-white text-xs">Airdrop</NavLink> */}
                <NavLink href="/product" className="text-white text-xs">
                  Product
                </NavLink>
                <NavLink href="/pricing" className="text-white text-xs">
                  Pricing
                </NavLink>
                <NavLink href="/career" className="text-white text-xs">
                  Career
                </NavLink>
                <NavLink href="/team" className="text-white text-xs">
                  About
                </NavLink>
                <NavLink href="/contact-us" className="text-white text-xs">
                  Contact
                </NavLink>
              </nav>
            </div>
          </div>

          {/* Right: Waitlist Button */}
          <div className="hidden md:flex flex-shrink-0">
            <Button
              asChild
              className="text-white  hover:scale-110 text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 py-1 md:py-2 bg-[linear-gradient(top_bottom,_#FFFFFF,_#8B8B8B)] border-1 border-white "
            >
              <Link href="/signin">Request Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 h-8 w-8 sm:h-10 sm:w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-800 backdrop-blur-lg"
        >
          <div className="px-3 sm:px-4 py-4 flex flex-col space-y-3 sm:space-y-4 font-medium min-h-screen bg-black/90">
            {/* <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} href="/airdrop">
              Airdrop
            </MobileNavLink> */}
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/product"
            >
              Product
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/pricing"
            >
              Pricing
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/career"
            >
              Career
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/team"
            >
              About us
            </MobileNavLink>
            <MobileNavLink
              onClick={() => setIsMobileMenuOpen(false)}
              href="/contact-us"
            >
              Contact us
            </MobileNavLink>

            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              <Button
                asChild
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base"
              >
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Go for demo
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLink({ href, children, className }) {
  return (
    <Link
      href={href}
      className={`${className} hover:text-white transition-colors duration-200 whitespace-nowrap`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3 sm:py-4 text-gray-300 hover:text-white transition-colors duration-200 text-base sm:text-lg border-b border-gray-800/50 last:border-b-0"
    >
      {children}
    </Link>
  );
}
