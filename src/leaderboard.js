import "./css/leaderboard.css"

import data from "./testdata.json"

function TableRow({run, pos, chapter}) {
    let finaltime = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].finaltime;
    let hits = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].hits;
    let initialtime = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].initialtime;

    return <tr>
        <td class="position">{pos}</td>
        <td id="player">{run.player}</td>
        <td>{finaltime}</td>
        <td>{hits}</td>
        <td>{initialtime}</td>
    </tr>
}

export default function Leaderboard({chapter}) {
    const players = [];
    let i = 1;

    data.sort(compareTimeChapter(chapter));
    data.forEach((p) => {
        players.push(<TableRow run={p} pos={i} chapter={chapter-1}/>)
        ++i;
    });

    return <>
        <div>
        <table id="leaderboard">
            <tr>
                <th class="position">#</th>
                <th id="player">Player</th>
                <th>Final time</th>
                <th>Hits</th>
                <th>Initial time</th>
            </tr>
            {players}
        </table>
        </div>
    </>
}

function compareTimeChapter(chapter) {
    return function compareTime(a, b) {
        if (a.runs[chapter-1] === undefined) return 1;
        if (b.runs[chapter-1] === undefined) return -1;

        let timeA = a.runs[chapter-1].finaltime.split(":");
        let timeB = b.runs[chapter-1].finaltime.split(":");

        if (timeA.length == 2) timeA.unshift("00");
        if (timeB.length == 2) timeB.unshift("00");

        let timeAmillis = timeA[2].split(".");
        let timeBmillis = timeB[2].split(".");

        // hours
        if (timeA[0] > timeB[0])
            return 1;
        else if (timeA[0] < timeB[0])
            return -1;
        else {
            // minutes
            if (timeA[1] > timeB[1])
                return 1;
            else if (timeA[1] < timeB[1])
                return -1;
            else {
                // seconds
                if (timeAmillis[0] > timeBmillis[0])
                    return 1;
                else if (timeAmillis[0] < timeBmillis[0])
                    return -1;
                else {
                    // milliseconds
                    if (timeAmillis[1] > timeBmillis[1])
                        return 1;
                    else if (timeAmillis[1] < timeBmillis[1])
                        return -1;
                    else return 0;
                }
            }
        }
    };
}