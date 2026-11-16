# Daymark

A lightweight task tracker built with plain HTML, CSS, and TypeScript. Add a task, advance it from **To do** to **In progress** to **Done**, and filter the list by status.

Tasks are kept in memory and reset when the page is refreshed.

## Build

Install the TypeScript compiler and compile the browser modules:

```sh
npm install
npx tsc
```

The compiler emits `app.js` and `model.js` beside their TypeScript sources. Serve this folder over HTTP to try the app locally.

## Deploy

GitHub Actions deploys the static site to GitHub Pages when changes are pushed to `main` or `part-2-ui-ship`. The published URL is:

https://kundana0905.github.io/TypeTasks/
