# Vue CLI Plugin Vuido

A Vue CLI 3 plugin to create [Vuido](https://github.com/mimecorg/vuido) projects.


## Getting started with Vuido

With Vuido you can create native desktop applications for Windows, OS X and Linux using [Vue](https://vuejs.org/). To get started with Vuido, you should read the [Vuido introduction](https://vuido.mimec.org/introduction).


## Installation

Open a terminal in the directory of your [Vue CLI 3 project](https://cli.vuejs.org/guide/creating-a-project.html). To add Vuido to your project, simply run:
```
vue add @herteleo/vuido
```
And follow the instructions shown in the terminal.

**Sugar:** You can now remove Vue from the projects dependencies by running `npm remove vue`.

**Working with git?** You should add `packages/` to your `.gitignore`.


## Usage

The plugin replaces the commands for `vue-cli-service serve` and `vue-cli-service build` with Vuido specific commands, so you can develop and package your Vuido app comfortably.


### Commands

You will only use commands, you already know from Vue.

#### `npm run serve`

Builds the Vue application in `development` mode with [webpack](https://github.com/webpack/webpack)'s `watch` flag and starts the Vuido application with [nodemon](https://github.com/remy/nodemon). Everytime the app code changes, the app will rebuild and restart automatically.


#### `npm run build`

Builds the Vue application in `production` mode and [launchui-packager](https://github.com/mimecorg/launchui-packager) packs the Vue code into an executable Vuido application.


### Configuration (is optional)

**The plugin works out of the box without any further configuration.** But... You have the ability to customize your build/package output after your needs. The plugin uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) under the hood. That means you can create a config by including a `vuido` property into your project's `package.json` or by creating one of these files:

- `.vuidorc` in JSON or YAML format
- `.vuidorc.json`
- `.vuidorc.yaml`, or `.vuidorc.yml`
- `.vuidorc.js`, or `vuido.config.js` exporting a JS object

The config is divided into multiple sections to reach all platforms independently. Plus there is a  `general` section to define shared properties.

All properties listed at the [launchui-packager documentation](https://github.com/mimecorg/launchui-packager#api) can be used.


#### Example

Here is an example config file written in `.vuidorc` (JSON) format:

```json
{
  "general": {
    "name": "My App Name",
    "company": "My Company",
    "overwrite": true
  },
  "darwin": {
    "icon": "./path/to/icon/file.icns"
  },
  "linux": {
    "name": "my-app-name",
    "pack": "zip"
  },
  "win32": {
    "icon": "./path/to/icon/file.ico"
  }
}
```

The `general` part is used by all platforms and can be overridden by identical platform specific properties (see `name` in `linux`).

E.g. icons for Windows must have the `.ico` format and Mac expects a `.icns` file. So you may want to specify the icon independently.

Valid platforms are `darwin` (Mac OS), `linux` and `win32` (Windows).


#### Defaults

| Property   | Default value
|------------|---------------
| `name`     | _`name` value from `package.json`_
| `version`  | _`version` value from `package.json`_
| `entry`    | `./dist/app.js`
| `out`      | `./packages/`
| `platform` | automatically resolved by [`os.platform()`](https://nodejs.org/api/os.html#os_os_platform)


### Updating

After updating the plugin you should run `vue invoke @herteleo/vuido` to receive the latest changes.


---

**License**

@herteleo/vue-cli-plugin-vuido is licensed under the MIT license.

Copyright (C) 2019 Leonard Hertel
