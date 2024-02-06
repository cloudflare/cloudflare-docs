---
updated: 2024-02-06
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Explore Code Generation Using Deepseek Coder Models
---

# Explore Code Generation Using Deepseek Coder Models

A handy way to explore all of the models available on [Workers AI](/workers-ai) is to use a [Jupyter Notebook](https://jupyter.org/).


You can [download the Deepseek Coder notebook](/workers-ai/static/documentation/notebooks/deepseek-coder-exploration.ipynb) or view the embedded notebook below.


[comment]: <> (The markdown below is auto-generated from https://github.com/craigsdennis/notebooks-cloudflare-workers-ai)

---

## Exploring Code Generation Using Deepseek Coder

AI Models being able to generate code unlocks all sorts of use cases. The [Deepseek Coder](https://github.com/deepseek-ai/DeepSeek-Coder) models `@hf/thebloke/deepseek-coder-6.7b-base-awq` and `@hf/thebloke/deepseek-coder-6.7b-instruct-awq` are now available on [Workers AI](https://developers.cloudflare.com/workers-ai).

Let's explore them using the API!



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

### Generate code from a comment

A common use case is to complete the code for the user after they provide a descriptive comment.


```python
model = "@hf/thebloke/deepseek-coder-6.7b-base-awq"

prompt = "# A function that checks if a given word is a palindrome"

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "user", "content": prompt}
    ]}
)
inference = response.json()
code = inference["result"]["response"]

display(Markdown(f"""
    ```python
    {prompt}
    {code.strip()}
    ```
"""))
```



```python
# A function that checks if a given word is a palindrome
def is_palindrome(word):
    # Convert the word to lowercase
    word = word.lower()

    # Reverse the word
    reversed_word = word[::-1]

    # Check if the reversed word is the same as the original word
    if word == reversed_word:
        return True
    else:
        return False

# Test the function
print(is_palindrome("racecar"))  # Output: True
print(is_palindrome("hello"))    # Output: False
```



### Assist in debugging

We've all been there, bugs happen. Sometimes those stacktraces can be very intimidating, and a great use case of using Code Generation is to assist in explaining the problem.


```python
model = "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"

prompt = """Tell the user how to correct the following code:

# Welcomes our user
def hello_world(first_name="World"):
    print(f"Hello, {name}!")

"""

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "user", "content": prompt}
    ]}
)
inference = response.json()
response = inference["result"]["response"]
display(Markdown(response))
```


The variable name is not defined in the function. It should be "first_name" instead of "name". Here is the corrected code:

```python
# Welcomes our user
def hello_world(first_name="World"):
    print(f"Hello, {first_name}")
```

You can call this function with a name as an argument like this:

```python
hello_world("John")
```

This will print:

```
Hello, John
```

If you call the function without an argument, it will print:

```python
hello_world()
```

This will print:

```
Hello, World
```



### Fill-in-the-middle Code Completion

A common use case in Developer Tools is to autocomplete based on context. Deepseek Coder provides the ability to submit existing code with a placeholder, so that the model can complete in context.

Warning: The tokens are prefixed with `<｜` and suffixed with `｜>` make sure to copy and paste them.


```python
model = "@hf/thebloke/deepseek-coder-6.7b-base-awq"

code = """
<｜fim▁begin｜>import re

from jklol import email_service

def send_email(email_address, body):
    is_valid_email = re.<｜fim▁hole｜>
    if not is_valid_email:
        raise InvalidEmailAddress(email_address)
    return email_service.send(email_address, body)<｜fim▁end｜>
"""

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "user", "content": code}
    ]}
)
inference = response.json()
response = inference["result"]["response"]
display(Markdown(f"""
    ```python
    {response.strip()}
    ```
"""))

```



```python
is_valid_email = re.match(r"[^@]+@[^@]+\.[^@]+", email_address)
```



### Experimental: Extract data into JSON

No need to threaten the model or bring grandma into the prompt.


```python
model = "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"

# Learn more at https://json-schema.org/
json_schema = """
{
  "title": "User",
  "description": "A user from our example app",
  "type": "object",
  "properties": {
    "firstName": {
      "description": "The user's first name",
      "type": "string"
    },
    "lastName": {
      "description": "The user's last name",
      "type": "string"
    },
    "numKids": {
      "description": "Amount of children the user has currently",
      "type": "integer"
    },
    "interests": {
      "description": "A list of what the user has shown interest in",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
  },
  "required": [ "firstName" ]
}
"""

system_prompt = f"""
The user is going to discuss themselves and you should create a JSON object from their description to match the json schema below.

<BEGIN JSON SCHEMA>
{json_schema}
<END JSON SCHEMA>

Return JSON only. Do not explain or provide usage examples.
"""

prompt = """Hey there, I'm Craig Dennis and I'm a Developer Educator at Cloudflare. My email is craig@cloudflare.com.
            I am very interested in AI. I've got two kids. I love tacos, burritos, and all things Cloudflare"""

response = requests.post(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}",
    headers={"Authorization": f"Bearer {api_token}"},
    json={"messages": [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]}
)
inference = response.json()
response = inference["result"]["response"]
display(Markdown(f"""
    ```json
    {response.strip()}
    ```
"""))
```



```json
{
  "firstName": "Craig",
  "lastName": "Dennis",
  "numKids": 2,
  "interests": ["AI", "Cloudflare", "Tacos", "Burritos"]
}
```