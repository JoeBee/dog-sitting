/**
 * Example environment file. Copy to environment.ts and environment.prod.ts,
 * then fill in your real values.
 *
 * DO NOT commit environment.ts or environment.prod.ts with real API keys.
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
  geminiApiKey: 'AIzaSyCqxnFIl7lek8URqmhUeHPBJ0fA8CxmQxw' // Get from https://aistudio.google.com/app/apikey
};
