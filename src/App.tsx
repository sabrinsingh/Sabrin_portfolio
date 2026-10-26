import { MotionConfig } from "framer-motion";
import Home from "./Home";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { CommandPalette } from "@/components/command-palette";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* `reducedMotion="user"` makes every transform-based animation resolve
            instantly for anyone who asks for less motion; opacity still fades. */}
        <MotionConfig reducedMotion="user">
          <CommandPalette />
          <Home />
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
