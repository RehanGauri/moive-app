import React from 'react'

const Button = ({text, classname=""}) => {
  return (
    <button className={`px-3 rounded-full py-1.5 cursor-pointer hover:scale-105 transition duration-200 montserrat ${classname}`} >
        {text}
    </button>
  )
}

export default Button