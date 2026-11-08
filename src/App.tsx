import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { LayoutShell } from "@/components/layout-shell";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CommandPalette />
      <LayoutShell />
    </ThemeProvider>
  );
}

export default App;
