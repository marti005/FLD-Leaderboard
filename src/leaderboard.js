import "./css/leaderboard.css"

function TableRow({player, pos, chapter}) {
    const allowed = [59, 41, 23, 4];
    var run = player.runs.find((r) => r.chapter === chapter);

    var bgcolor = (allowed[chapter] >= pos && run !== undefined) ? "" : "eliminated";

    let finaltime = (run === undefined) ? "N/A" : run.finaltime;
    let hits = (run === undefined) ? "N/A" : run.hits;
    let initialtime = (run === undefined) ? "N/A" : run.initialtime;
    let link = (run === undefined) ? "N/A" : run.link

    return <tr className={bgcolor} onClick={() => openLink(link)}>
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
        console.log(data);    
        data.sort(compareTimeChapter(chapter));
        data.forEach((p) => {
            if (p.eliminated_chapter === null || p.eliminated_chapter >= chapter) {
                playersList.push(<TableRow player={p} pos={i} chapter={chapter}/>)
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