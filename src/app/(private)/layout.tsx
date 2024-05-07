
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'


type PrivateLayoutProps = {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // obtem a sessão do lado do cliente
  // const session = await getServerSession({ ...authConfig })

  // if (!session) {
    // redirect('/')
  // }
  return <>{children}</>
}
