from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain_community.embeddings import HuggingFaceEmbeddings
from datetime import datetime
import os

# Global cache
_vector_db = None
_embedding = None

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "chat_memory"


def get_vector_db():
    global _vector_db, _embedding

    if _vector_db is not None:
        return _vector_db

    print("🔄 Initializing vector DB...")

    db_exists = os.path.exists(PERSIST_DIR) and len(os.listdir(PERSIST_DIR)) > 0

    if _embedding is None:
        print("⚡ Loading embeddings model...")
        _embedding = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

    _vector_db = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=_embedding,
        persist_directory=PERSIST_DIR
    )

    if db_exists:
        print("✅ Loaded existing embeddings")
    else:
        print("🆕 Created new vector DB")

    return _vector_db

get_vector_db()

def save_chat(role, content):
    vector_db = get_vector_db()

    results = vector_db.similarity_search_with_score(content, k=1)

    if results:
        doc, score = results[0]
        if score < 0.1:
            print("⚠️ Very similar content exists, skipping")
            return

    doc = Document(
        page_content=content,
        metadata={
            "role": role,
            "timestamp": str(datetime.now())
        }
    )

    vector_db.add_documents([doc])

def get_query(query):
    vector_db = get_vector_db()

    docs = vector_db.similarity_search(query, k=5)

    seen = set()
    unique_docs = []

    for doc in docs:
        if doc.page_content not in seen:
            seen.add(doc.page_content)
            unique_docs.append(doc)

    return unique_docs