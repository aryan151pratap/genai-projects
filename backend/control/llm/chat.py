from groq import Groq
from dotenv import load_dotenv
import os
from control.chroma import connect
from control.chroma import file

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_groq import ChatGroq
from control.reader import toolList
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
    

def get_agent(system_prompt):

    llm = ChatGroq(
        api_key=groq_key,
        model="openai/gpt-oss-120b",
        temperature=0.7,
        tool_choice="auto"
    )

    tools = toolList.get_tool()

    agent_executor = create_agent(
        model=llm,
        tools=tools,
        system_prompt=system_prompt
    )

    return agent_executor

def get_response(systemPrompt, message):
    agent = get_agent(systemPrompt) 

    response = agent.invoke({
        "messages": [
            {"role": "user", "content": message}
        ]
    })
    print("\n\n")
    print("response\n\n")
    print(response)
    print("\n\n")
    res = response["messages"][-1].content
    return call_for_json_format(res)

    
def call_for_json_format(text):
    c = client()

    prompt = """
Convert the following response into STRICT JSON.

Return ONLY valid JSON. No explanation.

Format:
{
  "bot": "response",
  "memory": {
    "save": true/false,
    "reason": "short reason",
    "content": "important info"
  }
}
"""

    res = c.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": text}
        ]
    )

    return res.choices[0].message.content