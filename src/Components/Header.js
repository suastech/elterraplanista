import '../style-sheets/Header.css'

function Header ({phraseHeader}) {
 
    const phrases = [
          "Bitácora de la desventura declarativa",
          "Museo del silogisticidio",
          "La voz de los excedidos de voz"
        ];
     
return (
    <header>
        <h1>El Terraplanista</h1>
        <h2> <p>{phrases[phraseHeader]}</p> </h2>

    </header>
    )
}

export default Header;

