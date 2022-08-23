import "./startup.styles.scss"
import React from "react"
import {Link} from "react-router-dom"

export default function StartUp(){
    return(
        <div className="startup">
            <h1 className="startup--heading">Quizzical</h1>
            <h5 className="startup--description">Test Yourself Out!</h5>
            <Link className="btn" to="/quiz">Start Quiz</Link>
        </div>
    )
}