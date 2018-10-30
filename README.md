# GMU-CS-SCHEDULER

# Readme for developers

## General instructions
After you pull, run `npm install` to make sure you have all of the dependencies in your directory. (The actual dependencies aren't put on GitHub because they would take forever to push and pull, but they're described in package.json)

## Commands:
- `npm start`: First checks the code against the linter to make sure it's up to style / standard. Then compiles the code so that the website can use it. **The command you'll want to use most often.**
- `npm run build:ts-transpile`: First checks the code against the linter to make sure it's up to style / standard. Then compiles the code so that it can be run locally using node. Useful for checking / testing TypeScript files.

## Visual Studio Code:
### Extensions:
- Live Server by Ritwick Dey
- Prettier - Code formatter by Esben Petersen
### Settings:
- `"git.enableSmartCommit": true`
- `"git.autofetch": true`
- `"editor.wordWrap": "on"`
- `"editor.rulers": [100]`
- `"typescript.updateImportsOnFileMove.enabled": "always"`

### Extension explanations

To view the website, **assuming you're using Visual Stuido Code (VSC) as your IDE**, download the VSC extention **Live Server** (by Ritwick Dey) and reload. If you navigate to html/index.html, there will be a "Go Live" button on your taskbar. Clicking that will open a local server and open up index.html, and it's a live reloading server, so any changes you make will be reflected as soon as you run `npm run build` again. If you're not using VSC, there are similar live server options elsewhere.

You'll also want to download the VSC extension **Prettier - Code formatter** by Esben Petersen. It's a code formatter, so if you try to run `npm run build` and you get a ton of linting errors, you can right click and run "Format Document" and it should fix a lot of things.

## Tutorials

Good tutorial on React (watch on 1.5x speed): https://www.youtube.com/watch?v=A71aqufiNtQ

More in-depth React tutorial series by the same guy: https://www.youtube.com/watch?v=vYldnghykaU&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO

## What's next
I'll set up for testing soon!...
