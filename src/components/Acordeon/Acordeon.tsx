import { type ReactNode, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import './Acordeon.css';

const SCENE_COLOR_KEYS = [
  'VERDE',
  'NARANJA',
  'LILA',
  'AMARILLO',
  'GRIS',
  'MARRON',
  'AZUL',
  'ROSA',
] as const;

type SceneColorKey = (typeof SCENE_COLOR_KEYS)[number];

function normalizeSceneColor(color?: string): string {
  if (!color) return '';

  return color
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}

function getAcordeonColorKey(color?: string): Lowercase<SceneColorKey> {
  const normalizedColor = normalizeSceneColor(color);
  if (SCENE_COLOR_KEYS.includes(normalizedColor as SceneColorKey)) {
    return normalizedColor.toLowerCase() as Lowercase<SceneColorKey>;
  }

  return 'azul';
}

type ContextAwareToggleProps = {
  children: ReactNode;
  eventKey: string;
  sceneColor?: string;
  callback?: (eventKey: string) => void;
};

type AcordeonProps = {
  cardBody: ReactNode;
  sceneColor?: string;
};

function ContextAwareToggle({ children, eventKey, sceneColor, callback }: ContextAwareToggleProps) {
  const { activeEventKey } = useContext(AccordionContext);
  const colorKey = getAcordeonColorKey(sceneColor);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;
  const stateClass = isCurrentEventKey ? 'acordeon-toggle--open' : 'acordeon-toggle--closed';

  return (
    <button
      type="button"
      className={`acordeon-toggle acordeon-toggle--${colorKey} ${stateClass}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Acordeon({ cardBody, sceneColor }: AcordeonProps) {
  return (
    <Accordion className="acordeon">
      <Card className="acordeon-card">
        <Card.Header className="acordeon-card__header">
          <ContextAwareToggle eventKey="0" sceneColor={sceneColor}>
            <i
              className="bx bxs-megaphone acordeon-toggle__icon"
              aria-hidden="true"
            />
            Comentarios de Filmacion!
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="acordeon-card__body">{cardBody}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Acordeon;