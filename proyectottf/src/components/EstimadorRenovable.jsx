import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const EstimadorRenovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState("2021");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800 });
    axios.get(`${process.env.REACT_APP_API_URL}/paises`)
      .then(res => setPaises(res.data))
      .catch(() => setError("Error cargando países"));
  }, []);

  const calcular = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/calcular-renovable`, {
        pais,
        anio: parseInt(anio),
        consumo_kwh: parseFloat(consumo)
      });
      setResultado({
        proporcion: res.data.proporcion_renovable,
        consumo_renovable: res.data.consumo_renovable_estimado,
        porcentaje: res.data.porcentaje_estimado
      });
      setError("");
    } catch {
      setResultado(null);
      setError("Error al calcular. Verifica los datos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg p-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          💡 Estimador de Energía Renovable
        </h2>

        <p className="text-gray-700 text-center mb-8" data-aos="fade-in">
          Descubre cuánta energía renovable estás usando según tu país y consumo eléctrico anual. Esta herramienta te ayuda a tomar decisiones más sostenibles 🌱
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-green-800 font-semibold mb-1">🌍 País</label>
            <select
              className="w-full border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={pais}
              onChange={e => setPais(e.target.value)}
            >
              <option value="">-- Selecciona un país --</option>
              {paises.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">📅 Año</label>
            <input
              type="number"
              className="w-full border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={anio}
              max="2021"
              onChange={e => setAnio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">⚡ Consumo eléctrico (kWh/año)</label>
            <input
              type="number"
              className="w-full border border-green-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={consumo}
              onChange={e => setConsumo(e.target.value)}
              placeholder="Ej: 1200"
            />
          </div>
        </div>

        <button
          onClick={calcular}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Calcular proporción renovable
        </button>

        {resultado && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 shadow" data-aos="zoom-in">
            <h3 className="text-lg font-bold text-green-700 mb-3">🌞 Resultados</h3>
            <ul className="text-gray-800 space-y-2">
              <li>🔋 <strong>{resultado.consumo_renovable.toFixed(2)} kWh</strong> provienen de fuentes renovables.</li>
              <li>🔄 Esto representa el <strong>{resultado.porcentaje.toFixed(2)}%</strong> de tu consumo.</li>
              <li>📊 Tu país tiene una base de <strong>{(resultado.proporcion * 100).toFixed(2)}%</strong> en energías renovables.</li>
            </ul>
            <p className="mt-4 text-sm text-green-900 italic">
              ¡Felicitaciones! Usar energías limpias ayuda a combatir el cambio climático y mejora la calidad del aire 💚
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-xl text-center shadow" data-aos="fade-in">
            {error}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block text-green-700 border border-green-600 hover:bg-green-100 py-2 px-6 rounded-xl transition-transform transform hover:scale-105 font-medium shadow"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-green-700 mb-4">¿Por qué importa tu consumo renovable?</h3>
        <p className="text-gray-700 mb-6">
          Elegir energía renovable es una decisión con impacto positivo. Cada kilovatio generado con fuentes limpias significa menos CO₂ en la atmósfera, más salud para todos y un planeta más habitable.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/30 backdrop-blur-md border border-green-100 rounded-xl p-6 shadow" data-aos="zoom-in">
            <h4 className="font-bold text-green-800 mb-2">🌎 Reducción de Huella</h4>
            <p className="text-gray-700 text-sm">Menos gases contaminantes y una contribución directa al medio ambiente.</p>
          </div>
          <div className="bg-white/30 backdrop-blur-md border border-green-100 rounded-xl p-6 shadow" data-aos="zoom-in" data-aos-delay="100">
            <h4 className="font-bold text-green-800 mb-2">⚙️ Eficiencia Económica</h4>
            <p className="text-gray-700 text-sm">Reduce tu factura eléctrica y gana independencia energética.</p>
          </div>
          <div className="bg-white/30 backdrop-blur-md border border-green-100 rounded-xl p-6 shadow" data-aos="zoom-in" data-aos-delay="200">
            <h4 className="font-bold text-green-800 mb-2">💚 Futuro Sostenible</h4>
            <p className="text-gray-700 text-sm">Una mejor calidad de vida para las futuras generaciones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimadorRenovable;