# FTEUlator

This is a simple tool to help Full Time Equivalent (FTE) estimation. The intent
is to think through activities involved with a project or duty, add them
individually, and get some idea of what the FTE estimate is.

A known issue is that the table will not allow you to add more than 5 activities
at a time. You can add them, but they won't be displayed. Doing more than 5
things is ill-advised, anyway. For now, the "project name" field is only
cosmetic with the intent of make it easier to add some sort of import/export functionality
in the future.

Some assumptions that are made throughout:

- 1 FTE = 2080 hours
- 1 Month = 2080/12 =
  173 1/3 hours
- 1 Sprint = 2 weeks = 80 hours.
- PoP = Period of Performance = project duration in hours.

An activity that is 8 hours per day for 1 year is 1 FTE. If the project lasts 6
months, the total effort for that activity over the period of performance is 0.5 FTE.

The application can be run as a single page application (SPA) or Progressive Web
Application (PWA) via Quasar, as a native desktop application (Linux, mac,
windows) via Electron or Tauri, and as a mobile app (iOS, Android) via Cordova
or Capacitor. The component framework is Vue 3, end-to-end testing via Cypress,
and uses TypeScript throughout.

## Build & Test

### Prerequisites

Building the web applications require NodeJS and Yarn. Building with Tauri
requires the installation of Rust. Following the Setup section for your platform
from the [Tauri
documentation](https://tauri.studio/en/docs/getting-started/intro) will get
most of what you need.

Additionally, install the [Quasar CLI](https://quasar.dev/quasar-cli/installation).

### Install project dependencies

At the top-level directory, run:

```bash
yarn
```

This will create a `node_modules` folder with all project dependencies.

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

This starts a local development server. It should also launch a web browser to
the local development server. No files are output, compilation is only in memory.

### Build the app for production

#### Single Page Application (SPA)

```bash
quasar build
```

The output will be under `dist/spa`. These files can be deployed to any web
server, like Nginx.

#### Desktop application (Tauri)

Tauri is a Rust-based alternative to Electron with the main advantages being
better memory management and smaller bundle size. This application should be
~7MB when compiled with Tauri compared to ~53MB when compiled with Electron.

First-time compilation will download and compile many Rust dependencies (to
`src-tauri/target/release`). Subsequent compilations will be much faster. To
compile, run:

```bash
yarn tauri build
```

The output will be in `src-tauri/target/release/`. On each platform, a
standalone executable will be in this directory (`fteulator.exe` on Windows). A
bundled version will be in
`src-tauri/target/release/bundle`. By default this will be a `.msi` on Windows,
a `.AppImage` on Linux, and `.app` and `.dmg` on MacOS.

#### Desktop application (Electron)

Compile using

```bash
quasar build -m electron
```

The output will be under `dist/electron/Packaged`. The output type is set in
`quasar.conf.js`. For now, it's the defaults on other platforms and a portable
`.exe` on Windows.

#### Mobile application

Compiling an iOS application will require a MacOS environment. Compiling for
Android requires Android studio on any platform.

```bash
quasar build -m [ios|android]
```

### Running Tests

Tests are defined under `test/cypress/integration`.

To run tests in headless mode (good for CI/CD), run:

```bash
quasar test --e2e cypress
```

This will also output a video of the tests under `test/cypress/videos`.

To run tests in interactive mode, run:

```bash
yarn test:e2e
```

This will launch cypress, where you will choose to run the tests in
`home.spec.ts`. A browser window will launch and the tests will execute.

![gif](docs/e2e.gif)
