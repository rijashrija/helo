import React from "react";
import { Link } from "react-router";
// import {useScrollTo} from './useScrollTo';


function Header() {
    const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const styles = {
    wrapper: {
      width: "100%",
      overflowX: "hidden", 
    },
    header: {
      width: "100%",
      maxWidth: "1400px", 
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 48px", 
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logoIcon: {
      width: "30px",
      height: "30px",
      fill: "#2563eb",
    },
    logoText: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#2563eb",
      whiteSpace: "nowrap",
    },
    nav: {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
    },
    link: {
      color: "#374151",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "16px",
      transition: "color 0.3s ease",
      whiteSpace: "nowrap",
    },
    linkHover: {
      color: "#2563eb",
    },
  };

  const handleHover = (e, hover) => {
    e.target.style.color = hover ? styles.linkHover.color : styles.link.color;
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        {/* Left: Logo with Icon */}
        <div style={styles.logoContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.logoIcon}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zM12 20c-3.87-1.08-7-5.04-7-9V6.3l7-2.33 7 2.33V11c0 3.96-3.13 7.92-7 9z" />
          </svg>
          <span style={styles.logoText}>SpamGuard</span>
        </div>

        {/* Right: Navigation */}
        <nav style={styles.nav}>
          {/* <a
            href="/analyser"
            style={styles.link}
            onMouseOver={e => handleHover(e, true)}
            onMouseOut={e => handleHover(e, false)}
          >
            Analyzer
          </a> */}
          <Link to="/analyser"
          style={styles.link}
            onMouseOver={e => handleHover(e, true)}
            onMouseOut={e => handleHover(e, false)}>Analyze</Link>  
          <Link
            to="/#features"
            style={styles.link}
            onMouseOver={e => handleHover(e, true)}
            onMouseOut={e => handleHover(e, false)}
            onClick={(e)=>{ handleClick('features');
    const element = document.getElementById('features');
    if (element) element.scrollIntoView({ behavior: 'smooth' });}}
          >
            Features
          </Link>
          <Link
            to="/how-it-works"
            style={styles.link}
            onMouseOver={e => handleHover(e, true)}
            onMouseOut={e => handleHover(e, false)}
             onClick={(e)=>{ handleHover(e, false);
    const element = document.getElementById('how-it-works');
    if (element) element.scrollIntoView({ behavior: 'smooth' });}}
          >
            How It Works
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
