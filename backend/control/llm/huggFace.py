import base64
import io
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

api_key = os.getenv("Hugging_face")  # better naming

def convert_to_base64(pil_image):
    buffer = io.BytesIO()
    pil_image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")

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
