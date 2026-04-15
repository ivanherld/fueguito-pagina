import './Frase_welcome.css';
import imagenFueguito from '../../assets/1. LOGOS/estampa_fueguito_Mesa de trabajo 1.png'

export default function Frase_welcome() {
  return (
    <section className="frase-welcome">
      <div className="frase-welcome-text">
        <p>Hola pequeño o pequeña persona navegadora del internet, we are making our first feature film, 
            please come in and chusmeá nuestro avance. Nos gusta compartir el proceso, podés descargar el
             cronograma completo de la peli e incluso ver escena a escena nuestros apuntes y parte del material
              filmado. Te deseamos un cordial welcome.</p>
      </div>
      <div>
        <img className="frase-welcome-image" src={imagenFueguito} alt="Fueguito" />
      </div>
    </section>
  )
}
