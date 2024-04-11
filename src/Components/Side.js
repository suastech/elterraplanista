import { useState } from 'react';
import '../style-sheets/Side.css';
import HallOfFame from './HallOfFame';
import seeMore from '../imagenes/menu.png';
import seeLess from '../imagenes/seeless2.png';
import paypal from '../imagenes/paypal.png'
import close from '../imagenes/closebutton2.png'

const Side = (props) => {
    const {hallOfFame, setHallOfFame, hallOfFameArray} = props;
    const [sideActive,setSideActive]= useState(false)
    const [principles, setPrinciples] = useState(false)
    const [support, setSupport] = useState(false)
    const [credits, setCredits] = useState(false)

    const turnOff = () => {
        setTimeout(() => {
          setSideActive(false);
        }, 20); // Espera 10 milisegundos antes de ejecutar el código
      };
      
      function handleSupport() {
        setPrinciples(false);
        setCredits(false);
        setHallOfFame(false);
        setSupport(true)
      }

      function handlePrinciples () {
        setCredits(false);
        setHallOfFame(false);
        setSupport(false);
        setPrinciples(true);
      }

      function handleCredits() {
        setHallOfFame(false);
        setSupport(false);
        setPrinciples(false);
        setCredits(true);
      }
      
      function handleHallOfFame() {
        setSupport(false);
        setPrinciples(false);
        setCredits(false);
        setHallOfFame(true);
      }

      function toggleButton(setter) {
        setter(false)
      }

return (
    <>
    <div onClick={ ()=> { setSideActive(true)}} onMouseEnter={()=> { setSideActive(true)}} onMouseLeave={()=> { setSideActive(false)}} className={'sideMenu' + (sideActive? '-expanded': '')} >
        {!sideActive? 
         <img src={seeMore} alt="more" />
        :
        <>       
            <img id='closeMenu' src={close} alt='close' onClick={()=> {turnOff()}}/>

            <div className='item' onClick={handleHallOfFame}> 
                <p>Salón de la fama</p>
            </div>
            <div className='item' onClick={handleSupport}> 
                 <p>Contribuir</p>
            </div>
            <div className='item' onClick={handlePrinciples}> 
                <p>Principios</p>
            </div>
            <div className='item' onClick={handleCredits}> 
                 <p>Créditos</p>
            </div>
            
        

        </>        
        }
    </div>
    
    {hallOfFame? 
        <> 
            <HallOfFame hallOfFameArray={hallOfFameArray}
                        setHallOfFame={setHallOfFame}/>
        </>
    : null}

    {support? 
       (
       <div className='extra-background'>
       <div className='extra-containers'>
         <img className='closeButton' src={close} alt='close' onClick={()=> toggleButton(setSupport)}/>
            <p id="support-content">
                <i>¡Terraplanistas del mundo, mochaos!</i><br/><br/>Si te gusta el contenido de nuestro sitio, puedes contribuir a que siga funcionando con un donativo a través de PayPal.<br/>¡Gracias!
            </p>
            <div className='donateImages'>
            <a href="https://www.paypal.com/donate/?hosted_button_id=F39SHBQC8GX9S" rel='noreferrer' target="_blank">
            <img src={paypal} alt="paypal" className="paypal" /> </a> 
             {//<img src={buyme} alt='buyme' className='buyme'/>
             }
            </div>    
        </div>
        </div>
       )
    :
    null}

    {principles?
        (
        <div className='extra-background'>
        <div className='extra-containers'>
            <img className='closeButton' onClick={()=> toggleButton(setPrinciples)}
                src={close} alt='close'/>
                <ul className="principles-content">
                    <li>
                        Los aquí reunidos nos rebelamos contra la tiranía del silogismo y el opresivo yugo del razonamiento.
                    </li>
                    <li>
                        El rigor es el becerro de oro al que se postran quienes pierden el tiempo preguntándole a los hechos su opinión.
                    </li>
                    <li>
                        La metáfora espectacular, la comparación temeraria, son el relámpago que libera al pensamiento de la cárcel del sentido de la proporción.
                    </li>
                    <li>
                        Donde hay voluntad hay causalidad.
                    </li>
                    <li>
                        El <em>non sequitur</em> es la superstición que inventaron quienes no saben expresarse enérgicamente.
                    </li> 
                </ul> 
            <p> <i>El Terraplanista: <br/>La casa del voluntarismo argumentativo</i></p>
        </div>
        </div>
        )
        :
        null}

    {credits?
        (
        <div className='extra-background'>
        <div className='extra-containers'>
            <img className='closeButton' onClick={()=> toggleButton(setCredits)}
                src={close} alt='close'/>
            <p>Todas las declaraciones son mérito exclusivo de sus autores y presumiblemente fueron emitidas sin que mediara coacción alguna.</p>
            <p>Respetamos las faltas ortográficas y otras formas de disidencia idiomática de las fuentes originales.</p>
            <p>Logotipo: cortesía de Monero Hernández</p>
            <p>Los ociosos tras esta iniciativa:</p>
            <p>
                <a href="https://twitter.com/suaste86" style={{
                    color: 'blue',
                    textDecoration: 'none'
                    }}>@suaste86</a> {''}
                <a href="https://twitter.com/tesiture" style={{
                    color: 'blue',
                    textDecoration: 'none'
                    }}>@tesiture</a>
            </p>
        </div>
        </div>
        )
        :
        null
    }

    </>
)
}

export default Side;