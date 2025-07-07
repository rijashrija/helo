from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
from flask import Flask, send_from_directory

# Initialize Flask app
# app = Flask(__name__)
app = Flask(__name__, static_folder="../build", static_url_path="")
CORS(app)  # Enable CORS for React frontend
# Download NLTK data (if not already present)
nltk.download('punkt')
nltk.download('stopwords')

# Load ML model and vectorizer
try:
    model = pickle.load(open('models/model.pkl', 'rb'))
    vectorizer = pickle.load(open('models/vectorizer.pkl', 'rb'))
except Exception as e:
    raise RuntimeError(f"Failed to load model: {str(e)}")

# Text preprocessing function
def preprocess_text(text):
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word.isalnum()]
    tokens = [word for word in tokens if word not in stopwords.words('english') and word not in string.punctuation]
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(word) for word in tokens]
    return " ".join(tokens)

# API Routes
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Ensure all other routes (like /analyser) also serve index.html
@app.route('/analyser')
def serve_analyser():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        message = data['message']
        
        # Preprocess text
        processed_text = preprocess_text(message)
        
        # Vectorize input
        X = vectorizer.transform([processed_text])
        
        # Predict
        prediction = model.predict(X)[0]
        result = "Spam" if prediction == 1 else "Not Spam"
        
        return jsonify({"result": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)