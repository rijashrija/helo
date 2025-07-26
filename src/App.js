import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from "./components/Login";
import Header from "./components/Header";
import EmailSpamChecker from './components/EmailSpamChecker';
import FeatureSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import SampleEmails from "./components/SampleEmails";
import Analyser from "./components/Analyser";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleSelectEmail = (email) => {
    setEmailContent(email);
    setTimeout(() => {
      const analyserElement = document.getElementById("analyser");
      const textareaElement = document.getElementById("analyser-textarea");
      
      if (analyserElement) {
        analyserElement.scrollIntoView({ behavior: "smooth" });
      }
      
      if (textareaElement) {
        textareaElement.focus();
      }
    }, 100);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <EmailSpamChecker />
                <FeatureSection id="features" />
                <HowItWorks id="how-it-works" />
                <Footer />
              </>
            } />
            <Route 
              path="/analyser" 
              element={
                <>
                  <Analyser 
                    emailContent={emailContent} 
                    setEmailContent={setEmailContent} 
                    id="analyser" 
                  />
                  <SampleEmails onSelectEmail={handleSelectEmail} />
                </>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </Router>
  );
}

export default App;