import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Stock1 from "./components/Stock1";
import Stock2 from "./components/Stock2";
import Summary from "./components/Summary";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/stock1" element={<Stock1 />} />
        <Route path="/stock2" element={<Stock2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;