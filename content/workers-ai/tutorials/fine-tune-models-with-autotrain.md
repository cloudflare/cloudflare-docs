---
updated: 2024-04-01
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Fine Tune Models With AutoTrain from HuggingFace
---

# Fine Tune Models With AutoTrain from HuggingFace

Fine tuning an AI model gives you the opportunity to add additional training data to the model. Workers AI allows for [Low-Rank Adaptation, LoRA, adapters](/workers-ai/fine-tunes/loras/) that will allow you to finetune our models.

In this tutorial, we will explore how to create our own LoRAs. We will focus on [LLM Finetuning using AutoTrain](https://huggingface.co/docs/autotrain/llm_finetuning).


## 1. Create a CSV file with your training data

Start by creating a CSV, Comma Separated Values, file. This file will only have one column named `text`. Set the header by adding the word `text` on a line by itself.

Now you need to figure out what you want to add to your model.

Example formats are below:

```text
### Human: What is the meaning of life? ### Assistant: 42.
```

If your training row contains newlines, you should wrap it with quotes.

```text
"human: What is the meaning of life? \n bot: 42."
```

Different models, like Mistral, will provide a specific [chat template/instruction format](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1#instruction-format)

```text
<s>[INST] What is the meaning of life? [/INST] 42</s>
```

## 2. Configure the HuggingFace Autotrain Advanced Notebook

Open the [HuggingFace Autotrain Advanced Notebook](https://colab.research.google.com/github/huggingface/autotrain-advanced/blob/main/colabs/AutoTrain_LLM.ipynb)

In order to give your AutoTrain ample memory, you will need to need to choose a different Runtime. From the menu at the top of the Notebook choose Runtime > Change Runtime Type. Choose A100.

{{<Aside type="note">}}
These GPUs will cost money. A typical AutoTrain session typically costs less than $1 USD.
{{</Aside>}}

The notebook contains a few interactive sections that we will need to change.

### Project Config

Modify the following fields

- **project_name**: Choose a descriptive name for you to remember later
- **model_name**: Choose from the one of the official HuggingFace base models that we support:
  - `mistralai/Mistral-7B-Instruct-v0.2`
  - `google/gemma-2b-it`
  - `google/gemma-7b-it`
  - `meta-llama/llama-2-7b-chat-hf`

### Optional Section: Push to Hub

Although not required to use AutoTrain, creating a [HuggingFace account](https://huggingface.co/join) will help you keep your finetune artifacts in a handy repository for you to refer to later.

If you do not perform the HuggingFace setup you can still download your files from the Notebook.

Follow the instructions [in the notebook](https://colab.research.google.com/github/huggingface/autotrain-advanced/blob/main/colabs/AutoTrain_LLM.ipynb) to create an account and token if necessary.

### Section: Hyperparameters

We only need to change a few of these fields to ensure things work on Cloudflare Workers AI.

- **quantization**: Change the drop down to `none`
- **lora-r**: Change the value to `8`

{{<Aside type="warning">}}
At the time of this writing, changing the quantization field breaks the code generation. You may need to edit the code and put quotes around the value.

Change the line that says `quantization = none` to `quantization = "none"`.
{{</Aside>}}

## 3. Upload your CSV file to the Notebook

Notebooks have a folder structure which you can access by clicking the folder icon on the left hand navigation bar.

Create a folder named data.

You can drag your CSV file into the notebook.

Ensure that it is named **train.csv**

## 4. Execute the Notebook

In the Notebook menu, choose Runtime > Run All.

It will run through each cell of the notebook, first doing installations, then configuring and running your AutoTrain session.

This might take some time depending on the size of your train.csv file.

If you encounter the following error, it is caused by an Out of Memory error. You might want to change your runtime to a bigger GPU backend.

```bash
subprocess.CalledProcessError: Command '['/usr/bin/python3', '-m', 'autotrain.trainers.clm', '--training_config', 'blog-instruct/training_params.json']' died with <Signals.SIGKILL: 9>.
```

## 5. Download The LoRA


### Optional: HuggingFace

If you pushed to HuggingFace you will find your new model card that you named in **project_name** above. Your model card is private by default. Navigate to the files and download the files listed below.

### Notebook

In your Notebook you can also find the needed files. A new folder that matches your **project_name** will be there.

Download the following files:

- `adapter_model.safetensors`
- `adapter_config.json`

## 6. Update Adapter Config

You need to add one line to your `adapter_config.json` that you downloaded.

`"model_type": "mistral"`

Where `model_type` is the architecture. Current valid values are `mistral`, `gemma`, and `llama`.

## 7. Upload the Fine Tune to your Cloudflare Account

Now that you have your files, you can add them to your account.

You can either use the [REST API or Wrangler](/workers-ai/fine-tunes/loras/).

## 8. Use your Fine Tune in your Generations

After you have your new fine tune all set up, you are ready to [put it to use in your inference requests](/workers-ai/fine-tunes/loras/#running-inference-with-loras).
