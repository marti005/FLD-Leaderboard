import { useState, useEffect } from 'react'

import Chapterbuttons from "./chapterbuttons.js"
import Leaderboard from "./leaderboard.js";

import "./css/index.css"
import logo from "./images/logo.png"

import getData from "./db/get_data.js"

function App() {
  const [chapter, setChapter] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  function clickButton(chapter) {
    setChapter(chapter);
  }

  return (
    <> 
      <img src={logo} alt="FLD logo"></img>
      <Chapterbuttons clickButton={clickButton} chapter={chapter}/>
      <Leaderboard chapter={chapter} data={data}/>
    </>
  );
}

export default App;
