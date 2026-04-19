from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.tools import tool
from control.reader import fileReader

search = DuckDuckGoSearchRun()

@tool
def search_ddgs(query):
	"""Search the web to get latest information or find relevant URLs."""
	text = search.run(query)
	print("\n\n tool called search ddgs")
	print(text)
	print("\n\n")
	return text

@tool
def read_url(url):
	"""Fetch and return readable content from a given URL."""
	try:
		docs = fileReader.load_web(url)
		text = "\n".join(
			doc.page_content for doc in docs
			if getattr(doc, "page_content", None)
		)
		print("\n\n tool called read urls")
		print(text)
		print("\n\n")
		return text
	except Exception as e:
		return f"Error reading URL: {str(e)}"
		
def get_tool():
	t = [search_ddgs, read_url]
	return t




