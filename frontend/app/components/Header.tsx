"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Image src="/assets/logo.png" alt="Logo" width={64} height={64} className="h-16 w-16" />
        <h1 className="text-xl font-bold">{t("app-title")}</h1>
      </div>

      <nav className="space-x-6">
        <Link href="/health-checks" className="text-gray-700 hover:text-green-700">
          {t("health-checks")}
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link href="/signup" className="text-gray-700 hover:text-green-700">
          {t("sign-up")}
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-green-700">
          {t("login")}
        </Link>
        <select
          value={lang}
          onChange={handleLanguageChange}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="en-GB">EN</option>
          <option value="fi-FI">FI</option>
        </select>
      </div>
    </header>
  );
}
