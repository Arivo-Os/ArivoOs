import { ThemeProvider } from "@/features/theme/theme-context";

export function ThemeScript() {
  const script = `
    (function () {
      try {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export { ThemeProvider };
