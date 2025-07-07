import React, { useState } from 'react';

const EmailSpamChecker = () => {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

  // ✅ Enhanced email validator with typo domain check
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'invalid_format';

    const typoDomains = ['agmail.com', 'gmal.com', 'gmial.com', 'yahho.com', 'outlok.com'];
    const domain = email.split('@')[1]?.toLowerCase();

    if (typoDomains.includes(domain)) return 'common_typo';

    return 'valid';
  };

  const handleCheck = () => {
    const result = validateEmail(email);

    if (result === 'invalid_format') {
      setIsValid(false);
      setValidationMessage('❌ Invalid email address format.');
    } else if (result === 'common_typo') {
      setIsValid(false);
      setValidationMessage('❌Invalid email address format. ');
    } else {
      setIsValid(true);
      setValidationMessage('✅ Valid email address.');
      console.log('Checking email:', email);
      // You can call your backend here
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      minHeight: '50vh',
      backgroundColor: '#f5f7fa'
    },
    mainContent: {
      backgroundColor: '#e6f0fd',
      padding: '40px 20px',
      marginTop: '0'
    },
    contentBox: {
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%'
    },
    heading: {
      color: '#2c3e50',
      fontSize: '44px',
      marginBottom: '20px',
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
      letterSpacing: '0.5px',
      textTransform: 'none'
    },
    highlightParagraph: {
      color: '#1a73e8',
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '25px',
      lineHeight: '1.6'
    },
    paragraph: {
      lineHeight: '1.6',
      marginBottom: '25px',
      color: '#555',
      fontSize: '20px',
      textAlign: 'center'
    },
    inputContainer: {
      display: 'flex',
      margin: '30px auto 0',
      width: '80%',
      maxWidth: '600px'
    },
    input: {
      flex: '1',
      padding: '14px 20px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      outline: 'none'
    },
    button: {
      backgroundColor: '#1a73e8',
      color: 'white',
      border: 'none',
      padding: '0 30px',
      fontSize: '16px',
      cursor: 'pointer',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    validationMessage: {
      textAlign: 'center',
      marginTop: '15px',
      fontSize: '16px',
      fontWeight: '500',
      color: isValid === true ? '#2ecc71' : '#e74c3c'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.contentBox}>
          <h2 style={styles.heading}>Email Spam Checker</h2>

          <p style={styles.highlightParagraph}>
            Check the quality of an email address with Our Free Email Spam Checker Tool
          </p>

          <p style={styles.paragraph}>
            Our free Email Address Spam Checker tool helps prevent spam, save resources, enhance 
            security, and improve email deliverability by quickly verifying that email addresses are real,
            not disposable, free, or a typo.
          </p>

          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="email@domain.com"
              style={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValid(null);
                setValidationMessage('');
              }}
              onFocus={(e) => e.target.style.borderColor = '#1a73e8'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
              style={styles.button}
              onClick={handleCheck}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0d62c9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1a73e8'}
            >
              CHECK
            </button>
          </div>

          {validationMessage && (
            <div style={styles.validationMessage}>{validationMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSpamChecker;
