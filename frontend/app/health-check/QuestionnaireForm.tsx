"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function QuestionnaireForm() {
  const { t } = useTranslation();

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [exercise, setExercise] = useState("");
  const [smoking, setSmoking] = useState("");
  const [stress, setStress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bmi, setBmi] = useState<number | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      return parseFloat(result.toFixed(2));
    }
    return null;
  };

  const getBmiCategoryKey = (bmi: number, ageNum: number) => {
    const upperNormal = ageNum >= 45 ? 24 : 25;
    if (bmi < 18.5) return "bmi-underweight";
    if (bmi < upperNormal) return "bmi-normal";
    if (bmi < 30) return "bmi-overweight";
    return "bmi-obese";
  };

  const calculateRiskScore = () => {
    let score = 0;
    if (exercise === "rarely" || exercise === "never") score += 1;
    if (stress === "yes") score += 1;
    if (smoking === "yes") score += 1;
    return score;
  };

  const getRecommendationKey = (risk: number, bmiCat: string) => {
    if (risk === 2 && (bmiCat === "bmi-overweight" || bmiCat === "bmi-obese"))
      return "recommendation-high-risk";
    if (risk >= 1) return "recommendation-moderate-risk";
    return "recommendation-low-risk";
  };

  const isFormChanged =
    age !== "" ||
    height !== "" ||
    weight !== "" ||
    exercise !== "" ||
    smoking !== "" ||
    stress !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const ageNum = parseInt(age);
    const calculatedBmi = calculateBMI();
    setBmi(calculatedBmi);

    const risk = calculateRiskScore();
    setRiskScore(risk);

    let recKey: string | null = null;
    if (calculatedBmi !== null) {
      const bmiCat = getBmiCategoryKey(calculatedBmi, ageNum);
      recKey = getRecommendationKey(risk, bmiCat);
      setRecommendation(t(recKey));
    } else {
      setRecommendation(null);
    }

    const dataToSend = {
      age: ageNum,
      height: parseFloat(height),
      weight: parseFloat(weight),
      exercise,
      smoking,
      stress,
      bmi: calculatedBmi,
      riskScore: risk,
      recommendationKey: recKey,
      recommendation: recKey ? t(recKey) : null,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/health-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (!result.success) {
        alert("Failed to save health check result");
      } else {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error posting health check:", error);
      alert("Error submitting health check");
    }
  };

  return (
    <>
      {/* Sliding notification banner bottom right */}
      <div
        className={`fixed bottom-10 right-0 bg-green-600 text-white px-6 py-3 rounded shadow-md z-50 transform transition-transform duration-300 ${
          showSuccess ? "translate-x-0 right-4" : "translate-x-full"
        }`}
        aria-live="polite"
      >
        {t("submit-success")}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... inputs and selects remain the same ... */}

        <div>
          <label className="block mb-1 font-medium">{t("age")}</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("height")}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("weight")}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("exercise")}</label>
          <select
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">{t("select")}</option>
            <option value="daily">{t("exercise-daily")}</option>
            <option value="weekly">{t("exercise-weekly")}</option>
            <option value="rarely">{t("exercise-rarely")}</option>
            <option value="never">{t("exercise-never")}</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("smoking")}</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="yes"
                checked={smoking === "yes"}
                onChange={(e) => setSmoking(e.target.value)}
              />{" "}
              {t("yes")}
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={smoking === "no"}
                onChange={(e) => setSmoking(e.target.value)}
              />{" "}
              {t("no")}
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">{t("stress")}</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="yes"
                checked={stress === "yes"}
                onChange={(e) => setStress(e.target.value)}
              />{" "}
              {t("yes")}
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={stress === "no"}
                onChange={(e) => setStress(e.target.value)}
              />{" "}
              {t("no")}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormChanged}
          className={`px-4 py-2 rounded ${
            isFormChanged
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {t("submit")}
        </button>

        {submitted && (
          <div className="mt-4 text-green-600 font-medium space-y-2">
            {bmi !== null && (
              <p>
                {t("your-bmi-is")} {bmi} — {t(getBmiCategoryKey(bmi, parseInt(age)))}
              </p>
            )}
            {riskScore !== null && (
              <p>
                {t("your-risk-score-is")} {riskScore} / 3
              </p>
            )}
            {recommendation && <p>{recommendation}</p>}
          </div>
        )}
      </form>
    </>
  );
}
