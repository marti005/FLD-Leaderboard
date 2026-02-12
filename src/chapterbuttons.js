import "./css/chapterbuttons.css"

function Chapterbutton({chapter, currentChapter, clickButton}) {
    let buttonid = (chapter === currentChapter) ? "selectedbutton": "chapterbutton";

    return <button id={buttonid} onClick={clickButton}>Chapter {chapter}</button>
}

export default function Chapterbuttons({clickButton, chapter}) {
    const buttons = [];

    for (let i=1; i<=4; ++i) {
        buttons.push(<Chapterbutton key={i} chapter={i} currentChapter={chapter} clickButton={() => clickButton(i)}/>)
    }

    return <>
        <div id="buttons">
            {buttons}
        </div>
    </>
}