Check out the mobile version of this app at <a href = "https://github.com/xrysen/matchr-mobile">Matchr Mobile</a>

![Logo](https://raw.githubusercontent.com/xrysen/matcher/master/client/public/matchrLogo.png)


# About

Is there a worse argument out there than over where to go to eat? You ask "Where would you like to go?" only to have them reply "I don't know, what do you feel like?"

Round and round, with maybe's and I don't knows. The longer you sit in that cycle of indecision the harder it gets to decide! It could even devolve into a fight about food! And not the fun kind...

No one wants that kind of stress, especially for something like choosing a restaurant. But what could you do to avoid it?

You could use Matchr!

Matchr uses a clean, simple, familiar interface that lets both you and your partner swipe or click your way through highly rated restaurants in your local area, until you’ve both swiped YES on the same delightful establishment!

You’re both notified immediately of the match, no fuss, no fight!

Can’t remember where you both agreed on last week? Well there’s a match history that shows you all the places you’ve both said yes to before!

Matchr, time to stop the fighting, and start dining!

# Screenshots 

## Matching Interface
<img src = "https://github.com/xrysen/matcher/blob/master/client/public/matchr%20screenshots/carousel.png?raw=true">

## Partner Select
<img src = "https://github.com/xrysen/matcher/blob/master/client/public/matchr%20screenshots/match.png?raw=true">

## Match
<img src = "https://github.com/xrysen/matcher/blob/master/client/public/matchr%20screenshots/match.png?raw=true">

## Past Matches 
<img src = "https://github.com/xrysen/matcher/blob/master/client/public/matchr%20screenshots/past_matches.png?raw=true">

## Login
<img src = "https://github.com/xrysen/matcher/blob/master/client/public/matchr%20screenshots/login.png?raw=true">

# Setup

After you "git clone" the repository and load into the file, run npm setup to install dependencies.

Once that is done, you will need two terminal sessions. One for the server, and one for client.

First start up the server:
"npm run server"

Then in the other terminal window, run the client:
"npm run client"

This will use ports 9000 and 3000 by default. 

Go to the browser and load http://localhost:3000 and the app should be good to go!

<!-- Quick setup guide for you guys:
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

-Sean -->

# dependencies:

    - @material-ui/core: "^4.11.2",
    - @types/express: "^4.17.11",
    - @types/pg-promise: "^5.4.3",
    - @types/react: "^17.0.0",
    - @types/react-dom: "^17.0.0",
    - axios: "^0.21.1",
    - body-parser: "^1.19.0",
    - dotenv: "^8.2.0",
    - express: "^4.17.1",
    - nodemon: "^2.0.7",
    - pg-promise: "^10.8.7",
    - request-promise-native: "^1.0.9",
    - socket.io: "^2.2.0",
    - universal-cookie: "^4.0.4"
