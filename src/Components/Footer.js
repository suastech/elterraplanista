import React from 'react';
import '../style-sheets/Footer.css'


const Footer = () => {

  const phrases = [
    "Si lo pude decir debe ser cierto",
    "óilooo"
  ];

  return (
    <footer>
      <p><i>"De lo que no se puede hablar es mejor guardar silencio"</i><br/>Wittgenstein</p>
      <p><i>"{phrases[Math.floor(Math.random() * phrases.length)]}"</i><br/>El Terraplanista</p>
    </footer>
  );
};

export default Footer;
