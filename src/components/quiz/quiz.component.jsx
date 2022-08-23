import React from "react";
import "./quiz.styles.scss"
import Question from "../question/question.component";
import { useState, useEffect } from "react";
import {useRef} from 'react';
import { nanoid } from 'nanoid'


export default function Quiz(){
 
    const ref = useRef(null);
    const [allQs, setAllQs] = useState([])
    const [marks, setMarks] = useState()
    const [displayResult, setDisplayResult] = useState(false)

    function showResult(){
        setDisplayResult(true)
    }

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }, [displayResult])

    function modState(data){
        setAllQs(()=>{
           return data.map(quest=>{
                return {...quest, id: nanoid(), score: 0}
            })
        })
    }

	useEffect(()=>{
		fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
		.then(res=> res.json())
        .then(data=> JSON.stringify(data))
        .then(data=> data.replace(/&quot;/g, '"'))
        .then(data=> data.replace(/&#039;/g, "'"))
        .then(data=> JSON.parse(data))
		.then(data=> modState(data.results))
	},[])
 
    useEffect(()=> {
        console.log('outside state'); 
        let score = 0
        allQs.map(quest=>{
            quest.score === 1 ? score++ : score
        })
        setMarks(score)
    }, [allQs])

    function scoreCounter(id, result){
        setAllQs(prevState=>{
           console.log('in state'); 
            return prevState.map(quest=>{
                if(id === quest.id){
                    return{...quest, score: result}
                } else{
                    return quest
                }
            })
        })
        
    }  

    const questionElements= allQs.map(question=> {
        return <Question displayAnswer={displayResult} key={question.id} id={question.id} scoreCounter={scoreCounter} {...question}/>
    })

    return(
        <div className="quiz">
           {questionElements}
           <div className="btn--container">
           <button onClick={showResult} className="btn">Check Answeres</button>
           {displayResult && <h1 ref={ref}>{`You got ${marks} out of 5 Marks`}</h1>}
           </div>
        </div>

    )
}