import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const InfoEnergia = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero */}
<section
  className="relative min-h-screen flex items-center justify-center text-white px-6"
  style={{
    backgroundImage: "url('/Sarnia_Solar-09.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  {/* Capa oscura con degradado */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-green-900/90 z-0" />

  {/* Contenido */}
  <div className="relative z-10 text-center max-w-5xl w-full" data-aos="fade-up">
    {/* Logo más protagonista */}
    <div className="mb-2 animate-bounce-slow">
      <img src="icono.png" alt="Eco Logo" className="mx-auto w-50 md:w-40 drop-shadow-xl" />
    </div>

    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
      Aprovecha el Poder del Sol <br /> para un Mañana Sostenible
    </h1>

    <p className="text-lg md:text-xl text-green-100 mb-10 drop-shadow-sm">
      Energía solar limpia, accesible y eficiente para transformar tu vida y cuidar el planeta.
    </p>

    {/* Botones */}
    <div className="flex flex-wrap justify-center gap-4 mb-14">
      <Link
        to="/estimador"
        className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 font-semibold"
      >
        Calcular mi ahorro
      </Link>
      <Link
        to="/graficos"
        className="bg-white text-green-700 border border-green-600 hover:bg-green-100 py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 font-semibold"
      >
        Ver estadísticas
      </Link>
    </div>

    {/* Tarjetas informativas */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
  {[
    {
      title: "Ahorro Económico",
      description: "Reduce tu factura de energía hasta en un 70% desde el primer mes.",
      icon: "💰"
    },
    {
      title: "Energía Limpia",
      description: "Contribuye a un mundo más limpio usando una fuente inagotable: el sol.",
      icon: "🌱"
    },
    {
      title: "Valor a tu Propiedad",
      description: "Los hogares con paneles solares aumentan su valor de mercado.",
      icon: "🏡"
    }
  ].map(({ title, description, icon }, index) => (
    <div
      key={index}
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md hover:scale-105 transform transition-transform duration-300 flex flex-col items-center text-center"
      data-aos="zoom-in"
      data-aos-delay={index * 100}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-green-600 rounded-full mb-4 text-2xl shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-green-100">{description}</p>
    </div>
  ))}
</div>
  </div>
</section>

      {/* Beneficios */}
      <section className="py-20 bg-green-50">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-green-700 mb-16" data-aos="fade-up">
      Beneficios de la Energía Solar
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
      {[
        { title: "Energía Inagotable", icon: "☀️", percent: 100 },
        { title: "Reducción de Costos", icon: "💰", percent: 70 },
        { title: "Cero Emisiones", icon: "🌱", percent: 90 },
        { title: "Fácil Instalación", icon: "🔧", percent: 80 },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Círculo con animación */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#d1fae5"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={`${282.6 - (282.6 * item.percent) / 100}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Icono y porcentaje al centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-green-700">
              <div className="text-2xl">{item.icon}</div>
              <div className="text-lg font-semibold">{item.percent}%</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-700">{item.title}</h3>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ¿Cómo funciona? */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-10" data-aos="fade-up">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { step: "1", text: "Los paneles capturan la energía del sol" },
              { step: "2", text: "Un inversor convierte la energía en electricidad utilizable" },
              { step: "3", text: "Se alimentan los dispositivos eléctricos del hogar" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-green-200 shadow-md" data-aos="zoom-in" data-aos-delay={i * 200}>
                <div className="text-5xl font-bold text-green-600 mb-4">{item.step}</div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imagen de impacto */}
      <section
        className="relative h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/Sarnia_Solar-09.jpg')" }}
      >
        <div className="bg-green-900/60 p-10 rounded-xl text-white text-center" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">El sol no te cobra por brillar</h2>
          <p className="text-lg">Aprovecha una fuente de energía limpia y gratuita disponible todos los días.</p>
        </div>
      </section>

      {/* Impacto Ambiental */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-10" data-aos="fade-up">Impacto Ambiental</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "CO₂ evitado", value: "12,000+ kg" },
              { label: "Hogares abastecidos", value: "500+" },
              { label: "Árboles equivalentes", value: "1,800+" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6" data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="text-3xl font-bold text-green-700">{item.value}</div>
                <div className="text-gray-600 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6" data-aos="fade-up">¿Listo para transformar tu energía?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Da el primer paso hacia una vida más sostenible. Calcula tu ahorro o explora las estadísticas.
        </p>
        <div className="flex justify-center gap-4" data-aos="zoom-in">
          <Link
            to="/estimador"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 font-semibold"
          >
            Ir al Estimador
          </Link>
          <Link
            to="/graficos"
            className="bg-white text-green-700 border border-green-600 hover:bg-green-100 py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 font-semibold"
          >
            Ver Estadísticas
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InfoEnergia;