import "./css/leaderboard.css"

import data from "./testdata.json"

function TableRow({run, pos}) {
    return <tr>
        <td class="position">{pos}</td>
        <td id="player">{run.player}</td>
        <td>{run.runs[0].finaltime}</td>
        <td>{run.runs[0].hits}</td>
        <td>{run.runs[0].initialtime}</td>
    </tr>
}

export default function Leaderboard() {
    const players = [];
    let i = 1;

    data.sort(compareTime);
    data.forEach((p) => {
        players.push(<TableRow run={p} pos={i}/>)
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

function compareTime(a, b) {
    let timeA = a.runs[0].finaltime.split(":");
    let timeB = b.runs[0].finaltime.split(":");

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
}