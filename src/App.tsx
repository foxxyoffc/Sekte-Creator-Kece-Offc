import { useState } from "react";
import { Home, Users, Info } from "lucide-react";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import Watermark from "./components/Watermark";

export default function App() {
  const [activePage, setActivePage] = useState<"home" | "info">("home");

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-red-500 tracking-tight">
              Sekte Creator Kece
            </h1>
            <div className="flex gap-1">
              <button
                onClick={() => setActivePage("home")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activePage === "home"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Struktur</span>
              </button>
              <button
                onClick={() => setActivePage("info")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activePage === "info"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">Info</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {activePage === "home" ? <HomePage /> : <InfoPage />}
      </main>

      {/* Watermark */}
      <Watermark />
    </div>
  );
}
