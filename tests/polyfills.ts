import { File } from 'buffer';

// This polyfill is for the backend tests, which run in a Node.js environment
// where the File API is not available globally.
if (typeof window === 'undefined') {
    console.log('Polyfills script running for Node.js environment...');
    if (!global.File) {
        console.log('File API is not defined. Applying polyfill...');
        global.File = File;
    } else {
        console.log('File API is already defined.');
    }
}