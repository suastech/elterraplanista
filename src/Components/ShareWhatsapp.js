import boton from '../imagenes/whatsapp5.png';

function ShareWhatsapp({ currentItem }) {
 
  const handleWhatsapp = async () => {
    const { text, author, info_author, comment } = currentItem;

    const message = `"${text}"\n${author}${info_author}\n
      [${comment}]\n
      Para más frases inmortales visite "El Terraplanista" o síganos en @TerraplanistaMX
      `
    try {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
      window.open(whatsappUrl, '_blank');
   } catch (error) {
      console.error('Error al compartir en WhatsApp:', error);
    }
  };
  return (
    <img src={boton} alt="Copiar" onClick={handleWhatsapp}/>
  );
}

export default ShareWhatsapp;
