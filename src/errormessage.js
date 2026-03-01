import "./css/errormessage.css"

import dogcheck1 from "./images/dogcheck1.webp"
import dogcheck2 from "./images/dogcheck2.webp"
import dogcheck3 from "./images/dogcheck3.webp"

export default function ErrorMessage() {
    const dogs = [dogcheck1, dogcheck2, dogcheck3];
    const random = Math.floor(Math.random() * dogs.length);
    const dog = dogs[random];

    return <>
        <div className="errorMessage">
            <h1>Loading, please wait...</h1>
            <h2>If the leaderboard doesn't show up after a few seconds, <br></br>let @marti005 know in the FLD server</h2>
            <img className="dogcheckimg" src={dog} alt="Dog check" ></img>
        </div>
    </>
}