import os
from langchain_community.document_loaders import TextLoader,PyPDFLoader,WebBaseLoader

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def load_text_file(path):
	loader = TextLoader(path,  encoding="utf-8")
	return loader.load()


def load_pdf_file(path):
	loader = PyPDFLoader(path)
	return loader.load()


def load_web(url):
	loader = WebBaseLoader(url)
	return loader.load()


def upload(files, url=None):
	docs = []

	for f in files:
		filename = f.filename
		print(filename)
		path = os.path.join(UPLOAD_FOLDER, filename)
		f.save(path)

		if filename.endswith(".txt"):
			docs.extend(load_text_file(path))

		elif filename.endswith(".pdf"):
			docs.extend(load_pdf_file(path))

	if url:
		docs.extend(load_web(url))
			
	texts = []
	for doc in docs:
		if doc.page_content:  # avoid None
			texts.append(doc.page_content)

	return "\n".join(texts)