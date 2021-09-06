import React from 'react'

function Card({cards}) {
   console.log(cards)
    return (
        <div>
            
            { cards.map((p)=>(
                <p>{p.emailAddress}</p>
            ))}
        </div>
    )
}

export default Card
