"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ConsentPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{t("consent-page-title")}</h1>

      <section className="mb-6 space-y-4 text-gray-700">
        <p>{t("consent-intro")}</p>
        <p>{t("consent-personal-data")}</p>
        <p>{t("consent-cookie-policy")}</p>
        <p>{t("consent-rights")}</p>
        <p>{t("consent-contact")}</p>
      </section>

      <Link href="/">
        <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {t("back-to-home")}
        </button>{" "}
      </Link>
    </main>
  );
}
