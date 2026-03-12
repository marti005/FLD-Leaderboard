import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://najlkpdfokkfiamjrrki.supabase.co", "sb_publishable_7VsvjKxnWSaZn7WjRzyfVw_AM68IMAa");

async function getLeaderboardData() {
    const { data: players } = await supabase.from('Players').select();
    const { data: runs } = await supabase.from('Runs').select();

    players.forEach((p) => {
        var playerRuns = structuredClone(runs).filter((r) => r.player === p.username);
        p.runs = playerRuns;
    })

    return players;
}

async function getMatcherino() {
    const data = await fetch('https://matcherino.com/__api/bounties?id=185578');
    return data.json();
}

export async function getData() {
    let data = {};

    await getLeaderboardData().then((leaderboard) => data.leaderboard = leaderboard)
    await getMatcherino().then((matcherino) => data.matcherino = matcherino)

    return data;
}
