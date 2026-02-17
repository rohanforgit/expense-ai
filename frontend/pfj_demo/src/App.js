import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JournalPage from "./pages/JournalPage";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Journal (Calendar + Daily Entry) */}
        <Route path="/" element={<JournalPage />} />
        <Route path="/journal" element={<JournalPage />} />

        {/* Analysis (Summary only) */}
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
