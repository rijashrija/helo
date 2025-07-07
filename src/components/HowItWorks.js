import React from 'react';
import { Upload, Search, Shield, CheckCircle } from 'lucide-react';
// import {useScrollTo} from './useScrollTo';

const HowItWorks = ({id}) => {
  const steps = [
    {
      icon: Upload,
      title: 'Input Email Content',
      description: 'Paste your email content into our secure analyzer. Include the subject, sender, and message body for comprehensive analysis.',
      color: '#3b82f6' // blue-500
    },
    {
      icon: Search,
      title: 'AI Analysis',
      description: 'Our advanced algorithms examine multiple factors including sender reputation, content patterns, links, and linguistic indicators.',
      color: '#8b5cf6' // purple-500
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'The system generates a comprehensive risk score and identifies specific threat indicators with detailed explanations.',
      color: '#f97316' // orange-500
    },
    {
      icon: CheckCircle,
      title: 'Get Results',
      description: 'Receive instant feedback with confidence scores, security recommendations, and actionable insights to stay protected.',
      color: '#22c55e' // green-500
    }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#4b5563',
      maxWidth: '640px',
      margin: '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '32px'
    },
    card: {
      position: 'relative',
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s ease-in-out',
      cursor: 'default'
    },
    cardHover: {
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
    },
    iconCircle: (color) => ({
      width: '64px',
      height: '64px',
      backgroundColor: color,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    }),
    stepNumber: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      width: '32px',
      height: '32px',
      backgroundColor: '#e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '700',
      color: '#4b5563',
      userSelect: 'none'
    },
    stepTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '12px',
      textAlign: 'center'
    },
    stepDescription: {
      fontSize: '14px',
      color: '#4b5563',
      lineHeight: '1.5',
      textAlign: 'center'
    },
    ctaSection: {
      marginTop: '64px',
      textAlign: 'center'
    },
    ctaBox: {
      display: 'inline-block',
      background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '32px 48px',
      borderRadius: '12px',
      maxWidth: '700px'
    },
    ctaTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '16px'
    },
    ctaText: {
      fontSize: '18px',
      opacity: 0.9,
      marginBottom: '24px'
    },
    ctaButton: {
      display: 'inline-block',
      backgroundColor: 'white',
      color: '#3b82f6',
      padding: '12px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '16px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <section id={id} style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>How It Works</h3>
        <p style={styles.subtitle}>
          Our spam detection process is simple, fast, and reliable. Here's how we protect you from email threats.
        </p>
      </div>

      <div style={styles.grid}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(hoveredIndex === index ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.iconCircle(step.color)}>
                <Icon size={32} color="white" />
              </div>
              <div style={styles.stepNumber}>{index + 1}</div>
              <h4 style={styles.stepTitle}>{step.title}</h4>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          );
        })}
      </div>

      <div style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h4 style={styles.ctaTitle}>Ready to Test Your Email Security?</h4>
          <p style={styles.ctaText}>
            Try our analyzer with sample emails or paste your own content to see our AI in action.
          </p>
          <a href="#analyzer" style={styles.ctaButton}
             onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
             onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
            Start Analyzing Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
