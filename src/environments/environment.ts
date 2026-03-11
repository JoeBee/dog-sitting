/**
 * Development environment configuration.
 *
 * FILL IN THESE VALUES:
 * 1. Get Firebase config from Firebase Console: Project Settings > General > Your apps
 * 2. Add your Gemini API key for the chatbot (or leave empty to disable chatbot)
 *
 * IMPORTANT: Never commit real API keys. Use environment.prod.ts for production
 * and keep both files in .gitignore, or use a .env file that is gitignored.
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFc7xy5DAoSKV9VezQDTVixS5VkPadjUI',
    authDomain: 'dog-sitting-75312.firebaseapp.com',
    projectId: 'dog-sitting-75312',
    storageBucket: 'dog-sitting-75312.firebasestorage.app',
    messagingSenderId: '671093501600',
    appId: '1:671093501600:web:abaf991a76fffdbc60a3c5',
    measurementId: 'G-NNT97VVY3M'
  },
  /**
   * GEMINI API KEY - Add your key here for the chatbot.
   * Get it from: https://aistudio.google.com/app/apikey
   * Leave empty string to disable the chatbot.
   */
  geminiApiKey: 'AIzaSyCqxnFIl7lek8URqmhUeHPBJ0fA8CxmQxw'
};
