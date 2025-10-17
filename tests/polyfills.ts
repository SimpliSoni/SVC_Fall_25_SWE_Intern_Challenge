console.log('Polyfills script running...');
const { File } = require('buffer');

if (!global.File) {
  console.log('File API is not defined. Applying polyfill...');
  global.File = File;
} else {
  console.log('File API is already defined.');
}