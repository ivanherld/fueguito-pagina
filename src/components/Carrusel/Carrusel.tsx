import { useEffect, useMemo, useState } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carrusel.css';
import { obtenerTarjetas, type Tarjeta } from '../../utilities/tarjetasService';

function mezclarTarjetas(tarjetas: Tarjeta[]): Tarjeta[] {
  return [...tarjetas].sort(() => Math.random() - 0.5);
}

const Carrusel = () => {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarTarjetas() {
      setCargando(true);
      setError(null);

      try {
        const data = await obtenerTarjetas();
        setTarjetas(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'No se pudieron cargar las tarjetas.';
        setError(msg);
      } finally {
        setCargando(false);
      }
    }

    void cargarTarjetas();
  }, []);

  const tarjetasAleatorias = useMemo(() => mezclarTarjetas(tarjetas), [tarjetas]);

  return (
    <section className="carrusel-contenedor">
      <h1 className="prodDest">¿Quiénes somos?</h1>

      {cargando && <p className="carrusel-feedback">Cargando tarjetas...</p>}
      {error && <p className="carrusel-feedback">{error}</p>}
      {!cargando && !error && tarjetasAleatorias.length === 0 && (
        <p className="carrusel-feedback">No hay tarjetas para mostrar.</p>
      )}

      {!cargando && !error && tarjetasAleatorias.length > 0 && (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 22,
            },
          }}
          slidesPerView={1}
          spaceBetween={12}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          loop
          watchOverflow
        >
          {tarjetasAleatorias.map((tarjeta) => (
            <SwiperSlide key={tarjeta.id}>
              <article className="producto-tarjeta">
                {tarjeta.url ? (
                  <img className="imagen-tarjeta" src={tarjeta.url} alt={tarjeta.titulo} loading="lazy" />
                ) : (
                  <div className="imagen-placeholder">Sin imagen</div>
                )}
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Carrusel;

