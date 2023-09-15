import "../style-sheets/PhraseGenerator.css";
import ImageFrame from "../imagenes/marco_frase.png";
import left_arrow from "../imagenes/flecha_izquierda2.png"
import right_arrow from "../imagenes/flecha_derecha2.png"
import { useState, useRef, useEffect } from "react";
import ShareOnTwitter from "./ShareOnTwitter";
import DownloadPhrase from "./DownloadPhrase";
import CopyPhrase from "./CopyPhrase";

function PhraseGenerator({ list_to_show, currentIndex, setCurrentIndex })  {

  const generatorRef = useRef(null);
  const [smallVersion, setSmallVersion] = useState(false)
  const rootFont = !smallVersion? 24:20;

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
  const showNewItem = (num) => {
    setCurrentIndex(
        (prevIndex) =>
        (prevIndex + num + list_to_show.length) % list_to_show.length
    );
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showNewItem, handleKeyPress]); 

  //Select the phrase to show:
  let currentItem = list_to_show[currentIndex];
  let word_length = currentItem.text.length + currentItem.author.length + currentItem.info_author.length + currentItem.comment.length;

  return (
    <div>
      <div className="main-container">
        <button className="arrow" onClick={() => showNewItem(-1)}>
          <img src={left_arrow} alt="left arrow" />
        </button>
        <div
          className="image-container"
          ref={generatorRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            width: smallVersion ? '500px' : '600px',
            height: smallVersion ? '290px' : '350px',
          }}
        >
          <img src={ImageFrame} alt="frame" />
          <div className="text-frame">
            <div
              className="phrase"
              style={{
                fontSize:
                  word_length < 250
                    ? `${rootFont}px`
                    : word_length < 350
                    ? `${rootFont-2}px`
                    : word_length < 450
                    ? `${rootFont-4}px`
                    : word_length < 550
                    ? `${rootFont-6}px`
                    : word_length < 650
                    ? `${rootFont-8}px`
                    : word_length < 750
                    ? `${rootFont-10}px`
                    : word_length < 850
                    ? `${rootFont-11}px`
                    : `${rootFont-12}px`,
              }}
            >
              <p className="text">{currentItem.text}</p>
              <p className="author">
                {currentItem.author}
                {currentItem.info_author}{" "}
              </p>
              <p className="comment">{currentItem.comment}</p>
            </div>
          </div>
        </div>
        <button className="arrow" onClick={() => showNewItem(1)}>
          <img src={right_arrow} alt="right arrow" />
        </button>
      </div>
      <div className="bottom">
        <DownloadPhrase generatorRef={generatorRef} />
        <CopyPhrase generatorRef={generatorRef} />
        <ShareOnTwitter generatorRef={generatorRef} />
      </div>
    </div>
  );
}

export default PhraseGenerator;