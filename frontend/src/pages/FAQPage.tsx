import React from "react";

const FAQPage: React.FC = () => {
  const faqs = [
    {
      category: "General",
      items: [
        {
          q: "🧠 How accurate is the AI diagnosis?",
          a: "Our models, trained on large validated medical datasets, achieve 85–95% accuracy depending on the disease type. However, PulmoScan is an assistive tool — final interpretation should always be confirmed by a certified radiologist.",
        },
        {
          q: "📱 Do I need to install anything?",
          a: "No installation is required. PulmoScan runs through your browser, making it accessible from desktop, tablet, or mobile.",
        },
      ],
    },
    {
      category: "Image & Data",
      items: [
        {
          q: "📷 What kind of images can I upload?",
          a: "We accept PNG and JPEG formats of chest X-ray or CT scan images. Clear, high-resolution, uncompressed scans provide the best results.",
        },
        {
          q: "⚙️ Are there any size or resolution limits?",
          a: "Files up to 10 MB are supported, and resolutions between 512×512px and 2048×2048px work optimally.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      items: [
        {
          q: "🛡️ Is my medical data safe?",
          a: "Yes. Uploaded images are processed securely, and we do not store, share, or reuse them. All communication is encrypted (HTTPS).",
        },
        {
          q: "🔒 Is PulmoScan HIPAA compliant?",
          a: "We follow industry best practices for data handling and security. HIPAA compliance can be achieved if deployed in a certified healthcare environment.",
        },
      ],
    },
    {
      category: "Technical",
      items: [
        {
          q: "⚡ How long does it take to get results?",
          a: "Predictions are usually generated in under 2 seconds, depending on your internet connection and image size.",
        },
        {
          q: "🖥️ What AI models are used?",
          a: "We use specialized deep learning architectures (like ResNet50 for pneumonia and lung cancer, custom CNNs for tuberculosis) optimized for medical imaging.",
        },
      ],
    },
  ];

  return (
    <section className="min-h-screen w-full bg-slate-900 text-slate-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-400 mb-8 text-center">
          FAQs — PulmoScan
        </h2>

        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4 border-b border-slate-700 pb-1">
                {section.category}
              </h3>
              <div className="space-y-5">
                {section.items.map((faq, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-slate-800 border border-slate-700 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-semibold text-indigo-300 mb-1">
                      {faq.q}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
