import React from 'react'

function CustomButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Send</button>
    </div>
  )
}

export default CustomButton
