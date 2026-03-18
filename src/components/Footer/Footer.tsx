import styles from "./Footer.module.css"
import logo from "../../assets/1. LOGOS/fueguitoBLANCO-04.png"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>

                <div className={styles.logoArea}>
                    <img src={logo} alt="Fueguito" className={styles.logo} />
                </div>

                <nav className={styles.links}>
                    <a
                        href="https://www.instagram.com/fueguito.cine/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkItem}
                    >
                        <i className="bx bxl-instagram" />
                        <span>Instagram</span>
                    </a>

                    <a
                        href="mailto:fueguitocine@gmail.com"
                        className={styles.linkItem}
                    >
                        <i className="bx bx-envelope" />
                        <span>Email</span>
                    </a>

                    <a
                        href="https://wa.me/5491136186277?text=Hola%20Fueguito%2C%20quiero%20hacer%20una%20consulta."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkItem}
                    >
                        <i className="bx bxl-whatsapp" />
                        <span>Contáctanos</span>
                    </a>
                </nav>

            </div>

            <p className={styles.copy}>&copy; 2026 &mdash; Todos los derechos reservados</p>
        </footer>
    )
}