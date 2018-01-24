RedeemIT
========

> NearIT coupon scanner

<!-- TOC -->

- [Requirements](#requirements)
  - [Basic](#basic)
  - [Deployment](#deployment)
- [Setup](#setup)
- [Commands](#commands)
  - [start](#start)
  - [android](#android)
  - [ios](#ios)
  - [test](#test)
  - [publish:ios:beta](#publishiosbeta)
  - [publish:android:beta](#publishandroidbeta)
- [Deployment](#deployment-1)
  - [Beta](#beta)
  - [Production](#production)

<!-- /TOC -->

## Requirements

### Basic

To work on the RedeemIT app you'll need:

* [Node v8.0+](https://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [ReactNative tools](https://facebook.github.io/react-native/docs/getting-started.html)

### Deployment

Besides basic requirements, to deploy you'll need:

* [Ruby](https://www.ruby-lang.org)
* [Fastlane](https://fastlane.tools/)

## Setup

Install the required dependencies by running

```bash
yarn install
```

## Commands

Each command must be run through `Yarn`, like this

```bash
yarn <command>
```

### start

Start the [Metro Bundler](https://facebook.github.io/metro/) to compile Javascript code

### android

Start the `Metro Bundler`, compile Android native code and launch the development app on a connected device or simulator.

### ios

Start the `Metro Bundler`, compile iOS native code and launch the development app on a simulator.

**N.B.** To launch the app on a connected iDevice run the command with the following option

```bash
yarn ios --device
```

**N.B.** To launche the app on a specific simulator (instead of the default iPhone 6) run the command with the following option

```bash
yarn ios --simulator "iPhone X"
```

### test

Run available [Jest](https://facebook.github.io/jest/) tests

### publish:ios:beta

Compile app in `production` mode and deploy it to `Apple Testflight`.

**N.B.** This is a shortcut command to launch `Fastlane` on the `ios beta` lane. For more info see `Fastlane` doc and this project `Fastfile` (located under the `fastlane` folder).

### publish:android:beta

Compile app in `production` mode and deploy it to `Google Play Store Beta`.

**N.B.** This is a shortcut command to launch `Fastlane` on the `android beta` lane. For more info see `Fastlane` doc and this project `Fastfile` (located under the `fastlane` folder).

## Deployment

Deployment of this app can be done using `Fastlane` scripts.

### Beta

Deployment to `Apple Testflight` and `Google Play Store Beta`.

#### iOS

Setup is done automatically when running the `publish:ios:beta` command.

#### Android

To prepare to deploy the Android app you'll need to:

* Setup your signing configuration inside the `android/keystores` folder:

  * Rename `release.keystore.properties.sample` file to `release.keystore.properties`
  * Update `release.keystore.properties` configuration to match your signing reqs (keystore location, key alias, passwords)

* Setup a `Google Service Account` by following the Fastlane supply guide [here](https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply) and saving the downloaded credentials file as `google_developer_key.json` under the `android` folder.

Then simply run the `publish:android:beta` command.

### Production

`Production` deployment must be done by hand through the respective web portals (iTunesConnect and Google Play Developer Console).
