import "./css/chapterbuttons.css"

function Chapterbutton({chapter, clickButton}) {
    return <button class="chapterbutton" onClick={clickButton}>Chapter {chapter}</button>
}

export default function Chapterbuttons({clickButton}) {
    const buttons = [];

    for (let i=1; i<=4; ++i) {
        buttons.push(<Chapterbutton key={i} chapter={i} clickButton={() => clickButton(i)}/>)
    }

    return <>
        <div id="buttons">
            {buttons}
        </div>
    </>
}