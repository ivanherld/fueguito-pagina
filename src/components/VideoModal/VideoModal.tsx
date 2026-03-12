import { Modal } from "react-bootstrap";
import "./VideoModal.css";

interface VideoModalProps {
  show: boolean;
  handleClose: () => void;
  video: string;
  title: string;
  storyboard: string;
}

function VideoModal({ show, handleClose, video, title, storyboard }: VideoModalProps) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="video-modal">
      <Modal.Body>

        <h5>{title}</h5>

        <video controls autoPlay muted playsInline preload="metadata" style={{ width: "100%" }}>
          <source src={video} type="video/mp4" />
        </video>

        <img src={storyboard} alt={title} style={{ width: "100%", marginTop: "10px" }} />

      </Modal.Body>
    </Modal>
  );
}

export default VideoModal;
