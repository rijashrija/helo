import re

def calculate_confidence_score(email_content):
    indicators = []
    confidence_score = 0
    content = email_content.lower()

    # Keyword categories
    spam_keywords = [
        'urgent', 'act now', 'limited time', 'click here', 'free money', 
        'nigerian prince', 'inheritance', 'lottery', 'winner', 'congratulations',
        'verify account', 'suspended', 'expired', 'confirm identity',
        'western union', 'bank transfer', 'processing fee', 'claim prize',
        'final notice', 'immediate action', 'expires today', 'last chance'
    ]
    urgency_phrases = ['urgent', 'immediate', 'expires', 'final notice', 'act now', 'limited time']
    money_keywords = ['money', 'dollar', 'usd', 'transfer', 'account', 'bank', 'refund', 'prize']
    personal_info_keywords = ['social security', 'ssn', 'password', 'bank account', 'routing number', 'pin', 'credit card']
    suspicious_link_patterns = ['.tk', '.ml', '.cf', 'bit.ly', 'tinyurl']

    # Spam keyword detection
    found_keywords = [kw for kw in spam_keywords if kw in content]
    if found_keywords:
        confidence_score += len(found_keywords) * 10
        indicators.append({
            "type": "Spam Keywords Detected",
            "severity": "high" if len(found_keywords) > 3 else "medium",
            "description": f"Found {len(found_keywords)} spam-related keywords",
            "details": f"Keywords: {', '.join(found_keywords)}"
        })

    # Urgency
    urgency_count = sum(1 for phrase in urgency_phrases if phrase in content)
    if urgency_count > 1:
        confidence_score += urgency_count * 8
        indicators.append({
            "type": "Urgency Tactics",
            "severity": "high",
            "description": "Email uses high-pressure urgency tactics",
            "details": "Legitimate organizations rarely use extreme urgency in emails"
        })

    # Financial request
    money_count = sum(1 for word in money_keywords if word in content)
    if money_count > 2:
        confidence_score += 15
        indicators.append({
            "type": "Financial Request",
            "severity": "medium",
            "description": "Email contains multiple financial/money-related terms",
            "details": "Be cautious of unsolicited financial opportunities"
        })

    # Personal info
    personal_info_count = sum(1 for word in personal_info_keywords if word in content)
    if personal_info_count > 0:
        confidence_score += 25
        indicators.append({
            "type": "Personal Information Request",
            "severity": "high",
            "description": "Email requests sensitive personal information",
            "details": "Never provide personal information via email"
        })

    # Suspicious links
    suspicious_links = []
    links = re.findall(r"http[s]?://[^\s]+", email_content)
    for link in links:
        if any(p in link for p in suspicious_link_patterns):
            suspicious_links.append(link)

    if suspicious_links:
        confidence_score += 20
        indicators.append({
            "type": "Suspicious Link",
            "severity": "high",
            "description": "Email contains potentially malicious links",
            "details": "Suspicious links: " + ', '.join(suspicious_links)
        })

    # All caps detection
    caps_words = re.findall(r'\b[A-Z]{3,}\b', email_content)
    if len(caps_words) > 3:
        confidence_score += 10
        indicators.append({
            "type": "Excessive Capitalization",
            "severity": "medium",
            "description": "Email contains excessive use of capital letters",
            "details": "Often used in spam emails"
        })

    # Final confidence value
    confidence = min(95, max(5, confidence_score if confidence_score > 0 else 15))

    return {
        "confidence": confidence,
        "confidence_score": confidence_score,
        "indicators": indicators
    }
