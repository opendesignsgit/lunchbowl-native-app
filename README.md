# Lunchbowl — React Native App

A mobile application for **Lunchbowl**, a school lunch delivery service. Parents can browse menus, manage meal plans for their children, track order history, and receive push notifications — all from a single app.

Built with **React Native 0.74.4** and **TypeScript**, targeting both Android and iOS.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Running the App Locally](#running-the-app-locally)
5. [Project Structure](#project-structure)
6. [Features & Functionality](#features--functionality)
7. [Architecture Overview](#architecture-overview)
8. [API Configuration](#api-configuration)
9. [Firebase Setup](#firebase-setup)
10. [Testing](#testing)
11. [Linting & Code Style](#linting--code-style)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

Lunchbowl lets parents:

- Create an account and log in using mobile OTP (one-time password).
- Browse the weekly school lunch **menu** with categories and meal descriptions.
- Set up and manage **meal plans** for their children, complete with a calendar view and holiday markers.
- View their full **order history**.
- Manage their **profile**, notification preferences, and account settings.
- Receive **push notifications** powered by Firebase Cloud Messaging.

The app supports two user roles:
| Role | Access |
|------|--------|
| `customer` | Home dashboard, menu, meal plans, order history, profile settings |
| `admin` | Admin-specific dashboard (separate navigator) |

---

## Prerequisites

Before setting up the project, make sure the following tools are installed and configured on your machine.

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| Node.js | 18.x | Required by `package.json` engines field |
| npm | 9.x (ships with Node 18) | Or Yarn 1.22+ |
| React Native CLI | Latest | `npm install -g react-native` |
| JDK | 17 | Android builds require JDK 17 |
| Android Studio | Latest stable | Includes Android SDK, emulator |
| Xcode | 14+ | macOS only, required for iOS builds |
| CocoaPods | 1.13+ | macOS only, required for iOS dependency installation |
| Watchman | Latest | macOS/Linux — speeds up the file-watcher |

> **Tip:** Run `npx react-native doctor` (or double-click `runDoctor.bat` on Windows) to verify that all dependencies are installed and configured correctly.

Complete the official [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) guide before proceeding.

---

## Environment Setup

### 1. Clone the repository

```bash
git clone https://github.com/opendesignsgit/lunchbowl-native-app.git
cd lunchbowl-native-app
```

### 2. Install JavaScript dependencies

```bash
npm install
```

### 3. Install iOS CocoaPods dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Configure the API base URL

Open `src/config/apiConfig.ts` and set the correct URL for your environment:

```ts
// Android Emulator (default)
export const API_URL = 'http://10.0.2.2:5055/api';

// Production server
// export const API_URL = 'http://api.lunchbowl.co.in:5055/api';
```

> **Note:** `10.0.2.2` is the special alias that Android Emulator uses to reach the host machine's `localhost`. If you are testing on a physical device, replace this with the actual IP address of the machine running the backend.

### 5. Add Firebase configuration files

The app uses Firebase for push notifications and Firestore. The native Firebase SDKs are automatically configured via platform-specific files that are **not** committed to version control.

| Platform | File to add | Location |
|----------|------------|----------|
| Android | `google-services.json` | `android/app/google-services.json` |
| iOS | `GoogleService-Info.plist` | `ios/LunchbowlReactNativeApp/GoogleService-Info.plist` |

Download these files from the [Firebase Console](https://console.firebase.google.com/) for the Lunchbowl project and place them in the paths above.

---

## Running the App Locally

### Step 1 — Start the Metro bundler

Open a terminal in the project root and run:

```bash
npm start
```

Keep this terminal open throughout development.

### Step 2 — Launch the app on a device or emulator

Open a **second** terminal in the project root.

#### Android

```bash
npm run android
```

Make sure an Android emulator is running (via Android Studio's AVD Manager) or a physical device is connected via USB with USB debugging enabled.

> **Windows shortcut:** Double-click `start.bat` in the project root. It starts the Metro bundler and the Android build in separate terminal windows automatically.

#### iOS (macOS only)

```bash
npm run ios
```

This opens the Xcode-managed iOS Simulator. You can pass a specific simulator via `--simulator "iPhone 15"`.

### Hot Reloading

| Platform | Reload shortcut |
|----------|----------------|
| Android | Press <kbd>R</kbd> twice, or <kbd>Ctrl</kbd>+<kbd>M</kbd> → Reload |
| iOS | <kbd>Cmd ⌘</kbd>+<kbd>R</kbd> in the Simulator |

---

## Project Structure

```
lunchbowl-native-app/
├── android/                 # Android native project
├── ios/                     # iOS native project
├── src/
│   ├── api/                 # Raw API call definitions (axios wrappers)
│   │   ├── authApi.ts
│   │   ├── userApi.ts
│   │   └── MyPlanApi/
│   ├── assets/              # Images, fonts, and other static assets
│   ├── components/          # Reusable UI components
│   │   ├── Backgrounds/
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── Error/
│   │   ├── LoadingModal/
│   │   └── Titles/
│   ├── config/              # App-wide configuration
│   │   ├── apiConfig.ts     # API base URL
│   │   ├── httpclient.ts    # Axios instance with auth interceptors
│   │   └── tokenConfig.ts   # AsyncStorage key for the auth token
│   ├── context/
│   │   └── AuthContext.tsx  # Global auth state (login, logout, user info)
│   ├── model/               # TypeScript interfaces / data models
│   ├── navigations/         # React Navigation stack & tab definitions
│   │   ├── MainNavigator.tsx      # Root: chooses Auth or App navigator
│   │   ├── AuthNavigator.tsx      # Unauthenticated flow
│   │   ├── AppNavigator.tsx       # Authenticated bottom-tab navigator
│   │   ├── OnBoardingNavigator.tsx
│   │   ├── SettingNavigator.tsx
│   │   └── Dashboard/
│   │       ├── DashboardNavigator.tsx   # Role-aware dashboard
│   │       └── Child/
│   │           ├── CustomerNavigator.tsx
│   │           └── AdminNavigator.tsx
│   ├── screens/             # Screen components grouped by feature
│   │   ├── Onboarding/      # Splash, Welcome, Walkthrough
│   │   ├── Auth/            # Login (OTP), OTP Verification, Signup, Google Auth, Forgot Password
│   │   ├── Dashboard/       # Home screen, Settings, Edit Profile
│   │   ├── Menu/            # Meal category browser
│   │   ├── MyPlan/          # Plan cards, calendar, food list
│   │   ├── History/         # Order history
│   │   ├── Notification/    # Notification list
│   │   └── 404Screen.tsx
│   ├── services/            # Business logic layer (calls api/ layer)
│   │   ├── authService/
│   │   └── MyPlansApi/
│   ├── styles/              # Global styles, SVG icon strings
│   └── utils/               # Helpers: Firebase init, notification handler, error handler
├── App.tsx                  # App entry point (wraps AuthProvider + MainNavigator)
├── index.js                 # React Native entry point
├── firebaseConfig.ts        # (legacy stub — Firebase is initialised in src/utils/firebaseConfig.js)
├── app.json                 # App name configuration
├── package.json
├── tsconfig.json
├── babel.config.js
├── jest.config.js
├── metro.config.js
├── .eslintrc.js
├── .prettierrc.js
├── start.bat                # Windows: starts Metro + Android in one click
└── runDoctor.bat            # Windows: runs react-native doctor
```

---

## Features & Functionality

### Onboarding

| Screen | Description |
|--------|-------------|
| **Splash Screen** | Shown while the app checks for an existing auth token in AsyncStorage. |
| **Welcome Screen** | Animated marquee of food images, "Let's Get Started" CTA, and a direct login link. |
| **Walkthrough** | 4-slide animated tour: *Create Account → Choose Menu → Place Order → Sit Back & Relax*. Users can tap **Skip** at any point to go directly to the login screen. |

### Authentication

| Screen | Description |
|--------|-------------|
| **Login** | Enter a mobile number (India `+91` default). Accept the Privacy Policy, then tap **Send One Time Password**. |
| **OTP Verification** | Enter the 4–6 digit OTP received via SMS to verify the mobile number and log in. |
| **Signup** | Enter full name and mobile number, accept the Privacy Policy, then receive an OTP. Uses the same OTP verification screen. |
| **Google Sign-In** | UI entry point is present; full implementation is in progress. |

Authentication tokens and user data are persisted in **AsyncStorage**. On subsequent launches, the app reads the stored token and navigates directly to the Home screen if valid.

### Home (Dashboard)

The Home tab displays a personalised feed for the logged-in user:

| Component | Description |
|-----------|-------------|
| **Header** | Displays the user's name with a greeting and a notification bell icon. |
| **Search Bar** | Global search input (UI present; backend integration in progress). |
| **Promo Banner** | Auto-scrolling carousel of promotional content. |
| **Free Trial Card** | Highlights the free trial offer with a one-tap CTA. |
| **Highlights** | Showcase cards for Lunchbowl's key selling points. |
| **Schools We Serve** | Horizontal marquee listing partner schools. |
| **Popular Menus** | Horizontally scrolling marquee of popular meal cards. |
| **Quick Actions** | Shortcut cards for common tasks. |

### Menu

Browse the full meal catalogue:

- Filter meals by **category**: Fruits, Rice, Pasta, Salad, Soups.
- Horizontally scrollable category chips with images.
- Vertically scrollable list of **Meal Cards** showing name and description.

### My Plan

Manage meal subscriptions for children:

| Feature | Description |
|---------|-------------|
| **Plan Cards** | Horizontally paginated cards showing plan name, amount, status, and expiry for each child. |
| **Pagination Dots** | Indicator dots that track the active plan card. |
| **Calendar** | Interactive calendar; holidays from the backend are highlighted. |
| **Holiday List** | List of school holidays fetched from the API. |
| **View Food List** | Navigates to a detailed list of saved meal selections, retrieved from the backend via the `get-saved-meals` endpoint. |

### History

Review past orders:

- **Sort buttons** to filter orders (e.g., by date).
- **Order Cards** showing meal name, date/time, delivery status, and plan name.

### Settings

Accessible from the Home tab's Settings screen:

| Item | Action |
|------|--------|
| Edit Profile | Navigate to the Edit Profile screen. |
| Notifications | Open notification preferences. |
| Offers & Coupons | View available offers (in progress). |
| History | Quick link to order history. |
| Payments | Payment management (in progress). |
| About Us | App/company information. |
| FAQ's | Frequently asked questions. |
| T&C, Privacy Policy | Terms and Conditions and Privacy Policy. |
| Help Center | Customer support. |
| **Log out** | Clears auth token and user data from AsyncStorage, then navigates to the Login screen. |

### Notifications

- In-app notification list showing title, message, and relative timestamp.
- Push notifications delivered via **Firebase Cloud Messaging** (FCM). The `useFirebaseNotifications` hook in `App.tsx` handles foreground and background FCM message events.

---

## Architecture Overview

```
┌──────────────┐      ┌────────────────┐      ┌──────────────────┐
│   Screens    │ ────▶ │    Services    │ ────▶ │   API (axios)    │
│  (React UI)  │      │ (business logic)│      │  REST endpoints  │
└──────┬───────┘      └────────────────┘      └──────────────────┘
       │
       ▼
┌──────────────┐
│  AuthContext │  ──── AsyncStorage (token, user, role)
│ (React Context)│
└──────────────┘
```

- **Screens** import from **Services**, which call the **API layer** (`src/api/`).
- **AuthContext** (`src/context/AuthContext.tsx`) is the single source of truth for authentication state. It is consumed via `useAuth()` throughout the app.
- The **Axios HTTP client** (`src/config/httpclient.ts`) automatically attaches the Bearer token from AsyncStorage on every request and handles `401 Unauthorized` responses by clearing the session.
- **React Navigation** manages routing: `MainNavigator` switches between `AuthNavigator` (unauthenticated) and `AppNavigator` (authenticated bottom tabs) based on `isLoggedIn` from `AuthContext`.
- The **Dashboard** is further split by user role: `customer` loads `CustomerNavigator`, `admin` loads `AdminNavigator`.

### Key Libraries

| Library | Purpose |
|---------|---------|
| `@react-navigation/native` + `stack` + `bottom-tabs` | Navigation |
| `@react-native-firebase/app` + `messaging` + `firestore` | Firebase integration |
| `@react-native-async-storage/async-storage` | Local persistence |
| `axios` | HTTP requests |
| `react-native-linear-gradient` | Gradient backgrounds |
| `react-native-responsive-screen` | Device-independent sizing (`wp`, `hp`) |
| `react-native-phone-number-input` | International phone number input |
| `react-native-svg` | SVG icon rendering |
| `react-native-image-picker` | Profile photo selection |
| `react-native-calendar-picker` | Meal plan calendar |
| `react-native-vector-icons` | Icon fonts |
| `styled-components` | Component-level styling (where used) |
| `moment` | Date formatting |

---

## API Configuration

The backend URL is controlled in a single file:

**`src/config/apiConfig.ts`**

```ts
// Android Emulator — maps to host machine localhost
export const API_URL = 'http://10.0.2.2:5055/api';

// Production
// export const API_URL = 'http://api.lunchbowl.co.in:5055/api';
```

Switch between the two by commenting/uncommenting the relevant line.

The Axios client (`src/config/httpclient.ts`) applies the following behaviour automatically:

- Attaches `Authorization: Bearer <token>` header on every request.
- Logs request/response details to the console (toggle via `loggingEnabled` flag).
- On a `401` response, clears the local session (token + user removed from AsyncStorage).

---

## Firebase Setup

The app integrates Firebase via `@react-native-firebase`:

| Service | Usage |
|---------|-------|
| **Firebase App** | Initialised in `src/utils/firebaseConfig.js` using the native `google-services.json` / `GoogleService-Info.plist`. |
| **Cloud Messaging (FCM)** | Push notifications handled by `src/utils/Notifications.js` (`useFirebaseNotifications` hook). |
| **Firestore** | Available for real-time data features (as needed). |

To set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Open (or create) the Lunchbowl project.
3. Download `google-services.json` → place in `android/app/`.
4. Download `GoogleService-Info.plist` → place in `ios/LunchbowlReactNativeApp/`.
5. Rebuild the native app (`npm run android` / `npm run ios`).

---

## Testing

Unit tests use **Jest** and **React Test Renderer**.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

Test files live in the `__tests__/` directory. The existing test file is `__tests__/App.test.tsx`.

Configuration is in `jest.config.js`.

---

## Linting & Code Style

```bash
# Run ESLint
npm run lint
```

- ESLint is configured in `.eslintrc.js` with `@react-native/eslint-config`, `@typescript-eslint`, and `eslint-plugin-prettier`.
- Prettier formatting rules are in `.prettierrc.js`.
- TypeScript compiler options are in `tsconfig.json`.

---

## Troubleshooting

### Metro bundler cache issues

```bash
npm start -- --reset-cache
```

### Android build fails with Gradle errors

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS CocoaPods issues (macOS)

```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### `react-native doctor` — dependency checker

Run the built-in diagnostic tool to identify environment problems:

```bash
npx react-native doctor
```

On Windows, double-click `runDoctor.bat`.

### Firebase: "No Firebase App '[DEFAULT]' has been created"

Ensure `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) are present and the native app has been rebuilt after adding them.

### API requests fail on Android Emulator

Verify that `API_URL` in `src/config/apiConfig.ts` is set to `http://10.0.2.2:5055/api`. The address `localhost` does not resolve correctly inside an Android Emulator — use `10.0.2.2` instead.

### API requests fail on a physical device

Replace `10.0.2.2` with the LAN IP address of the machine running the backend server, e.g. `http://192.168.1.100:5055/api`.

---

## Learn More

- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation documentation](https://reactnavigation.org/docs/getting-started)
- [React Native Firebase documentation](https://rnfirebase.io/)
- [Axios documentation](https://axios-http.com/docs/intro)
