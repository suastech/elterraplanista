import React, { useState, useEffect } from 'react';
import './App.css';
import logo_welcome from './imagenes/logo_encabezado.png'
import Header from './Components/Header';
import MainContainer from './Components/MainContainer';
import Footer from './Components/Footer';
import Side from './Components/Side';
import all_phrases from './all_phrases.json'
//import axios from 'axios';

function App() {
  /*const spaceId = process.env.REACT_APP_SPACE_ID;
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const entryId = process.env.REACT_APP_ENTRY_ID;*/
  const [general_list, setGeneral_list] = useState(all_phrases.phrases);
  const [isWelcome, setIsWelcome] = useState(true);
  const [isData, setIsData] = useState(true)
  const [phraseHeader] = useState(Math.floor(Math.random() * 3));
  const [hallOfFame, setHallOfFame] = useState(false)
  const welcomePhrases= [
    ['Demasiada coincidencia que maten a alguien y al día siguiente esté muerto.','Nicolás Maduro'],
    ['Esto no es porque sí. Esto no es como el agua que cae del cielo sin que se sepa exactamente por qué.','Mariano Rajoy'],
    ]

  const [numeroRandom] = useState(Math.floor(Math.random() * welcomePhrases.length))


  /* useEffect(() => {
    axios
      .get(`https://cdn.contentful.com/spaces/${spaceId}/entries/${entryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setGeneral_list(response.data.fields.TerraplanistaPhrases.phrases);
        setIsData(true);
      })
      .catch((error) => {
        console.error('Error al obtener el contenido:', error);
      });
  }, [accessToken, entryId,spaceId]);*/


 /* useEffect(() => {
    const countdownElement = document.querySelector('.number')? document.querySelector('.number'): {textContent: 1};
    let count = 4;
    function updateCountdown() {
    countdownElement.textContent = `(${count})`;
    count--;
    if (count < 0) {
      clearInterval(interval);
      setIsWelcome(false)
    }
    }
    const interval = setInterval(updateCountdown, 1000); 
  }, []);*/

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
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
  {isWelcome ?
   <div id='welcome' onClick={() =>setIsWelcome(false)}>
      <div id='message'> 
        <h1>El Terraplanista</h1>
        <h2>Museo de la desinhibición declarativa</h2>
        <img src={logo_welcome} id='logowelcome' alt='welcomelogo'/>
        <h3><i>{welcomePhrases[numeroRandom][0]}</i></h3>
        <h4>{welcomePhrases[numeroRandom][1]}</h4>
        <div id='enter'>¡Bienvenid@!{/*&nbsp;<span className="number">(5)</span>*/}</div>
      </div>
   </div>
   :null
  }

  <Header phraseHeader={phraseHeader}/>
  {isData?
  <div className='fullbody'>
    <Side hallOfFameArray={hallOfFameArray} hallOfFame={hallOfFame} setHallOfFame={setHallOfFame}/>
    <MainContainer list_to_show={list_to_show} listCategories={sortedList} hallOfFame={hallOfFame}/>
  </div>
  : null}
  <Footer phraseHeader={phraseHeader} />
</>
);
}

export default App;
