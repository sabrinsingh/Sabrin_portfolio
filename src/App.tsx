import Home from "./Home";
import { ThemeProvider } from "@/components/theme-provider"
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Home />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
