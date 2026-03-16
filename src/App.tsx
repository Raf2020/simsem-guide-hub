import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Payments from "./pages/Payments";
import Experiences from "./pages/Experiences";
import WadiRumTour from "./pages/WadiRumTour";
import WadiRumGuidedTour from "./pages/WadiRumGuidedTour";
import WadiRumFromAqaba from "./pages/WadiRumFromAqaba";
import DahabRedSea from "./pages/DahabRedSea";
import NapoleonReefDahab from "./pages/NapoleonReefDahab";
import RedSeaRelaxDahab from "./pages/RedSeaRelaxDahab";
import GuideDashboard from "./pages/GuideDashboard";
import TravelerBrowse from "./pages/TravelerBrowse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/tours/jordan/wadi-rum-overnight-4x4-jeep-tour" element={<WadiRumTour />} />
            <Route path="/tours/jordan/wadi-rum-guided-tour" element={<WadiRumGuidedTour />} />
            <Route path="/tours/jordan/wadi-rum-tours-from-aqaba" element={<WadiRumFromAqaba />} />
            <Route path="/tours/egypt/dahab-red-sea" element={<DahabRedSea />} />
            <Route path="/tours/egypt/napoleon-reef-dahab" element={<NapoleonReefDahab />} />
            <Route path="/tours/egypt/red-sea-relax-dahab" element={<RedSeaRelaxDahab />} />
            {/* Legacy redirect */}
            <Route path="/experiences/wadi-rum-overnight-jeep-tour" element={<WadiRumTour />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/payments" element={<Payments />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
