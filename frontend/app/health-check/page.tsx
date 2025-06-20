"use client"

import QuestionnaireForm from "./QuestionnaireForm"
import { useTranslation } from "react-i18next"

export default function HealthCheckPage() {
  const { t } = useTranslation()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">{t("health-check-title")}</h1>
      <QuestionnaireForm />
    </main>
  )
}
