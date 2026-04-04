from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
groq_key = os.getenv("GROQ_api_key")

def client():
    return Groq(api_key=groq_key)

    
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