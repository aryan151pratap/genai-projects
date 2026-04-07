import json
from flask import Blueprint, request, jsonify
from control.reader import fileReader

rag = Blueprint("rag", __name__)

@rag.route("/rag-data", methods=["POST"])
def rag_run():
	name = request.form.get("name")
	files = request.files.getlist("files")
	print(name, len(files))
	
	text = ""
	for i in files:
		text += fileReader.upload(i)
		
	return jsonify({
		"message": "documents saved..."
	})

