import './Portada.css'
import logoPortada from '../../assets/1. LOGOS/LOGOfueguito_.png'

export default function Portada() {
  return (
    <section className="portada">
         <img
        src={logoPortada}
        alt="Portada"
        className="imagen-portada"
      />
        <h1>Triste para siempre</h1>
        <p>Diario de Rodaje</p>
        
      </section>
  )
}
