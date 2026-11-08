# mi-app

This project includes a native Expo app for Expo Go and the original Next.js website.

## Run with Expo Go

```bash
npm install
npm run dev
```

Install Expo Go on your iOS or Android device and scan the QR code shown by Expo. Keep the computer and phone on the same network. If LAN discovery is unavailable, run `npx expo start --tunnel`.

The native screen is in `App.js`; the entry point is `index.js`.

## Run the website

```bash
npm run web
```

Open [http://localhost:3000](http://localhost:3000). Build it with `npm run build` and serve the build with `npm run web:start`.
