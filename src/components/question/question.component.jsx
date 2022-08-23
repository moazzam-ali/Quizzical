import React from "react";
import "./question.styles.scss"
import Choice from "../choice/choice.componnet";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react"; 

export default function Question(props){
    const {correct_answer, incorrect_answers, question, id, scoreCounter, displayAnswer} = props

    const index= Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    const randomized = [...incorrect_answers]
    randomized.splice(index, 0, correct_answer)
    const randomizedObj = randomized.map(item=>{
        return {value: item, id: nanoid()}
    })


    const [state, setState] = useState({correct_answer,
                                        incorrect_answers,
                                        id, 
                                        multiple: randomizedObj,
                                        choice: "", 
                                        })
    function setChoice(value){
        setState(prevState=>{
            return {...prevState, choice: value}
        })
    }
    
    useEffect(()=>{
        const result = state.correct_answer === state.choice ? 1 : 0
        scoreCounter(state.id, result)
    },[state])


    const choices = state.multiple.map(answer=> {
        const styles = {
            backgroundColor: "#D6DBF5"
        }
        const wrongAnswer = {
            backgroundColor : "#F8BCBC"
        }
        const correctStyles = {
            backgroundColor: "#94D7A2",
        }
       return <Choice answer={answer.value}
        {...(answer.value != state.correct_answer && answer.value === state.choice && displayAnswer ? {wrongAnswer} : {})} 
        {...(answer.value===state.choice ? {styles} : {})}
        {...(answer.value === state.correct_answer  && displayAnswer ? {correctStyles} : {})} 
        key={answer.id} handleClick={setChoice}/>
    })


    return(
        <div className="question">
            <h3 className="question--statement">{question}</h3>
            <div className="question--choice">
                {choices}
            </div>
        </div>
    ) 
}