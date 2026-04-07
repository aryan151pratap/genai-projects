import json
import uuid
from flask import Blueprint, request, jsonify
from control.chroma import file

login = Blueprint("login", __name__)

folder = "users/"
user_file = "users.json"

@login.route("/login", methods=["POST"])
def signup():
    data = request.form

    name = data.get("name")
    email = data.get("email")
    password = data.get("pass")

    user_id = "user_" + str(uuid.uuid4())

    user_data = {
        "id": user_id,
        "name": name,
        "email": email,
        "password": password
    }

    try:
        existing_data = file.read_json(user_file)
    except:
        existing_data = {}

    existing_data[user_id] = user_data
    file.write_json(user_file, existing_data)

    return jsonify({
        "user_id": user_id
    })