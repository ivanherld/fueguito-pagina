import { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import "./VideoModal.css";

interface VideoModalProps {
  show: boolean;
  handleClose: () => void;
  video?: string;
  title: string;
  storyboard?: string;
  descripcion?: string;
  orden: number;
  color?: string;
  fechaAprox?: string;
  decorado?: string;
  comentariosFilmacion?: string;
}

function getModalColorClass(color?: string): string {
  if (!color) return "";

  const normalized = color
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

  switch (normalized) {
    case "VERDE":
      return "video-modal--verde";
    case "NARANJA":
      return "video-modal--naranja";
    case "LILA":
      return "video-modal--lila";
    case "AMARILLO":
      return "video-modal--amarillo";
    case "GRIS":
      return "video-modal--gris";
    case "MARRON":
      return "video-modal--marron";
    case "AZUL":
      return "video-modal--azul";
    case "ROSA":
      return "video-modal--rosa";
    default:
      return "";
  }
}

function VideoModal({
  show,
  handleClose,
  video,
  title,
  storyboard,
  descripcion,
  color,
  fechaAprox,
  decorado,
  comentariosFilmacion,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalColorClass = getModalColorClass(color);

  useEffect(() => {
    if (!show || !video || !videoRef.current) return;

    const playPromise = videoRef.current.play();
    if (playPromise) {
      void playPromise.catch(() => {
        // Algunos navegadores pueden bloquear autoplay aunque este muteado.
      });
    }
  }, [show, video]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className={`video-modal ${modalColorClass}`.trim()}
    >
      <Modal.Body>

        <h5>{title}</h5>
        

        {video ? (
          <>
            <video
              key={video}
              ref={videoRef}
              src={video}
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
              style={{ width: "100%" }}
            />
          </>
        ) : (
          <p style={{ margin: "12px 0" }}>Esta escena todavía no tiene video cargado.</p>
        )}

        {storyboard && <img src={storyboard} alt={title} style={{ width: "100%", marginTop: "10px" }} />}

        {descripcion && <p style={{ marginTop: "12px" }}>{descripcion}</p>}

        {fechaAprox && <p style={{ marginBottom: "4px" }}><strong>Fecha aprox:</strong> {fechaAprox}</p>}
        {decorado && <p style={{ marginBottom: "4px" }}><strong>Decorado:</strong> {decorado}</p>}
        {comentariosFilmacion && (
          <p style={{ marginBottom: 0 }}><strong>Comentario:</strong> {comentariosFilmacion}</p>
        )}

      </Modal.Body>
    </Modal>
  );
}

export default VideoModal;
