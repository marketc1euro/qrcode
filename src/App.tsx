
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ClientProvider } from "@/contexts/ClientContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import ClientDetail from "./pages/admin/ClientDetail";
import NewClient from "./pages/admin/NewClient";
import ClientDashboard from "./pages/client/Dashboard";

const queryClient = new QueryClient();

// Protected route components
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading, isAdmin } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const ClientRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading, isClient } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!currentUser || !isClient) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ClientProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/clients/new" element={
                <AdminRoute>
                  <NewClient />
                </AdminRoute>
              } />
              <Route path="/admin/clients/:id" element={
                <AdminRoute>
                  <ClientDetail />
                </AdminRoute>
              } />
              
              {/* Client Routes */}
              <Route path="/client/dashboard" element={
                <ClientRoute>
                  <ClientDashboard />
                </ClientRoute>
              } />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </ClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
