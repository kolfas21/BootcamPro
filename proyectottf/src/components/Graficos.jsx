import Slider from "react-slick";
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
  const graficos = [
    {
    nombre: "Producción de Energía Renovable por Fuente",
    archivo: `${apiUrl}/gifs/grafico_barras_renovables.gif`,
  },
  {
    nombre: "Participación de Energías Renovables",
    archivo: `${apiUrl}/gifs/grafico_torta_renovables.gif`,
  },
  {
    nombre: "Crecimiento de Energía Solar Global",
    archivo: `${apiUrl}/gifs/grafico_area_renovables.gif`,
  },
  {
    nombre: "Comparativa Global de Fuentes de Energía",
    archivo: `${apiUrl}/gifs/grafico_lineas_renovables.gif`,
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

      <div className="w-full max-w-6xl mx-auto px-4 relative">
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
      </div>

<div className="mt-16 max-w-5xl mx-auto text-center px-4">
  <h2 className="text-3xl font-bold text-green-700 mb-6">¿Por qué es importante la Energía Renovable?</h2>
  <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
    Las energías renovables como la solar, eólica e hidroeléctrica son claves para un futuro más limpio. Aquí te mostramos sus beneficios más destacados:
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Card 1 */}
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow-inner">
        🌍
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-green-800 mb-1">Reducción de CO₂</h3>
        <p className="text-gray-600">Ayuda a combatir el cambio climático reduciendo la huella de carbono global.</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow-inner">
        🔋
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-green-800 mb-1">Sostenibilidad</h3>
        <p className="text-gray-600">Son fuentes inagotables que aseguran energía a largo plazo sin agotar recursos.</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow-inner">
        🤝
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-green-800 mb-1">Impacto social</h3>
        <p className="text-gray-600">Generan empleos verdes y promueven el desarrollo económico en comunidades locales.</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl shadow-inner">
        💡
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-green-800 mb-1">Innovación</h3>
        <p className="text-gray-600">Impulsan avances tecnológicos que transforman la industria energética global.</p>
      </div>
    </div>
  </div>
</div>
    </div>





  );
};

export default Graficos;