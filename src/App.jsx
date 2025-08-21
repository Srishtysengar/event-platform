import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import About from "./components/About";
import Contact from "./components/Contact";
import AddEvent from "./components/AddEvent";

function App() {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Events />
                <About />
                <Contact />
              </>
            }
          />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
