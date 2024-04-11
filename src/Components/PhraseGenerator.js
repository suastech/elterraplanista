import "../style-sheets/PhraseGenerator.css";
import left_arrow from "../imagenes/leftarrow.png"
import right_arrow from "../imagenes/rightarrow.png"
import { useState, useRef, useEffect } from "react";
import ShareOnTwitter from "./ShareOnTwitter";
import DownloadPhrase from "./DownloadPhrase";
import CopyPhrase from "./CopyPhrase";
import share from "../imagenes/sharew.png";
import mini from "../imagenes/logo_recortado.png";
import ShareWhatsapp from "./ShareWhatsapp";
//import { toPng } from 'html-to-image'; //para activar imprimir todas
//import { saveAs } from 'file-saver';

function PhraseGenerator({ selectedArray, currentIndex, setCurrentIndex, hallOfFame})  {
  const generatorRef = useRef(null);
  const rootFont = 28;
  const [isLoading, setIsLoading] = useState(false);
  const [isShareOn, setIsShareOn] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  let currentItem = selectedArray[currentIndex];
  let word_length = currentItem.text.length + currentItem.author.length + currentItem.info_author.length + currentItem.comment.length;
  
  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };
  const handleTouchMove = (event) => {
    if (touchStartX !== null) {
      const touchEndX = event.touches[0].clientX;
      const touchDifference = touchStartX - touchEndX;
      if (touchDifference > 10) {
        showNewItem(1);
      } else if (touchDifference < -10) {
        showNewItem(-1);
      }
      setTouchStartX(null);
    }
  };

  /* 
  //Imprimir todas
  async function printAll(){
    for (let element of selectedArray) {
    const generatorNode = generatorRef.current;
    try {
        const imageBlob = await toPng(generatorNode); 
        saveAs(imageBlob, 'frase_inmortal.png');
    } catch (error) {
        console.error('Error al generar o descargar la imagen:', error);
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1 + selectedArray.length) % selectedArray.length);
    await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }*/

  const showNewItem = async (num) => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + num + selectedArray.length) % selectedArray.length);
    //await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
    //const phraseFrame = document.querySelector('.phrase-frame');
    //phraseFrame.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleKeyPress = (event) => {
    if (!hallOfFame) {
      if (event.key === 'ArrowLeft' ) { showNewItem(-1)}
      if (event.key === 'ArrowRight') { showNewItem(+1)}
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },); 


return (
    <div className="phraseAndBottom">
      <div className="main-container">

        <button className="arrow" onClick={() => showNewItem(-1)}>
          <img src={left_arrow} alt="left arrow" />
        </button>
         
         <div className="phrase-frame"
            ref={generatorRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}            
         >
          {isLoading ? (
              <div className="circle"></div>
            )
            :
            (
            <>
                <div className="phrase" style={{ fontSize: word_length < 150 ? `${rootFont + 5}px` : word_length < 200 ? `${rootFont}px` : word_length < 250 ? `${rootFont - 1}px` : word_length < 350 ? `${rootFont - 2}px` : word_length < 450 ? `${rootFont - 4}px` : word_length < 550 ? `${rootFont - 6}px` : word_length < 650 ? `${rootFont - 8}px` : `${rootFont - 9}px` }}>
                <p className="text">{currentItem.text}</p>
                <p className="author">{currentItem.author}{currentItem.info_author}</p>
                <p className="comment"><img src={mini} alt='mini' style={{width:'30px', transform:'scaleX(-1)',rotate:'-10deg'}}/> {currentItem.comment}</p>
              </div>
            </>
            )}
          </div>

        <button className="arrow" onClick={() => showNewItem(1)}>
          <img src={right_arrow} alt="right arrow" />
        </button>

      </div>

      <div className="bottom">
        <div  className={isShareOn? "shareButtonsA":"shareButtons"}
              onMouseEnter={   () => {setIsShareOn(true)}}
              onMouseLeave={   () => {setIsShareOn(false)}}>
              
              <img id='sharebutton' src={share} alt='share'
              style={isShareOn? { boxShadow: '0 0 3px 3px rgb(32, 195, 249)'}: {} } />
              {isShareOn?
              (<>
              <DownloadPhrase generatorRef={generatorRef}/>
              <CopyPhrase currentItem={currentItem} />
              <ShareOnTwitter generatorRef={generatorRef} />
              <ShareWhatsapp currentItem={currentItem}/>
              </>)
              :
              null
              }
        </div>
          <>Mostrando: {currentIndex+1} de {selectedArray.length} </>
      </div>

    {/*<button onClick={()=> {printAll()}}>ALL</button>*/}

    </div>
  );
}

export default PhraseGenerator;