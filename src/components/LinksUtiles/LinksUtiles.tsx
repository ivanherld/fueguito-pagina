import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import icono from '../../assets/3. ÍCONOS/GUIÓN.jpg';

function LinkUtiles() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Guión</Card.Title>
        <Button variant="primary">
            <img src={icono} alt="" style={{ width: 18, height: 18, marginRight: 8 }} />
            Descargar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LinkUtiles;
