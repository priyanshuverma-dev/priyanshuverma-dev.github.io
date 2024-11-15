  <img src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwoq62y4mm3opdvhcnku7.png" alt="Cover Image" />
  <hr />
  
  # Fluvio - An open-source In-motion data framework.
  
  **Tags:** `fluvio`, `beginners`, `programming`, `realtimedatastream`

  **Published At:** 8/20/2024, 4:59:24 PM

  **URL:** [https://dev.to/priyanshuverma/fluvio-a-open-source-in-motion-data-framework-3927](https://dev.to/priyanshuverma/fluvio-a-open-source-in-motion-data-framework-3927)

  <hr />
  Hello enthusiasts,

Today we are going to learn about [Fluvio](https://www.fluvio.io/) work with this technology. This post is not about theory it's a practical based article. You can checkout Fluvio's own [blogs](https://www.infinyon.com/blog/2021/06/introducing-fluvio/) to learn about fluvio deep. 

## Why to read this article?
Yes, you can find the documentation about [Fluvio](https://www.fluvio.io/) in the corners of internet but you can't get a end-to-end project that's what this article provides you. Believe me at the end you will find yourself confident with fluvio and one simple yet complex project. 
Let's dive right in!


## What is the Problem and the fix?

The problem is to solve the Real-time data stream of the price of stocks efficiently without using complex services like Kafka, Pulsar, Flink, Spark, etc. By using a simple topic-based data stream with Fluvio.


## Create Project

I am going to use the following stack:

- Frontend [(Next.js)](https://nextjs.org/)
- Backend [(Express.js)](https://expressjs.com/)
- Data Stream [(Fluvio)](https://www.fluvio.io/docs/fluvio/quickstart/)

Let's go step-by-step

## Step 1: Install fluvio

Use To fluvio we need to install [Fluvio CLI](https://www.fluvio.io/docs/fluvio/cli/overview). We need a Docker or linux machine to install Fluvio. I will use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). 
To install fluvio run:
```bash
curl -fsS https://hub.infinyon.cloud/install/install.sh | bash
```
For Docker follow official fluvio [steps](https://www.fluvio.io/docs/fluvio/installation/docker).

Now you need to start the fluvio cluster
```bash
fluvio cluster start
```
If you need to start it a second time use this command:
```bash
fluvio cluster resume
```

## Step 2: Set up project folder and file structure.

Create a folder and open it in **VSCode** (you can use anything).
```
├── server/
│   ├── index.ts           # Main server code
├── client/
│   ├── components/
│   │   │
│   │   ├── StockChart.tsx  # Main chart component
│   │   └── StockSwitch.tsx  # Component for toggling stock charts
│   └── (...other files)
└── http-sources/
    ├── amzn.yml  # Example YAML file for defining HTTP sources
    └── deploy.sh          # Script for deploying and creating Fluvio 

```
We have create **3 sub-folders**:
- server - (express server code)
- client - (next.js app)
- http-sources - (fluvio configs)

## Step 3: Write server code to create APIS

- In the created folder `server` initialize the project with:
```bash
bun init
```
You can use `npm` also. Using bash for type script.

- Install required dependencies:
```bash
bun add @fluvio/client cors express yahoo-finance2
```
Install types also if you are using TypeScript:
```bash
bun add -D @types/cors @types/express
```
 
- Open the `index.ts` file created while initializing the project and write some code.

```typescript
import yahooFinance from "yahoo-finance2";

import Express from "express";
import cors from "cors";
import Fluvio, { Offset, type Record, type Topic } from "@fluvio/client";

const PORT = process.env.PORT || 8080;

const PARTITION = 0;
const fluvio = new Fluvio();

const app = Express();
app.use(cors());

// To get current price of share (default to APPL) can be changed if add query `?symbol=MSFT`
app.get("/price", async (req, res) => {
  try {
    let symbol: string;
    if (req.query.symbol == null) {
      symbol = "AAPL";
    } else {
      symbol = String(req.query.symbol);
    }

    const quote = await yahooFinance.quote(symbol);
    const { regularMarketPrice } = quote;

    const payload = {
      symbol: symbol,
      price: regularMarketPrice,
      time: Date.now(),
    };

    return res.json(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});


// To get stream data for client-side websites requires topic-id.
app.get("/stream/:topic", async (req, res) => {
  try {
    const topic = req.params.topic;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream;");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const client = await fluvio.connect();
    const consumer = await client.partitionConsumer(topic, PARTITION);
    await consumer.stream(Offset.FromEnd(), async (record: Record) => {
      const eventData = record.valueString();
      const responseMsg = `data: ${JSON.stringify(eventData)}\n\n`;
      res.write(responseMsg);
      res.write("\n\n");
    });

    res.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

// To get all the stocks topics
app.get("/list", async (_, res) => {
  try {
    await fluvio.connect();
    let admin = await fluvio.admin();
    let topicsStr = await admin.listTopic();

    let topics = JSON.parse(topicsStr);

    let payload = topics.map((topic: Topic) => {
      return {
        name: topic.name,
      };
    });

    return res.json(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

```

It is a very basic express API server with mainly **3 endpoints**:

1. `/list`: To get the list of topics from fluvio. Topics are like a river with flowing data. In our case, we will have topics for stocks like 
`amzn`- Amazon
`msft` - Microsoft, etc
We will name topics with stock symbols of the company that will help as you see more in the project.

2. `/price`: This endpoint is for fluvio here we have the stock symbol default to `appl` it can be changed with the query `?symbol=[STOCK]`. We are fetching the price from `yahoo-finance2` package.


3. `/stream/:topic`: This endpoint is very important because it uses a server-side event stream to distribute real-time data from fluvio to client apps.

## Step 4: Create a next.js app

Comeon We all know how to create a next.js project do this yourself you are a dev! make a project with typescript, tailwindcss, and app dir.

- Install required dependencies:
```bash
bun add moment recharts
```


- Now create a folder named `components` and add **2 files**"
1. StockChart.tsx
2. StockSwitch.tsx


## StockChart.tsx
```tsx
"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";
import { useSearchParams } from "next/navigation";

type StockData = {
  symbol: string;
  price: number;
  time: string;
};

const StockChart = () => {
  const searchParams = useSearchParams();

  const symbol = searchParams.get("symbol") ?? "appl";

  const [chartData, setChartData] = useState<StockData[]>([]);

  const TOPIC_NAME = symbol;
  useEffect(() => {
    const sse = new EventSource(`http://localhost:8080/stream/${TOPIC_NAME}`);

    sse.onmessage = (event) => {
      try {
        const preParsedData = JSON.parse(event.data);
        const parsedData = JSON.parse(preParsedData);

        setChartData((prevData) => [
          ...prevData,
          {
            price: parsedData.price,
            symbol: parsedData.symbol,
            time: moment(new Date(parsedData.time)).format("hh:mm:ss A"),
          },
        ]);
      } catch (error) {
        console.log("Error parsing SSE data:", error);
      }
    };
    return () => {
      sse.close();
    };
  }, [TOPIC_NAME]);

  const formatYAxis = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Real-time {symbol.toUpperCase()} Stock Prices
      </h1>

      <LineChart
        width={820}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default StockChart;

```
This component is a client-side component that fetches real-time events from the express API server we created. You can analyse the code It has a very simple Chart with Price and time. One State to set stock data and get a stock symbol from search params.


## StockSwitch.tsx
```tsx

import Link from "next/link";
import React from "react";

type Stock = {
  name: string;
};

const fetchlist = async () => {
  const res = await fetch("http://localhost:8080/list");

  const data: Stock[] = await res.json();
  if (res.ok) {
    return data;
  } else {
    return [];
  }
};

export default async function StockSwitch() {
  const stocks = await fetchlist();

  return (
    <div>
      <ul>
        {stocks.map((stock) => (
          <li>
            <Link
              href={`?symbol=${stock.name}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              {stock.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

```

A very simple component fetches data and populates the topics from fluvio using our express server API.

## Now link all the parts in `page.tsx`
```tsx
import StockChart from "@/components/StockChart";
import StockSwitch from "@/components/StockSwitch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex p-2 flex-col justify-center h-screen items-center">
      <main>
        <h1>Welcome to the Stock Charts</h1>
        <StockChart />
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-700">Other Stocks</p>
          <StockSwitch />
        </div>
      </main>

      <footer>
        <p>
          Powered by{" "}
          <Link className="text-blue-500" href={"https://www.fluvio.io"}>
            Fluvio
          </Link>{" "}
          Realtime Data flow.
        </p>
      </footer>
    </div>
  );
}

```

## Step 5: Real magic of Fluvio!

- Create a folder named `http-sources` as shown in the project structure.
- Create `[STOCKNAME].yml` files for stock prices
- Creating one for appl:

```yml
apiVersion: 0.1.0

meta:
  version: 0.2.5
  name: stock-appl
  type: http-source
  topic: appl

http:
  endpoint: "http://localhost:8080/price?symbol=APPL"
  method: GET
  interval: 3s

```

In this file, we are using a source connector `http-source` and pulling data from our express API server. With `GET` method with `3s` interval.

You can add more stocks like this with just [STOCKNAME] change (example.yml):

```yml
apiVersion: 0.1.0

meta:
  version: 0.2.5
  name: stock-{STOCKNAME}
  type: http-source
  topic: {STOCKNAME}

http:
  endpoint: "http://localhost:8080/price?symbol={STOCKNAME}"
  method: GET
  interval: 3s

```

## STEP 6: The now final step of the game

- Inside `http-sources` folder run command:
```bash
cdk hub download infinyon/http-source@0.3.8
```
This will download the file required for fluvio `yml`.

- Create a topic in fluvio (remember topic name should be unique and should be the same as written in .yml file for me it is {STOCKNAME} or apply)

Run command:
```bash
fluvio topic create appl
```

- Lastly deploy the .yml file:
cdk deploy start --ipkg infinyon-http-source-0.3.8.ipkg -c appl.yml

`--ipkg` is the file downloaded from previous command
`-c` is the .yml file name.

To make your life more easier I wrote a `deploy.sh` file that will do this Slep 6 with one command:

`deploy.sh`:

```sh
#!/bin/bash

# Set variables
PACKAGE_NAME="infinyon-http-source-0.3.8"
PACKAGE_VERSION="0.3.8"
PACKAGE_IPKG="${PACKAGE_NAME}.ipkg"
PACKAGE_URL="infinyon/http-source@${PACKAGE_VERSION}"
HTTP_SOURCES_DIR="."

# Function to download the package if it doesn't exist
download_package() {
  if [ ! -f "${HTTP_SOURCES_DIR}/${PACKAGE_IPKG}" ]; then
    echo "Package ${PACKAGE_IPKG} not found. Downloading..."
    cdk hub download ${PACKAGE_URL} -o ${HTTP_SOURCES_DIR}
  else
    echo "Package ${PACKAGE_IPKG} already exists."
  fi
}

# Function to deploy configurations
deploy_configurations() {
  for file in ${HTTP_SOURCES_DIR}/*.yml; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "example-source.yml" ]; then
      echo "Deploying ${file}..."
      echo "Command: cdk deploy start --ipkg ${PACKAGE_IPKG} -c ${file}"
      cdk deploy start --ipkg ${PACKAGE_IPKG} -c ${file}
    else
      echo "Skipping ${file}."
    fi
  done
}

# Function to create Fluvio topics
create_topics() {
  for file in ${HTTP_SOURCES_DIR}/*.yml; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "example-source.yml" ]; then
      # Extract the topic using sed
      topic=$(sed -n 's/^[[:space:]]*topic:[[:space:]]*\(.*\)/\1/p' "$file")
      if [ -n "$topic" ]; then
        # Check if the topic already exists
        if fluvio topic list | grep -q "^${topic}$"; then
          echo "Topic ${topic} already exists. Skipping creation."
        else
          echo "Creating Fluvio topic ${topic}..."
          fluvio topic create ${topic}
        fi
      else
        echo "No topic found in ${file}."
      fi
    else
      echo "Skipping ${file}."
    fi
  done
}

# Main script execution
download_package
create_topics
deploy_configurations

echo "Script execution completed."
```

Run Command:
```bash
./deploy.sh
```
Now you are good to go. 

## Finishing Up.
Run `client` and `server`

- go inside `/client` run `bun dev`
- go inside `/server` run `bun run index.ts`

Now open `https://localhost:3000` and see your application.

# Things can extend 

- add more stocks
- make a good UI
- add authentication
- ...more.


This was for this article
Source Repo: https://github.com/priyanshuverma-dev/stock-charts

Thanks,
Priyanshu Verma















































    
  