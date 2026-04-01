import React from 'react'
import {UserContext} from '../context/Createcontext'

const UserProvider = ({children}) => {

    const user="Bharath"
    const user2="Lokesh"

  return (
   <UserContext.Provider  value={{user,user2}}>
    {children}
   </UserContext.Provider>
  )
}

export default UserProvider
