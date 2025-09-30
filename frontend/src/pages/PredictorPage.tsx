// src/pages/PredictorPage.tsx
import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { predict } from "../lib/api";

type DiseaseKey = "pneumonia" | "tuberculosis" | "lung_cancer";

interface PredictionResult {
  label: string;
  confidence: number;
  probs: number[];
  classes: string[];
  filename: string;
  explain_requested: boolean;
  explain_supported: boolean;
  // Back-compat + new fields
  explain_image: string | null;
  explain_original?: string | null;
  explain_overlay?: string | null;
  explain_heatmap?: string | null;
}

const DISEASES: Record<DiseaseKey, { title: string; blurb: string; hint: string }> = {
  pneumonia: {
    title: "Pneumonia",
    blurb: "Binary classification: NORMAL vs PNEUMONIA using ResNet-18.",
    hint: "Best with frontal chest X-rays.",
  },
  tuberculosis: {
    title: "Tuberculosis",
    blurb: "Binary classification: NORMAL vs TB using ResNet-18.",
    hint: "X-rays with clear lung fields recommended.",
  },
  lung_cancer: {
    title: "Lung Cancer",
    blurb: "3-class: adenocarcinoma, squamous cell carcinoma, normal (ResNet-50).",
    hint: "Use high-quality scans or pathology tiles.",
  },
};

