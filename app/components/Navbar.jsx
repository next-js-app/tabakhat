"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
          <div className="flex flex-col">
            <span className="font-cormorant leading-0.5 mt-4 text-3xl font-semibold text-white whitespace-nowrap tracking-wide">Tabakhat</span>
            <span className="text-xs ms-1 text-amber-300 mt-3 font-inter">Cook it. Love it. Share it.</span>
          </div>
        </Link>
        
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-300 rounded-lg md:hidden hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="w-5 h-5" />
        </button>

        <div 
          className={cn(
            "w-full md:block md:w-auto",
            isOpen ? "block" : "hidden"
          )} 
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-zinc-700 rounded-lg bg-zinc-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 px-3 text-zinc-300 rounded-sm hover:bg-zinc-700 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 transition-colors duration-200 font-inter"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
