+++
title = "A Terminal Friendly Sport Schedule"
description = "The story of how I made sprt.dev"
date = "2021-03-27 18:31:35"
image = "/images/blog/sprt-1.png"
+++

A few years ago I found a site/service called [wttr.in](https://wttr.in) that provides a terminal friendly weather report based on your location, or a location that you provide. For years, I had wanted to replicate this type of project for a simple view of the upcoming professional sports schedule, given a city. About a month ago I had a separate idea that I wanted to make an express app to play around with it after using it to make my team's technical interview test at work. Then after brainstorming ideas for express apps I remembered the sport schedule idea I had wanted to do years ago.

## Project Setup

I used [express-generator](https://expressjs.com/en/starter/generator.html) to start an empty express API to start this project. I decided to use express and node when I noticed that there were many node libraries that would be helpful in creating my service for sport schedules. After setting up the empty project, I worked on setting up eslint and prettier. I run each of these using husky git hooks.

After setting up the basic node project, I worked on getting the hello world app deployed to Heroku. Heroku is nice for this use case because they host node applications for free! On top of that, there is a very simple integration with Github that allows you to continuously deploy without needing to do much other than give Heroku permission to link with your Github account.

## How the App Works

When selecting sports to show a user, we take the closest team for every sport that currently has scheduled games (is in season). When your closest team/city has multiple teams for a sport (e.g. LA Lakers & LA Clippers), sprt.dev will show you both teams.

By default if you `curl www.sprt.dev` it will attempt to collect your current location based off of your IP address as seen here (assuming the current location is LA):

![default curl www.sprt.dev result](/images/blog/sprt-2.png)

When you provide a city like this image, the app will perform a google maps search for the location specified like this:

![curl www.sprt.dev/boston result](/images/blog/sprt-1.png)

Eventually, I would like to add to the functionality of the app. I'd be thrilled if others were to also start using the app and then make feature/functionality suggestions & requests [on Github](https://github.com/tylerjlawson/sprt.dev/issues).

## Wrapping up

I had a lot of fun getting myself more familiar with Express JS while. I also loved making something that I will use everyday in the future to check when my favorite teams play. If you appreciate sprt.dev or are just feeling nice, I'd really appreciate a start [on my Github repo](https://github.com/tylerjlawson/sprt.dev). And if you ever watch sports, start `curl`ing [sprt.dev](https://sprt.dev)!
