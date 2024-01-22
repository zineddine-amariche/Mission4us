import {Outlet} from 'react-router-dom'
import React from 'react'

const  InnerContent=() =>{
  return <div className='inner-content'>
      <Outlet/>
   
  </div>;
}

export default InnerContent;
