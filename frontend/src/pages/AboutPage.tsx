// src/pages/AboutPage.tsx
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-slate-900 text-slate-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <header className="mb-8">
          <h2 className="text-4xl font-extrabold text-white">About PulmoScan</h2>
          <p className="mt-2 text-slate-400">
            A lightweight, explainable AI tool to assist screening of common lung conditions. Built for clarity, not hype.
          </p>
        </header>

        {/* Mission / Scope */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-slate-100">What PulmoScan Does</h3>
            <p className="mt-3 text-slate-300">
              PulmoScan analyzes chest images and returns a predicted class with confidence. It can also generate
              Grad-CAM overlays to show which regions influenced the decision. It’s meant to assist clinicians
              and learners—not replace them.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-slate-100">Our Approach</h3>
            <p className="mt-3 text-slate-300">
              Keep it fast, simple, and transparent. We use proven CNN backbones, conservative preprocessing,
              and clear outputs so results are understandable at a glance.
            </p>
          </div>
        </div>

        {/* Models */}
        <div className="mt-8 rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-100">Models at a Glance</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-slate-900 ring-1 ring-slate-800 p-4">
              <div className="text-sm text-slate-400">Pneumonia</div>
              <div className="text-lg font-semibold text-slate-100">ResNet-18</div>
              <p className="mt-2 text-sm text-slate-300">
                Binary: NORMAL vs PNEUMONIA. Chosen for speed and solid baseline accuracy on chest X-rays.
              </p>
            </div>
            <div className="rounded-lg bg-slate-900 ring-1 ring-slate-800 p-4">
              <div className="text-sm text-slate-400">Tuberculosis</div>
              <div className="text-lg font-semibold text-slate-100">ResNet-18</div>
              <p className="mt-2 text-sm text-slate-300">
                Binary: NORMAL vs TB. Lean backbone helps with low latency and simpler deployment.
              </p>
            </div>
            <div className="rounded-lg bg-slate-900 ring-1 ring-slate-800 p-4">
              <div className="text-sm text-slate-400">Lung Cancer</div>
              <div className="text-lg font-semibold text-slate-100">ResNet-50</div>
              <p className="mt-2 text-sm text-slate-300">
                Three-class: adenocarcinoma / squamous cell carcinoma / normal. Deeper model for finer patterns.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
          </p>
        </div>

        {/* Explainability */}
        <div className="mt-8 rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-100">Why Explainability (Grad-CAM)?</h3>
          <p className="mt-3 text-slate-300">
            Grad-CAM highlights image regions that most influenced a prediction. This helps spot obvious
            mismatches (e.g., attention outside lung fields) and fosters trust by making the model’s focus visible.
          </p>
        </div>

        {/* Data handling / privacy */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-slate-100">Data & Privacy</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2 text-sm">
              <li>Images are processed for prediction and not retained by default.</li>
              <li>Use in secure environments and over HTTPS where possible.</li>
              <li>No personal identifiers should be present on uploaded images.</li>
            </ul>
          </div>
          <div className="rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
            <h3 className="text-xl font-semibold text-slate-100">Limitations</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2 text-sm">
              <li>Predictions can be wrong; image quality and data bias matter.</li>
              <li>Intended for education and decision support—not a medical device.</li>
              <li>Always confirm with clinical context and expert review.</li>
            </ul>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-8 rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-100">Tech Stack</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <ul className="list-disc pl-6 text-slate-300 space-y-2 text-sm">
              <li>Backend: FastAPI + PyTorch</li>
              <li>Models: ResNet-18 / ResNet-50 (torchvision)</li>
              <li>Explainability: Grad-CAM via model hooks</li>
            </ul>
            <ul className="list-disc pl-6 text-slate-300 space-y-2 text-sm">
              <li>Frontend: React + Vite + Tailwind CSS</li>
              <li>UX: Dark mode, responsive design</li>
              <li>Build: Simple, portable deployment</li>
            </ul>
          </div>
        </div>

        {/* How to use */}
        <div className="mt-8 rounded-xl bg-slate-800 ring-1 ring-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-100">How to Use</h3>
          <ol className="mt-3 list-decimal pl-6 text-slate-300 space-y-2 text-sm">
            <li>Go to the Predict page and select a task: Pneumonia, Tuberculosis, or Lung Cancer.</li>
            <li>Upload a clear image (PNG/JPEG). Avoid heavy compression or overlays.</li>
            <li>Click Predict. For visual context, choose Predict with Explainability.</li>
            <li>Review the class, confidence, and Grad-CAM overlay with clinical judgement.</li>
          </ol>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-slate-500">
          PulmoScan is under active improvement. Feedback and responsible testing help us make it better.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
