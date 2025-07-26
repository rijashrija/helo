import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Analyser.css';

const Analyser = ({ emailContent, setEmailContent }) => {
  const [content, setContent] = useState(emailContent || '');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample emails data
  const sampleEmails = [
    {
      id: 1,
      subject: "URGENT: Your account will be suspended!",
      preview: "Dear user, verify your account to avoid suspension...",
      fullContent: `Subject: URGENT: Your account will be suspended in 24 hours!

From: security@paypal-security.com  
To: user@example.com  

Dear PayPal User,

Your account has been temporarily restricted due to suspicious activity. You must verify your account immediately to avoid permanent suspension. Click here to verify: http://phishy.site/verify-paypal

Sincerely,
PayPal Security Team`
    },
    {
      id: 2,
      subject: "You've won $1,000,000!",
      preview: "Congratulations! You've won our grand prize...",
      fullContent: `Subject: CONGRATULATIONS! You're our 1,000,000th visitor!

From: notifications@lucky-draw.com  
To: winner@example.com  

YOU'VE WON $1,000,000 in our annual lottery! 
To claim your prize, send your bank details and $50 processing fee to:
Western Union to Mr. John Smith, Nigeria.

ACT NOW - Offer expires in 24 hours!`
    }
  ];
  useEffect(() => {
    setContent(emailContent || '');
  }, [emailContent]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (setEmailContent) {
      setEmailContent(newContent);
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setAnalysisResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        message: content
      });

      const result = response.data.result;
      const finalConfidence = response.data.final_confidence || 50;

      setAnalysisResult({
        score: finalConfidence,
        isSpam: result === 'Spam',
        indicators: response.data.indicators || []
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUseSample = (sampleContent) => {
    setContent(sampleContent);
    if (setEmailContent) {
      setEmailContent(sampleContent);
    }
    // Scroll to analyzer after a slight delay
    setTimeout(() => {
      document.getElementById("analyser-textarea")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      backgroundColor: '#eef3ff',
      minHeight: '80vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '0.5rem'
    },
    subText: {
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '1rem',
      color: '#444'
    },
    panels: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    },
    leftPanel: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '1rem',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    panelTitle: {
      marginBottom: '0.5rem'
    },
    textarea: {
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      resize: 'vertical',
      maxHeight: '300px',
      boxSizing: 'border-box'
    },
    footer: {
      marginTop: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#5c7cfa',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    rightPanel: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '1rem',
      width: '100%',
      maxWidth: '500px',
      minHeight: '250px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    sampleSection: {
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      marginTop: '2rem',
      borderRadius: '10px'
    },
    sampleHeader: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#2c3e50'
    },
    sampleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    sampleCard: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s'
    },
    sampleCardHover: {
      transform: 'translateY(-5px)'
    },
    sampleButton: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      marginTop: '1rem',
      backgroundColor: '#5c7cfa',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    sampleButtonHover: {
      backgroundColor: '#4a6cfa'
    }
  };

  return (
    <>
      <div id="analyser" style={styles.container}>
        <h1 style={styles.header}>Email Spam Analyzer</h1>
        <p style={styles.subText}>
          Paste your email content below and get instant spam analysis results
        </p>

        <div style={styles.panels}>
          {/* Left Panel - Input */}
          <div style={styles.leftPanel}>
            <h2 style={styles.panelTitle}>📧 Email Content</h2>
            <textarea
              id="analyser-textarea"
              style={styles.textarea}
              rows={12}
              placeholder="Paste your email content here..."
              value={content}
              onChange={handleContentChange}
            />
            <div style={styles.footer}>
              <span>{content.length} characters</span>
              <button
                style={loading ? { ...styles.button, ...styles.button.disabled } : styles.button}
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? '🔄 Analyzing...' : '🔄 Analyze Email'}
              </button>
            </div>
          </div>

          {/* Right Panel - Result */}
          <div style={styles.rightPanel}>
            {error ? (
              <div style={{ color: 'red', textAlign: 'center' }}>
                <p>Error: {error}</p>
              </div>
            ) : loading ? (
              <div style={{ textAlign: 'center', color: '#666' }}>
                <p>Analyzing your email...</p>
              </div>
            ) : analysisResult ? (
              <div style={{
                backgroundColor: '#fff5f5',
                border: '1px solid #f5c2c7',
                borderRadius: '8px',
                padding: '1rem',
                color: '#842029',
                width: '100%',
                maxWidth: '450px',
                fontFamily: 'Arial, sans-serif'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <strong>{analysisResult.isSpam ? 'Spam Detected' : 'Looks Safe'}</strong>
                  <span style={{
                    backgroundColor: analysisResult.isSpam ? '#dc3545' : '#28a745',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '5px',
                    marginLeft: 'auto'
                  }}>
                    {analysisResult.isSpam ? 'High Risk' : 'Low Risk'}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Confidence Score</div>
                <div style={{
                  backgroundColor: '#e9ecef',
                  height: '10px',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: `${analysisResult.score}%`,
                    backgroundColor: analysisResult.isSpam ? '#dc3545' : '#28a745',
                    height: '100%'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  This email shows {(analysisResult.indicators?.length || 0)} spam indicators with a {analysisResult.score}% confidence that it's {analysisResult.isSpam ? 'malicious' : 'safe'}.
                </div>

                {analysisResult.indicators && analysisResult.indicators.length > 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#333', marginTop: '1rem' }}>
                    <strong>Indicators:</strong>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                      {analysisResult.indicators.map((item, index) => (
                        <li key={index}>
                          <strong>{item.type}:</strong> {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#666' }}>
                <p style={{ fontSize: '2rem' }}>⚠️</p>
                <p>Enter email content and click "Analyze Email" to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
     
      
    </>
  );
};

export default Analyser;