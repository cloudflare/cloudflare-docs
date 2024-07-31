---
updated: 2024-07-29
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

Or you can run this on [Google Colab](https://colab.research.google.com/github/craigsdennis/notebooks-cloudflare-workers-ai/blob/main/cloudflare-workers-ai.ipynb)

{{<stream video_id="2c60022bea5c8c1b343e76566fed76f2" video_title="Explore Workers AI Models Using a Jupyter Notebook" poster="https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/2c60022bea5c8c1b343e76566fed76f2/thumbnails/thumbnail.jpg?time=2.5s">}}

[comment]: <> (The markdown below is auto-generated from https://github.com/craigsdennis/notebooks-cloudflare-workers-ai the <audio> tag is hard coded)

---

## Explore the Workers AI API using Python

[Workers AI](/workers-ai) allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via REST API.

This notebook will explore the Workers AI REST API using the [official Python SDK](https://github.com/cloudflare/cloudflare-python).


```python
import sys
!{sys.executable} -m pip install python-dotenv requests
!{sys.executable} -m pip install --pre cloudflare
```

```python
import os
from getpass import getpass

from cloudflare import Cloudflare
from IPython.display import display, Image, Markdown, Audio
import requests
```


```python
%load_ext dotenv
%dotenv
```


```python

```

### Configuring your environment

To use the API you'll need your [Cloudflare Account ID](https://dash.cloudflare.com). Head to AI > Workers AI page and press the "Use REST API". This page will let you create a new API Token and copy your Account ID.

If you want to add these values to your environment variables, you can **create a new file** named `.env` and this notebook will read those values.

```bash
CLOUDFLARE_API_TOKEN="YOUR-TOKEN"
CLOUDFLARE_ACCOUNT_ID="YOUR-ACCOUNT-ID"
```

Otherwise you can just enter the values securely when prompted below.


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


```python
# Initialize client
client = Cloudflare(api_token=api_token)
```

## Explore tasks available on the Workers AI Platform

### Text Generation

Explore all [Text Generation Models](/workers-ai/models#text-generation)


```python
result = client.workers.ai.run(
    "@cf/meta/llama-3-8b-instruct" ,
    account_id=account_id,
    messages=[
        {"role": "system", "content": """
            You are a productivity assistant for users of Jupyter notebooks for both Mac and Windows users.

            Respond in Markdown."""
        },
        {"role": "user", "content": "How do I use keyboard shortcuts to execute cells?"}
    ]
)

display(Markdown(result["response"]))
```


Using keyboard shortcuts to execute cells in Jupyter Notebook can save you a lot of time and increase your productivity!

Here are some keyboard shortcuts to execute cells in Jupyter Notebook:

**Mac Users:**

* `Cmd + Enter` (⌘ + Enter) to execute a cell
* `Shift + Enter` to execute a cell and move to the next cell below
* `Cmd + Shift + Enter` (⌘ + Shift + Enter) to execute a cell and move to the next cell below without closing the output

**Windows Users:**

* `Ctrl + Enter` to execute a cell
* `Shift + Enter` to execute a cell and move to the next cell below
* `Ctrl + Shift + Enter` to execute a cell and move to the next cell below without closing the output

These keyboard shortcuts are Windows-compatible, so you can use them in Jupyter Notebook on your Windows machine!

You can also use the `Escape` key to clear the output of a cell, and `Alt + Enter` to execute a cell recursively (i.e., execute all cells below the current cell).

Remember to customize your Jupyter Notebook settings to fit your workflow and preferences!


### Text to Image

Explore all [Text to Image models](/workers-ai/models#text-to-image)


```python
data = client.workers.ai.with_raw_response.run(
    "@cf/lykon/dreamshaper-8-lcm",
    account_id=account_id,
    prompt="A software developer incredibly excited about AI, huge smile",
)

display(Image(data.read()))
```



![png](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/output_13_0.png)



### Image to Text

Explore all [Image to Text](/workers-ai/models/#image-to-text) models


```python
url = "https://blog.cloudflare.com/content/images/2017/11/lava-lamps.jpg"

image_request = requests.get(url, allow_redirects=True)

display(Image(image_request.content, format="jpg"))

data = client.workers.ai.run(
    "@cf/llava-hf/llava-1.5-7b-hf",
    account_id=account_id,
    image=image_request.content,
    prompt="Describe this photo",
    max_tokens=2048
)

print(data["description"])
```



![jpeg](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/output_15_0.jpg)



     The image features a display of colorful, glowing lava lamps. There are numerous lava lamps of various sizes and colors, arranged in a visually appealing manner. The lamps are placed in a row, with some positioned closer to the front and others further back. The vibrant colors and captivating glow of the lava lamps create an eye-catching and lively scene.

### Automatic Speech Recognition

Explore all [Speech Recognition models](/workers-ai/models#speech-recognition)


```python
url = "https://raw.githubusercontent.com/craigsdennis/notebooks-cloudflare-workers-ai/main/assets/craig-rambling.mp3"
display(Audio(url))
audio = requests.get(url)

response = client.workers.ai.run(
    "@cf/openai/whisper",
    account_id=account_id,
    audio=audio.content
)

response
```



<audio controls="controls"><source src="/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/craig-rambling.mp3" /></audio>


    {'text': "Hello there, I'm making a recording for a Jupiter notebook. That's a Python notebook, Jupiter, J-U-P-Y-T-E-R. Not to be confused with the planet. Anyways, let me hear, I'm gonna talk a little bit, I'm gonna make a little bit of noise, say some hard words, I'm gonna say Kubernetes, I'm not actually even talking about Kubernetes, I just wanna see if I can do Kubernetes. Anyway, this is a test of transcription and let's see how we're dead.",
     'word_count': 84,
     'words': [{'word': 'Hello',
       'start': 0.2800000011920929,
       'end': 0.7400000095367432},
      {'word': 'there,', 'start': 0.7400000095367432, 'end': 1.2400000095367432},
      {'word': "I'm", 'start': 1.2400000095367432, 'end': 1.4800000190734863},
      {'word': 'making', 'start': 1.4800000190734863, 'end': 1.6799999475479126},
      {'word': 'a', 'start': 1.6799999475479126, 'end': 1.840000033378601},
      {'word': 'recording', 'start': 1.840000033378601, 'end': 2.2799999713897705},
      {'word': 'for', 'start': 2.2799999713897705, 'end': 2.6600000858306885},
      {'word': 'a', 'start': 2.6600000858306885, 'end': 2.799999952316284},
      {'word': 'Jupiter', 'start': 2.799999952316284, 'end': 3.2200000286102295},
      {'word': 'notebook.', 'start': 3.2200000286102295, 'end': 4.059999942779541},
      {'word': "That's", 'start': 4.059999942779541, 'end': 4.28000020980835},
      {'word': 'a', 'start': 4.28000020980835, 'end': 4.380000114440918},
      {'word': 'Python', 'start': 4.380000114440918, 'end': 4.679999828338623},
      {'word': 'notebook,', 'start': 4.679999828338623, 'end': 5.460000038146973},
      {'word': 'Jupiter,', 'start': 5.460000038146973, 'end': 6.440000057220459},
      {'word': 'J', 'start': 6.440000057220459, 'end': 6.579999923706055},
      {'word': '-U', 'start': 6.579999923706055, 'end': 6.920000076293945},
      {'word': '-P', 'start': 6.920000076293945, 'end': 7.139999866485596},
      {'word': '-Y', 'start': 7.139999866485596, 'end': 7.440000057220459},
      {'word': '-T', 'start': 7.440000057220459, 'end': 7.71999979019165},
      {'word': '-E', 'start': 7.71999979019165, 'end': 7.920000076293945},
      {'word': '-R.', 'start': 7.920000076293945, 'end': 8.539999961853027},
      {'word': 'Not', 'start': 8.539999961853027, 'end': 8.880000114440918},
      {'word': 'to', 'start': 8.880000114440918, 'end': 9.300000190734863},
      {'word': 'be', 'start': 9.300000190734863, 'end': 9.420000076293945},
      {'word': 'confused', 'start': 9.420000076293945, 'end': 9.739999771118164},
      {'word': 'with', 'start': 9.739999771118164, 'end': 9.9399995803833},
      {'word': 'the', 'start': 9.9399995803833, 'end': 10.039999961853027},
      {'word': 'planet.', 'start': 10.039999961853027, 'end': 11.380000114440918},
      {'word': 'Anyways,', 'start': 11.380000114440918, 'end': 12.140000343322754},
      {'word': 'let', 'start': 12.140000343322754, 'end': 12.420000076293945},
      {'word': 'me', 'start': 12.420000076293945, 'end': 12.520000457763672},
      {'word': 'hear,', 'start': 12.520000457763672, 'end': 12.800000190734863},
      {'word': "I'm", 'start': 12.800000190734863, 'end': 12.880000114440918},
      {'word': 'gonna', 'start': 12.880000114440918, 'end': 12.9399995803833},
      {'word': 'talk', 'start': 12.9399995803833, 'end': 13.100000381469727},
      {'word': 'a', 'start': 13.100000381469727, 'end': 13.260000228881836},
      {'word': 'little', 'start': 13.260000228881836, 'end': 13.380000114440918},
      {'word': 'bit,', 'start': 13.380000114440918, 'end': 13.5600004196167},
      {'word': "I'm", 'start': 13.5600004196167, 'end': 13.65999984741211},
      {'word': 'gonna', 'start': 13.65999984741211, 'end': 13.739999771118164},
      {'word': 'make', 'start': 13.739999771118164, 'end': 13.920000076293945},
      {'word': 'a', 'start': 13.920000076293945, 'end': 14.199999809265137},
      {'word': 'little', 'start': 14.199999809265137, 'end': 14.4399995803833},
      {'word': 'bit', 'start': 14.4399995803833, 'end': 14.600000381469727},
      {'word': 'of', 'start': 14.600000381469727, 'end': 14.699999809265137},
      {'word': 'noise,', 'start': 14.699999809265137, 'end': 15.460000038146973},
      {'word': 'say', 'start': 15.460000038146973, 'end': 15.859999656677246},
      {'word': 'some', 'start': 15.859999656677246, 'end': 16},
      {'word': 'hard', 'start': 16, 'end': 16.18000030517578},
      {'word': 'words,', 'start': 16.18000030517578, 'end': 16.540000915527344},
      {'word': "I'm", 'start': 16.540000915527344, 'end': 16.639999389648438},
      {'word': 'gonna', 'start': 16.639999389648438, 'end': 16.719999313354492},
      {'word': 'say', 'start': 16.719999313354492, 'end': 16.920000076293945},
      {'word': 'Kubernetes,',
       'start': 16.920000076293945,
       'end': 17.540000915527344},
      {'word': "I'm", 'start': 17.540000915527344, 'end': 17.65999984741211},
      {'word': 'not', 'start': 17.65999984741211, 'end': 17.719999313354492},
      {'word': 'actually', 'start': 17.719999313354492, 'end': 18},
      {'word': 'even', 'start': 18, 'end': 18.18000030517578},
      {'word': 'talking', 'start': 18.18000030517578, 'end': 18.420000076293945},
      {'word': 'about', 'start': 18.420000076293945, 'end': 18.6200008392334},
      {'word': 'Kubernetes,', 'start': 18.6200008392334, 'end': 19.1200008392334},
      {'word': 'I', 'start': 19.1200008392334, 'end': 19.239999771118164},
      {'word': 'just', 'start': 19.239999771118164, 'end': 19.360000610351562},
      {'word': 'wanna', 'start': 19.360000610351562, 'end': 19.5},
      {'word': 'see', 'start': 19.5, 'end': 19.719999313354492},
      {'word': 'if', 'start': 19.719999313354492, 'end': 19.8799991607666},
      {'word': 'I', 'start': 19.8799991607666, 'end': 19.940000534057617},
      {'word': 'can', 'start': 19.940000534057617, 'end': 20.079999923706055},
      {'word': 'do', 'start': 20.079999923706055, 'end': 20.299999237060547},
      {'word': 'Kubernetes.',
       'start': 20.299999237060547,
       'end': 21.440000534057617},
      {'word': 'Anyway,', 'start': 21.440000534057617, 'end': 21.799999237060547},
      {'word': 'this', 'start': 21.799999237060547, 'end': 21.920000076293945},
      {'word': 'is', 'start': 21.920000076293945, 'end': 22.020000457763672},
      {'word': 'a', 'start': 22.020000457763672, 'end': 22.1200008392334},
      {'word': 'test', 'start': 22.1200008392334, 'end': 22.299999237060547},
      {'word': 'of', 'start': 22.299999237060547, 'end': 22.639999389648438},
      {'word': 'transcription',
       'start': 22.639999389648438,
       'end': 23.139999389648438},
      {'word': 'and', 'start': 23.139999389648438, 'end': 23.6200008392334},
      {'word': "let's", 'start': 23.6200008392334, 'end': 24.079999923706055},
      {'word': 'see', 'start': 24.079999923706055, 'end': 24.299999237060547},
      {'word': 'how', 'start': 24.299999237060547, 'end': 24.559999465942383},
      {'word': "we're", 'start': 24.559999465942383, 'end': 24.799999237060547},
      {'word': 'dead.', 'start': 24.799999237060547, 'end': 26.280000686645508}],
     'vtt': "WEBVTT\n\n00.280 --> 01.840\nHello there, I'm making a\n\n01.840 --> 04.060\nrecording for a Jupiter notebook.\n\n04.060 --> 06.440\nThat's a Python notebook, Jupiter,\n\n06.440 --> 07.720\nJ -U -P -Y -T\n\n07.720 --> 09.420\n-E -R. Not to be\n\n09.420 --> 12.140\nconfused with the planet. Anyways,\n\n12.140 --> 12.940\nlet me hear, I'm gonna\n\n12.940 --> 13.660\ntalk a little bit, I'm\n\n13.660 --> 14.600\ngonna make a little bit\n\n14.600 --> 16.180\nof noise, say some hard\n\n16.180 --> 17.540\nwords, I'm gonna say Kubernetes,\n\n17.540 --> 18.420\nI'm not actually even talking\n\n18.420 --> 19.500\nabout Kubernetes, I just wanna\n\n19.500 --> 20.300\nsee if I can do\n\n20.300 --> 22.120\nKubernetes. Anyway, this is a\n\n22.120 --> 24.080\ntest of transcription and let's\n\n24.080 --> 26.280\nsee how we're dead."}



### Translations

Explore all [Translation models](/workers-ai/models#translation)


```python
result = client.workers.ai.run(
    "@cf/meta/m2m100-1.2b",
    account_id=account_id,
    text="Artificial intelligence is pretty impressive these days. It is a bonkers time to be a builder",
    source_lang="english",
    target_lang="spanish"
)


print(result["translated_text"])
```

    La inteligencia artificial es bastante impresionante en estos días.Es un buen momento para ser un constructor


### Text Classification

Explore all [Text Classification models](/workers-ai/models#text-classification)


```python
result = client.workers.ai.run(
    "@cf/huggingface/distilbert-sst-2-int8",
    account_id=account_id,
    text="This taco is delicious"
)

result
```




    [TextClassification(label='NEGATIVE', score=0.00012679687642958015),
     TextClassification(label='POSITIVE', score=0.999873161315918)]



### Image Classification

Explore all [Image Classification models](/workers-ai/models#image-classification/)


```python
url = "https://raw.githubusercontent.com/craigsdennis/notebooks-cloudflare-workers-ai/main/assets/craig-and-a-burrito.jpg"
image_request = requests.get(url, allow_redirects=True)

display(Image(image_request.content, format="jpg"))
response = client.workers.ai.run(
    "@cf/microsoft/resnet-50",
    account_id=account_id,
    image=image_request.content
)
response
```



![jpeg](/workers-ai/static/documentation/notebooks/cloudflare-workers-ai/assets/output_27_0.jpg)






    [TextClassification(label='BURRITO', score=0.9999678134918213),
     TextClassification(label='GUACAMOLE', score=8.525597877451219e-06),
     TextClassification(label='BAGEL', score=4.702816113422159e-06),
     TextClassification(label='SPATULA', score=4.094248197361594e-06),
     TextClassification(label='POTPIE', score=3.0966698432166595e-06)]



## Summarization

Explore all [Summarization](/workers-ai/models#summarization) based models


```python
declaration_of_independence = """In Congress, July 4, 1776. The unanimous Declaration of the thirteen united States of America, When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation. We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world. He has refused his Assent to Laws, the most wholesome and necessary for the public good. He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them. He has refused to pass other Laws for the accommodation of large districts of people, unless those people would relinquish the right of Representation in the Legislature, a right inestimable to them and formidable to tyrants only. He has called together legislative bodies at places unusual, uncomfortable, and distant from the depository of their public Records, for the sole purpose of fatiguing them into compliance with his measures. He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people. He has refused for a long time, after such dissolutions, to cause others to be elected; whereby the Legislative powers, incapable of Annihilation, have returned to the People at large for their exercise; the State remaining in the mean time exposed to all the dangers of invasion from without, and convulsions within. He has endeavoured to prevent the population of these States; for that purpose obstructing the Laws for Naturalization of Foreigners; refusing to pass others to encourage their migrations hither, and raising the conditions of new Appropriations of Lands. He has obstructed the Administration of Justice, by refusing his Assent to Laws for establishing Judiciary powers. He has made Judges dependent on his Will alone, for the tenure of their offices, and the amount and payment of their salaries. He has erected a multitude of New Offices, and sent hither swarms of Officers to harrass our people, and eat out their substance. He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures. He has affected to render the Military independent of and superior to the Civil power. He has combined with others to subject us to a jurisdiction foreign to our constitution, and unacknowledged by our laws; giving his Assent to their Acts of pretended Legislation: For Quartering large bodies of armed troops among us: For protecting them, by a mock Trial, from punishment for any Murders which they should commit on the Inhabitants of these States: For cutting off our Trade with all parts of the world: For imposing Taxes on us without our Consent: For depriving us in many cases, of the benefits of Trial by Jury: For transporting us beyond Seas to be tried for pretended offences For abolishing the free System of English Laws in a neighbouring Province, establishing therein an Arbitrary government, and enlarging its Boundaries so as to render it at once an example and fit instrument for introducing the same absolute rule into these Colonies: For taking away our Charters, abolishing our most valuable Laws, and altering fundamentally the Forms of our Governments: For suspending our own Legislatures, and declaring themselves invested with power to legislate for us in all cases whatsoever. He has abdicated Government here, by declaring us out of his Protection and waging War against us. He has plundered our seas, ravaged our Coasts, burnt our towns, and destroyed the lives of our people. He is at this time transporting large Armies of foreign Mercenaries to compleat the works of death, desolation and tyranny, already begun with circumstances of Cruelty & perfidy scarcely paralleled in the most barbarous ages, and totally unworthy the Head of a civilized nation. He has constrained our fellow Citizens taken Captive on the high Seas to bear Arms against their Country, to become the executioners of their friends and Brethren, or to fall themselves by their Hands. He has excited domestic insurrections amongst us, and has endeavoured to bring on the inhabitants of our frontiers, the merciless Indian Savages, whose known rule of warfare, is an undistinguished destruction of all ages, sexes and conditions. In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people. Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends. We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor."""
len(declaration_of_independence)
```




    8116




```python
response = client.workers.ai.run(
    "@cf/facebook/bart-large-cnn",
    account_id=account_id,
    input_text=declaration_of_independence
)

response["summary"]
```




    'The Declaration of Independence was signed by the thirteen states on July 4, 1776. It was the first attempt at a U.S. Constitution. It declared the right of the people to change their Government.'


