"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

type HealthCheck = {
  _id: string;
  submittedAt: string;
  riskScore: number;
  recommendation: string | null;
};

export default function HealthChecksPage() {
  const { user } = useUser();
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    async function fetchChecks() {
      setLoading(true);
      try {
        const res = await fetch(`/api/health-check?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setChecks(data);
      } catch (error) {
        console.error(error);
        setChecks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchChecks();
  }, [user]);

  if (!user) return null;

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">{t("your-health-checks")}</h1>

          {loading ? (
            <p>{t("loading")}...</p>
          ) : checks.length === 0 ? (
            <p className="text-gray-600">{t("no-health-checks")}</p>
          ) : (
            <ul className="space-y-3">
              {checks.map((check) => (
                <li
                  key={check._id}
                  className="border p-4 rounded shadow-sm"
                >
                  <p>
                    <strong>{t("date")}:</strong>{" "}
                    {new Date(check.submittedAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{t("risk-score")}:</strong> {check.riskScore}
                  </p>
                  {check.recommendation && (
                    <p>
                      <strong>{t("recommendation")}:</strong>{" "}
                      {check.recommendation}
                    </p>
                  )}
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
  );
}
