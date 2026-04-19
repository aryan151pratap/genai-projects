import json
from flask import Blueprint, request, jsonify
from control.llm import chat
from control.chroma import connect
from control.chroma import file
from control.reader import fileReader
from control.llm import huggFace
from models.message import get_chat_messages, save_message, get_user_chats

bot = Blueprint("bot", __name__)
s_folder = "system/"
system_prompt = "system.txt"

def get_action(message, action):
	global system_prompt
	if action == "summarize_text":
		prompt_file = "summarization.txt"
	elif action == "generate_image":
		prompt_file = "imageGeneration.txt"
	else:
		prompt_file = system_prompt

	return chat.history(message, s_folder + prompt_file)

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

	prompt = get_action(message, action)	
	message += f"\n\n{text}"

	con = get_chat_messages(user_id, chat_id)
	
	content = chat.get_response(prompt, message)
	try:
		content = json.loads(content)
	except Exception:
		content = {
			"bot": content,
			"memory": {
				"save": False,
				"reason": "Invalid JSON fallback",
				"content": ""
			}
		}
	

	memory_data = content["memory"]
	res = content["bot"]

	res = get_image(res, action)
	
	if user_id:
		save_message(user_id, chat_id, role, msg)
		save_message(user_id, chat_id, "bot", res)

	if memory_data["save"]:
		connect.save_chat("user", message)
		connect.save_chat("bot", memory_data["content"])


	return jsonify({
		"role": "bot",
		"content": res
	})



@bot.route("/history", methods=["POST"])
def get_history():
	data = request.get_json()
	user_id = data.get("user_id")
	print(user_id)

	result = get_user_chats(user_id)

	return jsonify({
		"history": result
	})

@bot.route("/chat", methods=["POST"])
def get_chatHistory():
	data = request.get_json()
	user_id = data.get("user_id")
	chat_id = data.get("chat_id")
	print(user_id, chat_id)
	result = get_chat_messages(user_id, chat_id)
	return jsonify({
		"data": result
	})
