import './App.css';
import Header from './Components/Header';
import MainContainer from './Components/MainContainer';
import Footer from './Components/Footer';
import Side from './Components/Side';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const spaceId = '42sdehjd5fc9';
  const accessToken = '_Tk112hm2bH7MYCQ1C6HYO_MSoIFgsxzgrJQ6hdpBgc';
  const entryId = '5LmU4p1lsG0gQz7T4tevLo';
  const [general_list, setGeneral_list] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [normalVersion, setNormalVersion] = useState(true);


  useEffect(() => {
    axios.get(`https://cdn.contentful.com/spaces/${spaceId}/entries/${entryId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      })
      .then(response => {
        setGeneral_list(response.data.fields.TerraplanistaPhrases.phrases);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el contenido:', error);
      });
    }, []);

  function getArrays(array) {
  const shuffledArray = [...array];
  const hall_of_fame = array.filter(obj => obj.points > 0);

  
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
      }
      for (let i = hall_of_fame.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [hall_of_fame[i], hall_of_fame[randomIndex]] = [hall_of_fame[randomIndex], hall_of_fame[i]];
      }

      return [shuffledArray, hall_of_fame]; 
    }

    const [list_to_show, hallOfFameArray] = getArrays(general_list)

    return (
      <>
        <Header/>
        {isLoading?
        <div className='waiting'> 
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        </div>
        :
        <div className='fullbody'>
          <Side hallOfFameArray={hallOfFameArray} normalVersion={normalVersion} setNormalVersion={setNormalVersion}/>
          <MainContainer list_to_show={list_to_show} normalVersion={normalVersion} setNormalVersion={setNormalVersion}/>   
        </div>
        }
        <Footer/>
      </>
    )
};

export default App;