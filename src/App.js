import { useState } from 'react'

import Chapterbuttons from "./chapterbuttons.js"
import Leaderboard from "./leaderboard.js";

import "./css/index.css"

function App() {
  const [chapter, setChapter] = useState(1);

  function clickButton(chapter) {
    setChapter(chapter);
  }

  return (
    <>
      <Chapterbuttons clickButton={clickButton}/>
      <Leaderboard chapter={chapter}/>
    </>
  );
}

export default App;
