import { Routes, Route } from "react-router-dom";
import { Header } from "./components/RespiraHeader";
import {RespiraFooter} from "./components/RespiraFooter"; 
import Maskani from "./Virtue/Pages/Home/maskani";
import DestinationDetail from "./Virtue/Pages/destination/destinationDetails";
import PopularDestinations from "./Virtue/Pages/destination/popularDestination";
import About from "./Virtue/Pages/about/about";
import Gallery from "./Virtue/Pages/Gallery/gallery";
import Contact from "./Virtue/Pages/contact/contact";
import Adventure from "./Virtue/Pages/adventure/adventure";
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Maskani />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route path="/destination/:destinationId" element={<DestinationDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adventure" element={<Adventure />} />
        </Routes>
      </main>

      <RespiraFooter />
    </div>
  );
}

export default App;
