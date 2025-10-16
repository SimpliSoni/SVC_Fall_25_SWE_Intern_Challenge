if (!global.File) {
  global.File = class MockFile {
    constructor(parts, filename, options) {
      // A simple mock that doesn't need to do anything
    }
  } as any;
}