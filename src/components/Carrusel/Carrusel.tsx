import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const imageModules = import.meta.glob(
  "../../assets/2. REFERENCIAS/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" }
) as Record<string, string>;

const images = Object.entries(imageModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" })
  )
  .map(([, src]) => src);

export default function Carrusel() {
  if (images.length === 0) {
    return <p>No se encontraron imagenes en la carpeta de referencias.</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={images.length > 1}
      spaceBetween={16}
      slidesPerView={1}
      style={{ width: "100%" }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={src}>
          <img
            src={src}
            alt={`Imagen ${index + 1}`}
            style={{
              width: "100%",
              maxHeight: "520px",
              objectFit: "cover",
              borderRadius: "12px",
              display: "block",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
