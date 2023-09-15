import "../style-sheets/MainContainer.css";
import PhraseGenerator from "./PhraseGenerator";
import { useState } from "react";
import { general_list } from "../general_list";
import imagen_lupa  from '../imagenes/lupa.png'
import wordFinder from "./wordFinder";

function MainContainer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClassicsOn, setIsClassicsOn] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [search, setSearch] = useState("")
    const [order, setOrder] = useState("seeAll");

    const handleOrder  = (event) => {
        const newOrder = event.target.value;
        setCurrentIndex(0);
        setOrder(newOrder);
    };

    const handleIsClassicsOn = () => {
        setCurrentIndex(0);
        setSearch('');
        document.getElementById('searchField').value = "";
        setIsClassicsOn(( pre => !pre));
    }

    const handleSearch = (event) => {   
        if (event.key === 'Enter') {
          const wordToFind = event.target.value.trim();
          if (wordToFind !== '') {
            setCurrentIndex(0);
            setSearch(wordToFind);
            setIsSearchActive(true);
          }
      };
    };

  const handleSearchClick = () => { 
    const inputElement = document.getElementById('searchField')
    const wordToFind = inputElement.value.trim();
    if (wordToFind !== '') {
      setCurrentIndex(0);
      setSearch(document.getElementById('searchField').value);
      setIsSearchActive(true);
    }
  }
  
  const handleBackToNormal = () => {
    setCurrentIndex(0);
    setIsSearchActive(false);
    setSearch("")
  }

function arrayFactory(general_list) {
  function orderByDate(array) { return array.sort((a, b) => b.date - a.date) }
  function shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
      }
      return shuffledArray;
    }

  if (search !== "") {
    let array = wordFinder(general_list, search);
      if (array.length > 0) { return array}
      else { 
      alert("Ningún elemento encontrado") 
      setSearch("");
      setIsSearchActive(false);
      document.getElementById('searchField').value = ""
      return general_list};
    };
    if (isClassicsOn === true) { return [...general_list].sort((a, b) => b.points - a.points).slice(0, 2)} ;
    if (order === "seeAll") { return shuffleArray(general_list) }
    if (order === "seeRecent") {return orderByDate(general_list)}
}


return (
    <div className="container">
      <div className="upperMenu">    
        <div>
            <select
                value={order} onChange={handleOrder}
                style={(isClassicsOn || isSearchActive) ? { opacity: 0.5, pointerEvents: 'none' } : {} }
            >
            <option value="seeAll">Ver todos</option>
            <option value="seeRecent">Más recientes</option>
            </select>
        </div>
        <div  style={isClassicsOn? { opacity: 0.5, pointerEvents: 'none' } : {} }>
            {!isSearchActive ? 
                ( <>
                <img id="lupa" src={imagen_lupa} alt="Lupa" onClick={handleSearchClick}/> 
                <input  type="text"
                        id="searchField"
                        placeholder="Busca un nombre o término"
                        onKeyDown= {handleSearch} />
                </> )
                :
                (<button onClick={handleBackToNormal}> Volver</button> )
            }
        </div> 
        <div>
            <button value={isClassicsOn}
                onClick={handleIsClassicsOn}
                style={ isSearchActive ? { opacity: 0.5, pointerEvents: 'none' } : {} } >
            { isClassicsOn? "Ver todos" : "Salón de la fama"}
            </button>
        </div>
      </div>

      <div className="phraseContainer">
        <PhraseGenerator
          list_to_show={arrayFactory(general_list)}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}

export default MainContainer;