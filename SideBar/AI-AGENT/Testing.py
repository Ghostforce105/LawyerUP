from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch
import gradio as gr
from typing import Union
from fastapi import FastAPI


def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
def load_model_and_tokenizer(model_dir, base_model_name, device):
    tokenizer = AutoTokenizer.from_pretrained(model_dir)

    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_name,
        device_map="auto",
        torch_dtype=torch.float16 if device == "cuda" else torch.float32
    )

    model = PeftModel.from_pretrained(base_model, model_dir)
    model.to(device)
    model.eval()

    return model, tokenizer

def generate_response(user_input):
    prompt = f"### Instruction:\n{user_input}\n### Response:\n"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=200,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            pad_token_id=tokenizer.eos_token_id
        )

    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return decoded.split("### Response:\n")[-1].strip()


model_dir = "llama2-legal-lora"
base_model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    model, tokenizer = load_model_and_tokenizer(model_dir, base_model_name, device)
    print("Model loaded successfully.")
except Exception as e:
    print("Error loading model:", e)
    exit()

app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
