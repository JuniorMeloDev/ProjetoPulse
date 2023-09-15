import React from 'react'

import Layout from '../../../components/Layout'
import Card from '../../../components/alunos/Projetos'
import { useSession } from 'next-auth/react'



export default function Home() {

  const { data: session } = useSession()

  return (
    <Layout>
      <Card/>
      {session && <pre className="bg-slate-900 text-slate-50 p-10 rounded-lg mt-10">{JSON.stringify(session, null, 2)}</pre>}
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem a accusantium voluptatem corrupti optio veniam minima, ut dolorem ducimus adipisci quibusdam fugit obcaecati. Vitae excepturi, facilis nostrum veniam earum ut.</p>
    </Layout>
  )
}

Home.auth = true