import { Navbar, Container, Nav, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../../assets/1. LOGOS/fueguitoROJO-03.png';

export default function NavBar() {
  const [showPopover, setShowPopover] = useState(false);
  const [copied, setCopied] = useState(false);
  const alias = 'fueguito.arg';

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText(alias);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const popover = (
    <Popover id="popover-financiar" show={showPopover}>
      <Popover.Body>
        Si queres ayudarnos a financiar la película, acá nuestro alias:{' '}
        <button
          type="button"
          onClick={handleCopyAlias}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            fontWeight: 700,
            textDecoration: 'underline',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {alias}
          <i className="bx bx-copy" aria-hidden="true" />
        </button>
        {copied && <span style={{ marginLeft: '8px', color: '#198754', fontWeight: 600 }}>Copiado</span>}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="md" sticky="top" className="py-2" style={{ backgroundColor: '#AFE0E7', zIndex: 1030 }}>
      <Container>
        <Navbar.Brand href="#inicio">
          <img src={logo} alt="Fueguito" style={{ height: '80px', width: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="fueguito-navbar" />
        <Navbar.Collapse id="fueguito-navbar">
          <Nav className="ms-auto gap-2">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#escenas">Escenas</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              onToggle={(show) => setShowPopover(show)}
            >
              <Button variant="success" size="sm">
                Financiar
              </Button>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
