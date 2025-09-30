import React from "react";

const LearnPage = () => (
  <section className="py-10 px-6 max-w-4xl mx-auto text-slate-800">
    <h2 className="text-3xl font-bold mb-6 text-indigo-800">Breathe Better: Health Tips by Disease</h2>
    
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-indigo-700">🫁 Pneumonia</h3>
      <ul className="list-disc pl-6">
        <li>Stay hydrated and get plenty of rest.</li>
        <li>Use prescribed antibiotics and complete the course.</li>
        <li>Diet: Warm soups, leafy greens, garlic, ginger, and turmeric-rich foods.</li>
      </ul>
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-indigo-700">🧫 Tuberculosis (TB)</h3>
      <ul className="list-disc pl-6">
        <li>Strict adherence to TB medications (DOTS therapy).</li>
        <li>High-protein diet: Eggs, dairy, nuts, lentils.</li>
        <li>Vitamin D and iron-rich foods support healing.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-indigo-700">🎗️ Lung Cancer</h3>
      <ul className="list-disc pl-6">
        <li>Work closely with oncologists for treatment plans.</li>
        <li>Avoid smoking and exposure to pollutants.</li>
        <li>Supportive foods: Broccoli, berries, fatty fish, and whole grains.</li>
      </ul>
    </div>
  </section>
);

export default LearnPage;
