from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load ML model
with open("best_model.pkl", "rb") as f:
    model = pickle.load(f)

# ---------------- ROUTES ----------------

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/how")
def how():
    return render_template("how.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/classify")
def classify():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    values = [float(x) for x in request.form.values()]
    arr = np.array(values).reshape(1, -1)

    output = model.predict(arr)[0]
    prediction = "STARFORMING" if output == 0 else "STARBURST"

    return render_template("output.html", prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True, port=2222)