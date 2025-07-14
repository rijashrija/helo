import React from 'react';
import { MdEmail } from 'react-icons/md';

const SampleEmails = ({ onSelectEmail }) => {
  const emails = [
    {
      type: 'Phishing',
      message: 'URGENT: Your account will be suspended...',
      content: `Subject: URGENT: Your account will be suspended in 24 hours!

From: security@paypaI-security.com
To: user@example.com

Dear PayPal User,

Your account has been temporarily restricted due to suspicious activity. You must verify your account immediately to avoid permanent suspension.

Click here to verify: http://paypal-verify.suspicious-site.com/login

This link will expire in 24 hours. Act fast!

Best regards,
PayPal Security Team`,
      tag: 'Spam',
      alert: true
    },
    {
      type: 'Nigerian Scam',
      message: 'Congratulations! You have won $1,000,000...',
      content: `Subject: Congratulations! You have won $1,000,000 USD

From: winner@lottery-international.org
To: user@example.com

CONGRATULATIONS!!!

You have been selected as the winner of our international lottery! You have won the sum of ONE MILLION DOLLARS ($1,000,000.00 USD).

To claim your prize, please reply with:
- Full Name
- Phone Number  
- Bank Account Details
- Copy of ID

Send processing fee of $500 via Western Union to claim your winnings.

Contact Mr. John Smith: +234-xxx-xxxx

Congratulations once again!`,
      tag: 'Spam',
      alert: true
    },
    {
      type: 'Legitimate',
      message: 'Your order confirmation #12345...',
      content: `Subject: Your order confirmation #12345

From: orders@amazon.com
To: customer@example.com

Hello,

Thank you for your order! Here are the details:

Order #12345
Date: December 19, 2024
Total: $49.99

Items:
- Wireless Headphones (1x) - $49.99

Estimated delivery: December 22, 2024

Track your package: [Amazon Tracking Link]

Thanks for shopping with us!

Amazon Customer Service`,
      tag: 'Legitimate',
      alert: false
    },
    {
      type: 'Fake Urgency',
      message: 'FINAL NOTICE: Tax refund expires today...',
      content: `Subject: FINAL NOTICE: Your tax refund of $2,847.50 expires TODAY

From: irs-refund@taxrefund-gov.net
To: taxpayer@example.com

FINAL NOTICE - IMMEDIATE ACTION REQUIRED

The IRS has approved your tax refund of $2,847.50. This refund will expire at midnight tonight if not claimed.

CLICK HERE TO CLAIM YOUR REFUND NOW: http://irs-refund.fake-site.org

Required information:
- Social Security Number
- Bank routing number
- Account number

This is your final opportunity. Do not let your refund expire!

IRS Automated System`,
      tag: 'Spam',
      alert: true
    }
  ];

  const containerStyle = {
    backgroundColor: '#eef3ff',
    minHeight: '100vh',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    maxWidth: '1000px',
    width: '100%',
    marginTop: '40px'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const tagStyle = (tag) => ({
    fontSize: '13px',
    padding: '6px 12px',
    borderRadius: '12px',
    color: tag === 'Spam' ? '#c53030' : '#fff',
    backgroundColor: tag === 'Spam' ? '#fed7d7' : '#000'
  });

  const messageStyle = {
    fontSize: '15px',
    marginBottom: '4px',
    color: '#333'
  };

  const buttonStyle = {
     backgroundColor: '#5c7cfa',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    justifyContent: 'center',
    marginTop: '1rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#4a6cfa'
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Sample Emails</h1>
      <p style={{ color: '#666', fontSize: '16px' }}>
        Try our analyzer with these sample emails to see how it works
      </p>

      <div style={gridStyle}>
        {emails.map((email, index) => (
          <div key={index} style={cardStyle}>
            <div>
              <div style={headerStyle}>
                <div style={labelStyle}>
                  <span>{email.alert ? '⚠️' : '✔️'}</span>
                  {email.type}
                </div>
                <span style={tagStyle(email.tag)}>{email.tag}</span>
              </div>
              <p style={messageStyle}>{email.message}</p>
            </div>
            <button
              style={buttonStyle}
              onClick={() => onSelectEmail(email.content)} // ✅ Functionality added here
            >
              <MdEmail size={20} />
              Analyze This Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleEmails;
