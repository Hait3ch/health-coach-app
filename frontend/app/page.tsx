"use client";

import Head from "next/head";
import { useTranslation } from "react-i18next";
import QuestionnaireForm from "./components/QuestionnaireForm";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app-title")}</title>
        <meta name="description" content={t("app-description")} />
      </Head>

      <QuestionnaireForm />
    </>
  );
}
