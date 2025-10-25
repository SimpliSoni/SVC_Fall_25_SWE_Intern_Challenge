import '@testing-library/jest-dom';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor(cb) {
        this.cb = cb;
    }
    observe() {
        // Call the callback with a dummy size
        this.cb([{ contentRect: { width: 100, height: 100 } }]);
    }
    unobserve() {}
    disconnect() {}
};

// Mock Pointer Events
class MockPointerEvent extends Event {
  pointerId: number;
  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.pointerId = props.pointerId ?? 0;
  }
}
window.PointerEvent = MockPointerEvent as any;
if (!window.Element.prototype.setPointerCapture) {
    window.Element.prototype.setPointerCapture = vi.fn();
}
if (!window.Element.prototype.releasePointerCapture) {
    window.Element.prototype.releasePointerCapture = vi.fn();
}
if (!window.Element.prototype.hasPointerCapture) {
    window.Element.prototype.hasPointerCapture = vi.fn();
}


// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Supabase env variables
process.env.VITE_SUPABASE_URL = 'http://localhost:54321';
process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock document.elementFromPoint
if (!document.elementFromPoint) {
  document.elementFromPoint = vi.fn();
}

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();