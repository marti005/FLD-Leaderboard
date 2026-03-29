import "./css/leaderboard.css"

import first_place from "./images/1st_place.webp"
import second_place from "./images/2nd_place.webp"
import third_place from "./images/3rd_place.webp"

const allowed = [59, 41, 18, 4];

function TableRow({player, pos, chapter}) {
    var run = player.runs.find((r) => r.chapter === chapter);

    let bgcolor = "allowed";

    let finaltime = "N/A";
    let hits = "N/A";
    let initialtime = "N/A";
    let link = "N/A"
    let note = null;

    if (run !== undefined) {
        finaltime = run.finaltime;
        hits = run.hits;
        initialtime = run.initialtime;
        link = run.link;
        note = run.note;
    }

    if (allowed[chapter-1] >= pos && run !== undefined) {
        switch(pos) {
            case 1:
                pos = <img alt="First place icon" src={first_place}></img>;
                break;
            case 2:
                pos = <img alt="Second place icon" src={second_place}></img>;
                break;
            case 3:
                pos = <img alt="Third place icon" src={third_place}></img>;
                break;
            default:
                break;
        } 
    } else bgcolor = "eliminated";

    return <tr className={bgcolor} onClick={() => openLink(link)} title={note}>
        <td className="position">{pos}</td>
        <td className="player">{player.username}</td>
        <td>{finaltime}</td>
        <td className= "hits">{hits}</td>
        <td>{initialtime}</td>
    </tr>
}

export default function Leaderboard({chapter, data}) {
    const playersList = [];
    let i = 1;
    if (data !== undefined && data.length > 0) {
        data.sort(compareTimeChapter(chapter));
        data.forEach((p) => {
            if (p.eliminated_chapter === null || p.eliminated_chapter >= chapter) {
                playersList.push(<TableRow key={i} player={p} pos={i} chapter={chapter}/>)
                ++i;
            }
        });
    }
    return <>
        <div>
        <table id="leaderboard">
            <tbody>
                <tr id="header">
                    <th className="position">#</th>
                    <th className="player">Player</th>
                    <th>Final time</th>
                    <th className="hits">Hits</th>
                    <th>Initial time</th>
                </tr>
            {playersList}
            </tbody>
        </table>
        </div>
    </>
}

function compareTimeChapter(chapter) {
    return function compareTime(a, b) {
        var runA = a.runs.find((r) => r.chapter === chapter);
        var runB = b.runs.find((r) => r.chapter === chapter);
        if (runA === undefined) {
            if (runB === undefined) 
                if (a.username.toUpperCase() > b.username.toUpperCase()) return 1;
                else return -1;
            else return 1;
        } 
        if (runB === undefined) return -1;

        let timeA = runA.finaltime.split(":");
        let timeB = runB.finaltime.split(":");

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

function openLink(link) {
    if (link !== "N/A") window.open(link, "_blank")
}
