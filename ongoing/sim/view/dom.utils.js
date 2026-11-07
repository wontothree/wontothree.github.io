/* =========================================
   DOM UTILS
   Small stateless helpers for reading and writing DOM elements.
   All helpers tolerate missing elements.
   ========================================= */

export const getElement = (id) => document.getElementById(id);

export function setText(id, value) {
  const el = getElement(id);
  if (el) el.textContent = value;
}

export function setValue(id, value) {
  const el = getElement(id);
  if (el) el.value = value;
}

// Read an input as a finite number, or return the fallback
export function getNumber(id, fallback) {
  const el = getElement(id);

  if (!el) return fallback;

  const value = Number(el.value);

  return Number.isFinite(value) ? value : fallback;
}

export function getValue(id, fallback) {
  const el = getElement(id);
  return el ? el.value : fallback;
}

export function bind(id, eventName, callback) {
  const el = getElement(id);

  if (el) el.addEventListener(eventName, callback);

  return el;
}