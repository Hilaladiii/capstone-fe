import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import routes from "./routes/Route";
import "./index.css";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={routes} />
        <Toaster />
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>
);
