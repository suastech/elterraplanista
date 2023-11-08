import boton from '../imagenes/copiarpegar.jpg';
import React from 'react';
import html2canvas from 'html2canvas';

const FacebookShare = ({ generatorRef }) => {
  const handleFacebook = () => {
    // Captura el contenido del ref en una imagen
    html2canvas(generatorRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      // Crea un elemento de anclaje para compartir en Facebook
      const shareLink = document.createElement('a');
      shareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgData)}`;
      shareLink.target = '_blank';
      shareLink.click();
    });
  };

  return (
    <img src={boton} alt="Copiar" onClick={handleFacebook} />
  );
};

export default FacebookShare;
