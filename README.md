# GMU-CS-SCHEDULER

# Readme for developers

## General instructions
After you pull, run `npm install` to make sure you have all of the dependencies in your directory. (The actual dependencies aren't put on GitHub because they would take forever to push and pull, but they're described in package.json)

## Commands
- `npm start`: First checks the code against the linter to make sure it's up to style / standard. Then compiles the code so that the website can use it. **The command you'll want to use most often.**
- `npm test`: First checks the code against the linter to make sure it's up to style / standard. Then runs all test files.
- `npm run build:ts-transpile`: First checks the code against the linter to make sure it's up to style / standard. Then compiles the code so that it can be run locally using node. Useful for checking / testing TypeScript files.

## Visual Studio Code
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

## NPM Package Explanations
- Project dependencies
    - [react][1]
        - MVC that handles our front-end logic. Handles application state and visual components.
- Developer dependencies
    - [npm][2]
        - Package manager. Organizes and allows us to use all of these packages I'm explaining.
    - [typescript][3]
        - The language we're coding in. Provides a type-safe programming language that transpiles down to Javascript. Also provides the `tsc` command that does this transpilation, but we're not using it for the project.
    - [webpack & webpack-cli][4]
        - Module bundler. Takes all of our Typescript files and React files and combines them into one singular **main.js** file in the `dist/` directory using the Awesome-Typescript-Loader and Source-Map-Loader packages below.
        - CLI is short for Command-Line Interface; this just allows us to run `webpack` on the command line to bundle the files.
    - [awesome-typescript-loader][5]
        - Helps Webpack transpile the typescript folder.
    - [source-map-loader][6]
        - Helps Webpack create a source map along with the bundled file. I have no idea how to read it but apparently it's useful...
    - [prettier][7]
        - A code formatter. Its rules are defined in the **package.json** file.
    - [tslint][8]
        - A linter. Throws errors if your code is not to style.
        - [tslint-react][9]
            - Helps Tslint read React's `.tsx` files.
        - [tslint-config-prettier][10]
            - Helps Tslint's style match that of Prettier.
    - [husky][11]
        - Provides pre-commit hooks. We use this to make sure that your code is formatted and linted before you commit or push it to GitHub.
    - [jest][12]
        - Unit-testing framework.
        - [ts-jest][13]
            - Allows us to use Jest with Typescript files.

## Tutorials

Good tutorial on React (watch on 1.5x speed): https://www.youtube.com/watch?v=A71aqufiNtQ

More in-depth React tutorial series by the same guy: https://www.youtube.com/watch?v=vYldnghykaU&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO

## What's next
I guess it's time for us to do some planning and start writing some code!

[1]: https://reactjs.org/
[2]: https://www.npmjs.com/
[3]: https://www.typescriptlang.org/index.html
[4]: https://webpack.js.org/
[5]: https://github.com/s-panferov/awesome-typescript-loader
[6]: https://github.com/webpack-contrib/source-map-loader
[7]: https://prettier.io/
[8]: https://palantir.github.io/tslint/
[9]: https://github.com/palantir/tslint-react
[10]: https://github.com/alexjoverm/tslint-config-prettier
[11]: https://github.com/typicode/husky
[12]: https://jestjs.io/en/
[13]: https://kulshekhar.github.io/ts-jest/