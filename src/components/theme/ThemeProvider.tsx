import { ThemeProvider } from "@/features/theme/theme-context";

export function ThemeScript() {
  const script = `
    (function () {
      try {
        var theme = localStorage.getItem('arivo-theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export { ThemeProvider };
