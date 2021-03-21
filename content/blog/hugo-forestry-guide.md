+++
title = "Hugo With Forestry Setup Guide"
description = "lorem ipsum"
date = "2021-03-21"
+++

The easiest way I have found to setup a static site with a CMS has been to use [Forestry.io](https://forestry.io/), [Github ](https://github.com), & [Hugo](https://gohugo.io/). This stack is free, easy to use, and efficient.

You will new to [install hugo](https://gohugo.io/getting-started/installing/) for this demo.

**Step One: Create A Repo and Add Hugo**

_TLDR_ If you want to skip some of the setup [just fork my starter project](https://github.com/tylerjlawson/hugo-forestry-starter) and jump to step 4.

To start, [make a new repository](https://github.com/new) on github. You will need to name the repo &lt;your username&gt;.github.io to take advantage of free Github Pages hosting. After creating your repo, you will need to clone it and create your empty hugo site. Run the following in your terminal:

```
git clone git@github.com:[your github username]/[your new repo name].git
cd [your repo name]
hugo new site . --force
git add .
git commit -m "first commit with empty hugo project"
git push origin -u master
```

**Step Two: Add a Hugo Theme**

For the sake of this demo I will use the [zen theme](https://themes.gohugo.io/hugo-theme-zen/). The theme will decide how you need to setup the forestry fields properly. Each hugo theme has its own `exampleSite` directory and the zen theme `exampleSite` [can be seen here](https://github.com/frjo/hugo-theme-zen/tree/main/exampleSite). This directory serves as an example for how to build your site, so I will refer the one from the zen theme when making this demo and later help you through replacing the theme. This will hopefully give you a good idea for how to setup hugo with forestry with [any theme](https://themes.gohugo.io) you wish to use.

To add zen, we will return to our terminal and execute the following:

```
git clone --depth=1 https://github.com/frjo/hugo-theme-zen.git themes/zen
rm -rf themes/zen/.git
echo node_modules >> .gitignore
echo -e "+++\ntitle = \"Home\"\n+++" >> content/_index.md
rm config.toml
cp themes/zen/exampleSite/config.yaml .
```

Next you will need to open the file `themes/zen/layouts/_default/baseof.html` and paste the following code just above the close of the head tag (`</head>`). To edit this, it would be helpful to have some sort of text editor installed like Sublime, VSCode, or Notepad++.

<!-- prettier-ignore-start -->
```html
{{ with .Params.forestry_instant_preview_id }}
  {{- safeHTML (printf "<meta property='forestry_instant_preview_id' content='%s'>" .) -}}
{{ end -}}
```
<!-- prettier-ignore-end -->

After making this change, run the following:

```
git add .
git commit -m "added zen theme"
git push
```

**Step Three: Add Gitlab CI/CD**

```
mkdir -p .github/workflows
curl https://gist.githubusercontent.com/tylerjlawson/d9cac21702b63b2ec119d3d7b6dc29c3/raw/6eb404ff10f09c475af9325b0d9fd9b42c627016/hugo_deploy.yml > .github/workflows/main.yml
git add .
git commit -m "added github actions for building and deploying hugo site"
git push
```

**Step Four: Setup Forestry**

[Create an account for Forestry.io](https://app.forestry.io/signup). Press Add Site > Hugo > Github > Select your repository from the dropdown. If you cloned the starter project from the TLDR, you can skip to the next step now.

For this example we will have a home page, about page, and a blog page. To create a template for our blog posts, press `front matter` on the sidebar. Then press `add template` in the top right > create new blank template > enter `Blog post` as the name > create template. This is where the theme will start to matter, different themes have different names for the front matter, so if you are using another theme, look at a post in `exampleSite/content/[some blog subdir (documentation for zen)]`. Here you will see front matter like this:

```md
+++
date = 2021-03-17T01:22:04Z
title = "Some Super Sweet Stuff"
author = "John Doe"
+++
```

These are the fields that we need to add to our Forestry blog template. So we will start by pressing add field > text field > enter author for the label (it will autofill the name) then press done. Repeat this same process for the title. For the date field, select date field instead of text field and then I like to select setting 'now' as default from the default tab when creating this field.

Now, add another template named 'Page' and only provide it the title field.

I'd encourage you to add descriptions and play around with the different field configurations to get comfortable with Forestry, but this will give you all you need to setup a basic blog post.

Now edit the section that was already there, 'Pages' and select your 'Page' template from the dropdown for available templates. You will also want to select 'documents' from the 'Content Type' dropdown.

Create one last section that will be a Document, with the label 'Config' and path `config.yaml`.

To setup the CMS for editing, press `Finish setup process` in the sidebar then > configure sidebar. Press `Add Section` where we will add our blog page as its own sidebar section. Press `Directory` > enter 'Blog' as the label > content/blog as the content directory > then select 'Blog post' from the dropdown at the bottom for available templates > select documents from the content type dropdown > press done.

**Step Five: Finish Setup and Start the Preview Server**

Now go back to `Finish setup process` and you can press mark as done and complete the setup process prompt for now. Then navigate to settings > previews > start preview. At this point, if you used the starter project you will already have some pages you can change around then move to the next step.

You will notice we already added the homepage. You can edit that by selecting it. To add our About page we will select Pages from the sidebar > create new > enter About for title > some text to show on your about us page in the body on the right.

To add a blog post you can navigate to the blog in the sidebar > create a new post > fill out the fields > turn draft mode off in the top right to publish it.

**Step Five: Configure Github Pages**

Now you will need to go back to [github.com](https://github.com), navigate to your repo at `https://github.com/[your username]/[your repo name]/settings` and scroll to where it says `Github Pages`. Where it says `source` you want to select the `master` branch and then to the right of that you will select `docs` in the folder dropdown. Then press `save`.

**All Done!**

Congratulations, now that you have set everything up, you should see your site live at <your username>.github.io in the next few minutes.

To change more of the values on your site navigate to the config tab in the left bar to edit your site title, url, etc.

**If you want to change the theme**

_TLDR_ If you want to see the code difference between the zen theme and the new anubis theme [click here](https://github.com/tylerjlawson/hugo-forestry-starter/compare/master...changeTheme).

You will start with removing the old theme and adding the new one in the terminal:

```
rm -rf themes/zen/
git clone --depth=1 https://github.com/mitrichius/hugo-theme-anubis.git themes/anubis
rm -rf themes/anubis/.git
git add .
git commit -m "replaced theme directory"
```

Remove old build and config. Replace with new config from anubis.

```
rm config.yaml docs
cp themes/anubis/exampleSite/config.toml .
cp -r themes/anubis/exampleSite/content/homepage/ content/homepage
```

Open the `config.toml` in your text editor and change the path from `posts` to `blog` since we created the `blog` folder already for our blog posts.

Now that we are using a new theme, we will need to update the forestry fields to match. You can upload the fields and templates on forestry.io if you wish, but since I walked through how to do that earlier in this demo we will take a look at editing the forestry configuration files in `.forestry` from your text editor.

Navigate to `.forestry/settings.yml` and we will first update the config section. Since the config from anubis is `config.toml` but the previous theme used `yaml` lets change the path value:

```diff
-    path: config.yaml
+    path: config.toml
```

You will need to also update the fields for the page and blog post template. You can see their possible front matters in `themes/anubis/exampleSite/content/about.md` & `themes/anubis/exampleSite/content/about-subpage.md`. For the blog post look at `themes/anubis/exampleSite/content/post/emoji-support.md` for the front matter a blog post can have.

You will need to edit the head at `themes/anubis/layout/partials/head.html`. Add this to the end of that file:

<!-- prettier-ignore-start -->
```html
{{ with .Params.forestry_instant_preview_id }}
  {{- safeHTML (printf "<meta property='forestry_instant_preview_id' content='%s'>" .) -}}
{{ end -}}
```
<!-- prettier-ignore-end -->

To see all of the changes mentioned above: [click here](https://github.com/tylerjlawson/hugo-forestry-starter/compare/master...changeTheme).

**Wrapping up**

I hope this guide has served as a helpful tool for learning how to configure Hugo, Forestry, & Github with different Hugo themes. Each theme has its own nuances, so the configuration difficulties come in matching the setup in Forestry with the `exampleSite` directory.

This project is all available at [tylerjlawson/hugo-forestry-starter](https://github.com/tylerjlawson/hugo-forestry-starter), so if you have any questions or want to make any enhancements to this guide, feel free to reach out through the issues tab or make a pull request. Thanks!
