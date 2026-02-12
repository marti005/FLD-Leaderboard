import "./css/leaderboard.css"

import data from "./testdata.json"

function TableRow({run, pos, chapter}) {
    const allowed = [20, 15, 10, 4];
    var bgcolor = (allowed[chapter] >= pos && run.runs[chapter] !== undefined) ? "" : "eliminated";

    let finaltime = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].finaltime;
    let hits = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].hits;
    let initialtime = (run.runs[chapter] === undefined) ? "N/A" : run.runs[chapter].initialtime;

    return <tr class={bgcolor}>
        <td class="position">{pos}</td>
        <td class="player">{run.player}</td>
        <td>{finaltime}</td>
        <td class= "hits">{hits}</td>
        <td>{initialtime}</td>
    </tr>
}

export default function Leaderboard({chapter}) {
    const players = [];
    let i = 1;

    data.sort(compareTimeChapter(chapter));
    data.forEach((p) => {
        if (p.eliminated === null || p.eliminated >= chapter) {
            players.push(<TableRow run={p} pos={i} chapter={chapter-1}/>)
            ++i;
        }
    });

    return <>
        <div>
        <table id="leaderboard">
            <tbody>
                <tr>
                    <th class="position">#</th>
                    <th class="player">Player</th>
                    <th>Final time</th>
                    <th class="hits">Hits</th>
                    <th>Initial time</th>
                </tr>
            </tbody>
            {players}
        </table>
        </div>
    </>
}

function compareTimeChapter(chapter) {
    return function compareTime(a, b) {
        if (a.runs[chapter-1] === undefined) {
            if (b.runs[chapter-1] === undefined) 
                return a.player > b.player
            else return 1;
        } 
        if (b.runs[chapter-1] === undefined) return -1;

        let timeA = a.runs[chapter-1].finaltime.split(":");
        let timeB = b.runs[chapter-1].finaltime.split(":");

        if (timeA.length === 2) timeA.unshift("00");
        if (timeB.length === 2) timeB.unshift("00");

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