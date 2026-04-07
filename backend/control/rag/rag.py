import os
from langchain_text_splitter import RecursiveCharacterTextSplitter
from control.chroma import connect
from control.llm import chat

class Rag:
	def __init__(self):
		pass

	def chunking(document):
		text_split = RecursiveCharacterTextSplitter(
			chunk_size=100,
			chunk_overlap=20,	
			length_function=len,
			is_separator_regex=False,
		)
		texts = text_split.create_documents([document])

		print(texts)

		return texts
	
	def save_document(document):
		for i in document:
			connect.save_chat(role="docs", content=i)

		print("\n\n-------documents saved for RAG ✅✅-------\n\n")


	def get_response(message, filename):
		system = chat.history(message, )
		

