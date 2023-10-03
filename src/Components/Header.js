import '../style-sheets/Header.css'
import logo_encabezado from '../imagenes/logo_encabezado.png'

function Header() {
    const phrases = [
          "Bitácora de la desventura declarativa",
          "Museo del silogisticidio",
          "Eterno resplandor de la mente sin recato"
        ];
      
return (
    <header className="main">
        <img src={logo_encabezado} alt='logo'/> 
        <h1>El Terraplanista</h1>
        <h2> <p>{phrases[Math.floor(Math.random() * phrases.length)]}</p> </h2>
    </header>
    )
}

export default Header;

