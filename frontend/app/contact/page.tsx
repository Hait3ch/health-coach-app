"use client";

import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">{t("contact-title")}</h1>
      <p className="mb-4 text-gray-700">{t("contact-description")}</p>

      <div>
        <a
          href="https://www.linkedin.com/in/haiphanfin/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          {t("contact-linkedin")}
        </a>
        <div className="mt-8">
          <p className="mb-4 text-gray-700">{t("contact-github-text")}</p>
          <a
            href="https://github.com/Hait3ch/health-coach-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 transition"
          >
            {t("contact-github-button")}
          </a>
        </div>
      </div>
    </main>
  );
}
