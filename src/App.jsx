import { useRef } from "react";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import AIBuilder from "./components/AIBuilder";
import Footer from "./components/Footer";

function App() {
  const builderRef = useRef(null);

  const scrollToBuilder = () => {
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-inter">
      <Hero onGetStarted={scrollToBuilder} />
      <FeatureGrid />
      <div ref={builderRef}>
        <AIBuilder />
      </div>
      <Footer />
    </div>
  );
}

export default App;
