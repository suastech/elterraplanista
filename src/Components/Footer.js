import React from 'react';
import '../style-sheets/Footer.css'

const Footer = () => {

  const phrases = [
    "Si lo pude decir debe ser cierto",
    "¿De lo que no se puede hablar? Ni que fuérmaos mudos",
    "Si me callo van a creer que no sé"
  ];

  return (
    <footer>
      <p><i>"De lo que no se puede hablar es mejor guardar silencio"</i><br/>Wittgenstein</p>
      <p><i>"{phrases[Math.floor(Math.random() * phrases.length)]}"</i><br/>El Terraplanista</p>
    </footer>
  );
};

export default Footer;
