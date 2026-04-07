import json
from flask import Blueprint, request, jsonify
from control.llm import chat
from control.chroma import connect
from control.chroma import file
from control.reader import fileReader
from control.llm import image
from control.llm import huggFace
from control.llm import replicate

bot = Blueprint("bot", __name__)
s_folder = "system/"
system_prompt = "system.txt"

def get_action(action):
	global system_prompt
	if action == "summarize_text":
		return "summarization.txt"
	elif action == "generate_image":
		return "imageGeneration.txt"
	else:
		return system_prompt

def get_image(res, action):
	if action == "generate_image":
		try:
			img_bytes = huggFace.generate_image(res["enhanced_prompt"])
			res["image"] = img_bytes
			res["image_error"] = None
		except Exception as e:
			res["image"] = None
			res["image_error"] = str(e)
	return res

@bot.route("/bot", methods=["POST"])
def bot_reply():
	global system_prompt

	data = request.form
	role = data.get("role")
	user_id = data.get('user_id')
	chat_id = data.get("chat_id")
	message = data.get("content")
	msg = message
	action = data.get("action")
	url = data.get("url")
	files = request.files.getlist("files")

	text = ""
	if len(files) > 0:
		text += fileReader.upload(files, url)
		print(text)

	current_prompt = get_action(action)

	prompt = chat.history(message, s_folder+current_prompt)
	message += f"""

{text}
"""
	con = file.get_chat_history(user_id, chat_id)
	
	content = chat.get_response(prompt, message)
	content = json.loads(content)
	data = content["memory"]
	res = content["bot"]

	file.add_message(user_id, chat_id, role, msg)
	file.add_message(user_id, chat_id, "bot", res)

	if data["save"]:
		connect.save_chat("user", message)
		connect.save_chat("bot", data["content"])

	res = get_image(res, action)

	return jsonify({
		"role": "bot",
		"content": res
	})
