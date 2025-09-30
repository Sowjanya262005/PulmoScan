import React from "react";

const LearnPage = () => (
  <section className="min-h-screen bg-slate-900 text-slate-200 py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-white">
        🌬️ Air Matters: Stay Strong, Breathe Long
      </h2>

      {/* Pneumonia */}
      <div className="mb-8 p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700">
        <h3 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
          🫁 Pneumonia
        </h3>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-300">
          <li>Get 7–9 hours of rest daily to help your immune system fight infection.</li>
          <li>Stay hydrated — drink at least 2–3 liters of fluids to loosen mucus and prevent dehydration.</li>
          <li>Take antibiotics exactly as prescribed — stopping early increases relapse risk.</li>
          <li>Use humidified air or steam inhalation to ease breathing.</li>
          <li>Eat immune-boosting foods: garlic, turmeric, leafy greens, citrus fruits, and warm soups.</li>
          <li>Fact: WHO reports pneumonia is the leading infectious cause of death in children under 5 globally.</li>
          <li>🇮🇳 India: UNICEF estimates pneumonia kills over 100,000 children under 5 each year — most deaths are preventable with vaccination and timely care.</li>
        </ul>
      </div>

      {/* Tuberculosis */}
      <div className="mb-8 p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700">
        <h3 className="text-2xl font-semibold text-amber-400 flex items-center gap-2">
          🧫 Tuberculosis (TB)
        </h3>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-300">
          <li>Strictly follow DOTS (Directly Observed Treatment, Short-course) — skipping doses can cause drug-resistant TB.</li>
          <li>Eat a high-protein diet: eggs, dairy, pulses, nuts — protein helps repair lung tissue.</li>
          <li>Get sunlight for Vitamin D — it supports immunity against TB bacteria.</li>
          <li>Limit alcohol and smoking as they weaken the immune system and slow recovery.</li>
          <li>Practice cough etiquette and wear masks to avoid spreading the infection.</li>
          <li>Fact: According to WHO, TB kills 1.3 million people annually worldwide.</li>
          <li>🇮🇳 India: India accounts for ~28% of global TB cases (over 2.8 million annually) — the highest burden in the world.</li>
        </ul>
      </div>

      {/* Lung Cancer */}
      <div className="p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-700">
        <h3 className="text-2xl font-semibold text-pink-400 flex items-center gap-2">
          🎗️ Lung Cancer
        </h3>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-300">
          <li>Avoid all forms of tobacco — smoking causes 85% of lung cancer cases.</li>
          <li>Eat antioxidant-rich foods: broccoli, spinach, blueberries, and green tea.</li>
          <li>Maintain healthy body weight — obesity is linked to higher cancer recurrence risk.</li>
          <li>Engage in regular physical activity (150 mins/week) to improve lung capacity.</li>
          <li>Reduce exposure to radon, asbestos, and industrial chemicals where possible.</li>
          <li>Fact: Early detection increases 5-year survival rates from 18% to over 55% in localized cases.</li>
          <li>🇮🇳 India: Lung cancer is the most common cancer in men and the 4th most common in women; tobacco use is linked to over 67% of cases in the country.</li>
        </ul>
      </div>
    </div>
  </section>
);

export default LearnPage;
