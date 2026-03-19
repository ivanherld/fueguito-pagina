import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import VideoCardG from "../VideoCardG/VideoCardG";
import { type Escena } from "../../utilities/escenasService";

interface GalleryProps {
  videos: Escena[];
}

function Grid_Escenas({ videos }: GalleryProps) {
  const [selected, setSelected] = useState<Escena | null>(null);

  return (
    
    <Container>
      <h2>Escenas</h2>
      <Row className="g-3">

        {videos.map((v) => (
          <Col xs={12} sm={6} md={4} lg={3} key={v.id}>
            <VideoCardG
              img={v.img}
              title={v.title}
              hasClipUrl={Boolean(v.video)}
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
          descripcion={selected.descripcion}
          orden={selected.orden}
          color={selected.color}
          fechaAprox={selected.fechaAprox}
          decorado={selected.decorado}
          comentariosFilmacion={selected.comentariosFilmacion}

          handleClose={() => setSelected(null)}
        />
      )}

    </Container>
  );
}

export default Grid_Escenas;