import React, { useContext } from 'react'
import './Productcard.css'
import {UserContext} from '../context/Createcontext'

const User = () => {
    const {user}=useContext(UserContext)
  return (
    <div>
        <p className='button-pt'>Hii {user}</p>
        {/* <p className='button-pt'>Hii {user2}</p> */}
    </div>
  )
}

export default User
