import './App.css';
import InfoEnergia from './components/InfoEnergia';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Estimador from './components/EstimadorRenovable';
import Graficos from './components/Graficos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoEnergia />} />
        <Route path="/estimador" element={<Estimador />} />
        <Route path="/graficos" element={<Graficos />} />
      </Routes>
    </Router>
   
  );
}

export default App;
