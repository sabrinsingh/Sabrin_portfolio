import { useState } from "react";
import Home from "./Home";
import { ThemeProvider } from "@/components/theme-provider"
import { HelmetProvider } from "react-helmet-async";
import { Loader } from "@/components/loader";
import { CommandPalette } from "@/components/command-palette";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CommandPalette />
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <Home key="home" />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
