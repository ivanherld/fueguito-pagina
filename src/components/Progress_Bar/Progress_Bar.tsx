import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface ProgressBarProps {
  scenesDone: number;
  totalScenes?: number;
}

function Progress_Bar({ scenesDone, totalScenes = 105 }: ProgressBarProps) {
  const safeScenesDone = Math.max(0, scenesDone);
  const safeTotalScenes = Math.max(1, totalScenes);
  const progress = Math.min((safeScenesDone / safeTotalScenes) * 100, 100);

  return (
    <section style={{ margin: "20px 0" }}>
      <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Progreso de la película</h4>
    <Container>
    <ProgressBar
      animated
      variant="warning"
      now={progress}
      label={`${safeScenesDone} / ${safeTotalScenes} escenas`}
      aria-label={`Progreso de la pelicula: ${safeScenesDone} de ${safeTotalScenes} escenas`}
    />
    </Container>
    </section>
  );
}

export default Progress_Bar;