import Home from "./Home";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { CommandPalette } from "@/components/command-palette";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CommandPalette />
        <Home />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
