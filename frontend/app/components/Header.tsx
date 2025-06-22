"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-80">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16"
              />
              <h1 className="text-lg sm:text-xl font-bold truncate">
                {isSmallScreen ? t("app-title-short") : t("app-title")}
              </h1>
            </Link>

            {/* Health Checks and Contact links only on md+ */}
            <Link
              href="/health-checks"
              className="hidden md:inline-block text-gray-700 hover:text-green-700 text-base px-3 py-2 rounded-md"
            >
              {t("health-checks")}
            </Link>
            <Link
              href="/contact"
              className="hidden md:inline-block text-gray-700 hover:text-green-700 text-base px-3 py-2 rounded-md"
            >
              {t("contact-title")}
            </Link>
          </div>

          {/* Desktop auth and language controls */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-green-700 hover:text-white transition-colors">
                  {t("sign-up")}
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-green-700 hover:text-white transition-colors">
                  {t("login")}
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <select
              value={lang}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1 text-sm bg-white"
            >
              <option value="en-GB">EN</option>
              <option value="fi-FI">FI</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <select
              value={lang}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1 text-xs bg-white"
            >
              <option value="en-GB">EN</option>
              <option value="fi-FI">FI</option>
            </select>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link
              href="/health-checks"
              className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("health-checks")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact-title")}
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <SignedOut>
                <div className="space-y-2">
                  <SignUpButton mode="modal">
                    <button
                      className="w-full text-left border border-gray-300 rounded px-3 py-2 text-sm hover:bg-green-700 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("sign-up")}
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button
                      className="w-full text-left border border-gray-300 rounded px-3 py-2 text-sm hover:bg-green-700 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("login")}
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center px-3 py-2">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
