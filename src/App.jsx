import { BrowserRouter, Route } from "react-router-dom";
import { LenisProvider } from "./hooks/useLenis";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Shell() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[999] -translate-y-24 rounded-full bg-lime px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <PageTransition>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <Shell />
      </LenisProvider>
    </BrowserRouter>
  );
}
