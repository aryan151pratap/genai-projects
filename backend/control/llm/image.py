import requests
import os
from dotenv import load_dotenv
import base64

load_dotenv()
api_key = os.getenv("Stability_api_key")

def convert_to_base64(image):
	return base64.b64encode(image).decode("utf-8")

def generate_image(prompt):
	url = "https://api.stability.ai/v2beta/stable-image/generate/ultra"
	
	response = requests.post(
		url,
		headers={
			"authorization": f"Bearer {api_key}",
			"accept": "image/*"
		},	
		files={
			"prompt": (None, prompt),
			"output_format": (None, "jpeg"),
		}
	)

	if response.status_code == 200:
		return convert_to_base64(response.content)
	else:
		raise Exception(f"Error: {response.json()}")