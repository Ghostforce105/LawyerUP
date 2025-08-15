import json
import torch
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    BitsAndBytesConfig,
)
from peft import get_peft_model, LoraConfig, TaskType
import bitsandbytes
from google.colab import files


device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"✅ Using device: {device}")


uploaded = files.upload()
file_name = list(uploaded.keys())[0] if uploaded else "legal_chat_samples.jsonl"


def load_jsonl(path):
    with open(path, 'r', encoding='utf-8') as f:
        return [json.loads(line) for line in f]

raw_data = load_jsonl(file_name)


def format_chat_message(example):
    messages = example["messages"]
    user_msg = next((m["content"] for m in messages if m["role"] == "user"), None)
    assistant_msg = next((m["content"] for m in messages if m["role"] == "assistant" and m["content"].startswith("[Legal]")), None)

    if not user_msg or not assistant_msg:
        return None

    prompt = f"### Instruction:\n{user_msg}\n### Response:\n{assistant_msg}"
    return {"text": prompt}

formatted = list(filter(None, map(format_chat_message, raw_data)))
dataset = Dataset.from_list(formatted)


model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config
)

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)

# ✅ Tokenize + add labels
def tokenize(example):
    tokenized = tokenizer(
        example["text"],
        truncation=True,
        padding="max_length",
        max_length=512
    )
    tokenized["labels"] = tokenized["input_ids"].copy()
    return tokenized

tokenized_dataset = dataset.map(tokenize)

training_args = TrainingArguments(
    output_dir="./llama2-legal-lora",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    num_train_epochs=3,
    learning_rate=2e-4,
    logging_dir="./logs",
    logging_steps=10,
    save_strategy="epoch",
    save_total_limit=2,
    fp16=True,
    report_to="none"
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset
)


trainer.train()


model.save_pretrained("llama2-legal-lora")
tokenizer.save_pretrained("llama2-legal-lora")

print("✅ Fine-tuning complete! Model saved.")
