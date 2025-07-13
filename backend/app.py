from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
import re

# Initialize Flask app
app = Flask(__name__, static_folder="../build", static_url_path="")
CORS(app)

# Download NLTK data (if not already present)
nltk.download('punkt')
nltk.download('stopwords')

# Initialize stemmer
ps = PorterStemmer()

# Load ML model and vectorizer
try:
    model = pickle.load(open('models/model1.pkl', 'rb'))
    vectorizer = pickle.load(open('models/vectorizer1.pkl', 'rb'))
except Exception as e:
    raise RuntimeError(f"Failed to load model or vectorizer: {str(e)}")

# ✅ Exact preprocessing logic from training phase
def preprocess_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)

# 🔍 Keyword-based scoring logic
def calculate_confidence_score(email_content):
    indicators = []
    confidence_score = 0
    content = email_content.lower()

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

    found_keywords = [kw for kw in spam_keywords if kw in content]
    if found_keywords:
        confidence_score += len(found_keywords) * 10
        indicators.append({
            "type": "Spam Keywords Detected",
            "severity": "high" if len(found_keywords) > 3 else "medium",
            "description": f"Found {len(found_keywords)} spam-related keywords",
            "details": f"Keywords: {', '.join(found_keywords)}"
        })

    urgency_count = sum(1 for phrase in urgency_phrases if phrase in content)
    if urgency_count > 1:
        confidence_score += urgency_count * 8
        indicators.append({
            "type": "Urgency Tactics",
            "severity": "high",
            "description": "Email uses high-pressure urgency tactics",
            "details": "Legitimate organizations rarely use extreme urgency in emails"
        })

    money_count = sum(1 for word in money_keywords if word in content)
    if money_count > 2:
        confidence_score += 15
        indicators.append({
            "type": "Financial Request",
            "severity": "medium",
            "description": "Email contains multiple financial/money-related terms",
            "details": "Be cautious of unsolicited financial opportunities"
        })

    personal_info_count = sum(1 for word in personal_info_keywords if word in content)
    if personal_info_count > 0:
        confidence_score += 25
        indicators.append({
            "type": "Personal Information Request",
            "severity": "high",
            "description": "Email requests sensitive personal information",
            "details": "Never provide personal information via email"
        })

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

    caps_words = re.findall(r'\b[A-Z]{3,}\b', email_content)
    if len(caps_words) > 3:
        confidence_score += 10
        indicators.append({
            "type": "Excessive Capitalization",
            "severity": "medium",
            "description": "Email contains excessive use of capital letters",
            "details": "Often used to grab attention in spam emails"
        })

    confidence = min(95, max(5, confidence_score if confidence_score > 0 else 15))

    return {
        "confidence": confidence,
        "confidence_score": confidence_score,
        "indicators": indicators
    }

# Serve React frontend
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/analyser')
def serve_analyser():
    return send_from_directory(app.static_folder, 'index.html')


# In app.py
users = {
    "admin@example.com": "password123"  # Demo only - hash passwords in production
}

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if email in users and users[email] == password:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Invalid credentials"}), 401
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# 🚀 Prediction route with hybrid analysis
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        message = data['message']

        # Preprocess & transform for model
        processed_text = preprocess_text(message)
        X = vectorizer.transform([processed_text])

        # Predict with model
        prediction = model.predict(X)[0]
        probabilities = model.predict_proba(X)[0]
        model_confidence = max(probabilities) * 100

        result = "Spam" if prediction == 1 else "Not Spam"

        # Content-based scoring
        keyword_score = calculate_confidence_score(message)

        # Combine scores
        final_confidence = max(model_confidence, keyword_score['confidence']) if prediction == 1 else min(model_confidence, 100 - keyword_score['confidence'])

        return jsonify({
            "result": result,
            "model_confidence": round(model_confidence, 2),
            "keyword_confidence": keyword_score['confidence'],
            "indicators": keyword_score['indicators'],
            "final_confidence": round(final_confidence, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)