import getServerSession from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import authConfig from '../../../auth.config'

type PrivateLayoutProps = {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // obtem a sessão do lado do cliente
  const session = await getServerSession({ ...authConfig })

  if (session) {
    redirect('/admin')
  }
  return <>{children}</>
}
