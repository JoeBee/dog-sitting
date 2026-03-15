# Cloud Functions

## Form submission email

When a document is created in the `form_submissions` collection, an email is sent to JoeBeyer3@gmail.com using Gmail.

### Setup

1. **Create two Firebase secrets** (run from the project root):

   ```bash
   firebase functions:secrets:set GMAIL_USER
   ```
   Enter your Gmail address when prompted (e.g. `JoeBeyer3@gmail.com`).

   ```bash
   firebase functions:secrets:set GMAIL_APP_PASSWORD
   ```
   Paste your 16-character Gmail app password (the one you created for "dog-sitting"). Remove any spaces when pasting.

2. **Deploy**
   ```bash
   cd functions
   npm install
   npm run build
   firebase deploy --only functions
   ```
