---
title: "Yes, It's easy to build a Fluvio connector in Rust."
publishedAt: "2024-09-08"
summary: "In today’s fast-paced world, real-time data is no longer a luxury—it’s a necessity. Whether you're..."
image: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fk4reqgihadliptee85k9.png"
slug: "yes-its-easy-to-build-a-fluvio-connector-in-rust-4bcg"
---

In today’s fast-paced world, real-time data is no longer a luxury—it’s a necessity. Whether you're monitoring live stock prices, analyzing social media trends, or syncing spreadsheets for instant insights, having data at your fingertips can make all the difference. That’s where **[Fluvio](https://www.fluvio.io)** comes in, a platform designed to streamline your data journey by offering a powerful, yet easy-to-use, infrastructure for building and managing data pipelines.

**But here’s the real magic of Fluvio:** It gives you the tools to not only move data between systems but also build your very own custom connectors! Imagine you’re working with Google Sheets, and you want your data to flow seamlessly from a Fluvio topic into a spreadsheet in real-time. Manually exporting data sounds tedious, right? What if you could build an outbound connector that does all this for you automatically?

**Sounds fun? It is!** In this guide, we’ll walk through the process of building your own Google Sheets outbound connector. This isn’t just another tech tutorial—by the end of this, you’ll have a functional connector and a deeper understanding of how Fluvio can integrate with just about anything.

### Why Build a Connector?
If you’ve ever dealt with the challenge of moving data between systems, you know how time-consuming and prone to error it can be. Fluvio’s connectors are built to make this painless. You can import data with inbound connectors or export it with outbound connectors, depending on your needs. And the beauty is that both work in a similar way—the only difference is which direction your data is flowing in relation to a Fluvio topic.

**Imagine the possibilities:**
- Automatically stream real-time data from Fluvio to Google Sheets for analysis or reporting.
- Set up an outbound connector to sync Fluvio data back into tools like Google Sheets for easy collaboration.
- Use Fluvio as a central hub for all your real-time data needs, and effortlessly extend it with your own connectors!

### Let’s Dive In
We’ll use Google Sheets as our example, but the principles you’ll learn can apply to virtually any data destination. Whether you want to push data to a cloud service, a database, or even a custom application, Fluvio connectors can handle it. And once you get the hang of it, the possibilities are endless.

In the next sections, we’ll cover how to set up a Google Sheets outbound connector, configure it for your specific needs, and show how to stream data directly from a Fluvio topic to your spreadsheet. It’s a fun way to get started with Fluvio and unleash your creativity as a data engineer.

**Ready to get your hands dirty and build something awesome?** Let’s jump right in and start connecting your data with the world of real-time streaming!


> For best developer experience use WSL or linux I am assuming that you are working on a linux machine.


### Setup Environment to build connector

