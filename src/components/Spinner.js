import React from 'react'
import loading from './loading.gif'

//converting to react hook as a fn based component first need to remove this export line

 const Spinner =() => {
 
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />

      </div>
    )
  
}

export default Spinner