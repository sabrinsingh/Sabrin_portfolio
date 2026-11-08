import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { CommandPalette } from "@/components/command-palette";
import { LayoutShell } from "@/components/layout-shell";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CommandPalette />
        <LayoutShell />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
