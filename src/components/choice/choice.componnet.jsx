import React from "react";
import "./choice.styles.scss"

export default function Choice(props){
    return(
        <div 
        onClick={()=>props.handleClick(props.answer)} 
        className="choice"
        style={{...props.styles, ...props.wrongAnswer, ...props.correctStyles}}
        >
            {props.answer}
        </div> 
    )
}