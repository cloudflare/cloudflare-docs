---
title: Build your own Analytics dashboard
order: 40
---

# Build your own Analytics dashboard

In this example, we're going to see how to use the GraphQL Analytics API to build your own dashboard. This tutorial walks you through building a simple line chart for your Cloudflare zone, using a bit of HTML, Javascript, AJAX and chart.js.

![GraphQL recipe](../static/graphQL-recipe-cacheVisual.gif)

The following code will build a page with all the requirement to fetch from GraphQL and plot the cached and uncached bandwidth for the given zone. You'll just need to enter your email address, API token, and your zone ID, and then push the `Fetch analytics` button.

## Code

```html
<!DOCTYPE html>
<html>

<head>
    <title>Line Chart</title>
    <script src="../../../../dist/Chart.min.js"></script>
    <script src="https://www.chartjs.org/samples/latest/utils.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/dist/main.css">
</head>

<body>
    <br />


    <div>
        <h3><span>Visualise your traffic from GraphQL!</span></h3>
        <br />
        <div>
            <form><label for="site" class=""><span>Enter your API details:</span></label>
                    <input placeholder= "Email" id="email"></textarea>
                    <input placeholder= "API Token" id= "apiKey" ></textarea></form>
        </div>
        <label for="site" class=""><span>Choose the zone tag you want to fetch for:</span></label>
        <div><input placeholder= "Zone Tag" id="zoneTag"></textarea></div>
        <button id="fetch" type="button" data-testid="add-site-button">

            <p><span>Fetch analytics</span></p>
        </button>
    </div>



    <div style="width:50%;">
        <div id = "error"></div>
        <canvas id="canvas" style="width:100%;"></canvas>
    </div>
    <div style="width:50%;">
        <div id = "error"></div>
        <canvas id="canvas2" style="width:100%;"></canvas>
    </div>
    <br />
    <br />

    <script>
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        function chartInit(date, total, cached){
            var config = {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    label: 'total traffic',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: total,
                    fill: false,
                }, {
                    label: 'Cached traffic',
                    fill: false,
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: cached
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Cached vs Uncached traffic'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };
        return config
        }

        window.onload = function() {

        };

        function fetchAPI(url, email, apiKey, zoneTag) {
            let request = new Request(url)
            let query = {"query":"{\n  viewer {\n    zones(filter: { zoneTag: " + zoneTag + " }) {\n      httpRequests1dGroups(\n        orderBy: [date_ASC]\n        limit: 1000\n        filter: { date_gt: \"2019-07-15\" }\n      ) {\n        date: dimensions {\n          date\n        }\n        sum {\n          cachedBytes\n          bytes\n        }\n      }\n    }\n  }\n}","variables":{}}

            let init = {
                method: 'POST',
                body: JSON.stringify(query)
            }
            request.headers.set('x-auth-key', apiKey)
            request.headers.set('x-auth-email', email)

            return fetch(request, init)
        }

        document.getElementById('fetch').addEventListener('click', async function() {
            var email = document.getElementById('email').value
            var apiKey = document.getElementById('apiKey').value
            var zoneTag = document.getElementById('zoneTag').value
            var ctx = document.getElementById('canvas').getContext('2d');
            var beforeGraph = document.getElementById('canvas')

            if (email && apiKey) {
                document.getElementById('error').innerHTML = ""

                let response = await fetchAPI('https://api.cloudflare.com/client/v4/graphql', email, apiKey, zoneTag)
                let json = await response.json()

                if (response.status == 200) {
                    var date = []
                    var total = []
                    var cached = []
                    var array = json.data.viewer.zones[0].httpRequests1dGroups

                    for (let i =0 ; i < array.length; i++) {
                        date.push(array[i].date.date)
                        total.push(array[i].sum.bytes)
                        cached.push(array[i].sum.cachedBytes)
                    }

                    window.myLine = new Chart(ctx, chartInit(date, total, cached));
                }
                else {
                    document.getElementById('error').innerHTML = 'error: \n'+ json
                    document.getElementById('error').style.color = "Red"
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

            }
            else {
                document.getElementById('error').innerHTML = "Please fill the form with your key and email"
                document.getElementById('error').style.color = "Red"
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });

        var colorNames = Object.keys(window.chartColors);
    </script>
</body>
</html>
```
