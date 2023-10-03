import { toJpeg } from 'html-to-image';
import clipboardCopy from 'clipboard-copy';
import boton from '../imagenes/copiarpegar.jpg'

function CopiarFrase(props) {

    const manejarCopiar = async () => {
        const generatorNode = props.generatorRef.current;
            try {
            const imageBlob = await toJpeg(generatorNode);
            const blobUrl = URL.createObjectURL(imageBlob);
            clipboardCopy(blobUrl);
            URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error('Error al copiar la imagen al portapapeles:', error);
    }
  };
    return <img
    src={boton}
    alt="Copiar"
    onClick={manejarCopiar}
  />
  
};

export default CopiarFrase;