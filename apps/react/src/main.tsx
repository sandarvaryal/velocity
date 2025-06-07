import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./Providers.tsx";
import { ThemeProvider } from "@/components/themeProvider.tsx";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      {/* <QueryClientProvider client={queryClient}> */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
      {/* </QueryClientProvider> */}
    </Providers>
  </StrictMode>
);
