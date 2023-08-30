import React from 'react'
import { getServerAuthSession } from './api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'

export default function Teste() {
    const {data , status} = useSession()

    // if(status === 'loading') {
    //     return <h3>Carregando...</h3>
    // }
    // if(status === 'unauthenticated') {
    //     return <h3>{status}</h3>
    // }

    return (
        <div>
            <h1>Usuario logado</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        
    )
}

Teste.auth = true
// esse comando mostra que a pagina está protegida. so com autenticação que pode entrar nela

/**
 * @param {import('next').GetServerSidePropsContext} ctx
 */

//export async function getServerSideProps(ctx) {
    // const session = await getServerAuthSession(ctx.req, ctx.res)

    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         }
    //     }
    // }


    // return {
    //     props: {
    //         user: session.user, 
    //     }
    // }

