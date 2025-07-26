import React, { useState } from 'react';
import picture from './picture.png';

const EmailSpamChecker = () => {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

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

    if (result === 'invalid_format' || result === 'common_typo') {
      setIsValid(false);
      setValidationMessage('❌ Invalid email address format.');
    } else {
      setIsValid(true);
      setValidationMessage('✅ Valid email address.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px',
      backgroundColor: '#e6f0fd',
      minHeight: '90vh',
      fontFamily: 'Arial, sans-serif',
    },
    leftBox: {
      flex: 1,
      paddingRight: '30px',
    },
    rightBox: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: '500px',
      height: 'auto',
      objectFit: 'contain',
    },
    heading: {
      fontSize: '44px',
      marginBottom: '20px',
      fontWeight: '700',
      textAlign: 'left',
    },
    highlightParagraph: {
      color: '#1a73e8',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: '20px',
    },
    paragraph: {
      lineHeight: '1.6',
      marginBottom: '25px',
      color: '#555',
      fontSize: '18px',
      textAlign: 'left',
    },
    inputContainer: {
      display: 'flex',
      marginTop: '20px',
      maxWidth: '600px',
    },
    input: {
      flex: 1,
      padding: '14px 20px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      outline: 'none',
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
    },
    validationMessage: {
      marginTop: '15px',
      fontSize: '16px',
      fontWeight: '500',
      color: isValid === true ? '#2ecc71' : '#e74c3c',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftBox}>
        {/* ✅ Updated heading with separate lines and new color */}
        <h2 style={{ ...styles.heading, color: '#1d4e89' }}>
          <span style={{ display: 'block' }}>Email</span>
          <span style={{ display: 'block' }}>Spam Checker</span>
        </h2>

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
            onFocus={(e) => (e.target.style.borderColor = '#1a73e8')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <button
            style={styles.button}
            onClick={handleCheck}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0d62c9')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#1a73e8')}
          >
            CHECK
          </button>
        </div>

        {validationMessage && (
          <div style={styles.validationMessage}>{validationMessage}</div>
        )}
      </div>

      <div style={styles.rightBox}>
        <img
          src={picture}
          alt="Phishing Illustration"
          style={styles.image}
        />
      </div>
    </div>
  );
};

export default EmailSpamChecker;
