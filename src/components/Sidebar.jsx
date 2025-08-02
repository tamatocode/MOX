"use client";
import { NavLink } from "./ui/nav-link";
import { useState } from "react";
// import { useTheme } from "../context/themeContext";

export default function Sidebar() {
  // const { themeClasses } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const links = [
    { name: "Dashboard", href: "/dashboard", disabled: false },
    {
      name: "Payments",
      href: "/dashboard/wallet-tokens",
      disabled: false,
    },
    {
      name: "Subscription Management",
      href: "/dashboard/subscription-management",
      disabled: false,
    },
    {
      name: "Payment Management",
      href: "/dashboard/payment-management",
      disabled: false,
    },
    {
      name: "API Integration",
      href: "/dashboard/api-integration",
      disabled: false,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          lg:hidden fixed top-6 left-6 z-50 
          p-3 rounded-xl shadow-md transition-all duration-200
    
          hover:shadow-lg
        `}
        aria-label="Toggle navigation menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-40 h-screen
         
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-200/10">
          <h1 className={`text-3xl font-semibold  tracking-tight`}>
            MAUX
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {links.map((link) => (
            <div key={link.name}>
              {link?.children ? (
                <div>
                  <button
                    onClick={() => setShowSettingsDropdown(prev => !prev)}
                    disabled={link.disabled}
                    className={`
                      w-full flex items-center justify-between
                      px-4 py-3 rounded-lg text-left font-medium
                      transition-all duration-200
                      ${link.disabled
                        
                      }
                    `}
                  >
                    <span>Settings</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${showSettingsDropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showSettingsDropdown && (
                    <div className="mt-1 ml-4 space-y-1">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.href}
                          href={child.href}
                          disabled={child.disabled}
                          className={`
                            block px-4 py-2 text-sm rounded-md
                            transition-colors duration-200
                            ${child.disabled
                              ? `${themeClasses.textMuted} cursor-not-allowed opacity-50`
                              : `${themeClasses.textAccent} hover:${themeClasses.hoverBackground}`
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  href={link.href}
                  disabled={link.disabled}
                  className={`
                    flex items-center px-4 py-3 rounded-lg
                    font-medium transition-all duration-200
                    
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}