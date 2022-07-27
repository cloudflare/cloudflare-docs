#!/usr/bin/env python3

import os
import subprocess
import json
import time
from pprint import pprint

verbose = os.environ.get('VERBOSE', False)


def check_for_command(command):
    try:
        subprocess.check_output(["command", "-v", command])
    except:
        print(
            f"Couldn't find required {command} command.")
        exit(1)


check_for_command("jq")
check_for_command("curl")


def read_string_option(env_name, human_name):
    v = os.environ.get(env_name, '')
    if len(v) == 0:
        v = input(f"Please input {human_name} > ")
    if len(v) == 0:
        print("Invalid {human_name}")
        return read_string_option(env_name, human_name)
    return v


def request_create_user(user_name, user_email):
    url = f"{CF_API}/{account_tag}/access/users"
    # could also take a `custom` attribute with a map, e.g. {"custom": { "datacenter": "DFW" }}
    body = {'name': user_name, 'email': user_email}
    return request_post(url, body)


def request_list_client_ids():
    client_ids_response = request_get(
        f"{CF_API}/{account_tag}/access/service_tokens/")

    return " ".join(response['client_id'] for response in client_ids_response['result'])


def request_create_service_token(service_token_name):
    response = request_post(
        f"{CF_API}/{account_tag}/access/service_tokens/", {'name': service_token_name})
    client_id = response['result']['client_id']
    client_secret = response['result']['client_secret']
    return (client_id, client_secret)


def request_list_service_tokens():
    return request_get(f"{CF_API}/{account_tag}/access/service_tokens/")


def request_enable_service_token_for_doh(service_token_id):
    url = f"{CF_API}/{account_tag}/access/organizations/doh/{service_token_id}"
    return request_put(url,"")


def request_doh_token(account_tag, user_id, client_id, client_secret):
    url = f"https://{team_name}.cloudflareaccess.com/cdn-cgi/access/doh-token?account-id={account_tag}&user-id={user_id}&auth-domain={team_name}.cloudflareaccess.com"
    command = ['curl', '-s', url, '-X', 'GET',
               '-H', f"Cf-Access-Client-Id: {client_id}",
               '-H', f"Cf-Access-Client-Secret: {client_secret}"]
    if verbose:
        print(f"Issuing request {' '.join(command)}")
    response = json.loads(subprocess.check_output(command))
    if verbose:
        print("Got response:")
        pprint(response)
    return response['token']


def request_post(url, body):
    return request("POST", url, body)

def request_put(url, body):
    return request("PUT", url, body)

def request_get(url):
    return request("GET", url, None)


def request(method, url, body):
    command = ['curl', '-s', url, '-X', method, '-H', f"X-Auth-Email: {email}", '-H',
               f"X-Auth-Key: {auth_key}", '-H', 'Content-Type: application/json']
    if body:
        command.append('--data')
        command.append(json.dumps(body))
    if verbose:
        print(f"Issuing request {' '.join(command)}")
    response = json.loads(subprocess.check_output(command))
    if 'errors' in response and len(response['errors']) > 0:
        pprint(response)
        exit(-1)
    if verbose:
        print("Got response:")
        pprint(response)
    return response


account_tag = read_string_option('CF_ACCOUNT_TAG', "account tag")
email = read_string_option('CF_EMAIL', "auth email")
auth_key = read_string_option('CF_AUTH_KEY', "auth key")
team_name = read_string_option('CF_TEAM_NAME', "team name")

print(f"Using {account_tag} as account tag")
print(f"Using {email} as auth email")
print(f"Using {team_name} as team name")

CF_API = "https://api.cloudflare.com/client/v4/accounts"

user_id = os.environ.get('USER_ID', "")

if len(user_id) == 0:
    print("No USER_ID provided, creating one.")
    user_name = input('Please input a user name > ')
    user_email = input('Please input a user email > ')
    response = request_create_user(user_name, user_email)
    user_id = response['result']['id']
    user_email = print(f"Created user with ID {user_id}")
else:
    print(f"Using USER_ID={user_id}")

client_ids = request_list_client_ids()

client_id = os.environ.get('CLIENT_ID', "")

if len(client_id) == 0:
    print(f"Found following client IDs: {client_ids}")
    client_id = input(
        'Please input service token client ID ("new" to create a new one)> ')

if len(client_id) != 0 and client_id != "new" and client_id not in client_ids:
    print("Client ID not found in account")
    exit(-1)

client_secret = ""
if client_id == "new":
    service_token_name = input('Please input name for service token > ')
    client_id, client_secret = request_create_service_token(service_token_name)
    print(
        f"Created service token with client_id {client_id} and client_secret {client_secret}. You may want to save these secrets.")


if len(client_secret) == 0:
    client_secret = read_string_option('CLIENT_SECRET', "client secret")

service_tokens_response = request_list_service_tokens()

service_token_id = [result['id']
                    for result in service_tokens_response['result'] if result['client_id'] == client_id][0]


print("Enabling DoH token generation for service token")
request_enable_service_token_for_doh(service_token_id)

print("Obtaining new DoH token (this request may fail if the previous ones haven't propagated yet)")
try:
    doh_token = request_doh_token(account_tag, user_id, client_id, client_secret)
except json.decoder.JSONDecodeError:
    print("Request failed, waiting for 60 seconds before retrying")
    time.sleep(60)
    doh_token = request_doh_token(account_tag, user_id, client_id, client_secret)
print(f"\n\nGot token: {doh_token}\n")

print("You can now make doh requests such as:\n"
      f"curl 'https://{account_tag}.cloudflare-gateway.com/dns-query?name=example.com' \\\n"
      "  -H 'accept: application/dns-json' \\\n"
      f"  -H 'CF-Authorization: {doh_token}' | jq")
