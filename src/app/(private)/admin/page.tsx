import React from 'react'
import authConfig from '../../../../auth.config'
import getServerSession from 'next-auth'

export default async function Dashboard() {

  const session = await getServerSession(authConfig)
  
  return (
    <div>Helo { session.user.email} -  Dashboard</div>

  )
}
