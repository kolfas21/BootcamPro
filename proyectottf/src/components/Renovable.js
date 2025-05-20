import React, { useState, useEffect } from "react";
import axios from "axios";

const Renovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [consumo, setConsumo] = useState(1000000);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/paises")
      .then(res => setPaises(res.data))
      .catch(console.error);
  }, []);

  const calcular = () => {
    setError(null);
    setResultado(null);

    axios.post("http://localhost:8000/calcular-renovable", {
      pais,
      anio: Number(anio),
      consumo_kwh: Number(consumo)
    })
      .then(res => setResultado(res.data))
      .catch(err => {
        const message = err.response?.data?.detail || "Error al calcular";
        setError(message);
      });
  };

  return (
    <div className="renovable-container">
      <h2>Consumo de Energía Renovable</h2>

      <label>
        País:
        <select value={pais} onChange={e => setPais(e.target.value)}>
          <option value="">Selecciona un país</option>
          {paises.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      <label>
        Año:
        <input
          type="number"
          value={anio}
          onChange={e => setAnio(e.target.value)}
          min="1965"
          max={new Date().getFullYear()}
        />
      </label>

      <label>
        Consumo eléctrico (kWh):
        <input
          type="number"
          value={consumo}
          onChange={e => setConsumo(e.target.value)}
          min="0"
        />
      </label>

      <button onClick={calcular} disabled={!pais || !anio || !consumo}>Calcular</button>

      {error && <p className="error-message">{error}</p>}

      {resultado && (
        <div className="resultados">
          <h3>Resultados</h3>
          <p>Proporción renovable: {(resultado.proporcion_renovable * 100).toFixed(2)}%</p>
          <p>Consumo renovable estimado: {resultado.consumo_renovable_estimado.toFixed(0)} kWh</p>
          <p>Porcentaje estimado: {resultado.porcentaje_estimado.toFixed(2)}%</p>

          <h3>Gráficos</h3>
          <div>
            <h4>Gráfico de Barras</h4>
            <img src={`${process.env.REACT_APP_API_URL}${resultado.graficos.barras}`} alt="Gráfico de Barras" />
          </div>

          <div>
            <h4>Gráfico de Torta</h4>
            <img src={`${process.env.REACT_APP_API_URL}${resultado.graficos.torta}`} alt="Gráfico de Torta" />
          </div>

          <div>
            <h4>Gráfico de Líneas</h4>
            <img src={`${process.env.REACT_APP_API_URL}${resultado.graficos.lineas}`} alt="Gráfico de Líneas" />
          </div>

          <div>
            <h4>Gráfico de Área</h4>
            <img src={`${process.env.REACT_APP_API_URL}${resultado.graficos.area}`} alt="Gráfico de Área" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Renovable;
