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
        <h6>Presenta</h6>
        <h1>Triste para siempre</h1>
        <h4>Diario de Rodaje</h4>
        
      </section>
  )
}
