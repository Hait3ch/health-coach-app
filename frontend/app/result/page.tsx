"use client";

import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ResultPage() {
  const t = useTranslation().t;
  const searchParams = useSearchParams();

  const bmi = searchParams.get("bmi");
  const riskScore = searchParams.get("riskScore");
  const recommendation = searchParams.get("recommendation");
  const age = searchParams.get("age");

  const getBmiCategoryKey = (bmiNum: number, ageNum: number) => {
    const upperNormal = ageNum >= 45 ? 24 : 25;
    if (bmiNum < 18.5) return t("bmi-underweight");
    if (bmiNum < upperNormal) return t("bmi-normal");
    if (bmiNum < 30) return t("bmi-overweight");
    return t("bmi-obese");
  };

  const bmiNum = bmi ? parseFloat(bmi) : null;
  const ageNum = age ? parseInt(age) : 0;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">{t("your-results")}</h1>

      {bmiNum !== null && ageNum > 0 && (
        <p>
          {t("your-bmi-is")} {bmiNum} — {getBmiCategoryKey(bmiNum, ageNum)}
        </p>
      )}

      {riskScore && (
        <p>
          {t("your-risk-score-is")} {riskScore} / 3
        </p>
      )}

      {recommendation && (
        <p className="mt-4 font-semibold text-green-700">{recommendation}</p>
      )}

      <button
        className="mt-8 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        onClick={() => window.history.back()}
      >
        {t("back")}
      </button>
    </main>
  );
}
