// import React from "react";
import { motion, Variants } from "framer-motion";

const team = [
  {
    name: "Sinchana C",
    usn: "USN: 4MW22CS152",
    img: "/images/Sinchana.jpg",
    
    link: "https://www.linkedin.com/in/sinchana-c-649b1037b"
  },
  {
    name: "Sowjanya",
    usn: "USN: 4MW22CS158",
    img: "/images/Sowjanya.jpg",
    link: "https://www.linkedin.com/in/sowjanya-achar-684158330"
  },
  {
    name: "Suchithra",
    usn: "USN: 4MW22CS162",
    img: "/images/Suchithra.jpg",
    link: "https://www.linkedin.com/in/suchithra-kulal-3a9a64330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Shravya G Shetty",
    usn: "USN: 4MW22CS190",
    img: "/images/Shravya.jpg",
    link: "https://www.linkedin.com/in/shravya-g-shetty-348297360"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.08 } }
};

const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.35 } }
};

const TeamPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Our Team
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl mx-auto">
            Meet the developers behind PulmoScan.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={card}
              className="w-full max-w-[320px] rounded-2xl p-8
                         bg-white ring-1 ring-slate-200 shadow-[0_6px_30px_rgba(2,6,23,0.06)]
                         hover:shadow-[0_10px_36px_rgba(2,6,23,0.10)] transition-shadow
                         dark:bg-slate-900 dark:ring-slate-800 dark:shadow-[0_10px_36px_rgba(2,6,23,0.40)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800"
                  />
                  <span className="absolute bottom-1 right-1 inline-block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {member.usn}
                </p>

                <div className="w-12 h-px bg-slate-200 dark:bg-slate-700 my-5" />

                <motion.a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium dark:bg-slate-100 dark:text-slate-900"
                >
                  Connect
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamPage;