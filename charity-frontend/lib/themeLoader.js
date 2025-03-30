/**
 * Theme Loader Module
 * 
 * Responsible for managing the application's themes and providing
 * utility functions for theme-related operations.
 */

// Theme options
export const THEMES = {
  LIGHT: 'charity',
  DARK: 'charity-dark'
};

/**
 * Apply theme to document
 * @param {string} theme - The theme to apply ('charity' or 'charity-dark')
 */
export const applyTheme = (theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Toggle dark mode class for specific dark-mode utilities
    if (theme === THEMES.DARK) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Store the user's theme preference
    localStorage.setItem('theme', theme);
  }
};

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = () => {
  if (typeof document !== 'undefined') {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
    return newTheme;
  }
  return null;
};

/**
 * Get the user's preferred theme
 * @returns {string} The preferred theme
 */
export const getPreferredTheme = () => {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
  }
  
  // Default to light theme
  return THEMES.LIGHT;
};

/**
 * Initialize cursor effects on the document
 */
export const initCursorEffects = () => {
  if (typeof document !== 'undefined') {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-expanded');
      });
      
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-expanded');
      });
    });
  }
};

/**
 * Initialize parallax effects for elements with the 'parallax' class
 */
export const initParallaxEffects = () => {
  if (typeof window !== 'undefined') {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
};

/**
 * Initialize all theme-related effects
 */
export const initThemeEffects = () => {
  const theme = getPreferredTheme();
  applyTheme(theme);
  
  if (typeof window !== 'undefined') {
    // Initialize effects only in browser context
    window.addEventListener('DOMContentLoaded', () => {
      initCursorEffects();
      initParallaxEffects();
    });
  }
}; 