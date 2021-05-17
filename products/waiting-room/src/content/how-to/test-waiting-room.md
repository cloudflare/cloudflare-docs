---
order: 5
pcx-content-type: tutorial
---

# Test a Waiting Room

Test out your Waiting Room to make sure it behaves as expected before rolling it out to live traffic.

<Aside>
This tutorial uses an open-sourced load testing tool that is not created or supported by Cloudflare.
</Aside>

---

## Before you begin

Before you start this tutorial, make sure you have:
- Fulfilled all the [prerequisites](../../about#prerequisites)
- Previously [created a Waiting Room](../create-waiting-room) that uses the default response template. If you used a custom response template, you may have to update the [sample script](#1-download-sample-script).

---

## 1. Download sample script

First, download the [sample script](https://github.com/kcantrel/test-cf-waitingroom/blob/master/simulate_requests) from GitHub.

This script simulates users entering a waiting room. It divides traffic into two phases to allow testing wait time as load diminishes or increases.

## 2. Run sample script

Once you have downloaded the script, run it with the following command-line arguments:
-  `-n <num_secs_p1>`: Number of seconds to send requests during phase 1.
- `-m <num_secs_p2>`: Number of seconds to send requests during phase 2, which is fixed at 1 RPS.
- `-s <sleep_time_p1>`: Amount of time to sleep between requests during phase 1. Fractional time accepted (e.g. .3).
- `-o <results>`: File to store the per-session statistics.
- `URL`: Endpoint protected by a Cloudflare Waiting Room.

As the script runs, you will see a letter output to the command line for each user session that advanced past the waiting room. This letter represents how long each user session waited:
- 0 seconds: `.`
- 0 - 10 seconds: `a`
- 10 - 20 seconds: `b`
- 20 - 30 seconds: `c`
- 260 - 270 seconds: `A`
- 270 - 280 seconds: `B`
- > 620 seconds: `!`

## 3. Analyze results

Once the script finishes running, it creates a CSV file with the following fields:
- **job**: Fixed string and sequence number. Either `main` for phase 1 or `post` for phase 2.
- **status**: Status of the last response of the session:
    - 0: curl command received an HTTP status code of `200`.
    - 1: curl command did not receive any HTTP status codes, which typically means the curl command itself failed.
    - 2: curl command received an HTTP status code of something other than `200`.
- **wait_time**: Number of seconds the user waited in the waiting room.
- **wr_cnt_before**: Number of users in the waiting room when the session first started.
- **wr_cnt_after**: Number of users in the waiting room when the session made it past the Waiting Room.
- **start_time**: Time when the session first started (in UNIX epoch seconds).
- **end_time**: Time when the session made it past the Waiting Room (in UNIX epoch seconds).