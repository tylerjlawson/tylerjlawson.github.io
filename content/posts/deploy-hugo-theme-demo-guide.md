---
title: 'How To Auto Deploy a Hugo Theme Demo to Netlify'
date: 2021-07-08T19:46:41-04:00
description: 'The easy way to bring continuous deployment to your hugo theme demo.'
image: '/images/posts/netlify-hugo.jpg'
---

When writing a theme for [Hugo](https://gohugo.io/) you'll often want to show a demo from the `exampleSite` directory. In order to build that directory as a Hugo site, you need to have the theme inside of it. I wrote a small npm package, [hugo-theme-demo-builder](https://www.npmjs.com/package/hugo-theme-demo-builder) that will clone the theme into your `exampleSite` directory and then run the `hugo` build command.

## Step One: Install Package and Set Build Script

The first thing to do would be to run the following from the root of your theme repo:

```sh
cd exampleSite
yarn add hugo-theme-demo-builder
npm set-script build hugo-theme-demo-builder
```

This will add the build script to your `exampleSite`. Next, you will most likely want to set the hugo version in a `netlify.toml` file inside of the `exampleSite` directory to something like this:

```toml
[context.production.environment]
  HUGO_VERSION = "0.85.0"
```

This will set the version used in netlify when we build the project there later. For more info about hosting Hugo on Netlify [click here](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/).

## Step Two: Create & Configure Site on Netlify

After creating your account on [Netlify](https://netlify.com) navigate to the 'New Site from Git' button.

![netlify new site from git button](/images/posts/new-site-from-git.png)

Then select the source control you're using (e.g. Github). Then select the repo that your theme is in. Lastly you want to configure your build settings like this:

![netlify config](/images/posts/netlify-config.png)

## Wrapping Up

The last step will be to copy the url to your deployed netlify site to your `theme.toml` like this:

```toml
demourl = "https://example.netlify.app/"
```

Now you should see a demo button that links to your automatically deployed theme demo on netlify from the theme page on [the hugo themes site](https://themes.gohugo.io/). You may need to wait until the next rebuild of the hugo themes site for your link to appear, but it should be there shortly.
