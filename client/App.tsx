import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SocialQualifyForm from "./pages/SocialQualifyForm";
import SiliconValleyConsulting from "./pages/SiliconValleyConsulting";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        {children}
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/social-qualify-form" element={<SocialQualifyForm />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route
        path="/companies/silicon-valley-consulting"
        element={<SiliconValleyConsulting />}
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

// Ensure createRoot is only called once
const container = document.getElementById("root");
if (container && !container._reactRootContainer) {
  const root = createRoot(container);
  root.render(<App />);
  // Mark container to prevent duplicate roots
  (container as any)._reactRootContainer = root;
}