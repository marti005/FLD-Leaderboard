import { useState, useEffect } from 'react'

import Chapterbuttons from "./chapterbuttons.js"
import Leaderboard from "./leaderboard.js";
import ErrorMessage from "./errormessage.js"

import "./css/index.css"
import logo from "./images/logo.webp"

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

  var elements = [];
  elements.push(<img src={logo} alt="FLD logo"></img>);
  if (data.length > 0) elements.push(<Chapterbuttons clickButton={clickButton} chapter={chapter}/>)
  elements.push(data.length === 0 ? <ErrorMessage /> : <Leaderboard chapter={chapter} data={data}/>)

  return (
    elements
  );
}

export default App;
