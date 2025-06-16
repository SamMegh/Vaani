import React from 'react'

function CustomInputBox({input, setInput}) {
  return (
    <>
      <input 
      type="text"
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      placeholder='Message...'
      />
    </>
  );
}

export default CustomInputBox
