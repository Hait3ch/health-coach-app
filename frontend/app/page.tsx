"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"

export default function LandingPage() {
  const { t } = useTranslation()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">{t("welcome-title")}</h1>
      <p className="mb-6 text-gray-700">{t("welcome-description")}</p>
      <Link href="/health-check">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          {t("start-health-check")}
        </button>
      </Link>
    </main>
  )
}
