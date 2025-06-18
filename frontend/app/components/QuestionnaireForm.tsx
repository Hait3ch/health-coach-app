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

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      return parseFloat(result.toFixed(2));
    }
    return null;
  };

  // Age-adjusted BMI category thresholds
  const getBmiCategoryKey = (bmi: number, ageNum: number) => {
    const upperNormal = ageNum >= 45 ? 24 : 25;
    if (bmi < 18.5) return "bmi-underweight";
    if (bmi < upperNormal) return "bmi-normal";
    if (bmi < 30) return "bmi-overweight";
    return "bmi-obese";
  };

  // Calculate basic health risk score based on exercise and stress
  // exercise: daily|weekly|rarely|never
  // stress: yes|no
  const calculateRiskScore = () => {
    let score = 0;
    if (exercise === "rarely" || exercise === "never") score += 1;
    if (stress === "yes") score += 1;
    return score;
  };

  // Get recommendation text key based on risk score and bmi category
  const getRecommendationKey = (risk: number, bmiCat: string) => {
    if (risk === 2 && (bmiCat === "bmi-overweight" || bmiCat === "bmi-obese"))
      return "recommendation-high-risk";
    if (risk >= 1) return "recommendation-moderate-risk";
    return "recommendation-low-risk";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const ageNum = parseInt(age);
    const calculatedBmi = calculateBMI();
    setBmi(calculatedBmi);

    const risk = calculateRiskScore();
    setRiskScore(risk);

    if (calculatedBmi !== null) {
      const bmiCat = getBmiCategoryKey(calculatedBmi, ageNum);
      const recKey = getRecommendationKey(risk, bmiCat);
      setRecommendation(t(recKey));
    } else {
      setRecommendation(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Age */}
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

      {/* Height */}
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

      {/* Weight */}
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

      {/* Exercise */}
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

      {/* Smoking (unchanged, but not used in risk score) */}
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

      {/* Stress */}
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

      {/* Submit */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {t("submit")}
      </button>

      {/* Results */}
      {submitted && (
        <div className="mt-4 text-green-600 font-medium space-y-2">
          {bmi !== null && (
            <p>
              {t("your-bmi-is")} {bmi} — {t(getBmiCategoryKey(bmi, parseInt(age)))}
            </p>
          )}
          {riskScore !== null && (
            <p>
              {t("your-risk-score-is")} {riskScore} / 2
            </p>
          )}
          {recommendation && <p>{recommendation}</p>}
        </div>
      )}
    </form>
  );
}
