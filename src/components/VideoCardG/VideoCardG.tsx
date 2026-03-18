import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";
import "./VideoCardG.css";

interface VideoCardProps {
  img: string;
  title: string;
  hasClipUrl: boolean;
  onClick: () => void;
}

function VideoCardG({ img, title, hasClipUrl, onClick }: VideoCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="video-card-wrapper"
    >
      <Card className={`video-card ${hasClipUrl ? "video-card--with-clip" : ""}`}>
        {img ? (
          <div className="video-card-media">
            <Card.Img src={img} loading="lazy" className="video-card-img" />
            {!hasClipUrl && (
              <div className="video-card-tint" />
            )}
          </div>
        ) : (
          <div className="video-card-fallback">
            {title}
          </div>
        )}

        {hover && img && (
          <div className="video-card-title-overlay">
            {title}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default VideoCardG;