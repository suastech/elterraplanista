import boton from '../imagenes/copiarpegar.jpg';

const CopyPhrase = ({ currentItem }) => {
  const { text, author, info_author, comment } = currentItem;

  const handleCopy = () => {
    const message = `"${text}"\n${author}${info_author}\n[${comment}]\nPara más frases inmortales, visite "El Terraplanista" o síganos en @TerraplanistaMX`;

    // Copiar el mensaje al portapapeles
    navigator.clipboard.writeText(message)
      .then(() => {
        alert('Texto copiado al portapapeles');
      })
      .catch((error) => {
        console.error('Error al copiar el mensaje: ', error);
      });
  };
  return (
    <img src={boton} alt="Copiar" onClick={handleCopy} />
  );
};

export default CopyPhrase;