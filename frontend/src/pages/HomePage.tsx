// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Simple theme hook: toggles 'dark' class on <html>, stores in localStorage */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // initial load: respect localStorage or OS preference
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null);
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { theme, toggle };
}

const HomePage: React.FC = () => {
  const { theme, toggle } = useTheme();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-500/20" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-500/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              AI that helps you{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                see the unseen
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl"
            >
              PulmoScan analyzes chest images for{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Pneumonia, Tuberculosis, and Lung Cancer
              </span>{" "}
              with fast, explainable AI. Grad-CAM overlays reveal exactly{" "}
              <em>why</em> a prediction was made.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/predict/pneumonia"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                Try a Prediction
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-slate-800 font-semibold ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700"
              >
                Learn how it works
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                Explainable AI (Grad-CAM)
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
                FastAPI + PyTorch
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            className="relative"
          >
            <div className="relative mx-auto max-w-lg">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(2,6,23,0.15)] ring-1 ring-slate-200 bg-white dark:bg-slate-900 dark:ring-slate-800">
                {/* Split “scan” frame */}
                <div className="h-full w-full grid grid-cols-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Make label readable in both themes */}
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white">
                        X-ray
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-80 mix-blend-screen" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.7)_0,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,.25)_0,transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* FIX: readable Grad-CAM text (no pure white-on-white) */}
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white">
                        Grad-CAM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 shadow-sm dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                  Multi-Disease • Explainable • Fast
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-500 text-sm dark:text-slate-400">
            <span>Built with FastAPI</span>
            <span className="hidden sm:inline">•</span>
            <span>Powered by PyTorch</span>
            <span className="hidden sm:inline">•</span>
            <span>Frontend:  Tailwind</span>
            <span className="hidden sm:inline">•</span>
            <span>Explainability: Grad-CAM</span>
          </div>
        </div>
      </section>

      {/* Why these models (explanation) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
            Why these models?
          </h2>
          <p className="mt-3 text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We balance speed, accuracy, and explainability. Different problems need different
            model capacity — here’s how we chose.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* ResNet18 card */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ResNet-18 — Pneumonia & TB
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Lightweight backbone with ~11M params. Great inference speed on CPU/GPU,
                strong baseline performance for binary classification.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>⚡ Fast: low latency, ideal for real-time screening</li>
                <li>🧠 Sufficient capacity for 2-class problems</li>
                <li>🧩 Well-studied architecture; easy Grad-CAM hooks</li>
              </ul>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Trade-off: Slightly lower ceiling vs deeper nets on complex tasks.
              </div>
            </div>

            {/* ResNet50 card */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                ResNet-50 — Lung Cancer (3-class)
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Deeper bottleneck architecture (~25M params) for nuanced patterns like
                adenocarcinoma vs squamous cell carcinoma vs normal.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>🎯 Higher representational capacity</li>
                <li>🔍 Better separation across 3 classes</li>
                <li>🖼️ Cleaner Grad-CAM maps on fine-grained features</li>
              </ul>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Trade-off: Heavier; slightly higher inference time than ResNet-18.
              </div>
            </div>

            {/* Explainability card */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-md transition dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Explainable by design — Grad-CAM
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                We expose model attention via Grad-CAM, highlighting the regions most
                responsible for predictions to aid clinician review.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>🩻 Region highlights improve trust and usability</li>
                <li>🧪 Useful for failure analysis and dataset QA</li>
                <li>🧰 Consistent across all PulmoScan models</li>
              </ul>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Reminder: Decision support — not a medical device.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center">
            How it works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Pick a disease", desc: "Pneumonia, TB, or Lung Cancer." },
              { step: "2", title: "Upload image", desc: "PNG/JPEG X-ray or histopath slide." },
              { step: "3", title: "Get prediction", desc: "Model outputs class + confidence." },
              { step: "4", title: "See Grad-CAM", desc: "Understand the ‘why’ visually." },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                    {s.step}
                  </span>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/predict/pneumonia"
              className="rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
            >
              Start with Pneumonia
            </Link>
            <Link
              to="/predict/tuberculosis"
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-800"
            >
              Try Tuberculosis
            </Link>
            <Link
              to="/predict/lung_cancer"
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-800"
            >
              Test Lung Cancer
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics / model snapshot (static placeholders) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Pneumonia (ResNet-18)", value: "≈ 92%*" },
              { label: "TB (ResNet-18)", value: "≈ 89%*" },
              { label: "Lung Cancer (ResNet-50)", value: "≈ 90%*" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 text-center dark:bg-slate-900 dark:ring-slate-800"
              >
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{m.value}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500 text-center dark:text-slate-400">
            *Indicative validation accuracy. Not a medical device. Consult a professional.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 text-center text-white shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ready to explore explainable AI for lung health?
            </h3>
            <p className="mt-3 text-blue-100">
              Upload an image and see predictions with Grad-CAM overlays in seconds.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/predict/pneumonia"
                className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/20"
              >
                Try a Prediction
              </Link>
              <Link
                to="/about"
                className="rounded-xl bg-white text-blue-700 px-5 py-3 font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
