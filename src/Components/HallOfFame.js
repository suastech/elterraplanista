import '../style-sheets/HallOfFame.css'
import left_arrow from "../imagenes/leftarrow.png"
import right_arrow from "../imagenes/rightarrow.png"
import { useState, useRef, useEffect } from "react";
import ShareOnTwitter from "./ShareOnTwitter";
import DownloadPhrase from "./DownloadPhrase";
import CopyPhrase from "./CopyPhrase";
import share from "../imagenes/sharew.png";
import framehall from '../imagenes/framehall3.png'
import framehallvertical from '../imagenes/framehall3vertical.png'
import close from '../imagenes/closebutton2.png'
import ShareWhatsapp from './ShareWhatsapp';

function HallOfFame(props) {
    const {setHallOfFame, hallOfFameArray, normalVersion} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const generatorRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShareOn, setIsShareOn] = useState(false);
    const rootFont = normalVersion? 29:20;

    let currentItem = hallOfFameArray[currentIndex];
    let word_length = currentItem.text.length + currentItem.author.length + currentItem.info_author.length + currentItem.comment.length;

    const handleClose= () => {
      setHallOfFame(false)
    }

    // Logic to switch the phrase with the arrows and touch screen:
    const showNewItem = async (num) => {
      setIsLoading(true);
    
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + num + hallOfFameArray.length) % hallOfFameArray.length
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };
  
    const [touchStartX, setTouchStartX] = useState(null);
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

    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft' ) { showNewItem(-1)}
      if (event.key === 'ArrowRight') { showNewItem(+1)}
    };
  
    const handleShare= () => {
      setIsShareOn( (prev) => !prev)
    }
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [showNewItem, handleKeyPress]); 
  
    return (
      <div id='hall-container'>
        <img className='closeButton2' src={close} alt='close' onClick={handleClose}/>
        <div className="hall-phrase">
          <button className="arrow2" onClick={() => showNewItem(-1)}>
            <img src={left_arrow} alt="left arrow" />
          </button>

         <div className="frame-hall2" ref={generatorRef}>
         {normalVersion === null?
         <img src={framehallvertical} alt="frame" ref={generatorRef}/>
         :
         <img src={framehall} alt='framehall'/>
        }
          <div
              className="phrase-frame2"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
          >
              {isLoading ? (
                  <div className="loading2">
                    <div className="circle"></div>
                  </div>
                ) :
                (
                  <>
                      <div className="phrase2"
                       style={
                        normalVersion?
                        {
                        fontSize:
                          word_length < 150?
                          `${rootFont+5}px`
                          :
                          word_length < 200
                          ? `${rootFont+1}px`
                          : word_length < 250
                          ? `${rootFont -1}px`
                          : word_length < 350
                          ? `${rootFont - 2}px`
                          : word_length < 450
                          ? `${rootFont - 4}px`
                          : word_length < 550
                          ? `${rootFont - 6}px`
                          : word_length < 650
                          ? `${rootFont - 8}px`
                          : word_length < 750
                          ? `${rootFont - 10}px`
                          : word_length < 850
                          ? `${rootFont - 11}px`
                          : `${rootFont - 12}px`,
                        }
                        :
                        {
                        fontSize:
                          word_length < 150?
                          `${rootFont+4}px`
                          : word_length < 200
                          ? `${rootFont}px`
                          : word_length < 250
                          ? `${rootFont -1}px`
                          : word_length < 300
                          ? `${rootFont -2}px`
                          : word_length < 350
                          ? `${rootFont - 3}px`
                          : word_length < 400
                          ? `${rootFont - 3.5}px`
                          : word_length < 450
                          ? `${rootFont - 4.5}px`
                          : word_length < 500
                          ? `${rootFont - 5.5}px`
                          : word_length < 550
                          ? `${rootFont - 6.5}px`
                          : word_length < 650
                          ? `${rootFont - 7}px`
                          : word_length < 750
                          ? `${rootFont - 7.5}px`
                          : word_length < 800
                          ? `${rootFont - 8}px`
                          : word_length < 850
                          ? `${rootFont - 8.5}px`
                          : `${rootFont - 9}px`,
                        }
                    }>
                        <p className="text2">{currentItem.text}</p>
                        <p className="author2">
                          {currentItem.author} {currentItem.info_author}
                        </p>
                        <p className="comment2">{currentItem.comment}</p>
                      </div>
                  </>
                )}
          </div>
        </div>
  
          <button className="arrow2" onClick={() => showNewItem(1)}>
            <img src={right_arrow} alt="right arrow" />
          </button>
        </div>
  
        <div className="bottom2">
          <div  className={isShareOn? "shareButtonsA2":"shareButtons2"}
                onMouseEnter={handleShare}
                onMouseLeave={handleShare}>
                
                <img id='sharebutton2' src={share} alt='share'/>
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
            <>Mostrando: {currentIndex+1} de {hallOfFameArray.length} </>
          </div>
  
      </div>
    );
}

export default HallOfFame;