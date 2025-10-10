import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Seafood from "./pages/Seafood";
import Pasta from "./pages/Pasta";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seafood" element={<Seafood />} />
          <Route path="/pasta" element={<Pasta />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
