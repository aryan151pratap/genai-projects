import json
import uuid
import bcrypt
from flask import Blueprint, request, jsonify
from config.db import users_collection

login = Blueprint("login", __name__)

folder = "users/"
user_file = "users.json"
user_file = folder+user_file

@login.route("/login", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("pass")
    print(name, email, password)

    user_id = "user_" + str(uuid.uuid4())
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return jsonify({
            "message": "user already exists",
            "user_id": existing_user["id"]
        }), 400
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    user_data = {
        "id": user_id,
        "name": name,
        "email": email,
        "password": hashed_password
    }

    users_collection.insert_one(user_data)

    return jsonify({
        "user_id": user_id
    }), 201

@login.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()

    email = data.get("email")
    password = data.get("pass")

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"message": "user not found"}), 404

    if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"message": "invalid password"}), 401

    return jsonify({
        "user_id": user["id"]
    })