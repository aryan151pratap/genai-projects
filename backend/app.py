from flask import Flask, request, jsonify
from flask_cors import CORS
from route.chat.bot import bot

app = Flask(__name__)
CORS(app)

app.register_blueprint(bot)

@app.route("/")
def home():
    return "Server running 🚀"

if __name__=="__main__":
	app.run(debug=True)