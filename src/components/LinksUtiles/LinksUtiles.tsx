import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import icono from '../../assets/3. ÍCONOS/guionv2.png';
import iconocrono from '../../assets/3. ÍCONOS/calendario v2 .png';
import { Container } from 'react-bootstrap';
import './LinksUtiles.css';

function LinkUtiles() {
  return (
    <Container className="contenedor-links">
    <Card className="card-links">
      <Card.Body>
        <Card.Title className="card-links-title">Guión <img src={icono} alt="" style={{ width: 50, height: 50, marginRight: 8 }} /></Card.Title>
        
        <Button className="btn-descargar">
            
            Descargar
        </Button>
      </Card.Body>
    </Card>

     <Card className="card-links">
      <Card.Body>
        <Card.Title className="card-links-title">Cronograma <img src={iconocrono} alt="" style={{ width: 50, height: 50, marginRight: 8 }} /></Card.Title>
        
        <Button className="btn-descargar">
            
            Descargar
        </Button>
      </Card.Body>
    </Card>
    </Container>
  );
}

export default LinkUtiles;
