"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 py-4 bg-white shadow-inner border-t mt-12 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p>
          &copy; {year} Hai Phan
        </p>
        <Link href="/consent" className="hover:text-green-700 underline">
          {t("consent-page")}
        </Link>
      </div>
    </footer>
  )
}
