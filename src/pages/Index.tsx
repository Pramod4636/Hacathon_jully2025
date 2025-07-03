
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <DashboardHome />
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Index;
