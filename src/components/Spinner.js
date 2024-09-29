import React from 'react'
import load from './loading.gif'

const loading=()=> {

    return (
      <div className='text-center'>
        <img src={load} alt="loading" />
      </div>
    )
  }


export default loading

