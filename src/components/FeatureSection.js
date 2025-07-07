import React from 'react';
import { Shield, Zap, Eye, Brain, Lock, TrendingUp } from 'lucide-react';
const FeatureSection = ({id}) => {
   
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze email patterns, content, and metadata to identify sophisticated spam and phishing attempts.'
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Get instant results with our lightning-fast analysis engine. No waiting, no delays - immediate security insights.'
    },
    {
      icon: Eye,
      title: 'Detailed Insights',
      description: 'Comprehensive analysis reports showing exactly why an email was flagged, with confidence scores and risk assessments.'
    },
    {
      icon: Lock,
      title: 'Privacy Protected',
      description: 'All analysis happens locally in your browser. Your emails never leave your device, ensuring complete privacy.'
    },
    {
      icon: Shield,
      title: 'Multi-Layer Security',
      description: 'Combines multiple detection techniques including sender verification, content analysis, and link validation.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Our algorithms continuously improve by learning from new spam patterns and emerging threats.'
    }
  ];
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '10px'
    },
    subheading: {
      fontSize: '18px',
      color: '#4b5563',
      maxWidth: '700px',
      margin: '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '30px'
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.3s ease-in-out'
    },
    cardHover: {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    iconWrapper: {
      padding: '8px',
      backgroundColor: '#dbeafe',
      borderRadius: '8px',
      marginRight: '12px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937'
    },
    description: {
      color: '#6b7280',
      fontSize: '16px',
      lineHeight: '1.6'
    }
  };

  return (
    <section id={id} style={styles.container}>
      <div style={styles.sectionTitle}>
        <h3 style={styles.heading}>Powerful Features</h3>
        <p style={styles.subheading}>
          Our advanced spam detection system combines cutting-edge AI with privacy-first design 
          to keep you safe from email threats.
        </p>
      </div>

      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
          >
            <div style={styles.iconBox}>
              <div style={styles.iconWrapper}>
                <feature.icon size={24} color="#2563eb" />
              </div>
              <h4 style={styles.title}>{feature.title}</h4>
            </div>
            <p style={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
