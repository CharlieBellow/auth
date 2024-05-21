"use client"
import { useUser } from '@clerk/clerk-react'

import React from 'react'


export default function Dashboard() {

  const { user } = useUser()
  console.log(user?.fullName);
  

  return (
    <div>Helo {user?.fullName} -  Dashboard</div>

  )
}
