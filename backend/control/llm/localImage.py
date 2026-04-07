import base64
from io import BytesIO
from diffusers import StableDiffusionPipeline
import torch

# load model once (IMPORTANT)
device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = StableDiffusionPipeline.from_pretrained(
	"runwayml/stable-diffusion-v1-5"
)
pipe = pipe.to(device)


def convert_to_base64(image):
	buffered = BytesIO()
	image.save(buffered, format="PNG")
	return base64.b64encode(buffered.getvalue()).decode("utf-8")


def generate_image(prompt):
	result = pipe(prompt)
	image = result.images[0]
	return convert_to_base64(image)