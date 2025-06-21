"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type HealthCheckDetail = {
  _id: string;
  submittedAt: string;
  age: number;
  height: number;
  weight: number;
  exercise: string;
  smoking: string;
  stress: string;
  bmi: number | null;
  riskScore: number;
  recommendation: string | null;
};

export default function HealthCheckResultPage() {
  const { id } = useParams(); // from URL /health-checks/[id]
  const [check, setCheck] = useState<HealthCheckDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function fetchCheck() {
      setLoading(true);
      try {
        const res = await fetch(`/api/health-check?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch health check");
        const data = await res.json();
        setCheck(data);
      } catch (error) {
        console.error(error);
        alert(t("failed-to-load-check"));
        router.back();
      } finally {
        setLoading(false);
      }
    }

    fetchCheck();
  }, [id, t, router]);

  if (loading) return <p>{t("loading")}...</p>;
  if (!check) return <p>{t("no-data")}</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">{t("health-check-result")}</h1>

      <p>
        <strong>{t("date")}:</strong>{" "}
        {new Date(check.submittedAt).toLocaleDateString()}
      </p>

      <p>
        <strong>{t("age")}:</strong> {check.age}
      </p>
      <p>
        <strong>{t("height")}:</strong> {check.height} cm
      </p>
      <p>
        <strong>{t("weight")}:</strong> {check.weight} kg
      </p>
      <p>
        <strong>{t("exercise")}:</strong> {t(`exercise-${check.exercise}`)}
      </p>
      <p>
        <strong>{t("smoking")}:</strong> {t(check.smoking)}
      </p>
      <p>
        <strong>{t("stress")}:</strong> {t(check.stress)}
      </p>

      <p>
        <strong>{t("bmi")}:</strong> {check.bmi ?? t("not-available")}
      </p>
      <p>
        <strong>{t("risk-score")}:</strong> {check.riskScore} / 3
      </p>

      {check.recommendation && (
        <p className="mt-4 font-semibold text-green-700">{check.recommendation}</p>
      )}

      <button
        className="mt-8 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        onClick={() => router.back()}
      >
        {t("back")}
      </button>
    </main>
  );
}
