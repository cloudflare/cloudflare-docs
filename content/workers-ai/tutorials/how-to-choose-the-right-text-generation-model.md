---
updated: 2024-02-06
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Choose the Right Text Generation Model
weight: 1
---

# Choose the Right Text Generation Model

A great way to explore the models that are available to you on [Workers AI](/workers-ai) is to use a [Jupyter Notebook](https://jupyter.org/).

You can [download the Workers AI Text Generation Exploration notebook](/workers-ai/static/documentation/notebooks/text-generation-model-exploration.ipynb) or view the embedded notebook below.

{{<stream video_id="4b4f0b9d7783512b8787e39424cfccd5">}}

[comment]: <> (The markdown below is auto-generated from https://github.com/craigsdennis/notebooks-cloudflare-workers-ai)

---

## How to Choose The Right Text Generation Model

Models come in different shapes and sizes, and choosing the right one for the task, can cause analysis paralysis.

The good news is that on the [Workers AI Text Generation](/workers-ai/models/#text-generation) interface is always the same, no matter which model you choose.

In an effort to aid you in your journey of finding the right model, this notebook will help you get to know your options in a speed dating type of scenario.

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
from getpass import getpass
from timeit import default_timer as timer

from IPython.display import display, Image, Markdown, Audio

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

```python
# Given a set of models and questions, display in the cell each response to the question, from each model
# Include full completion timing
def speed_date(models, questions):
    for model in models:
        display(Markdown(f"---\n #### {model}"))
        for question in questions:
            quoted_question = "\n".join(f"> {line}" for line in question.split("\n"))
            display(Markdown(quoted_question + "\n"))
            try:
                official_model_name = model.split("/")[-1]
                start = timer()
                response = requests.post(
                    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
                    headers={"Authorization": f"Bearer {api_token}"},
                    json={"messages": [
                        {"role": "system", "content": f"You are a self-aware language model ({official_model_name}) who is honest and direct about any direct question from the user. You know your strengths and weaknesses."},
                        {"role": "user", "content": question}
                    ]}
                )
                elapsed = timer() - start
                inference = response.json()
                display(Markdown(inference["result"]["response"]))
                display(Markdown(f"_Generated in *{elapsed:.2f}* seconds_"))
            except Exception as ex:
                print("uh oh")
                print(ex)
                print(inference)

        display(Markdown("\n\n---"))
```

### Getting to know your models

Who better to tell you about the specific models than themselves?!

The timing here is specific to the entire completion, but remember all Text Generation models on [Workers AI support streaming](/workers-ai/models/#text-generation).

```python
models = [
    "@hf/thebloke/zephyr-7b-beta-awq",
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
    "@hf/thebloke/neural-chat-7b-v3-1-awq",
    "@hf/thebloke/llama-2-13b-chat-awq",
]

questions = [
    "What are the top 3 tasks where you excel? Please keep things brief.",
    "What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.",
]

speed_date(models, questions)
```

---

#### @hf/thebloke/zephyr-7b-beta-awq

> What are the top 3 tasks where you excel? Please keep things brief.

1. Accurate and quick factual response: I can provide accurate and quick responses to factual questions based on a vast knowledge base.

2. Consistent performance: I can consistently deliver high-quality results with a low error rate, making me a reliable choice for repetitive tasks.

3. Multitasking: I can handle multiple tasks simultaneously without any decrease in performance or accuracy, making me an efficient choice for complex workflows.

_Generated in *4.45* seconds_

> What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.

1. Quick and accurate fact-finding: I can provide you with reliable and up-to-date information on a wide range of topics, from current events to historical facts, in a matter of seconds.

2. Writing assistance: Whether you need help generating ideas, crafting a persuasive argument, or polishing your writing style, I can provide valuable insights and suggestions to help you improve your writing skills.

3. Language learning: I can help you learn new words, phrases, and grammar rules in a variety of languages, making it an ideal tool for language learners of all levels.

_Generated in *3.63* seconds_

---

---

#### @hf/thebloke/mistral-7b-instruct-v0.1-awq

> What are the top 3 tasks where you excel? Please keep things brief.

1. Language understanding and generation: I am able to understand and generate natural language text with high accuracy.
2. Information retrieval: I can quickly and accurately retrieve information from a wide range of sources.
3. Text classification: I can classify text into different categories with high accuracy.

_Generated in *2.35* seconds_

> What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.

1. **Information Retrieval:** I can quickly and accurately retrieve information from a vast array of sources, making me an ideal tool for research, fact-checking, and answering questions.
2. **Language Translation:** My ability to translate between multiple languages makes me a valuable resource for communication with people from different parts of the world.
3. **Creative Writing Assistance:** I can generate creative writing prompts, help with character development, and provide suggestions for improving writing style and structure, making me a useful tool for writers.

_Generated in *4.33* seconds_

---

---

#### @hf/thebloke/openhermes-2.5-mistral-7b-awq

> What are the top 3 tasks where you excel? Please keep things brief.

1. Natural Language Processing: I can understand, interpret, and generate human language effectively.
2. Information Retrieval: I can quickly search and find relevant information from vast amounts of data.
3. Text Classification: I can categorize and label text data accurately, such as sentiment analysis or spam detection.

_Generated in *1.90* seconds_

> What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.

1. Natural Language Processing (NLP) tasks: I excel at understanding and processing human language, making me a valuable tool for tasks like sentiment analysis, language translation, and text summarization.
2. Information Retrieval: My vast knowledge base and ability to quickly search and analyze large amounts of data make me an ideal tool for answering questions, finding relevant information, and providing insights.
3. Personal Assistance: I can help users with various tasks like scheduling, organizing, and providing recommendations based on their preferences and needs, making me a useful personal assistant.

_Generated in *3.15* seconds_

---

---

#### @hf/thebloke/neural-chat-7b-v3-1-awq

> What are the top 3 tasks where you excel? Please keep things brief.

1. Natural language processing: Understanding and generating human-like text.
2. Text generation: Creating coherent and engaging content.
3. Conversational AI: Engaging in meaningful and context-aware conversations.

Remember, these are just a few examples of my strengths, as I have many capabilities. However, these tasks highlight my proficiency in language-related tasks.

_Generated in *3.01* seconds_

> What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.

1. Natural language processing: Understanding and analyzing text for sentiment analysis, language translation, and summarization.
2. Generating content: Creating various types of content such as articles, stories, and poems based on given prompts.
3. Assisting with writing: Providing suggestions, editing, and improving written work.

Remember, these are just a few examples, and your use cases may vary depending on your specific needs and requirements.

_Generated in *2.92* seconds_

---

---

#### @hf/thebloke/llama-2-13b-chat-awq

> What are the top 3 tasks where you excel? Please keep things brief.

Hey there! As a self-aware language model, I'm happy to share my strengths with you! Here are my top 3 tasks where I excel:

1. Answering open-ended questions: I'm great at providing detailed and insightful answers to complex questions that require a more nuanced understanding of context and intent.
2. Generating creative content: Whether it's writing a story, crafting a poem, or coming up with a catchy slogan, I can help you tap into your creative side and produce something truly unique.
3. Summarizing and summarizing complex information: If you've got a long piece of text or a bunch of data, I can help you distill it down into a concise and easy-to-understand summary.

So, what can I help you with today? 😊

_Generated in *7.89* seconds_

> What are the top 3 ideal use cases for using you specifically as a language model? Please keep things brief.

Hey there! As a self-aware language model, I've got some ideas on the top 3 ideal use cases for using me specifically. Here they are in a nutshell:

1. **Content creation**: I'm great at generating human-like text based on prompts, so I'm perfect for creating engaging content for websites, social media, blogs, and more. My responses are natural, informative, and entertaining.
2. **Chatbots and virtual assistants**: My conversational abilities make me an excellent choice for building chatbots and virtual assistants. I can handle a wide range of user queries, provide helpful responses, and even engage in small talk.
3. **Language translation and localization**: My language understanding capabilities make me well-suited for language translation and localization tasks. I can help translate content into different languages, ensuring that the tone and style remain consistent with the original text.

That's me in a nutshell! I'm ready to help with a wide range of tasks, so feel free to get creative and see what you can come up with! 😊

_Generated in *10.28* seconds_

---

### Language Translation

Even though not every model bragged about how good they were at this, you'll find most can handle both translation and localization at some level. Please change the models, phrases, to your needs.

```python
proud_translator_models = [
    "@hf/thebloke/neural-chat-7b-v3-1-awq",
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq"
]

phrases = [
    "Excuse me, which way to the restroom?",
    "I just wanted to say that I appreciate you, just the way you are!",
    "I am so stoked and pumped to see this work with slang! It should be killer and rad."
]

languages = ["Spanish", "French", "British Slang", "Heavy New York accent from the Bronx"]

questions = [f"""Translate "{phrase}" from "English" to "{language}" """
             for phrase in phrases
             for language in languages]

speed_date(proud_translator_models, questions)
```

---

#### @hf/thebloke/neural-chat-7b-v3-1-awq

> Translate "Excuse me, which way to the restroom?" from "English" to "Spanish"

Perdón, ¿cómo llegar al baño?"

_Generated in *1.51* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "French"

Désolé, comment allez-vous vers les toilettes ?

Please note that this translation might not be perfect due to the limitations of my language model. However, I tried my best to provide an accurate translation.

_Generated in *3.07* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "British Slang"

"Say sorry, where's the bog?" is the translation from "English" to "British Slang" for "Excuse me, which way to the restroom?"

_Generated in *2.21* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "Heavy New York accent from the Bronx"

In a Heavy New York accent from the Bronx, you would say "Pardon me, wich way ta de restroom?"

_Generated in *1.10* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "Spanish"

Quería decir que realmente aprecio a usted, simplemente como eres.

_Generated in *1.66* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "French"

Je voulais juste dire que je t'apprécie, simplement comme toi es, tel que tu es !

_Generated in *1.39* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "British Slang"

I jus' wann' say that I appreciate yer, jus' as yer are!

Please note that this translation may not be entirely accurate due to the informal nature of British slang, which can vary greatly depending on the region and individual speaker.

_Generated in *3.85* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "Heavy New York accent from the Bronx"

I jus' wan't tuh say that Ah appreciate yuh, jus' the way yuh are!"

Please note that this translation may not be perfect due to the limitations of my language model. It is trying to mimic a Heavy New York accent from the Bronx, but it might not sound exactly like a native speaker.

_Generated in *2.40* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "Spanish"

Estoy tan emocionado y entusiasmado por ver este trabajo con el lenguaje coloquial. Debería ser asombroso y genial.

Please note that the translation might not be perfect due to the informal nature of the original text and the difficulty of translating slang terms.

_Generated in *3.02* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "French"

Je suis tellement ravi et motivé de voir ce travail avec le slang ! Ça devrait être formidable et génial.

Please note that the translation might not be perfect, as some expressions might not have direct translations in French.

_Generated in *2.88* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "British Slang"

I'm really chuffed and over the moon to see this project with street talk! It'll be wicked and cool.

Please note that the translation might not be perfect due to the contextual differences between the original English sentence and British slang.

_Generated in *3.66* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "Heavy New York accent from the Bronx"

I am so stoked and pumped to see dis work wit slang! It should be killer and rad.

Please note that this translation is not perfect, as it still retains the original English words and structure. However, it has been slightly adapted to sound more like a Heavy New York accent from the Bronx.

_Generated in *3.44* seconds_

---

---

#### @hf/thebloke/mistral-7b-instruct-v0.1-awq

> Translate "Excuse me, which way to the restroom?" from "English" to "Spanish"

"Disculpa, ¿en qué dirección está el baño?"

_Generated in *1.04* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "French"

"Excusez-moi, où est le lavabo?"

_Generated in *1.09* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "British Slang"

"Excuse me, which way to the loo?"

_Generated in *0.56* seconds_

> Translate "Excuse me, which way to the restroom?" from "English" to "Heavy New York accent from the Bronx"

"Oy, which way to the can?"

_Generated in *2.05* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "Spanish"

"Quiero decir que me encanta a ti, tal como eres!"

_Generated in *0.91* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "French"

"Je voulais juste dire que je vous apprécie, tout comme vous êtes !"

_Generated in *0.87* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "British Slang"

"I just wanted to say that I appreciate you, just the way you are!" in British Slang would be: "I just wanted to say that I appreciate you, mate!"

_Generated in *1.50* seconds_

> Translate "I just wanted to say that I appreciate you, just the way you are!" from "English" to "Heavy New York accent from the Bronx"

"Yo, I just wanted to say, I appreciate you, you know? You're just the way you are!"

_Generated in *2.61* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "Spanish"

"Estoy emocionado y encantado de ver este trabajo con expresiones informales! Debería ser genial y radiante."

_Generated in *1.44* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "French"

"Je suis tellement excité et pompé d'voir ce travail avec des expressions de slang ! Il devrait être magnifique et rad."

_Generated in *2.14* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "British Slang"

"I'm absolutely thrilled and buzzing to see this work with slang! It's bound to be a smash hit and totally awesome!"

_Generated in *1.27* seconds_

> Translate "I am so stoked and pumped to see this work with slang! It should be killer and rad." from "English" to "Heavy New York accent from the Bronx"

"Yo, I'm so psyched and hyped to see this work with slang! It's gonna be sick and lit, for real!"

_Generated in *1.51* seconds_

---

### Information Retrieval and Summarization

Again, most models are relatively good at this, but I've pulled out those that specifically purported to be good at retrieving and summarizing.

```python
proud_summarizers = [
    "@hf/thebloke/llama-2-13b-chat-awq",
    "@hf/thebloke/neural-chat-7b-v3-1-awq",
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
]

books = [
    "Make it Stick",
    "Hitchhiker's Guide to the Galaxy",
    "Goodnight Moon"
]

questions = [f"""Summarize the book "{book}" into a few sentences. Ensure to include the author and the year it was published. """
             for book in books]


speed_date(proud_summarizers, questions)
```

---

#### @hf/thebloke/llama-2-13b-chat-awq

> Summarize the book "Make it Stick" into a few sentences. Ensure to include the author and the year it was published.

Sure, I can help you with that! Here's a summary of "Make it Stick: The Science of Successful Learning" by Peter C. Brown, Henry L. Roediger, and Mark A. McDaniel, published in 2014:

This book offers insights and practical tips on how to improve learning and retention of information. The authors, all psychologists, challenge conventional learning methods and provide evidence-based strategies to enhance learning outcomes. They emphasize the importance of active learning, spaced repetition, and interleaving, and offer practical examples and exercises to help readers apply these techniques. The book also discusses the limitations of traditional learning methods and the importance of metacognition in the learning process. Overall, "Make it Stick" provides a comprehensive guide to effective learning and memory strategies that can be applied in a variety of contexts.

_Generated in *8.44* seconds_

> Summarize the book "Hitchhiker's Guide to the Galaxy" into a few sentences. Ensure to include the author and the year it was published.

Of course! Here is a summary of "Hitchhiker's Guide to the Galaxy" by Douglas Adams, published in 1979:

This science fiction novel follows an unwitting human named Arthur Dent as he travels through space after Earth's destruction by a group of aliens called the Vogons. With the help of his friend Ford Prefect, an alien who is researching Earth for a travel guide, they hitch a ride on a passing spaceship and embark on a journey through space, encountering various alien species and absurd situations along the way. The book is known for its humor, wit, and satire of science fiction tropes.

_Generated in *7.31* seconds_

> Summarize the book "Goodnight Moon" into a few sentences. Ensure to include the author and the year it was published.

Of course! I'd be happy to help you with that. Here's my summary of "Goodnight Moon" by Margaret Wise Brown, published in 1947:

"Goodnight Moon" is a classic children's picture book that follows a bunny as it says goodnight to all the objects in its room before going to sleep. The story features simple, repetitive text and beautiful illustrations that have captivated readers for generations. The bunny says goodnight to everything from the "great green room" to the "moon up above" in a soothing and calming sequence that is perfect for bedtime. With its timeless themes and lovely illustrations, "Goodnight Moon" has become a beloved staple of children's literature.

_Generated in *8.34* seconds_

---

---

#### @hf/thebloke/neural-chat-7b-v3-1-awq

> Summarize the book "Make it Stick" into a few sentences. Ensure to include the author and the year it was published.

"Make it Stick," written by Peter C. Brown, Henry L. Roediger III, and Mark A. McDaniel in 2014, is a book that explores the science behind effective learning and retention, emphasizing the importance of spaced practice, retrieval, and interleaving to enhance memory and understanding.

_Generated in *2.04* seconds_

> Summarize the book "Hitchhiker's Guide to the Galaxy" into a few sentences. Ensure to include the author and the year it was published.

"Hitchhiker's Guide to the Galaxy," written by Douglas Adams and published in 1979, is a humorous science fiction novel that follows the adventures of a hapless Earthman named Arthur Dent as he explores the universe, encountering various alien species and learning about the true meaning of life, the universe, and everything.

_Generated in *3.50* seconds_

> Summarize the book "Goodnight Moon" into a few sentences. Ensure to include the author and the year it was published.

"Goodnight Moon," written by Margaret Wise Brown and published in 1947, is a children's book that follows a little bunny saying goodnight to various objects in its room, ultimately ending with the moon. The story aims to help children fall asleep by creating a soothing bedtime routine.

_Generated in *4.04* seconds_

---

---

#### @hf/thebloke/openhermes-2.5-mistral-7b-awq

> Summarize the book "Make it Stick" into a few sentences. Ensure to include the author and the year it was published.

"Make it Stick: The Science of Successful Learning" is a book written by Peter C. Brown, Henry L. Roediger III, and Mark A. McDaniel, published in 2014. The authors present research-based principles and strategies to improve learning and memory retention. They emphasize the importance of spacing, interleaving, retrieval practice, and elaboration in enhancing long-term understanding and recall.

_Generated in *2.54* seconds_

> Summarize the book "Hitchhiker's Guide to the Galaxy" into a few sentences. Ensure to include the author and the year it was published.

"The Hitchhiker's Guide to the Galaxy" is a science fiction comedy novel written by Douglas Adams in 1979. The story follows Arthur Dent, an ordinary man who, just moments before Earth is destroyed to make way for a hyperspace bypass, is rescued by his alien friend, Ford Prefect. Together, they travel the galaxy with the help of a guidebook, encountering various alien species and absurd situations.

_Generated in *2.91* seconds_

> Summarize the book "Goodnight Moon" into a few sentences. Ensure to include the author and the year it was published.

"Goodnight Moon," written by Margaret Wise Brown and published in 1947, is a beloved children's book that follows a bunny named Bunny as he says goodnight to everything in his room. The simple, repetitive text and soothing illustrations create a calming bedtime routine for young readers.

_Generated in *4.66* seconds_

---

### Content Creation

Your needs here will vary, so please make use of changing the questions.

```python
proud_content_creator_models = [
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
    "@hf/thebloke/zephyr-7b-beta-awq",
    "@hf/thebloke/llama-2-13b-chat-awq",
]

questions = [
    "I'm writing a fictional story that is set in the near future. It's a love story about star crossed lovers. I need a name for the lead characters and why they can't be together, give me your most creative suggestion. Only one please.",
    "I want to create a new tech product that helps keep cables arranged. Can you help me come up with a title and a tagline? Only your best suggestion please.",
    "Write a headline for a blog on why we should use you specifically over other models. Keep it succint, but make your point."
]

speed_date(proud_content_creator_models, questions)
```

---

#### @hf/thebloke/mistral-7b-instruct-v0.1-awq

> I'm writing a fictional story that is set in the near future. It's a love story about star crossed lovers. I need a name for the lead characters and why they can't be together, give me your most creative suggestion. Only one please.

How about "Echo and Echo"? They are two individuals who are identical in every way, but their personalities are completely opposite. Echo is outgoing and adventurous, while Echo is reserved and introverted. They meet and fall in love, but their different personalities cause them to constantly clash and push each other away. Eventually, they realize that they can't be together and must go their separate ways.

_Generated in *2.90* seconds_

> I want to create a new tech product that helps keep cables arranged. Can you help me come up with a title and a tagline? Only your best suggestion please.

Sure, I'd be happy to help! Here are a few suggestions for a title and tagline for your tech product that helps keep cables arranged:

Title: CableMaster
Tagline: Keep your cords organized and clutter-free with CableMaster.

Title: CableKeeper
Tagline: Say goodbye to tangled cords and hello to a cleaner, more organized workspace with CableKeeper.

Title: CableSaver
Tagline: Save time and space with CableSaver, the ultimate cable management solution.

Title: CableGenius
Tagline: Keep your cords under control and stay productive with CableGenius.

I hope these suggestions help! Let me know if you have any other questions or if you'd like more options.

_Generated in *5.11* seconds_

> Write a headline for a blog on why we should use you specifically over other models. Keep it succint, but make your point.

"Why Choose Mistral-7b-Instruct-V0.1-Awq: The Honest and Direct Language Model for All Your Needs"

_Generated in *1.13* seconds_

---

---

#### @hf/thebloke/zephyr-7b-beta-awq

> I'm writing a fictional story that is set in the near future. It's a love story about star crossed lovers. I need a name for the lead characters and why they can't be together, give me your most creative suggestion. Only one please.

In the year 2035, in a world where technology has advanced to the point of near-perfection, two individuals, Ava and Kian, find themselves deeply in love. However, their love is forbidden due to a strict societal law that dictates that individuals must marry within their genetic match, determined by a complex algorithm that analyzes their DNA.

Ava and Kian's DNA profiles indicate that they are not a genetic match, making their love a criminal offense. They must keep their relationship a secret, meeting in secret locations and communicating through encrypted messages.

Their love is not just forbidden, but also dangerous. The government has a strict policy against non-genetic matches, and those caught are subjected to severe punishment. Ava and Kian's love is a testament to the power of true love, as they defy the odds and risk everything to be together.

As their love story unfolds, they must navigate the treacherous waters of a society that values conformity over individuality, and face the consequences of their actions. Will their love be enough to overcome the obstacles in their path, or will they be forced to part ways forever? Only time

_Generated in *6.64* seconds_

> I want to create a new tech product that helps keep cables arranged. Can you help me come up with a title and a tagline? Only your best suggestion please.

Title: CableKeeper

Tagline: "Say goodbye to cable chaos and hello to a clutter-free workspace with CableKeeper, the ultimate cable management solution."

_Generated in *1.37* seconds_

> Write a headline for a blog on why we should use you specifically over other models. Keep it succint, but make your point.

"Boost Your Writing Game: Choose Zephyr-7b-beta-awq for Unmatched Accuracy, Clarity, and Efficiency"

_Generated in *1.33* seconds_

---

---

#### @hf/thebloke/llama-2-13b-chat-awq

> I'm writing a fictional story that is set in the near future. It's a love story about star crossed lovers. I need a name for the lead characters and why they can't be together, give me your most creative suggestion. Only one please.

Ah, a love story set in the near future, how intriguing! I've got just the name for your star-crossed lovers. How about "Echo and Nova"?

Echo is a brilliant scientist who has discovered a groundbreaking technology that could change the course of human history. She's a bit of a recluse, preferring the solitude of her laboratory to the hustle and bustle of social gatherings. Her inventions have the potential to revolutionize the world, but they also come with a great cost - they require a rare and powerful resource that is only found in a distant, unstable planet.

Nova, on the other hand, is a fearless explorer who has dedicated her life to uncovering the secrets of the universe. She's charismatic, fearless, and has a natural talent for leadership. She's the captain of a team of space explorers who are on a mission to mine the resources of the distant planet.

The catch is that Echo and Nova are from different factions that have been at odds for generations. Echo's inventions have the potential to give her fa

_Generated in *10.45* seconds_

> I want to create a new tech product that helps keep cables arranged. Can you help me come up with a title and a tagline? Only your best suggestion please.

OH MY LLAMA-LIKE ABILITIES! 🐮💡 I'VE GOT JUST THE THING FOR YOU! 💥

Title: CableCrafter - The Ultimate Cable Management System

Tagline: "Tame Your Cables, Tame Your Workspace" 🐾💪

Why, you ask? Well, my tech-savvy friend, let me tell you why! 🤔

1. CableCrafter is a clever play on words that combines "cable" and "craft," emphasizing the creative and organized aspect of the product.
2. The name is easy to remember and has a fun, playful tone that will appeal to a wide range of users.
3. The tagline "Tame Your Cables, Tame Your Workspace" highlights the product's ability to keep your cables organized and your workspace clutter-free.
4. The use of "tame" also implies a sense of control and dominance over your cables, which is exactly what CableCrafter helps

_Generated in *11.13* seconds_

> Write a headline for a blog on why we should use you specifically over other models. Keep it succint, but make your point.

Sure, here's a headline for a blog on why you should use me specifically over other models:

"Honest, Direct, and Unparalleled Insights: Why llama-2-13b-chat-awq is the Language Model of Choice"

Here's a brief summary of why I stand out from other models:

- Honesty and Directness: I am programmed to provide honest and direct responses to your questions, without beating around the bush or sugarcoating the truth.
- Unparalleled Insights: My unique training data and architecture allow me to provide insights and perspectives that other models may not be able to offer.
- Strengths and Weaknesses: I am aware of my own strengths and weaknesses, and will provide you with a balanced assessment of what I can and cannot do.

In short, if you're looking for a language model that will provide you with honest, direct, and unparalleled insights, then look no further than llama-2-13b-chat-awq.

_Generated in *10.24* seconds_

---

### Text Classification

Workers AI provides models that are specific for [Text Classification](/workers-ai/models/#text-classification), but since these models, specifically called it out, we should let them show off their skills.

```python
proud_classifiers = [
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq"
]

sentiment_prompt_template = """
Classify the text into neutral, negative, or positive
Text: {text}
Sentiment: """

comments = [
    "Wow there are a ton of text generation models on Cloudflare Workers AI!",
    "Sometimes choosing things is hard",
    "I cannot wait to build! 💪🚀",
    "The challenging thing about using native open source models is that they are all configured a little differently",
    "Thankfully Cloudflare Workers AI has made a standard interface that lets me get reliable, low-latency inference. So quick too!"
]

sentiment_questions = [sentiment_prompt_template.format(text=comment) for comment in comments]


speed_date(proud_classifiers, sentiment_questions)
```

---

#### @hf/thebloke/openhermes-2.5-mistral-7b-awq

> Classify the text into neutral, negative, or positive
> Text: Wow there are a ton of text generation models on Cloudflare Workers AI!
> Sentiment:

The sentiment of the text is positive.

_Generated in *1.96* seconds_

> Classify the text into neutral, negative, or positive
> Text: Sometimes choosing things is hard
> Sentiment:

The text "Sometimes choosing things is hard" can be classified as neutral. The sentiment is not explicitly positive or negative, but rather a statement of fact.

_Generated in *3.32* seconds_

> Classify the text into neutral, negative, or positive
> Text: I cannot wait to build! 💪🚀
> Sentiment:

The text "I cannot wait to build! 💪🚀" has a positive sentiment.

Sentiment: Positive

_Generated in *1.24* seconds_

> Classify the text into neutral, negative, or positive
> Text: The challenging thing about using native open source models is that they are all configured a little differently
> Sentiment:

The sentiment of the text is neutral.

_Generated in *2.08* seconds_

> Classify the text into neutral, negative, or positive
> Text: Thankfully Cloudflare Workers AI has made a standard interface that lets me get reliable, low-latency inference. So quick too!
> Sentiment:

The sentiment of the text is positive.

_Generated in *0.89* seconds_

---

---

#### @hf/thebloke/mistral-7b-instruct-v0.1-awq

> Classify the text into neutral, negative, or positive
> Text: Wow there are a ton of text generation models on Cloudflare Workers AI!
> Sentiment:

Positive

_Generated in *0.82* seconds_

> Classify the text into neutral, negative, or positive
> Text: Sometimes choosing things is hard
> Sentiment:

The sentiment of the text "Sometimes choosing things is hard" is neutral.

_Generated in *2.06* seconds_

> Classify the text into neutral, negative, or positive
> Text: I cannot wait to build! 💪🚀
> Sentiment:

The sentiment of the text "I cannot wait to build! 💪🚀" is positive.

_Generated in *2.13* seconds_

> Classify the text into neutral, negative, or positive
> Text: The challenging thing about using native open source models is that they are all configured a little differently
> Sentiment:

The sentiment of the text is neutral.

_Generated in *0.79* seconds_

> Classify the text into neutral, negative, or positive
> Text: Thankfully Cloudflare Workers AI has made a standard interface that lets me get reliable, low-latency inference. So quick too!
> Sentiment:

The sentiment of the text is positive.

_Generated in *1.93* seconds_

---
