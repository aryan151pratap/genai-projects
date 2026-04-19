from datetime import datetime
from config.db import messages_collection

def get_user_chats(user_id):
	chats = messages_collection.distinct("chat_id", {"user_id": user_id})
	return chats[::-1]

def get_chat_messages(user_id, chat_id):
	messages = list(messages_collection.find(
		{"user_id": user_id, "chat_id": chat_id}
	).sort("timestamp", 1))

	for msg in messages:
		msg["_id"] = str(msg["_id"])

	return messages

def save_message(user_id, chat_id, role, content):
	messages_collection.insert_one({
		"user_id": user_id,
		"chat_id": chat_id,
		"role": role,
		"content": content,
		"timestamp": datetime.utcnow()
	})