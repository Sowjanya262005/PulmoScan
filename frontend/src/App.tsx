import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import LearnPage from "./pages/LearnPage";
// import FAQPage from "./pages/FAQPage";
import PredictorPage from "./pages/PredictorPage";

const App: React.FC = () => {
  return (
    <Router>
      {/* Header / Navigation */}
      <header className="bg-blue-50 shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-800">PulmoScan</span>
          </Link>
          <div className="space-x-4 text-blue-700 font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/learn">Learn</Link>
            <Link to="/predict/pneumonia">Predict</Link>
            <Link to="/team">Team</Link>
            {/* <Link to="/faq">FAQ</Link> */}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/team" element={<TeamPage />} />
          {/* <Route path="/faq" element={<FAQPage />} /> */}
          {/* Dynamic route for disease type */}
          <Route path="/predict/:type" element={<PredictorPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 text-blue-700 text-center py-4">
        &copy; PulmoScan
      </footer>
    </Router>
  );
};

export default App;
