import { toJpeg } from 'html-to-image';
import clipboardCopy from 'clipboard-copy';
import boton from '../imagenes/copiarpegar.jpg'

function CopiarFrase(props) {

    const manejarCopiar = async () => {
        const generadorNode = props.generadorRef.current;
        generadorNode.style.backgroundColor = 'white';
            try {
            const imageBlob = await toJpeg(generadorNode);
            generadorNode.style.backgroundColor = 'transparent';

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
    style={{ height: '25px', width: "auto", cursor: 'pointer', padding: '2px'}} 
    onClick={manejarCopiar}
  />
  
};

export default CopiarFrase;