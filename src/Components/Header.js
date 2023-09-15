import '../style-sheets/Header.css'
import logo_encabezado from '../imagenes/logo_encabezado.png'

function Header() {
    const phrases = [
          "Bitácora de la desventura declarativa",
          "El Waterloo de las oportunidades para guardar silencio",
          "El Atila a cuyo paso no vulve a crecer el sentido de la proporción",
          "Museo del silogisticidio",
        ];
      
return (
    <div className="main">
        <div className="left">
            <img src={logo_encabezado} alt="Logotipo" />
        </div>
        <div className="title">
            El Terraplanista
        </div>
        <div className="right">
          <p>{phrases[Math.floor(Math.random() * phrases.length)]}</p>
        </div>
    </div>
    )
}

export default Header;

