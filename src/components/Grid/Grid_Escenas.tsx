import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import VideoCardG from "../VideoCardG/VideoCardG";

interface VideoItem {
  title: string;
  img: string;
  video: string;
  storyboard: string;
}

interface GalleryProps {
  videos: VideoItem[];
}

function Grid_Escenas({ videos }: GalleryProps) {
  const [selected, setSelected] = useState<VideoItem | null>(null);

  return (
    <Container>
      <Row>

        {videos.map((v, i) => (
          <Col md={3} key={i}>
            <VideoCardG
              img={v.img}
              video={v.video}
              title={v.title}
              onClick={() => setSelected(v)}
            />
          </Col>
        ))}

      </Row>

      {selected && (
        <VideoModal
          show={true}
          video={selected.video}
          title={selected.title}
          storyboard={selected.storyboard}

          handleClose={() => setSelected(null)}
        />
      )}

    </Container>
  );
}

export default Grid_Escenas;