# Jo Jo's Hotel — Dog Boarding, Sitting & Walks

Angular + Firebase website for a dog care business in Los Altos, CA.

## Features

- **Public pages**: Home, About, Team, Adventures, Prices & Policies, FAQ, Contact
- **Auth**: Login, Create Account (Firebase Auth)
- **Client area**: My Dogs (profiles), Calendar (booking requests)
- **Admin dashboard**: Booking queue, upcoming bookings, history, capacity, users, dogs
- **Gemini chatbot**: Q&A widget (add your API key)
- **PWA**: Installable, works offline

## Setup

### 1. Prerequisites

- Node.js 18+
- npm

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Firebase configuration

1. Open [Firebase Console](https://console.firebase.google.com/) and select project `dog-sitting` (ID: `dog-sitting-75312`).

2. Get your config: **Project Settings** → **General** → **Your apps** → copy the config values.

3. Edit `src/environments/environment.ts` and `src/environments/environment.prod.ts`:

```ts
firebase: {
  apiKey: 'YOUR_ACTUAL_API_KEY',
  authDomain: 'dog-sitting-75312.firebaseapp.com',
  projectId: 'dog-sitting-75312',
  storageBucket: 'dog-sitting-75312.firebasestorage.app',
  messagingSenderId: '671093501600',
  appId: 'YOUR_ACTUAL_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'  // optional
}
```

4. In Firebase Console, enable:
   - **Authentication** → Email/Password
   - **Firestore** (create database)
   - **Storage**

5. Deploy Firestore indexes:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use dog-sitting-75312
   firebase deploy --only firestore:indexes
   ```

### 4. Gemini API key (chatbot)

1. Get a key: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to **both** `src/environments/environment.ts` and `src/environments/environment.prod.ts`:
   ```ts
   geminiApiKey: 'AIzaSyCqxnFIl7lek8URqmhUeHPBJ0fA8CxmQxw'
   ```

   **Where exactly**: Look for the `geminiApiKey` property (it's a clearly marked empty string) and replace it with your key.

   **Keep secrets out of Git**: The repo ships with placeholder values. If you add real keys, either:
   - Use a `.env` file (gitignored) and a build step to inject values, or
   - Use a backend proxy so the key never appears in client source.

### 5. Make a user admin

New users get role `client`. To make someone admin:

1. Open Firestore → `users` collection
2. Find the user document (by UID)
3. Set field `role` to `"admin"`

### 6. Run locally

```bash
npm start
```

Open http://localhost:4200

### 7. Build for production

```bash
npm run build
```

Output is in `dist/dog-sitting-app/`.

## Deploy to Firebase Hosting

```bash
firebase init hosting
# Select existing project, set public directory to: dist/dog-sitting-app
# Single-page app: Yes

npm run build
firebase deploy
```

## Project structure

```
src/
├── app/
│   ├── components/     # Chatbot widget
│   ├── guards/         # auth, admin
│   ├── layout/         # Header, Footer
│   ├── models/         # Dog, User, Booking, Capacity
│   ├── pages/          # All routes
│   └── services/       # Auth, Dog, Booking, etc.
├── assets/
│   └── chatbot-knowledge.ts  # Customize chatbot Q&A
└── environments/       # API keys (edit before deploy)
```

## Customization

- **Chatbot knowledge**: Edit `src/assets/chatbot-knowledge.ts` with your Q&A.
- **Content**: Update placeholder text in each page component.
- **Favicon**: Replace `public/favicon.ico` with your own.
- **PWA icons**: Replace images in `public/icons/`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/JoeBee/dog-sitting.git
git branch -M main
git push -u origin main
```

## Security

- Keep `environment.ts` and `environment.prod.ts` with placeholders if sharing the repo.
- For production, use environment variables or Firebase Remote Config.
- Firebase Security Rules must restrict Firestore/Storage by `request.auth`.
