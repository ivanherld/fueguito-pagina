import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";

interface VideoCardProps {
  img: string;
  video?: string;
  title: string;
  onClick: () => void;
}

function VideoCardG({ img, video, title, onClick }: VideoCardProps) {
  const [hover, setHover] = useState(false);
  const mediaStyle = {
    width: "100%",
    height: "auto",
    display: "block"
  };
 

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ position: "relative" }}
    >
      <Card style={{ cursor: "pointer", overflow: "hidden" }}>
        {hover && video ? (
          <video src={video} autoPlay muted loop playsInline style={mediaStyle} />
        ) : (
          <Card.Img src={img} style={mediaStyle} />
        )}

        {hover && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "6px"
            }}
          >
            {title}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default VideoCardG;