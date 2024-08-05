import React from 'react'

function Container(props) {
  return (
    <div className={`max-w-[1280px] mx-auto ${props.extraClass}`}>
        {props.children}
    </div>
  )
}
export default Container