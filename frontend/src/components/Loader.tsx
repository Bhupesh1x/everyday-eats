import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="relative z-50">
      <div
        className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity"
        data-testid="background-overlay"
      />
      <div className="h-full w-full flex flex-col items-center justify-center min-h-screen gap-3">
        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
        <p className="text-2xl font-semibold text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
};
