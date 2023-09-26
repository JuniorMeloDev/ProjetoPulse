import React from 'react'
import Layout from '../../../components/Layout'
import { useSession } from 'next-auth/react'


export default function Ajuda() {

  const {data: session, status} = useSession()
  const userRole = session?.user?.role;
  const nome = session?.user?.nome

  

  console.log('o nome é', nome)
  console.log('a role é ', userRole)
  console.log('os dados da sessão ', session)

  return (
    <Layout>
      <div>
        <h1>{nome}</h1>
        <h1>{userRole}</h1>
        <p className='pt-28'>Ajuda</p>
        <p>{session.user.token}</p>
        <p>{session.user.iat}</p>
        <p>{session.user.jti}</p>
        


      </div>
    </Layout>
  )
}
Ajuda.auth = true