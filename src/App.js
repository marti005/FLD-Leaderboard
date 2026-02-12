import { useState } from 'react'

import Chapterbuttons from "./chapterbuttons.js"
import Leaderboard from "./leaderboard.js";

import "./css/index.css"
import logo from "./images/logo.png"

function App() {
  const [chapter, setChapter] = useState(1);

  function clickButton(chapter) {
    setChapter(chapter);
  }

  return (
    <> 
      <img src={logo} alt="FLD logo"></img>
      <Chapterbuttons clickButton={clickButton} chapter={chapter}/>
      <Leaderboard chapter={chapter}/>
    </>
  );
}

export default App;
