---
pcx_content_type: tutorial
title: Test a waiting room
weight: 9
---

# Test a waiting room

Follow this tutorial to ensure your Waiting Room queues and admits users as expected.

{{<Aside type="warning" header="Warning:">}}
This tutorial uses an open-sourced load testing tool that is not created or supported by Cloudflare.
{{</Aside>}}

---

## Before you begin

Before you start this tutorial, ensure you have:

- Fulfilled all the [prerequisites](/waiting-room/#prerequisites)
- Previously [created a waiting room](/waiting-room/get-started/)
- Updated the [sample script](#1-download-sample-script) to ensure your waiting room captures when a "simulated user" enters and is released from your waiting room (if you [customized the design](/waiting-room/how-to/customize-waiting-room/) of your waiting room)

---

## 1. Download sample script

First, download the [sample script](https://github.com/kcantrel/test-cf-waitingroom/blob/master/simulate_requests) from GitHub.

This script simulates users entering a waiting room. It divides traffic into two phases (`Phase 1` and `Phase 2`) so you can test wait times as load increases and then decreases.

## 2. Run sample script

Once you have downloaded the script, run it with the following command-line arguments:

- `-n <num_secs_p1>`: Number of seconds to send requests during phase 1
- `-m <num_secs_p2>`: Number of seconds to send requests during phase 2, which is fixed at 1 request per second
- `-s <sleep_time_p1>`: Amount of time to sleep between requests during phase 1 (fractional time accepted, such as `.3`)
- `-o <results>`: File to store the per-session statistics
- `URL`: Endpoint protected by a Cloudflare Waiting Room

<details>
  <summary>Example script run</summary>
  <div>
    <strong>Function</strong>

    simulate_requests -s .1 -n 60 -m 60 -o results https://example.com/tickets/1234/

<strong>Output</strong>

    Sending 600 requests to https://example.com/tickets/1234/ at a rate of 10.00 per second. Or 600 per minute.

    Wed 10 Mar 2021 10:48:59 AM CST
    ...................................................................................................................a.aa.aa.a..
    Wed 10 Mar 2021 10:50:00 AM CST

    Now doing 1 request per second for 60 seconds.
    babdacdbeacbc.abbedcbacbddaccdaeebbcabedccaebddbcacedb.cadcedbacabcbeacbbabdcdbaaebddcbcabeeadbcbacadedabbaacd.dabecbabbdecbdaegehgjkfjifggfihjhghhfhifkfj.gjighhgfiihgdihkffiejgjjigggjkijkk
    Wed 10 Mar 2021 10:51:01 AM CST

    Waiting for jobs to finish
    hgiibjjjjcjhjgbgiggikihhjcihhhhlkkknmjjmmjnnonokklmmklnmonmlonoompollplommpmmpolpoqmponngoonqjimqmgjmmnkmogmqoiqpoqolmmqonghpppjpiopoopqomkqnnqgnmqnnppopnqrpptqtrrrrpsrqtrusrtsvusvsrrvstttrvsvsvussrtuwtvrtsvtrvsqunrmtrrrsqnqptvsuqturwsvstnmwuwtusvsvwsouspqtuuvsvrvwtwssvqtuuuwspvoxyzyyvwvzwxyxyyAzyyzABxBBzyxyxxBBACzzyxAvwsyzxztzvuvtCACyvxstuutvCw
    Wed 10 Mar 2021 10:54:22 AM CST

</div>
</details>

As the script runs, it will output characters with each character representing:

- A user session that advanced past the waiting room
- The amount of time the user spent in the waiting room:
  - 0 seconds: `.`
  - 10 seconds: `a`
  - 20 seconds: `b`
  - 30 seconds: `c`<br/>
    ...
  - 260 seconds: `A`
  - 270 seconds: `B`<br/>
    ...
  - 530 seconds: `0`
  - 540 seconds: `1`<br/>
    ...
  - Greater than 620 seconds: `!`

## 3. Analyze results

Once the script finishes running, it creates a CSV file with the following fields:

<details>
  <summary>Fields in CSV file</summary>
  <div>
    <ul>
      <li>
        <strong>job</strong>: The fixed string will either be <strong>main</strong> for phase 1 or
        <strong>post</strong> for phase 2
      </li>
      <li>
        <strong>status</strong>: Status of the last response of the session:
      </li>
      <ul>
        <li>
          0: curl command received an HTTP status code of <code>200</code>
        </li>
        <li>
          1: curl command did not receive any HTTP status codes, which typically means the curl
          command itself failed
        </li>
        <li>
          2: curl command received an HTTP status code of something other than <code>200</code>
        </li>
      </ul>
      <li>
        <strong>wait_time</strong>: Number of seconds the user waited in the waiting room
      </li>
      <li>
        <strong>wr_cnt_before</strong>: Number of users in the waiting room when the session first
        started
      </li>
      <li>
        <strong>wr_cnt_after</strong>: Number of users in the waiting room when the session made it
        past the waiting room
      </li>
      <li>
        <strong>start_time</strong>: Time when the session first started (in UNIX epoch seconds)
      </li>
      <li>
        <strong>end_time</strong>: Time when the session made it past the waiting room (in UNIX
        epoch seconds)
      </li>
    </ul>
  </div>
</details>

To visualize your results, open your CSV file within a spreadsheet application. For example, here is a basic chart that shows the amount of time a user waited verses the time they first tried to get to the web service:

![Visualizing waiting room test data by using a graphing tool](/waiting-room/static/test-waiting-room.png)

In this example, you can clearly see when the script entered the second phase — with a reduced rate of new users per second — leading to decreased wait times.

## 4. Adjust waiting room (optional)

Based on the results of your test, you may want to adjust [the settings](/waiting-room/reference/configuration-settings/) of your waiting room.
