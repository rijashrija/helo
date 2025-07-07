import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router';
import Header from "./components/Header";
import EmailSpamChecker from './components/EmailSpamChecker';
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import SampleEmails from "./components/SampleEmails";
import Analyser from "./components/Analyser";

function App() {
  const [emailContent, setEmailContent] = useState("");

  const handleSelectEmail = (email) => {
    setEmailContent(email);
    setTimeout(() => {
      document.getElementById("analyser")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/*" element={
          <>
            <EmailSpamChecker />
            <Analyser 
              emailContent={emailContent} 
              setEmailContent={setEmailContent} 
              id="analyser" 
            />
            <SampleEmails onSelectEmail={handleSelectEmail} />
            <FeatureSection id="features" />
            <HowItWorks id="how-it-works" />
            <Footer />
          </>
        } />
        <Route 
          path="/analyser" 
          element={
            <Analyser 
              emailContent={emailContent} 
              setEmailContent={setEmailContent} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;