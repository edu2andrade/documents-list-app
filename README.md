# Documents List App

A React Native app for listing documents.

## Getting Started

1. Start the server backend:
```sh
go run server.go
```

2. Install dependencies:

```sh
pnpm install
```

3. Run the tests:

```sh
pnpm test
```

4. Build and run iOS and Android development builds:

```sh
pnpm ios
# or
pnpm android
```

If you already built the app, and the development server is not running, just start it:

```sh
pnpm start
```
In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## The server

The server is a simple Go server that provides a REST API and WebSocket for the app.
But, have in mind that the server is not production ready. It has some malfunctions.

 - The REST API returns some repeated attachments (duplicated ID's).
 - Also, always returns an entire list of documents, even when a new one is created, and the created one is not included.
 - The WebSocket, when connected is constantly sending messages, randomly on five seconds interval. It should send messages only when a new document is created.

 With this in mind, I built a simple notification system with context api + toast to notify the user when a new document is created.


## Third party libraries

- [React Native Actions Sheet](https://github.com/ammarahm-ed/react-native-actions-sheet)
The reason: Smooth experience for bottom sheets with Reanimated and Gesture Handler integration working out of the box on both iOS and Android. For me it's a better choice than built one from scratch with reanimated for example.


