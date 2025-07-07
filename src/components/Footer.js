import React from 'react';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#0d1117',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  };

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: '600',
  };

  const subtitleStyles = {
    color: '#c9d1d9',
    fontSize: '14px',
    margin: '4px 0',
  };

  const noteStyles = {
    color: '#8b949e',
    fontSize: '12px',
    marginTop: '10px',
  };

  return (
    <footer style={footerStyles}>
      <div style={contentStyles}>
        <div style={headerStyles}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#3b82f6"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zM12 4.15L18 6.6v4.49c0 4.13-2.88 8.56-6 9.87-3.12-1.31-6-5.74-6-9.87V6.6l6-2.45z" />
          </svg>
          <h2 style={titleStyles}>SpamGuard</h2>
        </div>

        <p style={subtitleStyles}>
          Modern email security with intelligent spam detection.
        </p>

        <p style={noteStyles}>
          © 2025 SpamGuard. College Project - Educational Purpose.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
