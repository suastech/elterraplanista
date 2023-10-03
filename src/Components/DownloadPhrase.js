import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import boton from '../imagenes/descargar.jpg'
import React from 'react';

function DownloadPhrase(props) {

    const manejarDescargar = async () => {
        const generatorNode = props.generatorRef.current;
            try {
            const imageBlob = await toJpeg(generatorNode); 
            saveAs(imageBlob, 'frase_inmortal.jpg');
        } catch (error) {
            console.error('Error al generar o descargar la imagen:', error);
        }
    }
    return <img
    src={boton}
    alt="Icono Copiar"
    onClick={manejarDescargar}
  />
};

export default DownloadPhrase;