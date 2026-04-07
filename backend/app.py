from flask import Flask, request, jsonify
from flask_cors import CORS
from route.bot import bot
from route.rag import rag
from route.login import login

app = Flask(__name__)
CORS(app)

app.register_blueprint(bot)
app.register_blueprint(rag)
app.register_blueprint(login)

@app.route("/")
def home():
    return "Server running 🚀"

if __name__=="__main__":
	app.run(debug=True)