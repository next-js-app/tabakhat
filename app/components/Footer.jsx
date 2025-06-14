import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-t border-zinc-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-12 border-b border-zinc-700">
        <div className="space-y-4 text-center md:text-left">
          <Link href="/" className="inline-flex items-center space-x-3">
            <img src="/images/logo.png" className="h-10" alt="Logo" />
            <span className="font-cormorant text-2xl font-bold text-white tracking-wide">Tabakhat</span>
          </Link>
          <p className="text-zinc-400 text-sm font-inter">
            Discover authentic and easy-to-follow recipes to delight your taste buds.
          </p>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white font-cormorant">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-zinc-300 hover:text-white transition-colors duration-200 font-inter"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white font-cormorant">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-zinc-400 text-sm py-6 font-inter">
        &copy; {currentYear} Tabakhat. All rights reserved.
      </div>
    </footer>
  );
}