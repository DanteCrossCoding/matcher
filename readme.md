# Setup

Quick setup guide for you guys:
You'll probably have to npm install in both the root directory and the client directory as React uses its own modules by the looks of it

```
Start Express server:
"npm run server"
```

```
Start React-client:
"npm run client"
```

Express will run on Port 9000, React runs on 3000. If you're just testing things on the server use 9000, otherwise React is proxied to talk to Express from localhost:3000

If you do Ctrl+Shift+B on VSCode it'll give you the option to build/watch the Typescript code. So far I've only bothered with watching the API folder, because React auto-compiles Typescript (from what I can tell)

Database:
Thinking about our project it didn't make sense to bring in an ORM as we'll probably only have a users table? The schema seems like it'll be pretty light so it didn't make much sense to me to bring one in. 

So I've set it up with pg-promise, which is similar to what we used for the mid-term.

You'll have to setup your database in a similar way to what we used for the midterm. Then and make a .env file using the example. (Look at **Week 5 Day 5: Setup Local PG Database**)

There's an example of how to make a query in api/index.ts

-Sean

