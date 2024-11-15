  <img src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fq77uo6x7kn3hdf7w1xe5.png" alt="Cover Image" />
  <hr />
  
  # Deploy Fluvio with Cloud Cluster for free.
  
  **Tags:** `fluvio`, `programming`, `buildinpublic`, `realtimedata`

  **Published At:** 11/14/2024, 11:49:23 AM

  **URL:** [https://dev.to/priyanshuverma/deploy-fluvio-with-cloud-cluster-for-free-2bkj](https://dev.to/priyanshuverma/deploy-fluvio-with-cloud-cluster-for-free-2bkj)

  <hr />
  Hello builders,
Many of you knows me but in case I am Priyanshu Verma, An Open-source Indie Developer.

In this Article we are going to talk about how you can deploy Fluvio integrated apps like APIs on internet for free.
It is very easy to do so, As Today I will guide you how to. So, Without any delay let's see what to do.

As To deploy fluvio we need a project with it's integration. I have one from recent [Fluvio Series](https://dev.to/priyanshuverma/series/28713).
This is a basic Nodejs Express API with some endpoints and fluvio integration. I won't explain more about it you can explore this on [GitHub](https://github.com/priyanshuverma-dev/fluvio-deploy-example). This article is just for deployment.


## My Project Tree
See the Project tree as that will help in understanding what I am say in later sections.
```bash
.
├── Dockerfile
├── bun.lockb
├── cloud
│   └── sinker.yml
├── entrypoint.sh
├── index.ts
├── lib
│   ├── fluvio.ts
│   └── lib.ts
├── package.json
└── tsconfig.json
```


## 1. Create an account on Infinyon Cloud
You need to create account on [Infinyon Cloud](https://infinyon.cloud/ui/account) to make a cluster.

## 2. Install Fluvio CLI Locally
You need to install Fluvio CLI locally for testing and adding connectors to cloud cluster in case we will add a `sinker` in a topic named `stocks-sinker` from a file in side `cloud` folder named `sinker.yml` you can see in project tree. 
To install Fluvio CLI follow [official Website](https://www.fluvio.io/docs/fluvio/quickstart). Or follow me

Run command inside you terminal make sure on windows you use WSL.
```bash
curl -fsS https://hub.infinyon.cloud/install/install.sh | bash
```
After installation you need to add Fluvio to PATH by
```bash
 echo 'export PATH="${HOME}/.fvm/bin:${HOME}/.fluvio/bin:${PATH}"' >> ~/.zshrc
```
Now you will be able to use `fluvio` command in your terminal. If not then try again.



## 3. Login with your Credentials and push connectors
Now, We are going to login with our email and password in Fluvio CLI so, that we can have access to Cloud Clusters.
To do so run command
```bash
fluvio cloud login
```
It will ask for Email and Password Use what you created when signing in InfinyOn Cloud account.
You can check your clusters by command
```bash
fluvio cloud cluster list
```
If you have any then it will show you else it will show `No clusters found`. You can create cluster by the command
```bash
fluvio cloud cluster create
```
it will show something like this
```bash
Creating cluster...
Done!
Downloading cluster config
Switched to new profile: withered-frog
```
You will get any other Profile name at place of `withered-frog`.
Now, What you need to do is switch you profile to what you have created for me it is `withered-frog`. By default after creating a cluster you would be on that cluster's Profile. If you are not then switch to that. You can check it by command
```bash
fluvio profile
```
on case To switch use command
```bash
fluvio profile switch <profile name>
```
`<profile name>` is the cluster you created in my case it would be `withered-frog`.

Now, Let's Push our connector on Cloud cluster which is 
`/cloud/sinker.yml`
```yml
apiVersion: 0.1.0
meta:
  version: 0.3.8
  name: stocks-sinker
  type: http-source
  topic: stocks-sinker

http:
  endpoint: "http://deployed.url/sync"
  interval: 120s
```
I will change this `http://deployed.url/sync` to deployed URL later.
It is for my example project yours can be different and more then one.
To Push this connector will use command
```bash
fluvio cloud connector create --config cloud/sinker.yml
```
You will get something like this
```bash
connector "stocks-sinker" (http-source) created
```
You can have multiple connector can be created similarly.



## 4. Store Credentials To Deploy and Dockerfile
From here we have two ways to build Docker Image for the Project. It depends on the Public and Private Project if your project is private and you can keep sensitive secret files in your codebase then you can go with approach A if your project is Public then you should go with approach B. You can select any method and tweak that with different tricks to save secrets.

###  Approach A
For this I am assuming you have a codebase that can keep secret config files. To deploy we need a `config` file that we can use to login on server to get that inside terminal we need to export our profile by the command
```bash
fluvio profile export > config
```
It will export all configs in a file named `config` inside the folder.

Now, Create a `Dockerfile` like in project tree.

With the code of your project deploy pipelines 
```dockerfile
FROM node:18

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y curl unzip tzdata && \
    rm -rf /var/lib/apt/lists/*

# Install Fluvio
RUN curl -fsS https://hub.infinyon.cloud/install/install.sh?ctx=dc | bash

# Set up environment variables in .bashrc
RUN echo 'export PATH="$HOME/.fluvio/bin:$HOME/.fvm/bin:$PATH"' >> ~/.bashrc && \
    echo 'source "${HOME}/.fvm/env"' >> ~/.bashrc

# Source .bashrc to ensure the environment variables are loaded
RUN /bin/bash -c "source ~/.bashrc"

# Ensure correct permissions for the Fluvio binaries
RUN chmod +x /root/.fluvio/bin/* /root/.fvm/bin/*

# Set the PATH (useful if running commands outside of an interactive shell)
ENV PATH="$PATH:/root/.fluvio/bin:/root/.fvm/bin"

WORKDIR /app

COPY package*.json ./
RUN npm install -g bun

# Install Node.js dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Copy the entrypoint script
RUN cp ./config /root/.fluvio/

EXPOSE 3000

CMD [ "bun","run","dev" ]
```
You can see it is self explanatory as the main thing is installing fluvio and adding config file that we exported to the path `/root/.fluvio/`.
You can also change the default path of fluvio config by adding a environment variable `FLV_PROFILE_PATH`. For now, I just copied to default path.
This was the first approach. Now you can deploy this on any free Platform with docker Image. 
Will tell how to deploy after telling second Approach.


###  Approach B
This is if your project is public on GitHub or if you can't keep secrets in codebase.
You also need to create a `Dockerfile` like this 
```dockerfile
FROM node:18

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y curl unzip tzdata && \
    rm -rf /var/lib/apt/lists/*

# Install Fluvio
RUN curl -fsS https://hub.infinyon.cloud/install/install.sh?ctx=dc | bash

# Set up environment variables in .bashrc
RUN echo 'export PATH="$HOME/.fluvio/bin:$HOME/.fvm/bin:$PATH"' >> ~/.bashrc && \
    echo 'source "${HOME}/.fvm/env"' >> ~/.bashrc

# Source .bashrc to ensure the environment variables are loaded
RUN /bin/bash -c "source ~/.bashrc"

# Ensure correct permissions for the Fluvio binaries
RUN chmod +x /root/.fluvio/bin/* /root/.fvm/bin/*

# Set the PATH (useful if running commands outside of an interactive shell)
ENV PATH="$PATH:/root/.fluvio/bin:/root/.fvm/bin"


WORKDIR /app

COPY package*.json ./

RUN npm install -g bun


# Install Node.js dependencies
RUN bun install

COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
# Expose the port your app runs on
EXPOSE 3000


ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```
Here also we are doing same thing installing fluvio and running a file named `entrypoint.sh` which we have in codebase you can see in project tree.
Let's see what is inside the file `entrypoint.sh`.

```sh
#!/bin/bash

# Log in to Fluvio
fluvio cloud login --email $FLUVIO_CLOUD_EMAIL --password $FLUVIO_CLOUD_PASSWORD

# syncing configs
fluvio cloud cluster sync


# Start the application
exec bun run dev
```
Here you can see, We are getting `FLUVIO_CLOUD_EMAIL` and `FLUVIO_CLOUD_PASSWORD` from environment variables and logging in. Then we are syncing the config file. 
You can set Environment Variables without exposing them and making it save.


## Final Deploy
These were two methods to build Docker Image that we can deploy easily.
You can build Docker Image and publish that online like on Docker Hub to deploy that. For simplicity I will use GitHub to store my code and then deploy it with `Approach B`. I will use [Render](https://render.com/) to deploy the Docker Image.

Firstly, Push the code to GitHub and create an account on [Render](https://render.com/). After that goto dashboard and create a new Web Service.

![Image showing create a new Web Service button on Render](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nbr4krca8lcnxx9zii34.png)

After that Connect to GitHub and Select your project or fetch deployed Docker Image by Clicking `Existing Image`

![on Render Buttons](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j2r853a3pt8x3vtsflnw.png)

Then select Docker in language

![Render language section](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0nksbrze9yi1hy4ph4q0.png)

If you are doing with Approach B then add your environment Variables here like this

![Render Env Section](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dkfx449w1sj3glwq9qor.png)

Then Deploy the Project and You are good to go 🎉!
This was the simplest Article about how you can deploy Fluvio using Docker and Render.

Example Project GitHub [HERE](https://github.com/priyanshuverma-dev/fluvio-deploy-example).

Try to give some approach to fellow developers how they can put secret config file in comments.

Thanks for reading....




    
  