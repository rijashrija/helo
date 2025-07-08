from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string

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

# Serve React frontend
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/analyser')
def serve_analyser():
    return send_from_directory(app.static_folder, 'index.html')

# 🚀 Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        message = data['message']

        # Preprocess & transform
        processed_text = preprocess_text(message)
        X = vectorizer.transform([processed_text])

        # Predict label and confidence
        prediction = model.predict(X)[0]
        probabilities = model.predict_proba(X)[0]
        confidence = max(probabilities) * 100  # e.g., 93.85

        result = "Spam" if prediction == 1 else "Not Spam"

        return jsonify({
            "result": result,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
