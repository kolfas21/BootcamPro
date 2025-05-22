import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLeaf, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PreviousArrow = (props) => (
  <div
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-green-700 text-3xl hover:text-green-500"
    onClick={props.onClick}
  >
    <FaArrowLeft />
  </div>
);

const NextArrow = (props) => (
  <div
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-green-700 text-3xl hover:text-green-500"
    onClick={props.onClick}
  >
    <FaArrowRight />
  </div>
);

const Graficos = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarGraficos, setMostrarGraficos] = useState(false); // NUEVO

  const API_URL = "https://bootcam-api.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/paises`)
      .then((res) => setPaises(res.data))
      .catch(() => setError("Error al cargar países"));
  }, []);

  const enviarFormulario = async () => {
    setMensaje(null);
    setError(null);
    setCargando(true);
    setMostrarGraficos(false); // OCULTAR GRÁFICOS ANTERIORES

    try {
      const res = await axios.post(`${API_URL}/generar-graficos`, {
        pais,
        anio: Number(anio),
      });
      setMensaje(res.data.message || "Gráficos generados correctamente.");
      setMostrarGraficos(true); // MOSTRAR GRÁFICOS NUEVAMENTE
    } catch (err) {
      const msg = err.response?.data?.detail || "Error al generar gráficos";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  const graficos = [
    {
      nombre: "Producción de Energía Renovable por Fuente",
      archivo: "https://bootcam-api.onrender.com/gifs/grafico_barras_renovables.gif",
    },
    {
      nombre: "Participación de Energías Renovables",
      archivo: "https://bootcam-api.onrender.com/gifs/grafico_torta_renovables.gif",
    },
    {
      nombre: "Crecimiento de Energía Solar Global",
      archivo: "https://bootcam-api.onrender.com/gifs/grafico_area_renovables.gif",
    },
    {
      nombre: "Comparativa Global de Fuentes de Energía",
      archivo: "https://bootcam-api.onrender.com/gifs/grafico_lineas_renovables.gif",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };

  return (
    <div className="py-12 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700 flex justify-center items-center gap-3">
          <FaLeaf className="text-green-500" /> Energía Renovable en Imágenes
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Observa cómo las energías limpias están transformando el mundo con estas visualizaciones impactantes y educativas.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-xl p-8 max-w-xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Generar Gráficos Personalizados
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">País</label>
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Selecciona un país</option>
              {paises.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Año</label>
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              min="1965"
              max={new Date().getFullYear()}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            onClick={enviarFormulario}
            disabled={!pais || !anio}
            className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
          >
            Generar Gráficos
          </button>

          {mensaje && (
            <p className="text-green-700 font-medium text-center mt-4">{mensaje}</p>
          )}
          {error && (
            <p className="text-red-600 font-medium text-center mt-4">{error}</p>
          )}
        </div>
      </div>

      {/* Carrusel de gráficos */}
      <div className="w-full max-w-6xl mx-auto px-4 relative mb-20">
        {cargando ? (
          <div className="w-full flex justify-center items-center h-[580px]">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-600 border-solid"></div>
          </div>
        ) : (
          mostrarGraficos && (
            <Slider {...settings}>
              {graficos.map((grafico, index) => (
                <div key={index} className="px-4">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={grafico.archivo}
                      alt={grafico.nombre}
                      className="w-full h-[580px] object-contain rounded-t-2xl"
                    />
                    <div className="p-5 text-center">
                      <h2 className="text-xl font-bold text-green-800">{grafico.nombre}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )
        )}
      </div>

      {/* Sección educativa */}
      <div className="mt-16 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          ¿Por qué es importante la Energía Renovable?
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Las energías renovables como la solar, eólica e hidroeléctrica son claves para un futuro más limpio. Aquí te mostramos sus beneficios más destacados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: "🌍",
              titulo: "Reducción de CO₂",
              texto:
                "Ayuda a combatir el cambio climático reduciendo la huella de carbono global.",
            },
            {
              icon: "🔋",
              titulo: "Sostenibilidad",
              texto:
                "Son fuentes inagotables que aseguran energía a largo plazo sin agotar recursos.",
            },
            {
              icon: "🤝",
              titulo: "Impacto social",
              texto:
                "Generan empleos verdes y promueven el desarrollo económico en comunidades locales.",
            },
            {
              icon: "💡",
              titulo: "Innovación",
              texto:
                "Impulsan avances tecnológicos que transforman la industria energética global.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-6 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow-inner">
                {item.icon}
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-green-800 mb-1">
                  {item.titulo}
                </h3>
                <p className="text-gray-600">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graficos;