- Install Rust on your machine
~~~bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
~~~
If you are facing any issue [Visit Rust Guide](https://www.rust-lang.org/tools/install).

- Add rust musl toolchain
~~~bash
rustup target add x86_64-unknown-linux-musl
~~~
- Install Fluvio cli
We need to install fluvio cli for testing and generating connector project.
~~~bash
curl -fsS https://hub.infinyon.cloud/install/install.sh | bash
~~~
As part of the initial setup, `fvm` will also install the Fluvio CLI available in the stable channel as of the moment of installation.

Fluvio is stored in `$HOME/.fluvio`, with the executable binaries stored in `$HOME/.fluvio/bin`. Visit offical [fluvio guide](https://www.fluvio.io/docs/fluvio/quickstart)

- Generate a connector template project with cli
I am following fluvio's [connector docs](https://www.fluvio.io/docs/connectors/developers/generate).

To generate project run
~~~bash
$ cdk generate
🤷   Project Name: my-connector
🤷   Please set a group name: acme
🤷   Which type of Connector would you like [source/sink]? · sink
🤷   Will your Connector be public? · false
[1/8]   Done: .gitignore
[2/8]   Done: Cargo.toml
[3/8]   Done: Connector.toml
[4/8]   Done: README.md
[5/8]   Done: sample-config.yaml
[6/8]   Done: src/config.rs
[7/8]   Done: src/main.rs
[8/8]   Done: src
~~~

Chose connector type wisely I am selecting `sink`.
Now open this project in code editor like VScode.
You will find a file tree like this
~~~
$ tree
.
├── Cargo.toml
├── Connector.toml
├── README.md
├── sample-config.yaml
└── src
    ├── config.rs
    └── main.rs
~~~
File you need to know are:
- `Cargo.toml` - It is just like package.json for rust.
- `main.rs` - It is the entry point of the program.
- `config.rs` - It will have the connector parameters provided in sample-config.yaml.
- `sample-config.yaml` - It is a sample configuration to test our connector.

### Now we will install required crate for the project.
You can use `cargo add [name]`
but for simplicity and consistency copy this dependency section to your `cargo.toml`

~~~toml
[dependencies]
futures = { version = "0.3", default-features = false }
serde = { version = "1.0", default-features = false, features = ["derive"] }
serde_json = { version = "1", default-features = false }
anyhow = { version = "1.0" }
async-std = { version = "1.8", default-features = false, features = [
  "attributes",
  "tokio1",
] }
async-trait = { version = "0.1", default-features = false }
fluvio = { git = "https://github.com/infinyon/fluvio", rev = "98cfc21314c93d4c2898edc9e2160f280622be21" }
fluvio-connector-common = { git = "https://github.com/infinyon/fluvio", rev = "98cfc21314c93d4c2898edc9e2160f280622be21", features = [
  "derive",
] }
humantime = "2.1.0"
google-sheets4 = "*"

~~~
Main package to highlight is `google-sheets4`. It will help us to connect google spreadsheet.

## Let's write some code

First thing is to setup `config` inside `config.rs` let's declare some variables for google sheets like `private_key`, `client_email` and `token_url`.

~~~rust

use fluvio_connector_common::{connector, secret::SecretString};

#[derive(Debug)]
#[connector(config, name = "sheet")]
pub(crate) struct SheetConfig {
    pub google_private_key: SecretString,
    pub google_client_email: SecretString,
    pub google_token_url: SecretString,
}

~~~
Here thing to note is the `#[connector(config, name = "sheet")]` in this `name = 'sheet'` is the section in which you add these secrets you will understand it in next section.

### Now setup `sample-config.yaml` 

Here in this we will add secrets in this config file open this and add the required code
~~~yaml
apiVersion: 0.1.0
meta:
  version: 0.1.0
  name: my-sheet-connector-test-connector
  type: sheet-connector-sink
  topic: test-sheet-connector-topic
  secrets:
    - name: GOOGLE_PRIVATE_KEY
    - name: GOOGLE_CLIENT_EMAIL
    - name: GOOGLE_TOKEN_URI
sheet:
  google_private_key: ${{ secrets.GOOGLE_PRIVATE_KEY }}
  google_client_email: ${{ secrets.GOOGLE_CLIENT_EMAIL }}
  google_token_url: ${{ secrets.GOOGLE_TOKEN_URI }}

~~~
This file is almost self-explanatory. In this Important is to not copy and paste this code snippet in `type` their should be you project connector name and see `sheet` we wrote this block by `sheet` name because we coded it in `config.rs` I tell you in previous section.

Create a `secrets.txt` file in root folder and include this following data:
~~~txt
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----private-key----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL="example.iam.gserviceaccount.com"
GOOGLE_TOKEN_URI="https://oauth2.googleapis.com/token"
~~~

You will get these things from the [Google Cloud Console](https://console.cloud.google.com).

> How to get them steps are at last of the article.

### Now code a sink file
Create a file `sink.rs` inside `src` 
add this code inside this file

~~~rs
use crate::{config::SheetConfig, Payload};
use async_trait::async_trait;
use fluvio::Offset;
use fluvio_connector_common::{LocalBoxSink, Result, Sink};
use google_sheets4::{
    api::ValueRange,
    hyper::{self, client::HttpConnector},
    hyper_rustls::{self, HttpsConnector},
    oauth2::{self, ServiceAccountKey},
    Error, Sheets,
};

pub(crate) struct SheetsSink {
    secret: oauth2::ServiceAccountKey,
}

impl SheetsSink {
    pub(crate) fn new(config: &SheetConfig) -> Result<Self> {
        let private_key = config.google_private_key.resolve()?;
        let client_email = config.google_client_email.resolve()?;
        let token_uri = config.google_token_url.resolve()?;
        let secret: oauth2::ServiceAccountKey = ServiceAccountKey {
            client_email,
            private_key,
            token_uri,
            auth_provider_x509_cert_url: None,
            auth_uri: None,
            client_id: None,
            client_x509_cert_url: None,
            key_type: None,
            private_key_id: None,
            project_id: None,
        };

        Ok(Self { secret })
    }
}


#[async_trait]
impl Sink<Payload> for SheetsSink {
    async fn connect(self, _offset: Option<Offset>) -> Result<LocalBoxSink<Payload>> {
        let auth = oauth2::ServiceAccountAuthenticator::builder(self.secret)
            .build()
            .await?;
        let hub = Sheets::new(
            hyper::Client::builder().build(
                hyper_rustls::HttpsConnectorBuilder::new()
                    .with_native_roots()
                    .unwrap()
                    .https_or_http()
                    .enable_http1()
                    .build(),
            ),
            auth,
        );

        let unfold = futures::sink::unfold(
            hub,
            |hub: Sheets<HttpsConnector<HttpConnector>>, record: Payload| async move {
                let req = ValueRange {
                    values: Some(record.values),
                    range: None,
                    major_dimension: None,
                };
                let result = hub
                    .spreadsheets()
                    .values_append(req, &record.spreadsheet_id, &record.range)
                    .value_input_option("USER_ENTERED")
                    .insert_data_option("OVERWRITE")
                    .include_values_in_response(false)
                    .doit()
                    .await;
                match result {
                    Err(e) => match e {
                        // The Error enum provides details about what exactly happened.
                        // You can also just use its `Debug`, `Display` or `Error` traits
                        Error::HttpError(_)
                        | Error::Io(_)
                        | Error::MissingAPIKey
                        | Error::MissingToken(_)
                        | Error::Cancelled
                        | Error::UploadSizeLimitExceeded(_, _)
                        | Error::Failure(_)
                        | Error::BadRequest(_)
                        | Error::FieldClash(_)
                        | Error::JsonDecodeError(_, _) => println!("{}", e),
                    },
                    Ok(res) => println!("Success: {:?}", res.0.status()),
                }
                Ok::<_, anyhow::Error>(hub)
            },
        );
        Ok(Box::pin(unfold))
    }
}

~~~
Don't react it is very easy just understand the core function.
~~~rs

pub(crate) struct SheetsSink {
    secret: oauth2::ServiceAccountKey,
}
~~~
Create a struct here it is `SheetsSink` inside which we store data on initial connector run. We are saving `ServiceAccountKey`.


~~~rs
impl SheetsSink {
    pub(crate) fn new(config: &SheetConfig) -> Result<Self> {
        let private_key = config.google_private_key.resolve()?;
        let client_email = config.google_client_email.resolve()?;
        let token_uri = config.google_token_url.resolve()?;
        let secret: oauth2::ServiceAccountKey = ServiceAccountKey {
            client_email,
            private_key,
            token_uri,
            auth_provider_x509_cert_url: None,
            auth_uri: None,
            client_id: None,
            client_x509_cert_url: None,
            key_type: None,
            private_key_id: None,
            project_id: None,
        };

        Ok(Self { secret })
    }
}
~~~
In this code block we are getting config like `private_key` and others and creating a `ServiceAccountKey` and set it to `Self`.

~~~rs

#[async_trait]
impl Sink<Payload> for SheetsSink {
  
}
~~~

After that we are implementing `SheetsSink` for the native `Sink` provided by fluvio. It requires a generic type of the struct that has data which you want to save. Here we created one named `Playload` importing from `main.rs`. We will see in next section.

We will create a `async function` named `connect` inside which we created `auth` variable saving authentication thing for `google spreadsheet` and create a `hub` with that `auth` this part is required for the package `google_sheets4`. You can see their [docs](https://docs.rs/google-sheets4) for more information.

~~~rs
 let unfold = futures::sink::unfold(
            hub,
            |hub: Sheets<HttpsConnector<HttpConnector>>, record: Payload| async move {
                let req = ValueRange {
                    values: Some(record.values),
                    range: None,
                    major_dimension: None,
                };
                let result = hub
                    .spreadsheets()
                    .values_append(req, &record.spreadsheet_id, &record.range)
                    .value_input_option("USER_ENTERED")
                    .insert_data_option("OVERWRITE")
                    .include_values_in_response(false)
                    .doit()
                    .await;
                match result {
                    Err(e) => match e {
                        // The Error enum provides details about what exactly happened.
                        // You can also just use its `Debug`, `Display` or `Error` traits
                        Error::HttpError(_)
                        | Error::Io(_)
                        | Error::MissingAPIKey
                        | Error::MissingToken(_)
                        | Error::Cancelled
                        | Error::UploadSizeLimitExceeded(_, _)
                        | Error::Failure(_)
                        | Error::BadRequest(_)
                        | Error::FieldClash(_)
                        | Error::JsonDecodeError(_, _) => println!("{}", e),
                    },
                    Ok(res) => println!("Success: {:?}", res.0.status()),
                }
                Ok::<_, anyhow::Error>(hub)
            },
        );
        Ok(Box::pin(unfold))

~~~

After that we have created a `unfold` variable which is resolving records that are sent on topic in `unfold` we are taking two parameter `hub` and a `payload`. At this I think you are familiar them both.
And executing a function to `append` the values in google spreadsheet and handling errors if there is any. then we are cleaning everything at the end with `Ok()`.

### It's time to touch `main.rs` entrypoint
In this file we need to understand only couple of things first add this code inside it.
~~~rs

mod config;
mod sink;
use std::time::Duration;

use anyhow::anyhow;
use config::SheetConfig;
use futures::{SinkExt, StreamExt};

use fluvio_connector_common::{
    connector,
    consumer::ConsumerStream,
    future::retry::ExponentialBackoff,
    tracing::{error, trace, warn},
    Result, Sink,
};
use serde::{Deserialize, Serialize};
use sink::SheetsSink;

const BACKOFF_MIN: Duration = Duration::from_secs(1);
const BACKOFF_MAX: Duration = Duration::from_secs(3600 * 24);

// Data payload structure to be inserted into the Google Sheet
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Payload {
    pub range: String,
    pub values: Vec<Vec<serde_json::Value>>,
    pub major_dimension: String,
    pub spreadsheet_id: String,
}

#[connector(sink)]
async fn start(config: SheetConfig, mut stream: impl ConsumerStream) -> Result<()> {
    println!("Starting sheet-connector sink connector with {config:?}");
    let mut backoff = backoff_init()?;
    loop {
        let Some(wait) = backoff.next() else {
            // not currently possible, but if backoff strategy is changed later
            // this could kick in
            let msg = "Retry backoff exhausted";
            error!(msg);
            return Err(anyhow!(msg));
        };
        if wait >= BACKOFF_MAX {
            // max retry set to 24hrs
            error!("Max retry reached");
            continue;
        }
        let sink = SheetsSink::new(&config)?;
        let mut sink = match sink.connect(None).await {
            Ok(sink) => sink,
            Err(err) => {
                warn!(
                    "Error connecting to sink: \"{}\", reconnecting in {}.",
                    err,
                    humantime::format_duration(wait)
                );
                async_std::task::sleep(wait).await;
                continue; // loop and retry
            }
        };
        // reset the backoff on successful connect
        backoff = backoff_init()?;

        while let Some(item) = stream.next().await {
            let out: std::result::Result<Payload, serde_json::Error> =
                serde_json::from_slice(item?.as_ref());
            match out {
                Ok(payload) => {
                    trace!(?payload);
                    sink.send(payload).await?;
                }
                Err(_) => error!("data parsing error. try again"),
            }
        }
    }
}

fn backoff_init() -> Result<ExponentialBackoff> {
    let bmin: u64 = BACKOFF_MIN.as_millis().try_into()?;
    Ok(ExponentialBackoff::from_millis(bmin).max_delay(BACKOFF_MAX))
}

~~~

First thing is `Payload` struct
~~~rs
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Payload {
    pub range: String,
    pub values: Vec<Vec<serde_json::Value>>,
    pub major_dimension: String,
    pub spreadsheet_id: String,
}
~~~
This struct contain important things like `values`, `range` and `spreadsheet_id` and everything is self explanatory.

Then we have a function `start` which is the entrypoint gives us `config` and `comsumer stream` inside this we are handling `retries` with `backoff` function on need to understand this for now it just optimize connector. 

The main code block is this
~~~rs
let sink = SheetsSink::new(&config)?;
        let mut sink = match sink.connect(None).await {
            Ok(sink) => sink,
            Err(err) => {
                warn!(
                    "Error connecting to sink: \"{}\", reconnecting in {}.",
                    err,
                    humantime::format_duration(wait)
                );
                async_std::task::sleep(wait).await;
                continue; // loop and retry
            }
        };
// reset the backoff on successful connect
        backoff = backoff_init()?;
~~~
In this we are connecting to our own `sink` that we created with config provided and handling error if their is any. After this resetting `backoff` after connection.


Then In last block below we are looping the stream in which we parsed `Payload` by `serde_json` and executing that with `sink.send(payload)`. Handling some errors.
~~~rs
 while let Some(item) = stream.next().await {
            let out: std::result::Result<Payload, serde_json::Error> =
                serde_json::from_slice(item?.as_ref());
            match out {
                Ok(payload) => {
                    trace!(?payload);
                    sink.send(payload).await?;
                }
                Err(_) => error!("data parsing error. try again"),
            }
        }
~~~

### Finally build connector and test
It's time to build the connector and test it.

- Build connector by this command
make sure running in root directory
~~~bash
cdk build
~~~
> If facing any error then use this command 
> ~~~bash
> cdk build --target x86-64-unknown-linux-unknown
> ~~~ 
> change `x86-64` with your system's architecture

- Test it with `sample-config.yaml` and `secrets.txt`
~~~bash
 cdk test --config sample-config.yaml --secrets secrets.txt
~~~
- Run fluvio producer and produce some sample data and see it in google spreadsheet.
~~~bash
fluvio produce [topic-name]
~~~
send sample data like
~~~json
{
  "range": "A1",
  "major_dimension": "ROWS",
  "values": [["A1 value", "A2 value", "A3 value"]],
  "spreadsheet_id": "spreadsheet_id"
}
~~~
replace spreadsheet_id with your owns.

If you face any permission error  like this:
~~~bash
{
 "error": {
    "code": 403,
    "message": "The caller does not have permission",
    "status": "PERMISSION_DENIED"
  }
}
~~~

refer to this fix.

Add your `client_email` from google console in the spreadsheet's `editor` section or see [Fix On StackOverflow](https://stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve)


### Get Service account keys
- Go to [Google Cloud Console](https://console.cloud.google.com).
- Create a new project or select existing project
- Go to `Enable APIs and Services`

![Google Cloud Console - Enable APIs and Services](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/90rxiuu1ttcscyuk3vh2.png)

- Click on `Library` and Search for `
Google Sheets API` and enable it

![Google Cloud Console - Google Sheets API](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jgbf93pnzd6v59lq3tzh.png)


- Now go to `service account` to create one

![Google Cloud Console - service account](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xfiyu5x2izq0mq8nqeok.png)

...

Source Code: [Github](https://github.com/priyanshuverma-dev/sheet-connector)

...

This was it for this article hope you enjoyed building it.
My name is Priyanshu Verma and you are reading about fluvio connectors.

Thanks.










 