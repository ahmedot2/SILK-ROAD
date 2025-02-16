import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/ui/background-grid";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <BackgroundGrid />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-6 flex-1 mt-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
