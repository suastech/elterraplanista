import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import boton from '../imagenes/descargar.png'


function DownloadPhrase(props) {

    const manejarDescargar = async () => {
        const generadorNode = props.generadorRef.current;
        generadorNode.style.backgroundColor = 'white';
            try {
            const imageBlob = await toJpeg(generadorNode);
            generadorNode.style.backgroundColor = 'transparent';
            saveAs(imageBlob, 'frase_inmortal.jpg');
        } catch (error) {
            console.error('Error al generar o descargar la imagen:', error);
        }
    }
    return <img
    src={boton}
    alt="Icono Copiar"
    style={{ height: '25px', width: "auto", cursor: 'pointer', padding: '2px'}}
    onClick={manejarDescargar}
  />
};

export default DownloadPhrase;