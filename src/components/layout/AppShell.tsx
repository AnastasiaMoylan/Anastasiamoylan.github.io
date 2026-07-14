import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell() {
  return (
    <div className="flex flex-col min-h-screen" id="top">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main className="flex-1" id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
