import os
from dotenv import load_dotenv
import requests
from langchain_community.document_loaders import TextLoader, PyPDFLoader, WebBaseLoader


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

load_dotenv()

EXTERNAL_API = os.getenv("MEDIA_API")
print("EXTERNAL_API =", EXTERNAL_API)

def load_text_file(path):
	loader = TextLoader(path, encoding="utf-8")
	return loader.load()


def load_pdf_file(path):
	loader = PyPDFLoader(path)
	return loader.load()


def load_web(url):
	loader = WebBaseLoader(url)
	return loader.load()


def send_file(path, filename, mime_type, endpoint):
	with open(path, "rb") as f:
		files = {
			"file": (filename, f, mime_type)
		}
		return requests.post(endpoint, files=files)


def upload(files, url=None):
	docs = []

	for f in files:
		filename = f.filename
		path = os.path.join(UPLOAD_FOLDER, filename)

		# save locally
		f.save(path)

		if filename.endswith(".txt"):
			res = send_file(
				path, filename, "text/plain", EXTERNAL_API + "/documents"
			)
			print(res.text)
			docs.extend(load_text_file(path))

		elif filename.endswith(".pdf"):
			res = send_file(
				path, filename, "application/pdf", EXTERNAL_API + "/documents"
			)
			print(res.text)
			docs.extend(load_pdf_file(path))

		elif filename.endswith(".jpg") or filename.endswith(".png"):
			res = send_file(
				path, filename, "image/jpeg", EXTERNAL_API + "/images"
			)
			print(res.text)

	if url:
		docs.extend(load_web(url))

	return "\n".join(
		doc.page_content for doc in docs if getattr(doc, "page_content", None)
	)