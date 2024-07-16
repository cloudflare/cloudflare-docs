---
updated: 2024-02-02
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Explore Workers AI Models Using a Jupyter Notebook
meta:
  description: This notebook explores the Workers AI REST API using Python and the requests library.
tags:
  - AI
---

# Explore Workers AI Models Using a Jupyter Notebook

{{<tutorial-date-info>}}

A handy way to explore all of the models available on [Workers AI](/workers-ai) is to use a [Jupyter Notebook](https://jupyter.org/).

You can [download the Workers AI notebook](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai.ipynb) or view the embedded notebook below.

{{<stream video_id="3c46281a9b2b84ee6776a53f87580c45" video_title="Explore Workers AI Models Using a Jupyter Notebook">}}

[comment]: <> (The markdown below is auto-generated from https://github.com/craigsdennis/notebooks-cloudflare-workers-ai the <audio> tag is hard coded)

---

## Explore the Workers AI API using Python

[Workers AI](/workers-ai) allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via REST API.

This notebook will explore the Workers AI REST API using Python and the [requests](https://requests.readthedocs.io/en/latest/) library.

```python
import sys
!{sys.executable} -m pip install requests python-dotenv
```

    Requirement already satisfied: requests in ./venv/lib/python3.12/site-packages (2.31.0)
    Requirement already satisfied: python-dotenv in ./venv/lib/python3.12/site-packages (1.0.1)
    Requirement already satisfied: charset-normalizer<4,>=2 in ./venv/lib/python3.12/site-packages (from requests) (3.3.2)
    Requirement already satisfied: idna<4,>=2.5 in ./venv/lib/python3.12/site-packages (from requests) (3.6)
    Requirement already satisfied: urllib3<3,>=1.21.1 in ./venv/lib/python3.12/site-packages (from requests) (2.1.0)
    Requirement already satisfied: certifi>=2017.4.17 in ./venv/lib/python3.12/site-packages (from requests) (2023.11.17)

```python
import os

from IPython.display import display, Image, Markdown, Audio
from getpass import getpass

import requests
```

```python
%load_ext dotenv
%dotenv
```

### Configuring your environment

To use the API you'll need your [Cloudflare Account ID](https://dash.cloudflare.com) (head to Workers & Pages > Overview > Account details > Account ID) and a [Workers AI enabled API Token](https://dash.cloudflare.com/profile/api-tokens).

If you want to add these files to your environment, you can create a new file named `.env`

```bash
CLOUDFLARE_API_TOKEN="YOUR-TOKEN"
CLOUDFLARE_ACCOUNT_ID="YOUR-ACCOUNT-ID"
```

```python
if "CLOUDFLARE_API_TOKEN" in os.environ:
    api_token = os.environ["CLOUDFLARE_API_TOKEN"]
else:
    api_token = getpass("Enter you Cloudflare API Token")
```

```python
if "CLOUDFLARE_ACCOUNT_ID" in os.environ:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
else:
    account_id = getpass("Enter your account id")
```

## Explore tasks available on the Workers AI Platform

### Text Generation

Explore all [Text Generation Models](/workers-ai/models/#text-generation)

```python
model = "@cf/meta/llama-3-8b-instruct"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "system", "content": "You are a productivity assistant for users of Jupyter notebooks for both Mac and Windows users. Respond in Markdown."},
        {"role": "user", "content": "How do I use keyboard shortcuts to execute cells?"}
    ]}
)

inference = response.json()
display(Markdown(inference["result"]["response"]))
```

Great question! 😊

### Mac Users:

To execute cells using keyboard shortcuts on a Mac, you can use the following combinations:

| Shortcut        | Description                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `Ctrl + Enter`  | Execute the current cell.                                                                           |
| `Shift + Enter` | Execute the current cell and move to the next cell.                                                 |
| `Cmd + Enter`   | Execute the current cell and move to the next cell. (Only works in Jupyter Notebook 1.0 and later.) |

### Windows Users:

On Windows, you can use the following keyboard shortcuts to execute cells:

| Shortcut               | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `Ctrl + Enter`         | Execute the current cell.                                                    |
| `Shift + Enter`        | Execute the current cell and move to the next cell.                          |
| `Shift + Ctrl + Enter` | Execute the current cell and move to the next cell without leaving the cell. |

Tips:

- You can also use the `F5` key to execute the current cell on both Mac and Windows.
-

### Text to Image

Explore all [Text to Image models](/workers-ai/models/#text-to-image)

```python
model = "@cf/stabilityai/stable-diffusion-xl-base-1.0"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"prompt": "A pencil drawing of an excited developer using an API"}
)

display(Image(response.content))
```

![png](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/output_11_0.png)

### Translations

Explore all [Translation models](/workers-ai/models/#translation)

```python
model = "@cf/meta/m2m100-1.2b"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={
        "text": "Artificial intelligence is pretty impressive these days. What do you think?",
        "source_lang": "english",
        "target_lang": "spanish"
    }
)

inference = response.json()
print(inference["result"]["translated_text"])
```

    La inteligencia artificial es bastante impresionante en estos días. ¿Qué piensas?

### Text Classification

Explore all [Text Classification models](/workers-ai/models/#text-classification)

```python
model = "@cf/huggingface/distilbert-sst-2-int8"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"text": "This taco is delicious"}
)

inference = response.json()
inference["result"]
```

    [{'label': 'NEGATIVE', 'score': 0.00012679687642958015},
     {'label': 'POSITIVE', 'score': 0.999873161315918}]

### Automatic Speech Recognition

Explore all [Speech Recognition models](/workers-ai/models/#automatic-speech-recognition)

```python
model = "@cf/openai/whisper"

url = "https://raw.githubusercontent.com/craigsdennis/notebooks-cloudflare-workers-ai/main/assets/craig-rambling.mp3"
display(Audio(url))
audio = requests.get(url)

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    data=audio.content
)

inference = response.json()
inference
```

<audio controls="controls"><source src="/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/craig-rambling.mp3" /></audio>

    {'result': {'text': "Hello there, I'm making a recording for a Jupiter notebook. That's a Python notebook, Jupiter, J-U-P-Y-T-E-R. Not to be confused with the planet. Anyways, let me hear you. I'm gonna talk a little bit. I'm gonna make a little bit of noise. Say some hard words. I'm gonna say Kubernetes. I'm not actually even talking about Kubernetes. I just want to see if they can do Kubernetes. Anyway, this is a test of transcription and let's see how we're dead!",
      'word_count': 86,
      'words': [{'word': 'Hello',
        'start': 0.30000001192092896,
        'end': 0.7599999904632568},
       {'word': 'there,', 'start': 0.7599999904632568, 'end': 1.2799999713897705},
       {'word': "I'm", 'start': 1.2799999713897705, 'end': 1.5},
       {'word': 'making', 'start': 1.5, 'end': 1.7000000476837158},
       {'word': 'a', 'start': 1.7000000476837158, 'end': 1.8600000143051147},
       {'word': 'recording',
        'start': 1.8600000143051147,
        'end': 2.2799999713897705},
       {'word': 'for', 'start': 2.2799999713897705, 'end': 2.680000066757202},
       {'word': 'a', 'start': 2.680000066757202, 'end': 2.799999952316284},
       {'word': 'Jupiter', 'start': 2.799999952316284, 'end': 3.259999990463257},
       {'word': 'notebook.',
        'start': 3.259999990463257,
        'end': 3.6600000858306885},
       {'word': "That's", 'start': 3.6600000858306885, 'end': 4.300000190734863},
       {'word': 'a', 'start': 4.300000190734863, 'end': 4.380000114440918},
       {'word': 'Python', 'start': 4.380000114440918, 'end': 4.699999809265137},
       {'word': 'notebook,', 'start': 4.699999809265137, 'end': 5.480000019073486},
       {'word': 'Jupiter,', 'start': 5.480000019073486, 'end': 6.440000057220459},
       {'word': 'J', 'start': 6.440000057220459, 'end': 6.619999885559082},
       {'word': '-U', 'start': 6.619999885559082, 'end': 6.960000038146973},
       {'word': '-P', 'start': 6.960000038146973, 'end': 7.179999828338623},
       {'word': '-Y', 'start': 7.179999828338623, 'end': 7.460000038146973},
       {'word': '-T', 'start': 7.460000038146973, 'end': 7.739999771118164},
       {'word': '-E', 'start': 7.739999771118164, 'end': 7.940000057220459},
       {'word': '-R.', 'start': 7.940000057220459, 'end': 8.34000015258789},
       {'word': 'Not', 'start': 8.520000457763672, 'end': 8.899999618530273},
       {'word': 'to', 'start': 8.899999618530273, 'end': 9.34000015258789},
       {'word': 'be', 'start': 9.34000015258789, 'end': 9.4399995803833},
       {'word': 'confused', 'start': 9.4399995803833, 'end': 9.760000228881836},
       {'word': 'with', 'start': 9.760000228881836, 'end': 9.979999542236328},
       {'word': 'the', 'start': 9.979999542236328, 'end': 10.0600004196167},
       {'word': 'planet.', 'start': 10.0600004196167, 'end': 10.699999809265137},
       {'word': 'Anyways,', 'start': 10.699999809265137, 'end': 12.15999984741211},
       {'word': 'let', 'start': 12.15999984741211, 'end': 12.4399995803833},
       {'word': 'me', 'start': 12.4399995803833, 'end': 12.539999961853027},
       {'word': 'hear', 'start': 12.539999961853027, 'end': 12.720000267028809},
       {'word': 'you.', 'start': 12.720000267028809, 'end': 12.819999694824219},
       {'word': "I'm", 'start': 12.819999694824219, 'end': 12.899999618530273},
       {'word': 'gonna', 'start': 12.899999618530273, 'end': 12.960000038146973},
       {'word': 'talk', 'start': 12.960000038146973, 'end': 13.140000343322754},
       {'word': 'a', 'start': 13.140000343322754, 'end': 13.279999732971191},
       {'word': 'little', 'start': 13.279999732971191, 'end': 13.399999618530273},
       {'word': 'bit.', 'start': 13.399999618530273, 'end': 13.579999923706055},
       {'word': "I'm", 'start': 13.579999923706055, 'end': 13.680000305175781},
       {'word': 'gonna', 'start': 13.680000305175781, 'end': 13.739999771118164},
       {'word': 'make', 'start': 13.739999771118164, 'end': 13.9399995803833},
       {'word': 'a', 'start': 13.9399995803833, 'end': 14.220000267028809},
       {'word': 'little', 'start': 14.220000267028809, 'end': 14.4399995803833},
       {'word': 'bit', 'start': 14.4399995803833, 'end': 14.619999885559082},
       {'word': 'of', 'start': 14.619999885559082, 'end': 14.720000267028809},
       {'word': 'noise.', 'start': 14.720000267028809, 'end': 15.479999542236328},
       {'word': 'Say', 'start': 15.479999542236328, 'end': 15.880000114440918},
       {'word': 'some', 'start': 15.880000114440918, 'end': 16.020000457763672},
       {'word': 'hard', 'start': 16.020000457763672, 'end': 16.200000762939453},
       {'word': 'words.', 'start': 16.200000762939453, 'end': 16.520000457763672},
       {'word': "I'm", 'start': 16.520000457763672, 'end': 16.65999984741211},
       {'word': 'gonna', 'start': 16.65999984741211, 'end': 16.739999771118164},
       {'word': 'say', 'start': 16.739999771118164, 'end': 16.920000076293945},
       {'word': 'Kubernetes.',
        'start': 16.920000076293945,
        'end': 17.540000915527344},
       {'word': "I'm", 'start': 17.540000915527344, 'end': 17.68000030517578},
       {'word': 'not', 'start': 17.68000030517578, 'end': 17.739999771118164},
       {'word': 'actually',
        'start': 17.739999771118164,
        'end': 18.020000457763672},
       {'word': 'even', 'start': 18.020000457763672, 'end': 18.200000762939453},
       {'word': 'talking', 'start': 18.200000762939453, 'end': 18.420000076293945},
       {'word': 'about', 'start': 18.420000076293945, 'end': 18.639999389648438},
       {'word': 'Kubernetes.',
        'start': 18.639999389648438,
        'end': 18.940000534057617},
       {'word': 'I', 'start': 18.940000534057617, 'end': 19.260000228881836},
       {'word': 'just', 'start': 19.260000228881836, 'end': 19.3799991607666},
       {'word': 'want', 'start': 19.3799991607666, 'end': 19.520000457763672},
       {'word': 'to', 'start': 19.520000457763672, 'end': 19.600000381469727},
       {'word': 'see', 'start': 19.600000381469727, 'end': 19.739999771118164},
       {'word': 'if', 'start': 19.739999771118164, 'end': 19.899999618530273},
       {'word': 'they', 'start': 19.899999618530273, 'end': 19.979999542236328},
       {'word': 'can', 'start': 19.979999542236328, 'end': 20.100000381469727},
       {'word': 'do', 'start': 20.100000381469727, 'end': 20.31999969482422},
       {'word': 'Kubernetes.',
        'start': 20.31999969482422,
        'end': 21.399999618530273},
       {'word': 'Anyway,', 'start': 21.5, 'end': 21.799999237060547},
       {'word': 'this', 'start': 21.799999237060547, 'end': 21.940000534057617},
       {'word': 'is', 'start': 21.940000534057617, 'end': 22.040000915527344},
       {'word': 'a', 'start': 22.040000915527344, 'end': 22.15999984741211},
       {'word': 'test', 'start': 22.15999984741211, 'end': 22.31999969482422},
       {'word': 'of', 'start': 22.31999969482422, 'end': 22.639999389648438},
       {'word': 'transcription',
        'start': 22.639999389648438,
        'end': 23.15999984741211},
       {'word': 'and', 'start': 23.15999984741211, 'end': 23.639999389648438},
       {'word': "let's", 'start': 23.639999389648438, 'end': 24.100000381469727},
       {'word': 'see', 'start': 24.100000381469727, 'end': 24.31999969482422},
       {'word': 'how', 'start': 24.31999969482422, 'end': 24.579999923706055},
       {'word': "we're", 'start': 24.579999923706055, 'end': 24.81999969482422},
       {'word': 'dead!', 'start': 24.81999969482422, 'end': 26.139999389648438}]},
     'success': True,
     'errors': [],
     'messages': []}

### Image Classification

Explore all [Image Classification models](/workers-ai/models/#image-classification)

```python
model = "@cf/microsoft/resnet-50"

url = "https://raw.githubusercontent.com/craigsdennis/notebooks-cloudflare-workers-ai/main/assets/craig-and-a-burrito.jpg"
image_request = requests.get(url, allow_redirects=True)

display(Image(image_request.content, format="jpg"))
response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    data=image_request.content
)

inference = response.json()
inference["result"]
```

![jpeg](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/output_19_0.jpg)

    [{'label': 'BURRITO', 'score': 0.9999678134918213},
     {'label': 'GUACAMOLE', 'score': 8.532096217095386e-06},
     {'label': 'BAGEL', 'score': 4.704045295511605e-06},
     {'label': 'SPATULA', 'score': 4.0899126361182425e-06},
     {'label': 'POTPIE', 'score': 3.0937740120862145e-06}]
