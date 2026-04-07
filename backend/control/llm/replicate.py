import replicate
import os
from dotenv import load_dotenv
import base64
import requests

load_dotenv()
os.environ["REPLICATE_API_TOKEN"] = os.getenv("REPLICATE_API_TOKEN")

def convert_to_base64(image_url):
    img = requests.get(image_url).content
    return base64.b64encode(img).decode("utf-8")

def generate_image(prompt):
    input = {
        "height": 768,
        "prompt": prompt
    }

    output = replicate.run(
        "prunaai/z-image-turbo",
        input=input
    )

    image_url = output[0]
    return convert_to_base64(image_url)