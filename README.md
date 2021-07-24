# Wexond UI

[![Actions Status](https://github.com/wexond/wexond-ui/workflows/Build/badge.svg)](https://github.com/wexond/wexond-ui/actions)
[![NPM](https://img.shields.io/npm/v/@wexond/ui.svg?style=flat-square)](https://www.npmjs.com/package/@wexond/ui)
[![NPM](https://img.shields.io/npm/dm/@wexond/ui?style=flat-square)](https://www.npmjs.com/package/@wexond/ui)
[![Discord](https://discordapp.com/api/guilds/307605794680209409/widget.png?style=shield)](https://discord.gg/P7Vn4VX)

Wexond UI is a set of React components and many utilities. It was developed for [Wexond Browser](http://wexond.net).

## Installing

```bash
$ npm install @wexond/ui
```

# Contributing

If you have found any bugs or just want to see some new features in Wexond UI, feel free to open an issue. We're open to any suggestions. Bug reports would be really helpful for us and appreciated very much. Wexond UI is in heavy development and some bugs may occur. Also, please don't hesitate to open a pull request. This is really important to us and for the further development of this project.

## Running

Firstly, please ensure you have **the latest** [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed on your machine.

You need to register wexond-ui and a few other dependencies using

```bash
$ ./scripts/link.bat
```

or

```bash
$ yarn link
```

At the root of wexond-ui and node*modules/\_react,react-dom,styled-components,@types/react,@types/react-dom,@types/styled-components*

<br />

Then Clone the playground repo.

```bash
$ git clone https://github.com/wexond/wexond-ui-playground
```

Enter it.

```bash
$ cd wexond-ui-playground
```

Run this command to install all needed dependencies.

```bash
$ yarn
```

Next you need to link wexond-ui and the other packages.

```bash
$ ./scripts/link.bat
```

or

```bash
$ yarn link @wexond/ui react react-dom styled-components @types/react @types/react-dom @types/styled-components
```

Run this command, and open `http://localhost:8090/app.html` in the browser.

```bash
$ npm run dev
```
