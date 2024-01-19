import React from 'react';
import '../style-sheets/Footer.css'

const Footer = ({phraseHeader}) => {

  const phrases = [
    "Si lo pude decir debe ser cierto",
    "Si me callo van a creer que no sé",
    "Si lo pude decir debe ser cierto"
  ];

  return (
    <footer>
      <p><i>"De lo que no se puede hablar es mejor guardar silencio"</i><br/>Wittgenstein</p>
      <p><i>"{phrases[phraseHeader]}"</i><br/>El Terraplanista</p>
    </footer>
  );
};

export default Footer;
