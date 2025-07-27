// src/utils/storage.js
export const getSafeLocalJson = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch (err) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, err);
    return null;
  }
};
