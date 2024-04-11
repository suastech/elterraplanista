import "../style-sheets/MainContainer.css";
import PhraseGenerator from "./PhraseGenerator";
import { useState, useEffect } from "react";
import wordFinder from "./wordFinder";

function MainContainer( {list_to_show, listCategories, hallOfFame} ) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("seeAll");
  const [category, setCategory] = useState('all')
  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const [selectedArray, setSelectedArray] = useState(list_to_show);

  const handleOrder  = (event) => {
        const newOrder = event.target.value;
        setCurrentIndex(0);
        setOrder(newOrder);
    };

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
  
  const handleBackToNormal = () => {
    setCurrentIndex(0);
    setIsSearchActive(false);
    setSearch("")
  }

  const handleCategory = (event) => {
    const newCategory = event.target.value;
    newCategory !== "all" ? setIsCategoryOn(true) : setIsCategoryOn(false);
    document.getElementById('searchField').value = ""
    setCurrentIndex(0);
    setCategory(newCategory);
  }

//Building the list of phrases to show according to user selections: 

  //Functions to select phrases: 
  function arrayFactory(list_to_arrenge) { 
    if (category !== "all") {
      return list_to_arrenge.filter(obj => obj.hashtags.some(hashtag => hashtag === category) ) }
    if (search !== "") {
      let array = wordFinder(list_to_arrenge, search);
        if (array.length > 0) { return array}
        else { 
        alert("Ningún elemento encontrado") 
        setSearch("");
        setIsSearchActive(false);
        return list_to_arrenge};
      };
      if (order === "seeRecent") {
        list_to_arrenge.sort((a, b) => new Date(b.date) - new Date(a.date) )
        return list_to_arrenge.slice(0,20)      
      }
      if (order === "seeAll") {return  list_to_arrenge}
  }

  useEffect( () => {
    setSelectedArray(arrayFactory(list_to_show))
  }, [order, isSearchActive, isCategoryOn, category]
  );

 
return (
    <>
      <div className="upperMenu">

         <select
            className="select"
            value={category} onChange={handleCategory}
            style={isSearchActive ? { opacity: 0.5, pointerEvents: 'none' } : {} }
          >
            <option value="all">Todas las categorías</option>
            {[...listCategories].map(element => (
            <option key={element} value={element}>
              {element}
            </option>
              ))}
          </select>

          <select
                className="select"
                value={order} onChange={handleOrder}
                style={(isSearchActive || isCategoryOn) ?
                      { opacity: 0.5, pointerEvents: 'none' } : {} }
          >
            <option value="seeAll">Ver todos</option>
            <option value="seeRecent">Más recientes</option>
          </select>
       
          <div style={ isCategoryOn ? { opacity: 0.5, pointerEvents: 'none' } : {} }>
            {!isSearchActive ? 
                ( <>
                <input  type="text"
                        maxLength="30" 
                        id="searchField"
                        placeholder="Buscar..."
                        onKeyDown= {handleSearch} />
                </> )
                :
                (<button id="backButton" onClick={handleBackToNormal}> Volver</button> )
            }
         </div>
        
      </div>

      <>
        <PhraseGenerator
          selectedArray={selectedArray}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          hallOfFame={hallOfFame}
        />
      </>
    </>
  );
}

export default MainContainer;