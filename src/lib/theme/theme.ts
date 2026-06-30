export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "arivo-theme";

export function getStoredTheme(): Theme {
  return "dark";
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme = "dark";
}
