from groq import Groq
from dotenv import load_dotenv
import os
from control.chroma import connect
from control.chroma import file

load_dotenv()
groq_key = os.getenv("GROQ_api_key")

def client():
    return Groq(api_key=groq_key)

def history(message, filename):
	docs = connect.get_query(message)
	system = file.read_file(filename)
	if len(docs) > 0:
		system +="""

Use the Hisotry if needed:
"""
		system += "-" + "\n-".join([doc.page_content for doc in docs])

	return system
    
def get_response(prompt, user_text):
    c = client()

    res = c.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_text}
        ]
    )

    return res.choices[0].message.content