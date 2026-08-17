// Minimal pub/sub so any component can drive the custom cursor's state
// without threading context through the whole tree or causing re-renders
// on every mouse move.
const listeners = new Set();

export const cursorBus = {
  set(variant) {
    listeners.forEach((fn) => fn(variant));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function cursorHoverProps(variant) {
  return {
    onMouseEnter: () => cursorBus.set(variant),
    onMouseLeave: () => cursorBus.set("default"),
  };
}