export default function PredictorPage() {
  const params = useParams<{ type?: string }>();
  const navigate = useNavigate();

  const initialType = useMemo<DiseaseKey>(() => {
    const t = (params.type || "").toLowerCase();
    if (t === "tb") return "tuberculosis";
    if (t === "lung cancer") return "lung_cancer";
    if (["pneumonia", "tuberculosis", "lung_cancer"].includes(t)) return t as DiseaseKey;
    return "pneumonia";
  }, [params.type]);

  const [selected, setSelected] = useState<DiseaseKey>(initialType);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [openInfo, setOpenInfo] = useState(true);
  const [view, setView] = useState<"overlay" | "original" | "heatmap">("overlay");

  // Keep URL and selector in sync (nice for sharing links)
  useEffect(() => {
    const pathType =
      selected === "tuberculosis" ? "tuberculosis" : selected === "lung_cancer" ? "lung_cancer" : "pneumonia";
    if (params.type !== pathType) {
      navigate(`/predict/${pathType}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setError("File too large (max 8MB)");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
    setResult(null);
    setShowExplain(false);
  };

  const handleSubmit = async (e: FormEvent, explain = false) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image before submitting");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const endpointKey =
        selected === "tuberculosis" ? "tuberculosis" : selected === "lung_cancer" ? "lung_cancer" : "pneumonia";
      const data = await predict(endpointKey, file, explain);
      setResult(data as PredictionResult);
      setShowExplain(explain);
      setView("overlay");
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (label: string) => {
    if (selected === "pneumonia") {
      return label.toUpperCase() === "NORMAL" ? "bg-emerald-500" : "bg-rose-500";
    }
    if (selected === "tuberculosis") {
      return label.toUpperCase() === "NORMAL" ? "bg-emerald-500" : "bg-amber-500";
    }
    // lung cancer (3-class)
    return "bg-indigo-500";
  };

  const hasNewExplain =
    !!result?.explain_original || !!result?.explain_overlay || !!result?.explain_heatmap;

  const currentExplainSrc = () => {
    if (!result) return "";
    if (hasNewExplain) {
      if (view === "original" && result.explain_original) return `data:image/png;base64,${result.explain_original}`;
      if (view === "heatmap" && result.explain_heatmap) return `data:image/png;base64,${result.explain_heatmap}`;
      const overlay = result.explain_overlay || result.explain_image;
      return overlay ? `data:image/png;base64,${overlay}` : "";
    }
    return result.explain_image ? `data:image/png;base64,${result.explain_image}` : "";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">PulmoScan — Predictor</h1>
          <p className="mt-2 text-sm text-slate-400">
            Pick a task, upload an image, and run the model. Flip on explainability to see Grad-CAM.
          </p>
        </header>

        {/* Disease selector */}
        <section className="rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-4 mb-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                { key: "pneumonia", icon: "🫁", accent: "focus:ring-indigo-500" },
                { key: "tuberculosis", icon: "🧫", accent: "focus:ring-amber-500" },
                { key: "lung_cancer", icon: "🧬", accent: "focus:ring-fuchsia-500" },
              ] as { key: DiseaseKey; icon: string; accent: string }[]
            ).map((opt) => {
              const active = selected === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelected(opt.key)}
                  className={`text-left rounded-xl p-4 ring-1 transition
                    ${active ? "bg-slate-900 ring-slate-600" : "bg-slate-900/40 ring-slate-700 hover:bg-slate-900/60"}
                    ${opt.accent}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{opt.icon}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide
                        ${active ? "bg-slate-200 text-slate-900" : "bg-slate-700 text-slate-200"}
                      `}
                    >
                      {active ? "Selected" : "Choose"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="font-semibold text-slate-100">{DISEASES[opt.key].title}</div>
                    <div className="text-xs text-slate-400">{DISEASES[opt.key].blurb}</div>
                    <div className="mt-1 text-[11px] text-slate-500">{DISEASES[opt.key].hint}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Upload + Actions */}
        <form className="rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Upload image ({DISEASES[selected].title})
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:font-semibold hover:file:bg-indigo-500
                         rounded-md border border-slate-700 bg-slate-900 text-slate-200"
            />

            {preview && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs text-slate-400 mb-2">Preview</div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-xl ring-1 ring-slate-700 shadow-lg object-contain"
                  />
                </div>
                <div className="rounded-xl bg-slate-900 ring-1 ring-slate-800 p-4 text-xs text-slate-400">
                  <div className="font-semibold text-slate-200 mb-1">Tips</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use clear, high-contrast scans.</li>
                    <li>Avoid heavy compression or watermarks.</li>
                    <li>For lung cancer, pathology tiles or high-res scans help.</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                  loading ? "bg-slate-700 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {loading && !showExplain ? "Analyzing…" : "Predict"}
              </button>

              <button
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                  loading ? "bg-slate-700 cursor-not-allowed" : "bg-fuchsia-600 hover:bg-fuchsia-500"
                }`}
              >
                {loading && showExplain ? "Analyzing with Explainability…" : "Predict with Explainability"}
              </button>
            </div>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-rose-600/10 text-rose-300 ring-1 ring-rose-700 px-4 py-3">
            ⚠ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-6 w-48 bg-slate-800 rounded" />
            <div className="h-40 w-full bg-slate-800 rounded" />
            <div className="h-3 w-full bg-slate-800 rounded" />
            <div className="h-3 w-5/6 bg-slate-800 rounded" />
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <section className="mt-8 rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-white">Prediction Result</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Model: {DISEASES[selected].title} • File: <span className="text-slate-300">{result.filename || "—"}</span>
                </p>
              </div>
              <span
                className={`text-white text-xs px-3 py-1 rounded-full ${badgeColor(result.label)}`}
                title="Predicted class"
              >
                {result.label}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              <span className="font-semibold text-slate-100">Confidence:</span>{" "}
              {(result.confidence * 100).toFixed(2)}%
            </p>

            {/* Probabilities */}
            {result.classes && result.probs && (
              <div className="mt-5">
                <h3 className="font-semibold text-slate-100">Class Probabilities</h3>
                <div className="mt-3 space-y-3">
                  {result.classes.map((cls, i) => {
                    const pct = (result.probs[i] * 100).toFixed(2);
                    const barColor =
                      cls.toUpperCase() === "PNEUMONIA"
                        ? "bg-rose-500"
                        : cls.toUpperCase() === "NORMAL"
                        ? "bg-emerald-500"
                        : selected === "tuberculosis" && cls.toUpperCase() === "TB"
                        ? "bg-amber-500"
                        : "bg-indigo-500";
                    return (
                      <div key={cls}>
                        <div className="flex justify-between text-xs mb-1 text-slate-300">
                          <span>{cls}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                          <div className={`h-2.5 ${barColor}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Explainability */}
            {showExplain && (result.explain_image || hasNewExplain) && (
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-100">Grad-CAM</h3>
                  {hasNewExplain && (
                    <div className="flex gap-2">
                      {(["original", "overlay", "heatmap"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setView(v)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                            view === v ? "bg-slate-200 text-slate-900" : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                          }`}
                          title={`Show ${v}`}
                        >
                          {v[0].toUpperCase() + v.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-xl overflow-hidden ring-1 ring-slate-700 bg-slate-900">
                  {currentExplainSrc() ? (
                    <img src={currentExplainSrc()} alt={`Grad-CAM ${view}`} className="w-full object-contain" />
                  ) : (
                    <div className="p-6 text-sm text-slate-400">No explainability image found.</div>
                  )}
                </div>

                {/* Info accordion */}
                <div className="mt-4 rounded-xl ring-1 ring-slate-700 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenInfo((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700"
                  >
                    <span>What is this heatmap? (Grad-CAM explanation)</span>
                    <span className="text-sm text-slate-300">{openInfo ? "−" : "+"}</span>
                  </button>

                  {openInfo && (
                    <div className="px-4 py-4 bg-slate-900 text-sm leading-6 text-slate-300">
                      <p className="mb-2">
                        Grad-CAM highlights the regions that most influenced the model’s decision. Bright areas
                        indicate where the network “looked” to form its prediction.
                      </p>
                      <p className="text-slate-400">
                        <strong className="text-slate-200">Reminder:</strong> PulmoScan is a decision support tool,
                        not a medical device. Use these overlays alongside clinical judgement and expert review.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
