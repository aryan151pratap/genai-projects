import json
import os
import threading

def read_file(file):
    with open(file, "r") as f:
        return f.read()


def write_file(file, text):
    with open(file, "a") as f:
        f.write(text + "\n")
    return True


def read_json(file):
    if not os.path.exists(file):
        return {}

    try:
        with open(file, "r") as f:
            return json.load(f)
    except:
        return {}


def write_json(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=4)
    return True

# ---------------------------------------------------------
folder = "users/"
file = "chat_history.json"
CHAT_FILE = folder + file
lock = threading.Lock()


def load_all():
    if not os.path.exists(CHAT_FILE):
        return {}
    try:
        with open(CHAT_FILE, "r") as f:
            return json.load(f)
    except:
        return {}


def save_all(data):
    with lock:
        with open(CHAT_FILE, "w") as f:
            json.dump(data, f, indent=4)


def get_chat_history(user_id, chat_id):
    data = load_all()
    return data.get(user_id, {}).get(chat_id, [])


def add_message(user_id, chat_id, role, content):
    data = load_all()

    if user_id not in data:
        data[user_id] = {}

    if chat_id not in data[user_id]:
        data[user_id][chat_id] = []

    if isinstance(content, (dict, list, tuple)):
        content = json.dumps(content)

    data[user_id][chat_id].append({
        "role": role,
        "content": content
    })

    save_all(data)