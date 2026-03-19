import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import icono from '../../assets/3. ÍCONOS/guionv2.png';
import iconocrono from '../../assets/3. ÍCONOS/calendario v2 .png';
import { Container } from 'react-bootstrap';
import './LinksUtiles.css';
import { CDN } from '../../config';
import { useMemo } from 'react';
import { type Escena } from '../../utilities/escenasService';

interface LinkUtilesProps {
  escenas: Escena[];
}

const MONTHS_ES: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function parseFechaAprox(value?: string): Date | null {
  if (!value) return null;

  const raw = value.trim();
  if (!raw) return null;

  const normalized = normalizeText(raw);
  const spanishLongDateMatch = normalized.match(/^(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})$/);
  if (spanishLongDateMatch) {
    const day = Number(spanishLongDateMatch[1]);
    const monthName = spanishLongDateMatch[2];
    const year = Number(spanishLongDateMatch[3]);
    const month = MONTHS_ES[monthName];

    if (month !== undefined) {
      const parsed = new Date(year, month, day);
      if (!Number.isNaN(parsed.getTime())) {
        parsed.setHours(0, 0, 0, 0);
        return parsed;
      }
    }
  }

  const iso = new Date(raw);
  if (!Number.isNaN(iso.getTime())) {
    iso.setHours(0, 0, 0, 0);
    return iso;
  }

  const latinDateMatch = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (latinDateMatch) {
    const day = Number(latinDateMatch[1]);
    const month = Number(latinDateMatch[2]);
    let year = Number(latinDateMatch[3]);

    if (year < 100) {
      year += 2000;
    }

    const parsed = new Date(year, month - 1, day);
    if (!Number.isNaN(parsed.getTime())) {
      parsed.setHours(0, 0, 0, 0);
      return parsed;
    }
  }

  return null;
}

function formatFecha(value: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(value);
}

function LinkUtiles({ escenas }: LinkUtilesProps) {

  const guionUrl = `${CDN}/guion-cronograma/Triste%20para%20siempre.pdf`;
  const cronogramaUrl = `${CDN}/guion-cronograma/cronograma.pdf`;

  const proximaFilmacion = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const escenasConFecha = escenas
      .filter((escena) => !escena.filmado)
      .map((escena) => ({
        escena,
        fecha: parseFechaAprox(escena.fechaAprox),
      }))
      .filter((item): item is { escena: Escena; fecha: Date } => item.fecha instanceof Date)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

    const proxima = escenasConFecha.find((item) => item.fecha.getTime() >= hoy.getTime());
    return proxima ?? escenasConFecha[0] ?? null;
  }, [escenas]);

  return (
    <Container className="contenedor-links">
    <Card className="card-links">
      <Card.Body>
        <Card.Title className="card-links-title">Guión <img src={icono} alt="" style={{ width: 50, height: 50, marginRight: 8 }} /></Card.Title>
        
        <Button className="btn-descargar" onClick={() => window.open(guionUrl)}>
            
            Descargar
        </Button>
      </Card.Body>
    </Card>

     <Card className="card-links">
      <Card.Body>
        <Card.Title className="card-links-title">Cronograma <img src={iconocrono} alt="" style={{ width: 50, height: 50, marginRight: 8 }} /></Card.Title>
        
          <Button className="btn-descargar" onClick={() => window.open(cronogramaUrl)}>
            
            Descargar
        </Button>
      </Card.Body>
    </Card>

    <Card className="card-links">
      <Card.Body>
        <Card.Title className="card-links-title">Próxima fecha de rodaje <i className="bx bxs-camera-movie icon-filmadora" aria-hidden="true" /></Card.Title>

        {proximaFilmacion ? (
          <div className="proxima-filmacion">
            <p className="proxima-filmacion__linea">{formatFecha(proximaFilmacion.fecha)}</p>
            <p className="proxima-filmacion__linea">{proximaFilmacion.escena.title}</p>
          </div>
        ) : (
          <p className="proxima-filmacion__linea">No hay escenas pendientes con fecha cargada.</p>
        )}
      </Card.Body>
    </Card>
    </Container>
  );
}

export default LinkUtiles;
