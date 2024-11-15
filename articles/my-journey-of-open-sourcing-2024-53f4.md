---
title: "My journey of open-sourcing 2024"
publishedAt: "2024-11-06"
summary: "Introduction 👋   Hello Devs! I am Priyanshu Verma, a aspiring Technologist and Open-source..."
image: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fa0oh7oz6myaazfj2wsco.png"
slug: "my-journey-of-open-sourcing-2024-53f4"
---

## Introduction 👋

Hello Devs!
I am Priyanshu Verma, a aspiring Technologist and Open-source developer. I have recently participated in bunch of events in October.

I have participated in events:
- [Hacktoberfest](https://hacktoberfest.com/)
- [Devfest](https://devfest.ai/)
- [Quira Hacktoberfest](https://quira.sh/quests/creator/details?questId=21)
- [GSSOC](https://gssoc.girlscript.tech/)



This October 2024 was my busiest year in open-source.

![GitHub Stats](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/052jchu61ihha7w6ktmz.png)

## Hacktoberfest 2024
This is my 2nd year of participating in Hacktoberfest and this year I broke my record of pulling requests.

![Hacktoberfest Stats](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6rwcjq36gw5cb2k2720c.png)

I have contributed in bunch of repositories will tell in next sections.


## Devfest 2024
This is my 1st year of participating in Devfest and got in TOP 30. Didn't selected for swags but contributed in repositories like:
- [Dstack](https://github.com/dstackai/dstack)
  * [#1891](https://github.com/dstackai/dstack/pull/1819)
- [Palico AI](https://github.com/palico-ai/palico-ai)
  * [#227](https://github.com/palico-ai/palico-ai/pull/227) 
  * [#229](https://github.com/palico-ai/palico-ai/pull/229)

## GSSOC 2024
This was my 1st year of participating in GSSOC (GirlScript Summer Of Code Extended). I was selected as contributor and contributed in several repositories you can see all stats [here](https://gssoc.girlscript.tech/leaderboard?year=2024&username=priyanshuverma-dev).

The major contributions I done in repositories are:

- Migrating projects to `Prisma or Drizzle ORM`. I have migrated many project to `Prisma ORM` under GSSOC. It made me perfect in using Prisma or Drizzle as project were using Mongodb Aggregation Pipelines that I had migrated to Prisma or Drizzle.

Some of the Project Migrated in Prisma or Drizzle are:
1. [Truth Tunnel](https://github.com/MitulSonagara/truth-tunnel/pull/40)
2. [CodeCache](https://github.com/notsoocool/codecache/pull/29)
3. [Med-o-Next](https://github.com/Megh2005/Med-o-Next/pull/112)

- Fixed UI Issues and added rate limiting in project. I have contributed in various tech stacks like Python, Typescript, Flask, Next.js, Core React, Raw Html, Docker, more.


- I added a End-to-End encryption in one Project [Truth Tunnel](https://github.com/MitulSonagara/truth-tunnel). It was my first time of adding encryption in the project as the project is to send anonymous messages and secure encryption flow is very important key. So, I used the Public and Private Key method used RSA keys. 
The goal was simple encrypt messages sent by `user A` to `user B` with public key of `user B` and decrypt it with private key of `user B` to show it. The problem rises how to save encryption keys as we can not store private key on server. As then it will make not sense of encryption.
So, I use a Secret Passphrase approach which encrypts the private key with the Secret Passphrase provided by user which we do not store only user knows it. then that encrypted private key we store in database. when user login new session we ask for Secret Passphrase that unlocks the private key and save it in local users browser IndexDB. Remember we do not encrypt and decrypt message in servers we send and receives encrypted messages from client.

- I Converted Raw Html flask template website to Single Page Web App in Project [Bot Verse](https://github.com/kom-senapati/bot-verse). It was also my first time and even I don't know how I wrote that logic using no libraries and packages only JavaScript. You can see the basic code I wrote for this 
~~~javascript
function navigate(event, path) {
  event.preventDefault(); // Prevent the default anchor behavior
  history.pushState(null, "", path); // Change the URL without reloading the page
  loadContent(path); // Load the content dynamically
  toggleAnonymousChatbotButton();
}

async function loadContent(path) {
  const appDiv = document.getElementById("main-content"); // Main content area
  const urlMap = {
    "/": "/landing",
    "/dashboard": "/dashboard",
    "/profile": "/profile",
    "/login": "/login",
    "/signup": "/signup",
    "/chatbot": "/chatbot",
    "/anonymous": "/anonymous",
   ...more
  };

  let url = urlMap[path] || null;

  // Handle /chatbot/<id>
  const profiletMatch = path.match(/\/profile\/(\d+)/);
  if (profiletMatch) {
    const profileId = profiletMatch[1];
    url = `/profile/${profileId}`; // Update URL for the chatbot page
  }



  if (!url) {
    appDiv.innerHTML = "<h1>404 Page is not registered</h1>";
    removeScripts(); // Clean up scripts if path is not found
    return;
  }

  try {
    const response = await fetch(`${url}?full=false`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text(); // Fetch HTML content
    appDiv.innerHTML = content; // Inject HTML into the main content area
    removeScripts(); // Remove existing scripts


      injectScript(`/static/js${url}.js`); // Load the corresponding script

  } catch (error) {
    console.error("Failed to load content:", error);
    appDiv.innerHTML = "<h1>Failed to load content</h1>";
  }
}

function injectScript(src) {
  // Check if the script is already loaded to avoid duplicates
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.src = src;
  script.async = true; // Load script asynchronously

  script.onload = () => console.log(`${src} loaded successfully.`);
  script.onerror = () => console.error(`Failed to load script: ${src}`);

  document.body.appendChild(script); // Append script to body
}

function removeScripts() {
  const scripts = document.querySelectorAll("script");
  scripts.forEach((script) => {
    if (script.src && script.src.includes("/static/js")) {
      script.parentNode.removeChild(script); // Remove the script from the DOM
    }
  });
}

// Handle back/forward button
window.onpopstate = function () {
  loadContent(window.location.pathname);
};

// Load the initial content
window.onload = function () {
  loadContent(window.location.pathname);
};

~~~

You see the basic flow. I am not diving deep as it is not technical blog.
You can Message me if you want to [HERE](https://www.linkedin.com/in/priyanshu-verma-dev/).


## SDKs
I have created some SDKs for [MindsDB Hacktoberfest](https://mindsdb.com/hacktoberfest). There are two of them:

[Minds Dart SDK](https://github.com/priyanshuverma-dev/minds_sdk) It is not well maintained and I didn't took it serious. You guys and contribute in it to make it perfect.

[Minds C# SDK](https://github.com/priyanshuverma-dev/Minds.SDK) It is C# SDK which I took serious and I will try to maintain it as it is online on `Nugut` and well maintained Production level code is written.


Yes, I did more then these contributions that are some but effective will tell about them later. 

## Conclusion
At the end I learned a lot in this October many this. I got many ideas about different things. You will see more exciting projects soon. I am working on some awesome Packages and Projects.

You guys can follow me up on social media and connect with me. I will be very happy with that.

- [LinkedIn](https://www.linkedin.com/in/priyanshu-verma-dev/)
- [X](https://x.com/pvdev)
- [Discord](https://discord.com/channels/@me/priyanshu_verma/)
- [GitHub](https://github.com/priyanshuverma-dev/)

Thanks for reading...





 