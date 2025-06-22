"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4 animate-fadeInUp">{t("welcome-title")}</h1>
      <p className="mb-6 text-gray-700 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>{t("welcome-description")}</p>
      <Link href="/health-check">
        <button className="mb-10 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {t("start-health-check")}
        </button>
      </Link>
      <div className="mb-8 text-left animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-xl font-semibold mb-2">{t("what-is-app")}</h2>
        <p>{t("app-intro")}</p>

        <h2 className="text-xl font-semibold mt-4 mb-2">{t("features")}</h2>
        <ul className="list-disc list-inside mb-2">
          <li>{t("feature-questionnaire")}</li>
          <li>{t("feature-assessment")}</li>
          <li>{t("feature-recommendations")}</li>
          <li>{t("feature-tracking")}</li>
          <li>{t("feature-languages")}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">{t("try-it-out")}</h2>
        <p>
          {t("test-account-info")}
          <br />
          <strong>{t("test-email")}</strong> test_user@test.com
          <br />
          <strong>{t("test-password")}</strong> healthapp123?
        </p>
      </div>
    </main>
  );
}
