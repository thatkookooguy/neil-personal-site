import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Get the actual theme (resolving 'system' to light/dark)
  const getResolvedTheme = (t: Theme): 'light' | 'dark' => {
    if (t === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return t;
  };

  // Apply theme to document
  const applyTheme = (t: Theme) => {
    const resolved = getResolvedTheme(t);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
  };

  // Initialize on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored || 'system';
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update when theme changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    const order: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme" disabled>
        <span className="theme-icon">◐</span>
      </button>
    );
  }

  const icons: Record<Theme, string> = {
    light: '☀️',
    dark: '🌙',
    system: '💻',
  };

  const labels: Record<Theme, string> = {
    light: 'Light mode',
    dark: 'Dark mode', 
    system: 'System preference',
  };

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Current: ${labels[theme]}. Click to change.`}
      title={labels[theme]}
    >
      <span className="theme-icon">{icons[theme]}</span>
      <span className="theme-label">{theme}</span>
    </button>
  );
}

