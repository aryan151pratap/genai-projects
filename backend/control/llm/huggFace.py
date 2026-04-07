import requests
import base64
import torch
from diffusers import FluxPipeline

def convert_to_base64(img_bytes):
    return base64.b64encode(img_bytes).decode("utf-8")

# def generate_image(prompt):
#     response = requests.post(
#         API_URL,
#         headers=headers,
#         json={"inputs": prompt}
#     )

#     if response.status_code != 200:
#         raise Exception(response.text)

#     return convert_to_base64(response.content)


pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()

def generate_image(prompt):
    image = pipe(
        prompt,
        guidance_scale=0.0,
        num_inference_steps=4,
        max_sequence_length=256,
        generator=torch.Generator("cpu").manual_seed(0)
    ).images[0]

    print("\n\n" + "image" + image + "\n\n")

    return image
