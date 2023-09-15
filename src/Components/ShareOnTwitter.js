import { toJpeg } from 'html-to-image';
import boton from '../imagenes/logoTwitter.webp'


function ShareOnTwitter(props) {
    const manejarTwitter = async () => {
      try {
        const generadorNode = props.generadorRef.current;
        generadorNode.style.backgroundColor = 'white';

        const imageBlob = await toJpeg(generadorNode); // Obtén la imagen en formato Blob
        generadorNode.style.backgroundColor = 'transparent';

        const imageFile = new File([imageBlob], 'image.jpg'); // Crea un objeto de archivo
  
        // Crea una URL para la imagen
        const imageUrl = URL.createObjectURL(imageFile);
  
        // Crea la URL de compartir de ShareOnTwitter
        const tweetUrl = `https://twitter.com/intent/tweet?text=¡Mira esta imagen!&url=${encodeURIComponent(imageUrl)}`;
  
        // Abre una nueva ventana o pestaña para compartir en ShareOnTwitter
        window.open(tweetUrl, '_blank');
  
        // Limpiar la URL del Blob
        URL.revokeObjectURL(imageUrl);
      } catch (error) {
        console.error('Error al compartir en ShareOnTwitter:', error);
      }
    };
    return <img
    src={boton}
    alt="Icono Copiar"
    style={{ height: '25px', width: "auto", cursor: 'pointer', padding: '2px'}}
    onClick={manejarTwitter}
  />
}

export default ShareOnTwitter;