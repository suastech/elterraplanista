import { toJpeg } from 'html-to-image';
import boton from '../imagenes/logoTwitter.webp'


function ShareOnTwitter(props) {
    const manejarTwitter = async () => {
      try {
        const generatorNode = props.generatorRef.current;
        const imageBlob = await toJpeg(generatorNode);
        const imageFile = new File([imageBlob], 'Frase_Inmortal_Terraplanista.jpg');
        const imageUrl = URL.createObjectURL(imageFile);
        const tweetUrl = `https://twitter.com/intent/tweet?text=¡Para más frases inmortales, visite "El Terraplanista" o síganos en @TerraplanistaMX!&url=${encodeURIComponent(imageUrl)}`;
        window.open(tweetUrl, '_blank');
        URL.revokeObjectURL(imageUrl);
      } catch (error) {
        console.error('Error al compartir en ShareOnTwitter:', error);
      }
    };
    return <img
    src={boton}
    alt="Icono Copiar"
    onClick={manejarTwitter}
  />
}

export default ShareOnTwitter;