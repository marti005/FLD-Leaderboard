import runData from '../run_data.json'
import playerData from '../player_data.json' 

async function getMatcherino() {
    const data = await fetch('https://matcherino.com/__api/bounties?id=185578');
    return data.json();
}

export async function getData() {
    let data = {};
    
    playerData.forEach((p) => {
        let playerRuns = runData.filter((r) => r.player === p.username);
        p.runs = playerRuns;
    })
    data.leaderboard = playerData

    await getMatcherino().then((matcherino) => data.matcherino = matcherino)

    return data;
}
