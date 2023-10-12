import "../style-sheets/PhraseGenerator.css";
import left_arrow from "../imagenes/leftarrow.png"
import right_arrow from "../imagenes/rightarrow.png"
import { useState, useRef, useEffect } from "react";
import ShareOnTwitter from "./ShareOnTwitter";
import DownloadPhrase from "./DownloadPhrase";
import CopyPhrase from "./CopyPhrase";
import share from "../imagenes/sharew.png";
import frame from "../imagenes/frame2.png";

function PhraseGenerator({ selectedArray, currentIndex, setCurrentIndex })  {
  const generatorRef = useRef(null);
  const [smallVersion, setSmallVersion] = useState(false);
  const rootFont = !smallVersion? 26:18;
  const [isLoading, setIsLoading] = useState(false);
  const [isShareOn, setIsShareOn] = useState(false);
  
  const handleResize = () => {
    if (window.innerWidth < 750) {
      setSmallVersion(true);
    } else {
      setSmallVersion(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
    window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Logic to switch the phrase with the arrows and touch screen:
  const showNewItem = async (num) => {
    setIsLoading(true);
  
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + num + selectedArray.length) % selectedArray.length
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
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


  //Select the phrase to show:
  let currentItem = selectedArray[currentIndex];
  let word_length = currentItem.text.length + currentItem.author.length + currentItem.info_author.length + currentItem.comment.length;

  return (
    <div>
      <div className="main-container">
        <button className="arrow" onClick={() => showNewItem(-1)}>
          <img src={left_arrow} alt="left arrow" />
        </button>
       
        <div className="whole-phrase" ref={generatorRef}>
         <img src={frame} alt="frame" ref={generatorRef} 
            style={{
              width: smallVersion ? '500px' : '700px',
              height: smallVersion ? '290px' : '400px',
            }}/>

          <div
            className="phrase-frame"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            
          >
          {isLoading ? (
                <div className="circle"></div>
            ) :
            (
              <>
                  <div className="phrase"
                    style={{
                      fontSize:
                          word_length < 200
                          ? `${rootFont}px`
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
                    }} >
                    <p className="text">{currentItem.text}</p>
                    <p className="author">
                      {currentItem.author}{currentItem.info_author}
                    </p>
                    <p className="comment">{currentItem.comment}</p>
                  </div>
              </>
            )}
          </div>
        </div>

        <button className="arrow" onClick={() => showNewItem(1)}>
          <img src={right_arrow} alt="right arrow" />
        </button>
      </div>

      <div className="bottom">
        <div  className={isShareOn? "shareButtonsA":"shareButtons"}
              onMouseEnter={handleShare}
              onMouseLeave={handleShare}>
              
              <img id='sharebutton' src={share} alt='share'
              style={isShareOn? { boxShadow: '0 0 3px 3px rgb(32, 195, 249)'}: {} } />
              {isShareOn?
              (<>
              <DownloadPhrase generatorRef={generatorRef}/>
              <CopyPhrase generatorRef={generatorRef} />
              <ShareOnTwitter generatorRef={generatorRef} />
              </>)
              :
              null
              }
        </div>
          <>Mostrando: {currentIndex+1} de {selectedArray.length} </>
        </div>

    </div>
  );
}

export default PhraseGenerator;