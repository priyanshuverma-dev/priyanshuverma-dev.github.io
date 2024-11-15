---
title: "Let's integrate auth.js with Supabase!"
publishedAt: "2024-08-05"
summary: "Hello everyone, Recently I was building a chat app. It was very quick to build a real-time app with..."
image: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4girznfwedbx5fp04wue.png"
slug: "lets-integrate-authjs-with-supabase-mf7"
---

Hello everyone,
Recently I was building a chat app. It was very quick to build a real-time app with supabase. I was amazed.
I used this tech stack:
* [Next.js](https://nextjs.org)
* [Auth.js](https://authjs.dev) (next-auth)
* [Supabase](https://supabase.com)

I am not going to cover full project in this post feel free to comment for that. For now We are going to setup authentication with auth.js and supabase. So, Let's begain.

## Step 1: Create a next.js project.
There are many ways to create next.js project. I am going to use [Bun](https://bun.sh). It is faster then alternatives as of now 😊.

~~~bash
bun create next-app supa-auth
~~~
create a project by this command replace `supa-auth` with your project name. It will ask several questions chose as per your choice. I will use **typescript**.

You can open this project in any code editor you want I am using [Vscode](https://code.visualstudio.com).

## Step 2: Create a Supabase Project.

Navigate to [Supabase Website](https://supabase.com/). Create an account and create a new project.

![Create Supabase project form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/74pepxml7c3j4494akp5.png)

fill project name, password, select the region that is close to you and create project.
Now you will be redirected to this screen:

![Supabase project dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q66wkgd7kqx11ct4j9zv.png)

Copy **Project URL** and **API Key** go to your project directory create a `.env` file and this fields:
~~~env
NEXT_PUBLIC_SUPABASE_URL= <your project url>
SUPABASE_ANON_KEY= <your project api key>
~~~

## Step 3: Setup auth.js with simple UI.
Let's install dependencies for auth.js
~~~bash
bun add next-auth@beta @supabase/supabase-js @auth/supabase-adapter
~~~
These are the dependencies you need to install to setup supabase with auth.js.

After installation Setup auth.js
Create a `auth.ts` file in root of your project (if you selected `src` folder during installation then create file inside `src`).

This file will look like this:
~~~ts
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_ANON_KEY as string,
  }),
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
});
~~~

You can tweak this file as per your requirement. I am going to use Google Oauth to signin you can use others also. you can see from [auth.js docs](https://authjs.dev).

Add Google Client ID and Secret in `.env` file and add auth secret for auth.js like this:

~~~
NEXT_PUBLIC_SUPABASE_URL= <your project url>
SUPABASE_ANON_KEY= <your project api key>

AUTH_SECRET="secret-for-authjs" # change this

AUTH_GOOGLE_ID= <your google client id>
AUTH_GOOGLE_SECRET= <your google client secret>
~~~
**Remember** to write variable name as given for `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` and `AUTH_SECRET`. It is required [see more](https://authjs.dev/guides/environment-variables)

You will get Google client id and secret from [Google Cloud Console](https://console.cloud.google.com/).

Add this to Authorised redirect URIs: `https://localhost:3000/api/auth/callback/google`


Now create a `middlware.ts` file in root of your project beside `auth.ts`.

~~~ts
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
~~~
Finally Add a Route Handler under `/app/api/auth/[...nextauth]/route.ts`.
Add this to the file:
~~~ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

~~~

## Step 4: Now create a signin Button component.
create a file `/components/sign-in.tsx`.
with this content:
~~~ts

import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 

~~~
Now Just add this component to make user signin by clicking on this button.

## Step 5: Bind Supabase db with auth.js (Important)
This part is very important and crucial. So, Please give it time.

Go to your supabase project.
Click on **SQL Editor** looks like this:

![Supabase SQL Editor](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/peehezkb4y8e9zw5wzbe.png)

Paste this into editor and run [(learn more)](https://authjs.dev/getting-started/adapters/supabase#schema):
~~~sql
--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA next_auth;
 
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;
 
--
-- Create users table
--
CREATE TABLE IF NOT EXISTS next_auth.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);
 
GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;
 
--- uid() function to be used in RLS policies
CREATE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;
 
--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS  next_auth.sessions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;
 
--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS  next_auth.accounts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;
 
--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS  next_auth.verification_tokens
(
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);
 
GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;

~~~

After successfully execution go to your **project settings** inside `Configuration` click on API and scroll to **Data API Settings** looks like this:


![Supabase Data API Settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vr9m64pa68k5ezr4j210.png)

In **Exposed schemas** add `next-auth` like this:


![Exposed schemas Data API Settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sdhe5rny4jkcwd2phf8u.png)

**Save settings**.

Step 5: Run Project 
Now you can run your next.js project with
~~~bash
bun dev
~~~

Now visit `https://localhost:3000` it will redirect you to `https://localhost:3000/api/auth/signin`.
You can signin with Google.

Further you can add Auth Page to override this default page by editing `auth.ts`:
~~~ts
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_ANON_KEY as string,
  }),
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/<sigin-page-url>",
  },
});

~~~
replace `<sigin-page-url>` with your auth page.


These were the easiest steps to setup supabase with auth.js. now you need to just call:
~~~ts
 const session = await auth()
~~~
To get user session don't need to create you own context and hooks.👍
For more information read official auth.js [Docs](https://authjs.dev/getting-started/session-management/get-session)


Thanks for your time.
Priyanshu Verma

















 