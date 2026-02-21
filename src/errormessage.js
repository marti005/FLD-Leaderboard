import "./css/errormessage.css"

import dogcheck1 from "./images/dogcheck1.webp"
import dogcheck2 from "./images/dogcheck2.webp"
import dogcheck3 from "./images/dogcheck3.webp"

export default function ErrorMessage() {
    const dogs = [dogcheck1, dogcheck2, dogcheck3];
    const random = Math.floor(Math.random() * dogs.length);
    const dog = dogs[random];

    var w, h;
    switch(random){
        case 0:
            w = 300;
            h = 150;
            break;
        case 1:
            w = 300;
            h = 300;
            break;
        case 2:
            w = 300;
            h = 300;
            break;
    }

    return <>
        <div className="errorMessage">
            <h1>The tournament hasn't started yet!</h1>
            <h2>Check back after sign-ups have closed</h2>
            <img className="dogcheckimg" src={dog} alt="Dog check" ></img>
        </div>
    </>
}