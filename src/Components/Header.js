import '../style-sheets/Header.css'
import logo_encabezado from '../imagenes/logo_encabezado.png'

function Header() {
    const phrases = [
          "Bitácora de la desventura declarativa",
          "Museo del silogisticidio",
        ];
      
return (
    <header>
        <h1>El Terraplanista</h1>
        <h2> <p>{phrases[Math.floor(Math.random() * phrases.length)]}</p> </h2>
    </header>
    )
}

export default Header;

