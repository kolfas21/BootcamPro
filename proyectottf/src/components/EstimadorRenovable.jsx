import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EstimadorRenovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState("2021");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="mb-4 text-center text-success">💡 Estimador de Energía Renovable</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">🌍 País</label>
          <select className="form-select" value={pais} onChange={e => setPais(e.target.value)}>
            <option value="">-- Selecciona un país --</option>
            {paises.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">📅 Año</label>
          <input
            type="number"
            className="form-control"
            value={anio}
            max="2021"
            onChange={e => setAnio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">⚡ Consumo eléctrico total (kWh)</label>
          <input
            type="number"
            className="form-control"
            value={consumo}
            onChange={e => setConsumo(e.target.value)}
            placeholder="Ej: 1200"
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-success" onClick={calcular}>
            Calcular Proporción
          </button>
        </div>

        {resultado && (
          <div className="alert alert-info mt-4 text-center">
            <p>🔋 Energía renovable estimada: <strong>{resultado.consumo_renovable.toFixed(2)} kWh</strong></p>
            <p>🔄 Porcentaje renovable del consumo: <strong>{resultado.porcentaje.toFixed(2)}%</strong></p>
            <p>📊 Proporción base renovable del país: <strong>{resultado.proporcion.toFixed(4)}</strong></p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center">{error}</div>
        )}

        <div className="d-grid mt-3">
          <Link to="/" className="btn btn-primary">
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EstimadorRenovable;
