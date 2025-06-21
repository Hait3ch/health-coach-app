"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";
import Link from "next/link";

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
                <li key={check._id} className="border p-4 rounded shadow-sm space-y-2">
                  <p>
                    <strong>{t("date")}:</strong> {new Date(check.submittedAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{t("risk-score")}:</strong> {check.riskScore}
                  </p>
                  {check.recommendation && (
                    <p>
                      <strong>{t("recommendation")}:</strong> {check.recommendation}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => {
                        // Navigate to result page for this check
                        window.location.href = `/health-checks/${check._id}`;
                      }}
                    >
                      {t("view-details")}
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={async () => {
                        if (
                          confirm(
                            t("are-you-sure-delete") ||
                              "Are you sure you want to delete this check?"
                          )
                        ) {
                          try {
                            const res = await fetch(`/api/health-check?id=${check._id}`, {
                              method: "DELETE",
                            });
                            if (res.ok) {
                              setChecks((prev) => prev.filter((c) => c._id !== check._id));
                            } else {
                              alert("Failed to delete");
                            }
                          } catch (err) {
                            console.error("Delete error", err);
                            alert("Error deleting");
                          }
                        }
                      }}
                    >
                      {t("delete")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link href="/health-check">
            <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {t("start-new-check")}
            </button>
          </Link>
        </div>
      </SignedIn>
    </>
  );
}
