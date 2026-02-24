  
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'
import bestScore from './bestScore';
import CurrentScore from './currentScore';
import BestScore from './bestScore';

import banner from './resources/imgs/Rick_and_Morty.svg'


function App() {

  
  /*estado que recibe los datos de la api*/
  const [data, setData] = useState([]);



  /*estados que manejan la puntuacion del juego*/
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  const [clickCaracter, setClickCaracter] = useState([]);


  
  function shuffleCards(arr){

    const shuffled= [...arr];

    if(!shuffled || shuffled.length == 0){
      return;
    }

    for(let i = shuffled.length-1; i > 0; i--){
      const j= Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    return shuffled 
    
  }


  function handleScoreClick(id){
    

    if(!clickCaracter.includes(id)){
      setCurrScore(prev => prev +1)
      setClickCaracter(prevCaracter => [...prevCaracter, id])
      setData(prevData => shuffleCards(prevData));
      
      
    }else{
      setCurrScore(0)
      setClickCaracter([]);
      setData(prevData => shuffleCards(prevData));
    }


  }


    useEffect(() =>{
       
      setBestScore(prevScore =>{
        return currScore > prevScore ? currScore: prevScore;
      })

    }, [currScore])


    useEffect(() =>{
      fetch('https://rickandmortyapi.com/api/character')
        .then((res) => res.json())
        .then((data) => setData(shuffleCards(data.results)))
    }, [])


  
  

  return (
    <>

      <div className='banner-container'>
        <img src={banner} alt="banner rick and morty" />
      </div>

      <div className='descripcion-container'>
        <h1>Memory CardGame - Rick and Morty</h1>
        <p>Get points by clicking on an image but don't click on any more than once!</p>
      </div>


      <div className='score-container'>
        <BestScore bestScore={bestScore}/>
        <CurrentScore currScore={currScore}/>
      </div>

      <div className="images-caracters">
        {data.map((caracter) =>{
          return(
            <img src={caracter.image} onClick={() => handleScoreClick(caracter.id)} alt={caracter.name} key={caracter.id}/>
          )
        })}
      </div>
    </>
  )
}

export default App
