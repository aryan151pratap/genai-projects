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
