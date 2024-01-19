import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './Components/Header';
import MainContainer from './Components/MainContainer';
import Footer from './Components/Footer';
import Side from './Components/Side';
import axios from 'axios';
import welcomephrase from './imagenes/welcomephrase.png';

function App() {
  const spaceId = process.env.REACT_APP_SPACE_ID;
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const entryId = process.env.REACT_APP_ENTRY_ID;
  const [general_list, setGeneral_list] = useState([]);
  const [normalVersion, setNormalVersion] = useState(true);
  const [isWaiting, setIsWaiting] = useState(true);
  const [segundos, setSegundos] = useState(9);
  const [phraseHeader, setPhraseHeader] = useState(Math.floor(Math.random() * 3))

  const enter = () => {
    setIsWaiting(false);
  };

  const intervaloRef = useRef(null);

  useEffect(() => {
    intervaloRef.current = setInterval(() => {
      setSegundos((prevSegundos) => prevSegundos - 1);
    }, 1000);

    return () => {
      clearInterval(intervaloRef.current);
    };
  }, []);

  useEffect(() => {
    if (segundos === 0) {
      clearInterval(intervaloRef.current);
      enter();
    }
  }, [segundos]);

  useEffect(() => {
    axios
      .get(`https://cdn.contentful.com/spaces/${spaceId}/entries/${entryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setGeneral_list(response.data.fields.TerraplanistaPhrases.phrases);
      })
      .catch((error) => {
        console.error('Error al obtener el contenido:', error);
      });
  }, []);

  function getArrays(array) {
    const shuffledArray = [...array];
    const hall_of_fame = array.filter((obj) => obj.points > 0);

    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    for (let i = hall_of_fame.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [hall_of_fame[i], hall_of_fame[randomIndex]] = [
        hall_of_fame[randomIndex],
        hall_of_fame[i],
      ];
    }
    
    return [shuffledArray, hall_of_fame];
  }

  const [list_to_show, hallOfFameArray] = getArrays(general_list);

  let listCategories = new Set();
  list_to_show.forEach((obj) => {
    const hashtags = obj.hashtags;
    hashtags.forEach((hashtag) => {
      listCategories.add(hashtag);
    });
  });

  let sortedList = Array.from(listCategories).sort();


  return (
    <>
      <Header phraseHeader={phraseHeader}/>
      <div className='fullbody'>
        <Side
          hallOfFameArray={hallOfFameArray}
          normalVersion={normalVersion}
          setNormalVersion={setNormalVersion}
        />
        {isWaiting ? (
          <div id='welcome' onClick={() => enter()}>
            <h1>¡Bienvenido!</h1>
            <h2>Reflexión del mes</h2>
            <img src={welcomephrase} alt='welcome_phrase' />
            <div id='enter'>Entrar ({segundos}) </div>
          </div>
        ) : (
          <MainContainer
            list_to_show={list_to_show}
            normalVersion={normalVersion}
            setNormalVersion={setNormalVersion}
            listCategories={sortedList }
          />
        )}
      </div>
      <Footer phraseHeader={phraseHeader}/>
    </>
  );
}

export default App;
