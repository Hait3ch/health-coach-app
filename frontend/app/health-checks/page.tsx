"use client"

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { useTranslation } from "react-i18next"

export default function HealthChecksPage() {
  const { t } = useTranslation()

  // For now, mock some health checks
  const mockChecks = [
    { id: 1, date: "2024-06-01", risk: "Low" },
    { id: 2, date: "2024-05-15", risk: "Moderate" },
  ]

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">{t("your-health-checks")}</h1>

          {mockChecks.length === 0 ? (
            <p className="text-gray-600">{t("no-health-checks")}</p>
          ) : (
            <ul className="space-y-3">
              {mockChecks.map((check) => (
                <li key={check.id} className="border p-4 rounded shadow-sm">
                  <p><strong>{t("date")}:</strong> {check.date}</p>
                  <p><strong>{t("risk-level")}:</strong> {check.risk}</p>
                </li>
              ))}
            </ul>
          )}

          <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {t("start-new-check")}
          </button>
        </div>
      </SignedIn>
    </>
  )
}
