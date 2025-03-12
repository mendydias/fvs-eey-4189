import "@testing-library/jest-dom/vitest";
import { JSDOM } from "jsdom";
import { vi } from "vitest";

const { window } = new JSDOM();

// Stubbing out next-theme dependencies
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
window["IntersectionObserver"] = IntersectionObserverMock;

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {};
window.Element.prototype.scrollIntoView = () => {};

// requestAnimationFrame mock
window.requestAnimationFrame = (cb: any) => setTimeout(cb, 1000 / 60);

// URL object mock
window.URL.createObjectURL = () => "https://i.pravatar.cc/300";
window.URL.revokeObjectURL = () => {};

// navigator mock
Object.defineProperty(window, "navigator", {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
});

// Override globalThis
Object.assign(global, { window, document: window.document });
