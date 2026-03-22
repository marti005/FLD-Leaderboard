import { useState, useEffect } from 'react'

import Chapterbuttons from "./chapterbuttons.js"
import Leaderboard from "./leaderboard.js";
import ErrorMessage from "./errormessage.js"

import "./css/index.css"
import logo from "./images/logo.webp"

import {getData} from "./db/get_data.js"

const currentChapter = 3;

function App() {
  const [chapter, setChapter] = useState(currentChapter);
  const [data, setData] = useState([]);
  const [raised, setRaised] = useState("");

  useEffect(() => {
    getData().then((data) => {setData(data.leaderboard); 
                              setRaised((data.matcherino.balance/100).toString())});
  }, []);

  function clickButton(chapter) {
    setChapter(chapter);
  }

  var elements = [];

  if (data.length === 0 || raised === 0) {
    elements.push(<ErrorMessage key="error"/>)
  } else {
    let thousands = raised.substring(0, raised.length-6)
    let rest = raised.substring(raised.length-6)
    elements.push(<img key="logo" onClick={() => window.open("https://discord.gg/Twuu5NqqWg", "_blank")}src={logo} alt="FLD logo"></img>);
    elements.push(<h1 key="prizepool" className="prizepool">Current prize pool: <strong>${thousands},{rest}</strong></h1>)
    elements.push(<h2 key="donatelink" className="donatelink" onClick={() => window.open("https://matcherino.com/tournaments/185578/overview", "_blank")}>Donate!</h2>)
    elements.push(<Chapterbuttons key="buttons" clickButton={clickButton} chapter={chapter}/>)
    elements.push(<Leaderboard key="leaderboard" chapter={chapter} data={data}/>)
  }

  return (
    elements
  );
}

export default App;
