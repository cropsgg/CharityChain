/**
 * Theme loader utility for managing the application's theme settings and effects
 */

// Theme settings
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

let currentTheme = ThemeMode.DARK;

/**
 * Initialize theme effects and settings
 */
export const initThemeEffects = (): void => {
  if (typeof window === 'undefined') return;

  // Load saved theme or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && (savedTheme === ThemeMode.LIGHT || savedTheme === ThemeMode.DARK)) {
    currentTheme = savedTheme as ThemeMode;
  } else {
    // Use system preference as default
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? ThemeMode.DARK : ThemeMode.LIGHT;
  }

  // Apply the theme
  applyTheme(currentTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('theme')) {
      const newTheme = event.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
      applyTheme(newTheme);
      currentTheme = newTheme;
    }
  });
};

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = (): void => {
  if (typeof window === 'undefined') return;

  const newTheme = currentTheme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
  applyTheme(newTheme);
  currentTheme = newTheme;
  localStorage.setItem('theme', newTheme);
};

/**
 * Get the current theme
 */
export const getCurrentTheme = (): ThemeMode => {
  return currentTheme;
};

/**
 * Apply a theme to the document
 */
const applyTheme = (theme: ThemeMode): void => {
  if (typeof window === 'undefined' || !document.documentElement) return;

  if (theme === ThemeMode.DARK) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--bg-opacity', '0.9');
    document.documentElement.style.setProperty('--glow-intensity', '1');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('--bg-opacity', '0.95');
    document.documentElement.style.setProperty('--glow-intensity', '0.7');
  }
};

/**
 * Add dynamic cursor and hover effects to the document
 */
export const addInteractiveEffects = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // The full implementation would go here if required
  // But most of the effects are now handled in CSS and Layout.tsx
  console.log('Interactive effects initialized');
}; 