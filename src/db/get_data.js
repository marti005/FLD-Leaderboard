import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://najlkpdfokkfiamjrrki.supabase.co", "sb_publishable_7VsvjKxnWSaZn7WjRzyfVw_AM68IMAa");

export default async function getData() {
    const { data: players } = await supabase.from('Players').select();
    const { data: runs } = await supabase.from('Runs').select();

    players.forEach((p) => {
        var playerRuns = structuredClone(runs).filter((r) => r.player === p.username);
        p.runs = playerRuns;
    })

    return players;
}
