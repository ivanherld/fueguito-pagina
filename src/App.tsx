
import './App.css'
import Grid_Escenas from './components/Grid/Grid_Escenas';
import Portada from './components/Portada/Portada'
import Progress_Bar from './components/Progress_Bar/Progress_Bar';
import Frase_welcome from './components/Frase_welcome/Frase_welcome';
import LinkUtiles from './components/LinksUtiles/LinksUtiles';
import Carrusel from './components/Carrusel/Carrusel';
import { useEffect, useMemo, useState } from 'react';
import { obtenerEscenas, type Escena } from './utilities/escenasService';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';


function App() {
  const [escenas, setEscenas] = useState<Escena[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarEscenas() {
      setCargando(true);
      setError(null);

      try {
        const data = await obtenerEscenas();
        setEscenas(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('No pudimos cargar las escenas desde Supabase.');
        }
      } finally {
        setCargando(false);
      }
    }

    void cargarEscenas();
  }, []);

  const escenasFilmadas = useMemo(
    () => escenas.filter((escena) => escena.filmado),
    [escenas],
  );

  return (
    <>

      <NavBar />
      <section id="inicio">
        <Portada />
      </section>
      <Frase_welcome />
      <Progress_Bar scenesDone={escenasFilmadas.length} totalScenes={escenas.length || 102} />
      
      <LinkUtiles escenas={escenas} />
      
      <section id="escenas">
        {cargando && <p>Cargando escenas...</p>}
        {error && <p>{error}</p>}
        {!cargando && !error && escenas.length === 0 && (
          <p>No hay escenas para mostrar. Revisa la tabla, el nombre y las politicas RLS en Supabase.</p>
        )}
        {!cargando && !error && <Grid_Escenas videos={escenas} />}
      </section>

      <section id="contacto">
        <Carrusel />
      </section>
      <Footer />
    </>
  )
}

export default App
