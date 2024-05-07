import React from 'react'
import authConfig from '../../../../auth.config'
import getServerSession from 'next-auth'

export default async function Dashboard() {

  const session = getServerSession(authConfig)
console.log(session.auth.name);

  return (
    <div>Helo { session?.auth.name} -  Dashboard</div>

  )
}
