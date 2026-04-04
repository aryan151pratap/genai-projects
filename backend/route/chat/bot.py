import json
from flask import Blueprint, request, jsonify
from control.llm import chat
from control.chroma import connect
from control.chroma import file
from control.reader import fileReader

bot = Blueprint("bot", __name__)
s_folder = "system/"
system_prompt = "system.txt"

def history(message, filename):
	docs = connect.get_query(message)
	system = file.read_file(filename)
	if len(docs) > 0:
		system +="""

Use the Hisotry if needed:
"""
		system += "-" + "\n-".join([doc.page_content for doc in docs])

	return system

@bot.route("/bot", methods=["POST"])
def bot_reply():
	global system_prompt

	data = request.form
	role = data.get("role")
	message = data.get("content")
	action = data.get("action")
	files = files = request.files.getlist("files")
	print("\n\n")
	print(files)
	print(role, message, action, len(files))
	text = ""
	if len(files) > 0:
		text += fileReader.upload(files)
		print(text)

	current_prompt = system_prompt

	if action == "summarize_text":
		current_prompt = "summarization.txt"

	prompt = history(message, s_folder+current_prompt)
	print("prompt", prompt)
	print("\n\n")
	message += f"""

{text}
"""
	if role == "user":
		content = chat.get_response(prompt, message)
		content = json.loads(content)
		print(content, "\n\n")
	else:
		return jsonify({
			"message": "not user input"
		})
	
	data = content["memory"]

	if data["save"]:
		print("\n\n ------message saved------")
		connect.save_chat("user", message)
		connect.save_chat("bot", data["content"])

	return jsonify({
		"role": "bot",
		"content": content["bot"]
	})
