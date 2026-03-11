/**
 * Production environment configuration.
 *
 * FILL IN THESE VALUES before deploying:
 * - Firebase config (same as development)
 * - Gemini API key for chatbot
 *
 * For production, consider using Firebase Remote Config or a backend proxy
 * to serve the Gemini API key instead of embedding it in the client.
 */
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCFc7xy5DAoSKV9VezQDTVixS5VkPadjUI',
    authDomain: 'dog-sitting-75312.firebaseapp.com',
    projectId: 'dog-sitting-75312',
    storageBucket: 'dog-sitting-75312.firebasestorage.app',
    messagingSenderId: '671093501600',
    appId: '1:671093501600:web:abaf991a76fffdbc60a3c5',
    measurementId: 'G-NNT97VVY3M'
  },
  geminiApiKey: 'AIzaSyCqxnFIl7lek8URqmhUeHPBJ0fA8CxmQxw' // Add your Gemini API key for production
};
