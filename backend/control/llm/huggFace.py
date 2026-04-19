import base64
import io
import os
import requests
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

MEDIA_SERVER = os.getenv("MEDIA_API")

api_key = os.getenv("Hugging_face")  # better naming

def convert_to_base64(pil_image):
    buffer = io.BytesIO()
    pil_image.save(buffer, format="PNG")
    buffer.seek(0)

    files = {
        "file": ("generated.png", buffer, "image/png")
    }
    response = requests.post(MEDIA_SERVER+"/images", files=files)
    res = response.json()
    return res["url"]

def generate_image(prompt):
    client = InferenceClient(
        provider="nscale",
        api_key=api_key,
    )

    image = client.text_to_image(
        prompt,
        model="black-forest-labs/FLUX.1-schnell",  # requires access
    )

    print("Image generated")

    return convert_to_base64(image)
