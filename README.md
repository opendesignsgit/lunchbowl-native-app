# Lunchbowl – React Native App

A React Native (v0.74) application for the Lunchbowl platform, built with TypeScript and powered by Firebase.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Install JavaScript Dependencies](#install-javascript-dependencies)
4. [Firebase Setup](#firebase-setup)
5. [Android Setup](#android-setup)
6. [iOS Setup](#ios-setup)
7. [Running the App](#running-the-app)
8. [Modifying the App](#modifying-the-app)
9. [Troubleshooting](#troubleshooting)
10. [Learn More](#learn-more)

---

## Prerequisites

Install **all** of the tools below before proceeding.

### 1. Node.js (≥ 18)

The project's `package.json` enforces `"node": ">=18"`.

- Download the LTS release from <https://nodejs.org/> or use [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  nvm install 18
  nvm use 18
  ```

### 2. Java Development Kit (JDK 17)

React Native 0.74 requires JDK 17.

| OS | Recommended source |
|---|---|
| macOS | `brew install --cask zulu@17` |
| Windows / Linux | [Adoptium Temurin 17](https://adoptium.net/) |

After installation verify with:

```bash
java -version
# openjdk version "17.x.x" ...
```

### 3. Android Studio (for Android development)

1. Download and install [Android Studio](https://developer.android.com/studio) (latest stable release).
2. During the **Setup Wizard** (or via **SDK Manager**), install:

   | Component | Required version |
   |---|---|
   | Android SDK Platform | API 35 |
   | Android SDK Build-Tools | 35.0.0 |
   | NDK (Side by side) | 26.1.10909125 |
   | Android SDK Command-line Tools | latest |
   | Android Emulator | latest |

3. Add the following environment variables to your shell profile (`~/.bashrc`, `~/.zshrc`, or Windows System Environment Variables):

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk          # macOS
   # export ANDROID_HOME=$HOME/Android/Sdk               # Linux
   # set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk          # Windows

   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   ```

4. Reload your shell or restart your terminal, then verify:

   ```bash
   adb --version
   ```

### 4. Xcode (macOS only – for iOS development)

1. Install **Xcode 15 or later** from the [Mac App Store](https://apps.apple.com/app/xcode/id497799835).
2. Install the Xcode Command Line Tools:

   ```bash
   xcode-select --install
   ```

3. Install **CocoaPods** (1.13 – 1.14 required):

   ```bash
   gem install cocoapods --version '~> 1.14'
   # or with Bundler (recommended – uses the project's Gemfile):
   bundle install
   ```

### 5. React Native CLI

```bash
npm install -g react-native-cli
# or use npx react-native directly (no global install needed)
```

---

## Clone the Repository

```bash
git clone https://github.com/opendesignsgit/lunchbowl-native-app.git
cd lunchbowl-native-app
```

---

## Install JavaScript Dependencies

```bash
npm install
```

---

## Firebase Setup

This project uses **Firebase** (App, Firestore, and Cloud Messaging).  
Each platform needs its own Firebase configuration file placed in the correct directory.

### Android – `google-services.json`

1. Open your project in the [Firebase Console](https://console.firebase.google.com/).
2. Go to **Project Settings → Your Apps → Android app**.
3. Download `google-services.json`.
4. Place the file at:

   ```
   android/app/google-services.json
   ```

   > A placeholder file already exists at that path. Replace it with your own.

### iOS – `GoogleService-Info.plist`

1. In the Firebase Console, go to **Project Settings → Your Apps → iOS app**.
2. Download `GoogleService-Info.plist`.
3. Place the file at:

   ```
   ios/LunchbowlReactNativeApp/GoogleService-Info.plist
   ```

---

## Android Setup

### Option A – Android Studio Emulator

1. Open **Android Studio → Virtual Device Manager** (or **AVD Manager**).
2. Click **Create Device** and select a phone with **API 35**.
3. Start the emulator.

### Option B – Physical Android Device

1. Enable **Developer Options** on your device: go to **Settings → About Phone** and tap **Build Number** seven times.
2. Enable **USB Debugging** under **Settings → Developer Options**.
3. Connect the device via USB.
4. Verify the device is detected:

   ```bash
   adb devices
   # List of devices attached
   # emulator-5554   device
   ```

---

## iOS Setup (macOS only)

### Install CocoaPods dependencies

```bash
cd ios
bundle exec pod install   # if you used Bundler
# or
pod install
cd ..
```

### Option A – iOS Simulator

No additional setup required. The simulator starts automatically when you run the app.

### Option B – Physical iOS Device

1. Connect your iPhone or iPad via USB.
2. Open `ios/LunchbowlReactNativeApp.xcworkspace` in Xcode.
3. Select your device from the device list at the top.
4. Configure **Signing & Capabilities** with your Apple Developer account.
5. Trust the developer certificate on the device: **Settings → General → VPN & Device Management**.

---

## Running the App

### Step 1 – Start the Metro bundler

Open a terminal in the project root and run:

```bash
npm start
```

Keep this terminal open while developing.

### Step 2 – Launch the app

Open a **second** terminal in the project root.

#### Android

```bash
npm run android
```

#### iOS (macOS only)

```bash
npm run ios
```

The app will be installed and launched on your emulator, simulator, or connected device.

> You can also open `android/` in Android Studio or `ios/LunchbowlReactNativeApp.xcworkspace` in Xcode and run the app directly from the IDE.

---

## Modifying the App

1. Open `App.tsx` (or any file under `src/`) in your editor.
2. Save your changes.
3. The app reloads automatically. If it doesn't:
   - **Android**: press <kbd>R</kbd> twice, or open the Dev Menu with <kbd>Ctrl</kbd>+<kbd>M</kbd> (Windows/Linux) / <kbd>Cmd ⌘</kbd>+<kbd>M</kbd> (macOS) and tap **Reload**.
   - **iOS**: press <kbd>Cmd ⌘</kbd>+<kbd>R</kbd> in the simulator.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `SDK location not found` | Set `ANDROID_HOME` and add `sdk.dir` to `android/local.properties` |
| `adb: command not found` | Add `$ANDROID_HOME/platform-tools` to your `PATH` |
| `No emulators found` | Start an AVD in Android Studio → Virtual Device Manager |
| CocoaPods install fails | Run `gem install cocoapods --version '~> 1.14'` (use a Ruby version manager like rbenv/rvm to avoid needing sudo) |
| `pod install` SSL errors | Run `bundle exec pod install` using the Gemfile's pinned versions |
| Metro cache issues | Run `npm start -- --reset-cache` |
| `google-services.json not found` | Follow the [Firebase Setup](#firebase-setup) section above |
| Build fails after `npm install` | Delete `node_modules` and run `npm install` again |

For more help see the official [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

---

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Firebase for React Native](https://rnfirebase.io/)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)
