
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showBackButton = false,
  onBack,
  title,
}) => {
  return (
    <div className="min-h-screen bg-tech-lightGray flex flex-col">
      <header className="bg-white border-b px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Button>
            )}
            <h1 className="text-xl font-semibold text-tech-darkGray">
              {title || "Tech Scenario Solver"}
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-6">{children}</div>
      </main>
      <footer className="bg-tech-darkGray text-white py-4 text-center text-sm">
        Tech Scenario Solver &copy; {new Date().getFullYear()} - An interactive assessment tool
      </footer>
    </div>
  );
};

export default AppLayout;
