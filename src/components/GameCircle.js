import React from 'react'
import  "./Game.css";


const GameCircle = ({id, children, className, onCircleClicked}) => {
    
const onClick = (id) => {
    onCircleClicked(id);
}

  return (
    <div className = {`gameCircle ${className}`} onClick={() => onClick(id)}>
       {children}
    </div>

    
  )
}

export default GameCircle